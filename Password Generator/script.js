// --- DOM Element References ---
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const excludeSimilarEl = document.getElementById('exclude-similar');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const templateEl = document.getElementById('template');
const hashAlgorithmEl = document.getElementById('hash-algorithm');
const storedPasswordsEl = document.getElementById('stored-passwords');
const lengthErrorEl = document.getElementById('length-error');
const passwordStrengthTextEl = document.getElementById('password-strength-text');
const passwordStrengthMeterEl = document.getElementById('password-strength-meter');
const clearStorageEl = document.getElementById('clear-storage');

// --- Character Sets ---
const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*(){}[]=<>/,.`~+-?_`"\'\\|;:'; // Added more for robustness

// Characters to exclude when "exclude similar" is checked (visually similar characters)
const similarLowerCase = 'il';
const similarUpperCase = 'IO';
const similarNumber = '01';

// Pre-filtered character sets for efficiency
const excludedLowerCaseChars = lowerCaseChars.split('').filter(char =>!similarLowerCase.includes(char)).join('');
const excludedUpperCaseChars = upperCaseChars.split('').filter(char =>!similarUpperCase.includes(char)).join('');
const excludedNumberChars = numberChars.split('').filter(char =>!similarNumber.includes(char)).join('');

// Word list for passphrase (expanded further)
const passphraseWords = [
    'adventure', 'apple', 'banana', 'brave', 'canyon', 'cherry', 'clever', 'crystal', 'daring',
    'date', 'diamond', 'eagle', 'elderberry', 'elephant', 'emerald', 'fierce', 'fig', 'forest',
    'galaxy', 'gentle', 'grape', 'harmony', 'happy', 'honeydew', 'horizon', 'ideal', 'island',
    'jolly', 'journey', 'keen', 'kiwi', 'labyrinth', 'lemon', 'lively', 'mango', 'melody',
    'merry', 'moonlight', 'mountain', 'nectarine', 'noble', 'ocean', 'optimist', 'orange',
    'paradise', 'peaceful', 'pear', 'penguin', 'phoenix', 'planet', 'quince', 'quick', 'radiant',
    'rainbow', 'raspberry', 'rhythm', 'river', 'serene', 'silence', 'sparkle', 'strawberry',
    'sunshine', 'tangerine', 'tranquil', 'treasure', 'ugli', 'umbrella', 'upbeat', 'unicorn',
    'vanilla', 'velvet', 'vivid', 'volcano', 'watermelon', 'whisper', 'wildflower', 'wise',
    'wonder', 'xigua', 'xylophone', 'yam', 'yellow', 'youthful', 'zany', 'zealous', 'zigzag', 'zodiac', 'zucchini'
];

// --- Helper Functions ---

/**
 * Gets a random character from a given character set string.
 * @param {string} charSet - The string containing characters to choose from.
 * @returns {string} A single random character from the set, or an empty string if set is empty.
 */
function getRandomChar(charSet) {
    if (charSet.length === 0) return '';
    const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * charSet.length);
    return charSet[randomIndex];
}

/**
 * Maps character type names to functions that return a random character of that type.
 * Each function considers the 'excludeSimilar' setting.
 */
const randomFunc = {
    lower: (exclude) => getRandomChar(exclude? excludedLowerCaseChars : lowerCaseChars),
    upper: (exclude) => getRandomChar(exclude? excludedUpperCaseChars : upperCaseChars),
    number: (exclude) => getRandomChar(exclude? excludedNumberChars : numberChars),
    symbol: () => getRandomChar(symbolChars) // Symbols generally distinct
};

/**
 * Updates the password strength display (text and meter).
 * @param {string} password - The generated password.
 * @param {string} template - The current password template.
 */
function updatePasswordStrengthDisplay(password, template) {
    let strength = 'none'; // Default state if no password
    if (password && template!== 'phrase') {
        strength = getPasswordStrength(password);
    } else if (template === 'phrase' && password.length > 0) {
        // Passphrases are inherently strong due to length/multiple words
        strength = 'strong';
    }

    if (passwordStrengthTextEl) {
        passwordStrengthTextEl.innerText = `Password Strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}`;
        // Update ARIA value for screen readers (using rough percentages)
        if (strength === 'weak') passwordStrengthMeterEl.setAttribute('aria-valuenow', '33');
        else if (strength === 'medium') passwordStrengthMeterEl.setAttribute('aria-valuenow', '66');
        else if (strength === 'strong') passwordStrengthMeterEl.setAttribute('aria-valuenow', '100');
        else passwordStrengthMeterEl.setAttribute('aria-valuenow', '0');
    }
    if (passwordStrengthMeterEl) {
        passwordStrengthMeterEl.className = `password-strength-meter ${strength}`;
    }
}

