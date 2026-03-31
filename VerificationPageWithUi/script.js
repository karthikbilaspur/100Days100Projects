// --- Configuration ---
const CODE_LENGTH = 6;
const CODE_EXPIRY_SECONDS = 120; // Increased to 120 seconds (2 minutes)
const RESEND_COOLDOWN_SECONDS = 30; // 30 seconds before user can resend
const MAX_VERIFICATION_ATTEMPTS = 5; // Max attempts before locking out/resending
const VERIFICATION_THROTTLE_MS = 1000; // Time to wait between verification attempts (anti-brute-force)
const REDIRECT_DELAY_MS = 1500; // Delay before redirecting after successful verification
const DEBUG_MODE = true; // Set to true to show generated code on page for testing

// --- DOM Elements ---
const verificationForm = document.getElementById('verification-form');
const codeDigitInputs = Array.from({ length: CODE_LENGTH }, (_, i) => document.getElementById(`code-input-${i}`));
const fullCodeInput = document.getElementById('full-code-input'); // Hidden input for paste/autocomplete
const verifyBtn = document.getElementById('verify-btn');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const countdownTimerDisplay = document.getElementById('countdown-timer');
const timerValueSpan = document.getElementById('timer-value');
const resendBtn = document.getElementById('resend-btn');
const resendCooldownMessage = document.getElementById('resend-cooldown-message');
const resendTimerValueSpan = document.getElementById('resend-timer-value');
const instructionText = document.getElementById('instruction-text');
const debugCodeDisplay = document.getElementById('debug-code-display'); // New debug element
const debugCodeValueSpan = document.getElementById('debug-code-value'); // New debug element
const copyCodeBtn = document.getElementById('copy-code-btn'); // New copy button

// --- State Variables ---
let currentVerificationCode = ''; // The actual code sent by (simulated) backend
let codeExpiryIntervalId = null;
let resendCooldownIntervalId = null;
let currentCodeExpiryTime = 0; // Timestamp for when code expires
let currentResendCooldownTime = 0; // Timestamp for when resend is available
let verificationAttempts = 0; // Tracks failed attempts for current code
let lastVerificationAttemptTime = 0; // For throttling
let sessionId = null; // Simulated session ID for backend tracking

// --- Simulated Backend Functions (Replace with actual API calls in production) ---

/**
 * Simulates a backend call to generate and "send" a new verification code.
 * @returns {Promise<{code: string, sessionId: string}>} A promise that resolves with the new code and session ID.
 */
async function simulateGenerateCodeAPI() {
    console.log("Simulating API call: Generating new code...");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // In a real app, the server would store this. For simulation, we'll use localStorage.
    localStorage.setItem('simulated_server_code', newCode);
    localStorage.setItem('simulated_session_id', newSessionId);

    return { code: newCode, sessionId: newSessionId };
}

/**
 * Simulates a backend call to verify the user's code.
 * @param {string} userCode The code entered by the user.
 * @param {string} currentSessionId The session ID.
 * @returns {Promise<{success: boolean, message: string}>} A promise that resolves with verification result.
 */
