let display = document.getElementById('display');
let memory = 0;

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
    let result = eval(display.value);
    display.value = result.toString();
  } catch (error) {
    display.value = 'Error';
  }
}

function memoryRecall() {
  display.value = memory.toString();
}

function memoryStore() {
  memory = parseFloat(display.value);
}

function sin() {
  let value = parseFloat(display.value);
  display.value = Math.sin(value).toString();
}

function cos() {
  let value = parseFloat(display.value);
  display.value = Math.cos(value).toString();
}

function tan() {
    let value = parseFloat(display.value);
    display.value = Math.tan(value).toString();
  }
  
  function log() {
    let value = parseFloat(display.value);
    display.value = Math.log10(value).toString();
  }
  
  function ln() {
    let value = parseFloat(display.value);
    display.value = Math.log(value).toString();
  }
  
  function exp() {
    let value = parseFloat(display.value);
    display.value = Math.exp(value).toString();
  }
  
  function pow() {
    let value1 = parseFloat(display.value);
    let value2 = parseFloat(prompt("Enter the exponent:"));
    display.value = Math.pow(value1, value2).toString();
  }
  
  function sqrt() {
    let value = parseFloat(display.value);
    display.value = Math.sqrt(value).toString();
  }