/**
 * Generates a password based on selected criteria.
 * @param {boolean} lower - Include lowercase letters.
 * @param {boolean} upper - Include uppercase letters.
 * @param {boolean} number - Include numbers.
 * @param {boolean} symbol - Include symbols.
 * @param {number} length - Desired password length.
 * @param {string} template - Password template ('default', 'pin', 'phrase').
 * @param {boolean} excludeSimilar - Exclude visually similar characters.
 * @returns {string} The generated password.
 */
function generatePassword(lower, upper, number, symbol, length, template, excludeSimilar) {
    let generatedPassword = '';

    if (template === 'pin') {
        for (let i = 0; i < length; i++) {
            generatedPassword += getRandomChar(numberChars);
        }
        return generatedPassword;
    } else if (template === 'phrase') {
        // Generate a random number of words, e.g., 3 to 6
        const numWords = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * 4) + 3; // 3 to 6 words
        const separators = ['-', '_', '', ' ']; // Separator options

        for (let i = 0; i < numWords; i++) {
            if (i > 0) generatedPassword += getRandomChar(separators);
            generatedPassword += getRandomChar(passphraseWords); // Pick a random word from the list
        }
        return generatedPassword;
    }

    const typesArr = [];
    if (lower) typesArr.push('lower');
    if (upper) typesArr.push('upper');
    if (number) typesArr.push('number');
    if (symbol) typesArr.push('symbol');

    if (typesArr.length === 0) {
        return '';
    }

    const guaranteedChars = [];
    for (const type of typesArr) {
        const char = randomFunc[type](excludeSimilar);
        if (char) {
            guaranteedChars.push(char);
        }
    }

    let allCharsPool = '';
    if (lower) allCharsPool += (excludeSimilar? excludedLowerCaseChars : lowerCaseChars);
    if (upper) allCharsPool += (excludeSimilar? excludedUpperCaseChars : upperCaseChars);
    if (number) allCharsPool += (excludeSimilar? excludedNumberChars : numberChars);
    if (symbol) allCharsPool += symbolChars;

    if (allCharsPool.length === 0) return '';

    // Fill the rest of the password length randomly from the combined pool
    for (let i = guaranteedChars.length; i < length; i++) {
        generatedPassword += getRandomChar(allCharsPool);
    }

    generatedPassword = guaranteedChars.join('') + generatedPassword;

    // Use crypto.getRandomValues for a more secure shuffle (Fisher-Yates)
    const randomBuffer = new Uint32Array(charArray.length);
    crypto.getRandomValues(randomBuffer);

    let charArray = generatedPassword.split('');
    for (let i = charArray.length - 1; i > 0; i--) {
        const j = Math.floor(randomBuffer[i] / (0xFFFFFFFF + 1) * (i + 1)); // Use cryptographically secure random
        [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
    }
    generatedPassword = charArray.join('');

    return generatedPassword.slice(0, length);
}

/**
 * Hashes a password using the specified algorithm.
 * @param {string} password - The password string to hash.
 * @param {string} algorithm - The hashing algorithm (e.g., 'SHA-256', 'SHA-512').
 * @returns {Promise<string>} A promise that resolves to the hexadecimal hash string.
 */
