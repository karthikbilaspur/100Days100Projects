const cupsContainer = document.getElementById('cups');
const liters = document.getElementById('liters');
const percentageEl = document.getElementById('percentage');
const remained = document.getElementById('remained');
const goalValueEl = document.getElementById('goal-value');

const totalWaterEl = document.getElementById('total-water');
const averageEl = document.getElementById('average');

const goalInput = document.getElementById('goal-input');
const setGoalBtn = document.getElementById('set-goal-btn');
const resetBtn = document.getElementById('reset-btn');

let goal = Number(localStorage.getItem('goal')) || 2;
goalValueEl.innerText = goal;

let cupsState = JSON.parse(localStorage.getItem('cups')) || Array(8).fill(false);

// Render cups
function renderCups() {
  cupsContainer.innerHTML = '';
  cupsState.forEach((filled, i) => {
    const cup = document.createElement('div');
    cup.className = 'cup-small' + (filled ? ' full' : '');
    cup.innerText = '250ml';

    cup.addEventListener('click', () => toggleCup(i));
    cupsContainer.appendChild(cup);
  });
}

// Toggle cups (better UX)
function toggleCup(index) {
  if (cupsState[index] && !cupsState[index + 1]) {
    cupsState[index] = false;
  } else {
    for (let i = 0; i <= index; i++) cupsState[i] = true;
    for (let i = index + 1; i < cupsState.length; i++) cupsState[i] = false;
  }

  save();
  updateUI();
}

// Update UI
function updateUI() {
  renderCups();

  const full = cupsState.filter(c => c).length;
  const percent = (full / cupsState.length) * 100;

  percentageEl.style.height = percent + '%';
  percentageEl.innerText = percent ? Math.round(percent) + '%' : '';

  if (full === 0) {
    remained.style.visibility = 'visible';
  }

  if (full === cupsState.length) {
    remained.style.visibility = 'hidden';
  } else {
    const remaining = goal - (full * 0.25);
    liters.innerText = remaining.toFixed(2) + 'L';
  }

  updateStats();
}

// Update statistics
function updateStats() {
  const totalLiters = cupsState.filter(c => c).length * 0.25;
  totalWaterEl.innerText = totalLiters.toFixed(2);

  const days = getDays();
  averageEl.innerText = (totalLiters / days).toFixed(2);
}

// Get days since start
function getDays() {
  let start = localStorage.getItem('start');
  if (!start) {
    localStorage.setItem('start', new Date().toISOString());
    return 1;
  }
  const diff = Date.now() - new Date(start).getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
}

// Save data
function save() {
  localStorage.setItem('cups', JSON.stringify(cupsState));
  localStorage.setItem('goal', goal);
}

// Set goal
setGoalBtn.addEventListener('click', () => {
  const val = parseFloat(goalInput.value);
  if (!val || val <= 0) return;

  goal = val;
  goalValueEl.innerText = goal;
  save();
  updateUI();
});

// Reset
resetBtn.addEventListener('click', () => {
  cupsState = Array(8).fill(false);
  save();
  updateUI();
});

// Initial load
updateUI();