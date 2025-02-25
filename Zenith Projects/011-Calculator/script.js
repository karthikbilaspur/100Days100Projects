const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const historyList = document.getElementById('history-list');

let currentNumber = '';
let previousNumber = '';
let operation = '';
let memory = '';
let history = [];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            currentNumber = '';
            previousNumber = '';
            operation = '';
            memory = '';
            history = [];
            display.value = '';
            historyList.innerHTML = '';
        } else if (value === 'DEL') {
            currentNumber = currentNumber.slice(0, -1);
            display.value = currentNumber;
        } else if (value === '=') {
            const result = eval(`${previousNumber} ${operation} ${currentNumber}`);
            display.value = result;
            history.push(`${previousNumber} ${operation} ${currentNumber} = ${result}`);
            historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
            currentNumber = result.toString();
            previousNumber = '';
            operation = '';
        } else if (['+', '-', '*', '/'].includes(value)) {
            previousNumber = currentNumber;
            operation = value;
            currentNumber = '';
        } else if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(value)) {
            const result = eval(`${value}(${currentNumber})`);
            display.value = result;
            history.push(`${value}(${currentNumber}) = ${result}`);
            historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
            currentNumber = result.toString();
        } else if (value === 'exp') {
            const result = Math.exp(currentNumber);
            display.value = result;
            history.push(`exp(${currentNumber}) = ${result}`);
            historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
            currentNumber = result.toString();
        } else if (value === 'ln') {
            const result = Math.log(currentNumber);
            display.value = result;
            history.push(`ln(${currentNumber}) = ${result}`);
            historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
            currentNumber = result.toString();
        } else if (value === 'MS') {
            memory = currentNumber;
            display.value = 'Memory stored';
        } else if (value === 'MR') {
            currentNumber = memory;
            display.value = currentNumber;
        } else {
            currentNumber += value;
            display.value = currentNumber;
        }
    });
});