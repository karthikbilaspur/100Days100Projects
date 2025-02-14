const textEl = document.getElementById('text');
const speedEl = document.getElementById('speed');
const resetBtn = document.getElementById('reset-btn');
const text = 'We Love Programming!';
let idx = 1;
let speed = 300 / speedEl.value;

function writeText() {
    textEl.innerText = text.slice(0, idx);

    idx++;

    if (idx > text.length) {
        idx = 1;
    }

    setTimeout(writeText, speed);
}

speedEl.addEventListener('input', (e) => {
    const speedValue = parseInt(e.target.value);
    if (!isNaN(speedValue) && speedValue >= 1 && speedValue <= 10) {
        speed = 300 / speedValue;
    } else {
        e.target.value = 1;
        speed = 300;
    }
});

resetBtn.addEventListener('click', () => {
    speedEl.value = 1;
    speed = 300;
});

writeText();