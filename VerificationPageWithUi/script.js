// script.js

const verificationForm = document.getElementById('verification-form');
const verificationCodeInput = document.getElementById('verification-code');
const verifyBtn = document.getElementById('verify-btn');
const errorMessage = document.getElementById('error-message');

let verificationCode = Math.floor(100000 + Math.random() * 900000);

verificationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userVerificationCode = verificationCodeInput.value.trim();
    if (userVerificationCode === verificationCode.toString()) {
        // Account verified, redirect to next page
        window.location.href = 'next-page.html';
    } else {
        // Display error message
        errorMessage.textContent = 'Invalid verification code';
    }
});

// Generate and display verification code
const verificationCodeDisplay = document.createElement('p');
verificationCodeDisplay.textContent = `Verification Code: ${verificationCode}`;
verificationCodeDisplay.style.fontWeight = 'bold';
verificationCodeDisplay.style.color = '#666';
verificationCodeDisplay.style.marginTop = '20px';
document.body.appendChild(verificationCodeDisplay);

// Add event listener to verify button
verifyBtn.addEventListener('click', () => {
  const userVerificationCode = verificationCodeInput.value.trim();
  if (userVerificationCode === verificationCode.toString()) {
    // Account verified, redirect to next page
    window.location.href = 'next-page.html';
  } else {
    // Display error message
    errorMessage.textContent = 'Invalid verification code';
  }
});