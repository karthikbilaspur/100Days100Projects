const display = document.getElementById('display');
const memory = { value: 0 };

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

function clearDisplay() {
  display.value = '';
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function appendChar(char) {
  display.value += char;
}

function calculateResult() {
  try {
    const expression = display.value;
    const result = evaluateExpression(expression);
    display.value = result.toString();
  } catch (error) {
    display.value = 'Error';
  }
}

function evaluateExpression(expression) {
  const tokens = tokenizeExpression(expression);
  const result = applyOperations(tokens);
  return result;
}

function tokenizeExpression(expression) {
  const tokens = [];
  let currentToken = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === ' ') {
      continue;
    }

    if (char === '+' || char === '-' || char === '*' || char === '/') {
      if (currentToken !== '') {
        tokens.push(parseFloat(currentToken));
        currentToken = '';
      }
      tokens.push(char);
    } else {
      currentToken += char;
    }
  }

  if (currentToken !== '') {
    tokens.push(parseFloat(currentToken));
  }

  return tokens;
}

function applyOperations(tokens) {
  let result = tokens[0];

  for (let i = 1; i < tokens.length; i += 2) {
    const operation = tokens[i];
    const operand = tokens[i + 1];

    result = operations[operation](result, operand);
  }

  return result;
}

function memoryRecall() {
  display.value = memory.value.toString();
}

function memoryStore() {
  memory.value = parseFloat(display.value);
}

function sin() {
  const value = parseFloat(display.value);
  display.value = Math.sin(value).toString();
}

function cos() {
  const value = parseFloat(display.value);
  display.value = Math.cos(value).toString();
}

function tan() {
  const value = parseFloat(display.value);
  display.value = Math.tan(value).toString();
}

function log() {
  const value = parseFloat(display.value);
  display.value = Math.log10(value).toString();
}

function ln() {
  const value = parseFloat(display.value);
  display.value = Math.log(value).toString();
}

function exp() {
  const value = parseFloat(display.value);
  display.value = Math.exp(value).toString();
}

function pow() {
  const value1 = parseFloat(display.value);
  const value2 = parseFloat(prompt('Enter the exponent:'));
  display.value = Math.pow(value1, value2).toString();
}

function sqrt() {
  const value = parseFloat(display.value);
  display.value = Math.sqrt(value).toString();
}