async function hashPassword(password, algorithm) {
    const cryptoInstance = window.crypto || window.msCrypto;
    if (!cryptoInstance ||!cryptoInstance.subtle) {
        console.warn("Web Crypto API not available. Cannot hash password.");
        return Promise.resolve('[Hashing Not Available]');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    try {
        const hashBuffer = await cryptoInstance.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    } catch (e) {
        console.error("Error hashing password:", e);
        return Promise.resolve('[Hashing Error]');
    }
}

/**
 * Stores a hashed password in localStorage and updates the display.
 * @param {string} hashedPassword - The hashed password string.
 */
function storePassword(hashedPassword) {
    const storedPasswords = JSON.parse(localStorage.getItem('storedPasswords')) || [];
    // Limit stored hashes to prevent localStorage bloat, e.g., last 10
    if (storedPasswords.length >= 10) {
        storedPasswords.shift(); // Remove oldest
    }
    storedPasswords.push(hashedPassword);
    localStorage.setItem('storedPasswords', JSON.stringify(storedPasswords));
    displayStoredPasswords();
}

/**
 * Displays all stored hashed passwords from localStorage.
 */
function displayStoredPasswords() {
    const storedPasswords = JSON.parse(localStorage.getItem('storedPasswords')) || [];
    if (!storedPasswordsEl) return;

    if (storedPasswords.length === 0) {
        storedPasswordsEl.innerHTML = '<li class="no-hashes-message">No hashes stored yet.</li>';
        clearStorageEl.style.display = 'none';
    } else {
        const storedPasswordsHtml = storedPasswords.map(password => `<li>${password}</li>`).join('');
        storedPasswordsEl.innerHTML = storedPasswordsHtml;
        clearStorageEl.style.display = 'block';
    }
}

/**
 * Calculates a score-based password strength.
 * @param {string} password - The password to evaluate.
 * @returns {string} 'weak', 'medium', or 'strong'.
 */
function getPasswordStrength(password) {
    let score = 0;

    // --- Length ---
    // Logarithmic scoring for length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (password.length >= 20) score += 2; // Increased bonus for very long passwords
    if (password.length >= 25) score += 2; // Even more for ultra-long

    // --- Character Types ---
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(){}[\]=<>/\,.`~+\-?_`"'\\|;:]/.test(password);

    if (hasLower) score += 1;
    if (hasUpper) score += 1;
    if (hasNumber) score += 1;
    if (hasSymbol) score += 1;

    // --- Balance/Mix of character types ---
    let typeCount = 0;
    if (hasLower) typeCount++;
    if (hasUpper) typeCount++;
    if (hasNumber) typeCount++;
    if (hasSymbol) typeCount++;
    if (typeCount >= 3) score += 1;
    if (typeCount === 4) score += 2; // Increased bonus for all 4 types

    // --- Penalties for patterns ---
    if (/(.)\1{2,}/.test(password)) score -= 3; // Increased penalty for 3+ identical consecutive chars
    const sequentialRegex = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210|qwerty|asdfgh|zxcvbn)/i; // Added common keyboard sequences
    if (sequentialRegex.test(password)) score -= 3;
    if (/(password|123456|abcdef|secret|qwerty)/i.test(password)) score -= 5; // Penalty for common weak words

    // --- Entropy-based adjustment ---
    let effectiveCharsetSize = 0;
    if (hasLower) effectiveCharsetSize += lowerCaseChars.length;
    if (hasUpper) effectiveCharsetSize += upperCaseChars.length;
    if (hasNumber) effectiveCharsetSize += numberChars.length;
    if (hasSymbol) effectiveCharsetSize += symbolChars.length;

    if (effectiveCharsetSize > 0 && password.length > 0) {
        const entropy = password.length * Math.log2(effectiveCharsetSize);
        if (entropy > 60) score += 1;
        if (entropy > 80) score += 2; // Higher bonus
        if (entropy > 100) score += 2; // Even higher
    }

    // --- Map score to strength categories (adjusted thresholds) ---
    if (score < 5) {
        return 'weak';
    } else if (score < 10) {
        return 'medium';
    } else {
        return 'strong';
    }
}

// --- Event Listeners ---

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
    if (!password) {
        clipboardEl.classList.add('no-password-feedback');
        setTimeout(() => clipboardEl.classList.remove('no-password-feedback'), 700);
        return;
    }
    navigator.clipboard.writeText(password)
      .then(() => {
            const tooltip = clipboardEl.querySelector('.tooltip');
            if (tooltip) {
                tooltip.classList.add('show');
                setTimeout(() => tooltip.classList.remove('show'), 1500);
            }
        })
      .catch(err => {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers or permission issues
            alert('Failed to copy password. Please copy manually.');
        });
});