async function simulateVerifyCodeAPI(userCode, currentSessionId) {
    console.log(`Simulating API call: Verifying code "${userCode}" for session "${currentSessionId}"`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    const simulatedServerCode = localStorage.getItem('simulated_server_code');
    const simulatedSessionId = localStorage.getItem('simulated_session_id');

    if (!simulatedServerCode ||!simulatedSessionId) {
        return { success: false, message: 'Verification session invalid. Please request a new code.' };
    }
    if (currentSessionId!== simulatedSessionId) {
        return { success: false, message: 'Session mismatch. Please request a new code.' };
    }
    if (userCode === simulatedServerCode) {
        return { success: true, message: 'Account verified successfully!' };
    } else {
        return { success: false, message: 'Invalid verification code.' };
    }
}

// --- UI Utility Functions ---

// Shows/hides loading spinner on buttons
function toggleSpinner(buttonElement, show) {
    const spinner = buttonElement.querySelector('.spinner');
    if (spinner) {
        spinner.classList.toggle('hidden',!show);
        buttonElement.disabled = show; // Disable button while spinning
    } else {
        buttonElement.disabled = show; // Just disable if no spinner
    }
}

// Displays messages (error/success)
function showMessage(element, message, persist = false) {
    element.textContent = message;
    element.classList.remove('hidden');
    // Clear other message if any
    if (element === errorMessage) successMessage.classList.add('hidden');
    if (element === successMessage) errorMessage.classList.add('hidden');

    // Auto-hide messages after a delay, unless persist is true
    if (!persist) {
        setTimeout(() => {
            element.classList.add('hidden');
            element.textContent = '';
        }, 5000);
    }
}

// Clears all feedback messages
function hideMessages() {
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
    errorMessage.textContent = '';
    successMessage.textContent = '';
}

// --- Timer Functions ---

// Updates the code expiry timer display
function updateCodeExpiryTimer() {
    const now = Date.now();
    const timeLeft = Math.max(0, Math.floor((currentCodeExpiryTime - now) / 1000));

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerValueSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft <= 0) {
        clearInterval(codeExpiryIntervalId);
        timerValueSpan.textContent = '00:00';
        countdownTimerDisplay.classList.add('expired'); // Visual indicator for expiry
        showMessage(errorMessage, 'Verification code expired. Please resend a new one.', true); // Persist expiry message
        resendBtn.disabled = false; // Enable resend button
        verifyBtn.disabled = true; // Disable verify button
        currentVerificationCode = ''; // Invalidate client-side code
        localStorage.removeItem('simulated_server_code'); // Clear simulated backend code
        highlightCodeInputs(true);
    } else {
        countdownTimerDisplay.classList.remove('expired');
        resendBtn.disabled = true; // Disable resend button while current code is active
        // Only enable verify button if code isn't expired and no errors
        verifyBtn.disabled = (codeDigitInputs.some(input => input.value === ''));
    }
}

// Starts the code expiry timer
function startCodeExpiryTimer() {
    clearInterval(codeExpiryIntervalId); // Clear any existing timer
    currentCodeExpiryTime = Date.now() + (CODE_EXPIRY_SECONDS * 1000);
    updateCodeExpiryTimer(); // Call immediately to avoid 1-sec delay on display
    codeExpiryIntervalId = setInterval(updateCodeExpiryTimer, 1000);
}

// Updates the resend cooldown timer display
function updateResendCooldownTimer() {
    const now = Date.now();
    const timeLeft = Math.max(0, Math.floor((currentResendCooldownTime - now) / 1000));

    resendTimerValueSpan.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(resendCooldownIntervalId);
        resendCooldownMessage.classList.add('hidden');
        if (Date.now() >= currentCodeExpiryTime) { // Only enable if code has expired or if no active code
            resendBtn.disabled = false;
        } else if (currentVerificationCode) { // If there's an active code, resend should still be disabled
            resendBtn.disabled = true;
        } else { // No active code, not expired, cooldown finished -> enable resend
            resendBtn.disabled = false;
        }
    } else {
        resendCooldownMessage.classList.remove('hidden');
        resendBtn.disabled = true; // Always disable while cooldown is active
    }
}

// Starts the resend cooldown timer
function startResendCooldownTimer() {
    clearInterval(resendCooldownIntervalId);
    currentResendCooldownTime = Date.now() + (RESEND_COOLDOWN_SECONDS * 1000);
    updateResendCooldownTimer(); // Call immediately to avoid 1-sec delay on display
    resendCooldownIntervalId = setInterval(updateResendCooldownTimer, 1000);
}

// --- Main Logic ---

