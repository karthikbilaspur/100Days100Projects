const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const templateEl = document.getElementById('template');
const hashAlgorithmEl = document.getElementById('hash-algorithm');
const excludeSimilarEl = document.getElementById('exclude-similar');
const storedPasswordsEl = document.getElementById('stored-passwords');
const passwordStrengthMeterEl = document.getElementById('password-strength-meter');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
    if (!password) {
        return;
    }
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
});

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    const template = templateEl.value;
    const hashAlgorithm = hashAlgorithmEl.value;
    const excludeSimilar = excludeSimilarEl.checked;

    const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length, template, hashAlgorithm, excludeSimilar);
    resultEl.innerText = password;

    const strength = getPasswordStrength(password);
    passwordStrengthMeterEl.className = `password-strength-meter ${strength}`;
});

function generatePassword(lower, upper, number, symbol, length, template, hashAlgorithm, excludeSimilar) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    if (template === 'pin') {
        for (let i = 0; i < length; i++) {
            generatedPassword += getRandomNumber();
        }
    } else if (template === 'phrase') {
        const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
        for (let i = 0; i < length; i++) {
            generatedPassword += words[Math.floor(Math.random() * words.length)];
        }
    } else {
        for (let i = 0; i < length; i += typesCount) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName](excludeSimilar);
            });
        }
    }

    const hashedPassword = hashPassword(generatedPassword, hashAlgorithm);
    storePassword(hashedPassword);

    return generatedPassword;
}

function hashPassword(password, algorithm) {
    const crypto = window.crypto || window.msCrypto;
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    return crypto.subtle.digest(algorithm, data).then(hash => {
        const hashHex = Array.prototype.map.call(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    });
}

function storePassword(password) {
    const storedPasswords = JSON.parse(localStorage.getItem('storedPasswords')) || [];
    storedPasswords.push(password);
    localStorage.setItem('storedPasswords', JSON.stringify(storedPasswords));
    displayStoredPasswords();
}

function displayStoredPasswords() {
    const storedPasswords = JSON.parse(localStorage.getItem('storedPasswords')) || [];
    const storedPasswordsHtml = storedPasswords.map(password => `<li>${password}</li>`).join('');
    storedPasswordsEl.innerHTML = storedPasswordsHtml;
}

function getPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) {
        strength++;
    }

    if (/[A-Z]/.test(password)) {
        strength++;
    }

    if (/[a-z]/.test(password)) {
        strength++;
    }

    if (/[0-9]/.test(password)) {
        strength++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    }

    if (strength <= 2) {
        return 'weak';
    } else if (strength <= 4) {
        return 'medium';
    } else {
        return 'strong';
    }
}

function getRandomLower(excludeSimilar) {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    if (excludeSimilar) {
        lowerCaseLetters.replace('l', '').replace('i', '');
    }
    return lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
}

function getRandomUpper(excludeSimilar) {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (excludeSimilar) {
        upperCaseLetters.replace('I', '').replace('O', '');
    }
    return upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

displayStoredPasswords();