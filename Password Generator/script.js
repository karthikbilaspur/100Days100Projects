const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const excludeSimilarEl = document.getElementById('exclude-similar');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const passwordStrengthTextEl = document.getElementById('password-strength-text');
const passwordStrengthMeterEl = document.getElementById('password-strength-meter');
const lengthErrorEl = document.getElementById('length-error');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
    if (!password) {
        return;
    }
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    if (length < 8 || length > 128) {
        lengthErrorEl.innerText = 'Password length must be between 8 and 128 characters';
        return;
    } else {
        lengthErrorEl.innerText = '';
    }

    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    const excludeSimilar = excludeSimilarEl.checked;

    const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length, excludeSimilar);
    resultEl.innerText = password;

    const strength = getPasswordStrength(password);
    passwordStrengthTextEl.innerText = `Password Strength: ${strength}`;
    passwordStrengthMeterEl.className = `password-strength-meter ${strength}`;
})

function generatePassword(lower, upper, number, symbol, length, excludeSimilar) {
    let password = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            password += randomFunc[funcName](excludeSimilar);
        });
    }

    return password.slice(0, length);
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