generateEl.addEventListener('click', async () => {
    const length = parseInt(lengthEl.value, 10);
    const minLength = parseInt(lengthEl.min, 10);
    const maxLength = parseInt(lengthEl.max, 10);

    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    const template = templateEl.value;
    const hashAlgorithm = hashAlgorithmEl.value;
    const excludeSimilar = excludeSimilarEl.checked;

    // --- Input Validation ---
    let validationMessages = [];
    if (isNaN(length) || length < minLength || length > maxLength) {
        validationMessages.push(`Password length must be between ${minLength} and ${maxLength} characters.`);
    }

    if (template === 'default' &&!hasLower &&!hasUpper &&!hasNumber &&!hasSymbol) {
        validationMessages.push('Please select at least one character type for default template.');
    }

    if (validationMessages.length > 0) {
        lengthErrorEl.innerText = validationMessages.join('\n'); // Display all error messages
        resultEl.innerText = '';
        updatePasswordStrengthDisplay('', template);
        return;
    } else {
        lengthErrorEl.innerText = ''; // Clear error message
    }

    // Temporarily disable generate button and show loading state
    generateEl.disabled = true;
    generateEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length, template, excludeSimilar);
    resultEl.innerText = password;
    resultEl.focus(); // Focus on the result for accessibility

    updatePasswordStrengthDisplay(password, template);

    if (password && template!== 'phrase') {
        const hashedPassword = await hashPassword(password, hashAlgorithm);
        storePassword(hashedPassword);
    } else if (password && template === 'phrase') {
        console.log("Passphrase generated. Not hashing for local storage due to potential length/usability concerns.");
    }

    // Restore generate button state
    generateEl.disabled = false;
    generateEl.innerHTML = 'Generate Password';
});

// Event listeners for character type checkboxes (only enable/disable if template is default)
document.querySelectorAll('#uppercase, #lowercase, #numbers, #symbols').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (templateEl.value === 'default') {
            generateEl.click();
        }
    });
});

// Event listener for exclude similar characters
excludeSimilarEl.addEventListener('change', () => {
    generateEl.click();
});

// Event listener for template change
templateEl.addEventListener('change', () => {
    const isDefaultTemplate = templateEl.value === 'default';
    // Enable/disable character type checkboxes based on template
    document.querySelectorAll('#uppercase, #lowercase, #numbers, #symbols, #exclude-similar').forEach(checkbox => {
        checkbox.disabled =!isDefaultTemplate;
        if (!isDefaultTemplate) checkbox.checked = false; // Uncheck if not default
    });
    // For PIN, only numbers is relevant, others off
    if (templateEl.value === 'pin') {
        numbersEl.checked = true;
        uppercaseEl.checked = lowercaseEl.checked = symbolsEl.checked = false;
    } else if (templateEl.value === 'phrase') {
        uppercaseEl.checked = lowercaseEl.checked = numbersEl.checked = symbolsEl.checked = true; // Phrase can use all (for entropy)
    }

    // Always regenerate on template change
    generateEl.click();
});

// Event listener for hash algorithm change
hashAlgorithmEl.addEventListener('change', () => {
    // No direct password regeneration, but important for displayStoredPasswords if it re-hashes
    // For now, just ensure display is updated
    displayStoredPasswords();
});

// Real-time password length feedback and re-generation
lengthEl.addEventListener('input', () => {
    const length = parseInt(lengthEl.value, 10);
    const minLength = parseInt(lengthEl.min, 10);
    const maxLength = parseInt(lengthEl.max, 10);

    let currentError = '';
    if (isNaN(length) || length < minLength || length > maxLength) {
        currentError = `Password length must be between ${minLength} and ${maxLength} characters`;
    }
    lengthErrorEl.innerText = currentError;

    // Only regenerate if length is valid and not a phrase template
    if (currentError === '' && resultEl.innerText && templateEl.value!== 'phrase') {
        generateEl.click();
    }
});

clearStorageEl.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all stored password hashes? This action cannot be undone.')) {
        localStorage.removeItem('storedPasswords');
        displayStoredPasswords();
    }
});

// Initial setup on page load
document.addEventListener('DOMContentLoaded', () => {
    displayStoredPasswords();
    // Simulate a click on generate to populate an initial password and strength
    generateEl.click();
    // Ensure checkboxes are correctly enabled/disabled based on initial template selection
    const isDefaultTemplate = templateEl.value === 'default';
    document.querySelectorAll('#uppercase, #lowercase, #numbers, #symbols, #exclude-similar').forEach(checkbox => {
        checkbox.disabled =!isDefaultTemplate;
    });
});