// Initializes or "sends" a new verification code
async function sendNewCode() {
    if (resendBtn.disabled) return; // Prevent double-clicks during cooldown

    hideMessages();
    clearCodeInputs();
    toggleSpinner(resendBtn, true); // Show spinner on resend button

    try {
        const response = await simulateGenerateCodeAPI();
        currentVerificationCode = response.code;
        sessionId = response.sessionId;
        verificationAttempts = 0; // Reset attempts for new code

        startCodeExpiryTimer();
        startResendCooldownTimer(); // Start cooldown for resend button

        codeDigitInputs[0].focus(); // Focus the first input field
        showMessage(successMessage, 'A new verification code has been sent!');

        // Debug mode: show code on page
        if (DEBUG_MODE) {
            debugCodeDisplay.classList.remove('hidden');
            debugCodeValueSpan.textContent = formatCodeForDisplay(currentVerificationCode);
        }
    } catch (error) {
        console.error("Failed to generate code:", error);
        showMessage(errorMessage, 'Failed to send new code. Please try again later.');
    } finally {
        toggleSpinner(resendBtn, false); // Hide spinner
    }
}

// --- Event Handlers ---

verificationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (verifyBtn.disabled) return; // Prevent multiple submissions if button is already disabled

    hideMessages(); // Clear previous messages

    const userVerificationCode = codeDigitInputs.map(input => input.value).join('');

    // Basic client-side validation
    if (userVerificationCode.length!== CODE_LENGTH ||!/^\d+$/.test(userVerificationCode)) {
        showMessage(errorMessage, `Please enter a complete ${CODE_LENGTH}-digit numeric code.`);
        highlightCodeInputs(true); // Highlight all inputs as error
        return;
    }

    // Client-side throttling
    const now = Date.now();
    if (now - lastVerificationAttemptTime < VERIFICATION_THROTTLE_MS) {
        showMessage(errorMessage, 'Too many attempts. Please wait a moment before trying again.');
        return;
    }
    lastVerificationAttemptTime = now;

    // Check if code has expired (client-side check for immediate feedback)
    if (Date.now() >= currentCodeExpiryTime) {
        showMessage(errorMessage, 'Verification code expired. Please resend a new one.', true);
        resendBtn.disabled = false;
        verifyBtn.disabled = true;
        currentVerificationCode = ''; // Invalidate client-side code
        localStorage.removeItem('simulated_server_code');
        highlightCodeInputs(true);
        return;
    }

    verificationAttempts++;

    if (verificationAttempts > MAX_VERIFICATION_ATTEMPTS) {
        showMessage(errorMessage, 'Too many failed attempts. A new code has been sent.', true);
        await sendNewCode(); // Auto-resend after too many attempts
        highlightCodeInputs(true);
        return;
    }

    toggleSpinner(verifyBtn, true); // Show spinner on verify button

    try {
        const response = await simulateVerifyCodeAPI(userVerificationCode, sessionId);
        if (response.success) {
            showMessage(successMessage, 'Account verified successfully! Redirecting...');
            verifyBtn.disabled = true;
            clearInterval(codeExpiryIntervalId);
            clearInterval(resendCooldownIntervalId);
            highlightCodeInputs(false); // Clear any error highlights
            // Simulate redirection
            setTimeout(() => {
                // window.location.href = 'next-page.html'; // Uncomment for actual redirection
                alert("Redirecting to next-page.html (simulated)"); // For demo
            }, REDIRECT_DELAY_MS);
        } else {
            showMessage(errorMessage, response.message + ` (${MAX_VERIFICATION_ATTEMPTS - verificationAttempts} attempts left)`);
            highlightCodeInputs(true);
        }
    } catch (error) {
        console.error("Verification failed:", error);
        showMessage(errorMessage, 'An unexpected error occurred during verification. Please try again.');
        highlightCodeInputs(true);
    } finally {
        toggleSpinner(verifyBtn, false); // Hide spinner
    }
});

resendBtn.addEventListener('click', sendNewCode);

