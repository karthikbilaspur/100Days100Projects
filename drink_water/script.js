const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const goalInput = document.getElementById('goal-input');
const setGoalBtn = document.getElementById('set-goal-btn');
const resetBtn = document.getElementById('reset-btn');
const cups = document.getElementById('cups');
const text = document.getElementById('text');

let goal = 2; // default goal

// Function to update the big cup
function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = smallCups.length;
    const percentage = (fullCups / totalCups) * 100;

    if (percentage === 0) {
        remained.style.visibility = 'visible';
        remained.style.height = 'auto';
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        remained.style.visibility = 'visible';
        remained.style.height = 'auto';
        percentage.style.visibility = 'visible';
        percentage.style.height = `${percentage * 3.3}px`;
        percentage.innerText = `${percentage}%`;
    }

    if (fullCups === totalCups) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        liters.innerText = `${goal - (250 * fullCups / 1000)}L`;
    }
}

// Function to highlight the cups
function highlightCups(idx) {
    smallCups.forEach((cup, index) => {
        if (index <= idx) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    });
}

// Add event listeners to the small cups
smallCups.forEach((cup, index) => {
    cup.addEventListener('click', () => {
        highlightCups(index);
        updateBigCup();
    });
});

// Add event listener to the set goal button
setGoalBtn.addEventListener('click', () => {
    goal = parseFloat(goalInput.value);
    document.getElementById('goal-value').innerText = goal;
    updateBigCup();
});

// Add event listener to the reset button
resetBtn.addEventListener('click', () => {
    smallCups.forEach(cup => cup.classList.remove('full'));
    updateBigCup();
});

// Generate the small cups dynamically
for (let i = 0; i < 8; i++) {
    const cup = document.createElement('div');
    cup.classList.add('cup-small');
    cup.innerText = '250ml';
    cups.appendChild(cup);
}

// Update the big cup initially
updateBigCup();

// Function to update statistics
function updateStatistics() {
    const totalWater = document.getElementById('total-water');
    const averageDaily = document.getElementById('average-daily');
    const longestStreak = document.getElementById('longest-streak');

    // Calculate statistics
    const totalWaterConsumed = calculateTotalWaterConsumed();
    const averageDailyConsumption = calculateAverageDailyConsumption();
    const longestStreakDays = calculateLongestStreakDays();

    // Update statistics display
    totalWater.innerText = `${totalWaterConsumed} liters`;
    averageDaily.innerText = `${averageDailyConsumption} liters`;
    longestStreak.innerText = `${longestStreakDays} days`;
}

// Function to calculate total water consumed
function calculateTotalWaterConsumed() {
    // Calculate total water consumed
    const totalWaterConsumed = Array.from(smallCups).filter(cup => cup.classList.contains('full')).length * 250;
    return totalWaterConsumed;
}

// Function to calculate average daily consumption
function calculateAverageDailyConsumption() {
    // Calculate average daily consumption
    const averageDailyConsumption = calculateTotalWaterConsumed() / getDaysSinceStart();
    return averageDailyConsumption;
}

// Function to calculate longest streak days
function calculateLongestStreakDays() {
    // Calculate longest streak days
    const longestStreakDays = getLongestStreakDays();
    return longestStreakDays;
}

// Function to get days since start
function getDaysSinceStart() {
    // Get days since start
    const startDate = localStorage.getItem('startDate');
    if (!startDate) {
        localStorage.setItem('startDate', new Date().toISOString());
        return 1;
    } else {
        const daysSinceStart = Math.round((new Date().getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24));
        return daysSinceStart;
    }
}

// Function to get longest streak days
function getLongestStreakDays() {
    // Get longest streak days
    const longestStreakDays = localStorage.getItem('longestStreakDays');
    if (!longestStreakDays) {
        return 1;
    } else {
        return parseInt(longestStreakDays);
    }
}

// Function to update longest streak days
function updateLongestStreakDays() {
    // Update longest streak days
    const currentStreakDays = getDaysSinceLastMissedDay();
    const longestStreakDays = getLongestStreakDays();
    if (currentStreakDays > longestStreakDays) {
        localStorage.setItem('longestStreakDays', currentStreakDays);
    }
}

// Function to get days since last missed day
function getDaysSinceLastMissedDay() {
    // Get days since last missed day
    const lastMissedDay = localStorage.getItem('lastMissedDay');
    if (!lastMissedDay) {
        return getDaysSinceStart();
    } else {
        const daysSinceLastMissedDay = Math.round((new Date().getTime() - new Date(lastMissedDay).getTime()) / (1000 * 3600 * 24));
        return daysSinceLastMissedDay;
    }
}

// Function to update last missed day
function updateLastMissedDay() {
    // Update last missed day
    const today = new Date().toISOString();
    const lastMissedDay = localStorage.getItem('lastMissedDay');
    if (!lastMissedDay || today !== lastMissedDay) {
        localStorage.setItem('lastMissedDay', today);
    }
}

// Update statistics
updateStatistics();

// Update longest streak days
updateLongestStreakDays();

// Add event listener to reset button
resetBtn.addEventListener('click', () => {
    // Reset progress
    smallCups.forEach(cup => cup.classList.remove('full'));
    updateBigCup();
    updateStatistics();
    updateLongestStreakDays();
});