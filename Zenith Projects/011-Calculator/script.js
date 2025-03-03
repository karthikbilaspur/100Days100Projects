const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const historyList = document.getElementById('history-list');

let currentNumber = '';
let previousNumber = '';
let operation = '';
let memory = '';
let history = [];

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Handle number buttons
        if (!isNaN(value)) {
            currentNumber += value;
            display.value = currentNumber;
        }

        // Handle operator buttons
        else if (['+', '-', '*', '/'].includes(value)) {
            previousNumber = currentNumber;
            operation = value;
            currentNumber = '';
        }

        // Handle equals button
else if (value === '=') {
    const result = calculateResult();
    display.value = result;
    history.push(`${previousNumber} ${operation} ${currentNumber} = ${result}`);
    historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
    currentNumber = result.toString();
    previousNumber = '';
    operation = '';
}

// Handle clear button
else if (value === 'C') {
    currentNumber = '';
    previousNumber = '';
    operation = '';
    memory = '';
    history = [];
    display.value = '';
    historyList.innerHTML = '';
}

// Handle backspace button
else if (value === 'DEL') {
    currentNumber = currentNumber.slice(0, -1);
    display.value = currentNumber;
}

// Handle percent button
else if (value === '%') {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    display.value = currentNumber;
}

// Handle sin, cos, tan buttons
else if (['sin', 'cos', 'tan'].includes(value)) {
    const result = calculateTrigonometricResult(value, currentNumber);
    display.value = result;
    history.push(`${value}(${currentNumber}) = ${result}`);
    historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
    currentNumber = result.toString();
}

// Handle log, sqrt buttons
else if (['log', 'sqrt'].includes(value)) {
    const result = calculateLogSqrtResult(value, currentNumber);
    display.value = result;
    history.push(`${value}(${currentNumber}) = ${result}`);
    historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
    currentNumber = result.toString();
}

// Handle exp, ln buttons
else if (['exp', 'ln'].includes(value)) {
    const result = calculateExpLnResult(value, currentNumber);
    display.value = result;
    history.push(`${value}(${currentNumber}) = ${result}`);
    historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
    currentNumber = result.toString();
}

// Handle memory store button
else if (value === 'MS') {
    memory = currentNumber;
    display.value = 'Memory stored';
}

// Handle memory recall button
else if (value === 'MR') {
    currentNumber = memory;
    display.value = currentNumber;
}

// Handle history button
else if (value === 'HIST') {
    historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}
    });
});

// Calculate result of basic arithmetic operations
function calculateResult() {
    let result;
    switch (operation) {
        case '+':
            result = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        case '/':
            result = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        default:
            result = 0;
    }
    return result.toString();
}

// Calculate result of trigonometric operations
function calculateTrigonometricResult(operation, number) {
    let result;
    switch (operation) {
        case 'sin':
            result = Math.sin(parseFloat(number));
            break;
        case 'cos':
            result = Math.cos(parseFloat(number));
            break;
        case 'tan':
            result = Math.tan(parseFloat(number));
            break;
        default:
            result = 0;
    }
    return result.toString();
}

// Calculate result of log and sqrt operations
function calculateLogSqrtResult(operation, number) {
    let result;
    switch (operation) {
        case 'log':
            result = Math.log(parseFloat(number));
            break;
        case 'sqrt':
            result = Math.sqrt(parseFloat(number));
            break;
        default:
            result = 0;
    }
    return result.toString();
}

// Calculate result of exp and ln operations
function calculateExpLnResult(operation, number) {
    let result;
    switch (operation) {
        case 'exp':
            result = Math.exp(parseFloat(number));
            break;
        case 'ln':
            result = Math.log(parseFloat(number));
            break;
        default:
            result = 0;
    }
    return result.toString();
}

// Calculate result of exp and ln operations
function calculateExpLnResult(operation, number) {
    let result;
    switch (operation) {
        case 'exp':
            result = Math.exp(parseFloat(number));
            break;
        case 'ln':
            result = Math.log(parseFloat(number));
            break;
        default:
            result = 0;
    }
    return result.toString();
}

// Add event listener to history list
historyList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const historyItem = e.target.textContent;
        const [num1, operator, num2, equals, result] = historyItem.split(' ');
        currentNumber = result;
        display.value = currentNumber;
    }
});

// Add keyboard event listener
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            currentNumber += e.key;
            display.value = currentNumber;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            previousNumber = currentNumber;
            operation = e.key;
            currentNumber = '';
            break;
        case '=':
            const result = calculateResult();
            display.value = result;
            history.push(`${previousNumber} ${operation} ${currentNumber} = ${result}`);
            historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
            currentNumber = result.toString();
            previousNumber = '';
            operation = '';
            break;
        case 'Enter':
            const enterResult = calculateResult();
            display.value = enterResult;
            history.push(`${previousNumber} ${operation} ${currentNumber} = ${enterResult}`);
            historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
            currentNumber = enterResult.toString();
            previousNumber = '';
            operation = '';
            break;
        case 'Backspace':
            currentNumber = currentNumber.slice(0, -1);
            display.value = currentNumber;
            break;
        case 'Escape':
            currentNumber = '';
            previousNumber = '';
            operation = '';
            memory = '';
            history = [];
            display.value = '';
            historyList.innerHTML = '';
            break;
        default:
            break;
    }
});