// Input handling for individual code digits (UX for entering OTP)
codeDigitInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        // Ensure only one digit
        e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 1);
        hideMessages(); // Clear messages on new input
        highlightCodeInputs(false); // Remove error highlights

        // Move focus to next input if a digit is entered
        if (e.target.value && index < CODE_LENGTH - 1) {
            codeDigitInputs[index + 1].focus();
        }
        updateFullCodeInput(); // Keep hidden input updated
        checkAndSubmitCode(); // Check if all digits are entered
    });

    input.addEventListener('keydown', (e) => {
        // Move focus to previous input on Backspace if current is empty
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            e.preventDefault(); // Prevent default backspace behavior
            codeDigitInputs[index - 1].focus();
            codeDigitInputs[index - 1].value = ''; // Clear previous input on backspace
            updateFullCodeInput();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            codeDigitInputs[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
            codeDigitInputs[index + 1].focus();
        }
    });

    input.addEventListener('focus', (e) => {
        // Select text on focus for easier overwrite
        e.target.select();
    });
});

// Handle paste events on the hidden full code input for better autocomplete support
fullCodeInput.addEventListener('input', (e) => {
    const paste = e.target.value;
    const cleanedPaste = paste.replace(/[^0-9]/g, '');

    // Fill individual inputs from the hidden input
    for (let i = 0; i < CODE_LENGTH; i++) {
        codeDigitInputs[i].value = i < cleanedPaste.length? cleanedPaste[i] : '';
    }

    // Move focus to the last digit or the end
    const lastFilledIndex = Math.min(cleanedPaste.length - 1, CODE_LENGTH - 1);
    if (lastFilledIndex >= 0 && cleanedPaste.length > 0) {
        codeDigitInputs[lastFilledIndex].focus();
    } else {
        codeDigitInputs[0].focus();
    }
    checkAndSubmitCode();
});

// Helper to update the hidden full code input
function updateFullCodeInput() {
    fullCodeInput.value = codeDigitInputs.map(input => input.value).join('');
    // Dispatch an input event on the fullCodeInput to trigger autocomplete="one-time-code" behavior
    fullCodeInput.dispatchEvent(new Event('input', { bubbles: true }));
}

// Automatically submit if all inputs are filled
function checkAndSubmitCode() {
    const fullCode = codeDigitInputs.map(input => input.value).join('');
    if (fullCode.length === CODE_LENGTH) {
        // Delay submission slightly to allow user to see full code and prevent accidental rapid submission
        setTimeout(() => {
            verificationForm.dispatchEvent(new Event('submit', { cancelable: true }));
        }, 100);
    }
}

// Visual feedback for error on code inputs
function highlightCodeInputs(isError) {
    codeDigitInputs.forEach(input => {
        input.classList.toggle('input-error', isError);
    });
    if (isError) {
        // Trigger shake animation on first input
        codeDigitInputs[0].classList.add('shake');
        setTimeout(() => codeDigitInputs[0].classList.remove('shake'), 500);
    } else {
        codeDigitInputs.forEach(input => input.classList.remove('shake')); // Clear shake
    }
}

// Clears all individual code input fields
function clearCodeInputs() {
    codeDigitInputs.forEach(input => input.value = '');
    codeDigitInputs[0].focus();
    updateFullCodeInput();
}

// Formats code for display (e.g., "123 456" for debug)
function formatCodeForDisplay(code) {
    if (code.length === CODE_LENGTH) {
        return `${code.substring(0, CODE_LENGTH / 2)} ${code.substring(CODE_LENGTH / 2)}`;
    }
    return code;
}

// --- Debug & Clipboard ---
if (DEBUG_MODE && copyCodeBtn) {
    copyCodeBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(currentVerificationCode);
            showMessage(successMessage, 'Code copied to clipboard!', false);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            showMessage(errorMessage, 'Failed to copy code to clipboard.', false);
        }
    });
}

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    sendNewCode(); // Simulate sending a code on page load
    updateResendCooldownTimer(); // Ensure resend button state is correct on load
    codeDigitInputs[0].focus(); // Focus the first input field on load
});
