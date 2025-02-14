// Define steps dynamically
const stepsData = [
    { number: 1, name: 'Define Goals' },
    { number: 2, name: 'Plan and Prioritize' },
    { number: 3, name: 'Take Action' },
    { number: 4, name: 'Track Progress' },
    { number: 5, name: 'Adjust and Adapt' },
    { number: 6, name: 'Evaluate and Celebrate' },
];

// Initialize progress tracker
const progressTracker = document.querySelector('.progress-tracker');
const progressBarFill = document.querySelector('.progress-bar-fill');
let currentStep = 0;

// Function to render steps
function renderSteps() {
    stepsData.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.classList.add('step');
        stepElement.innerHTML = `
            <span class="step-number">${step.number}</span>
            <span class="step-name">${step.name}</span>
        `;
        if (index === currentStep) {
            stepElement.classList.add('active');
        }
        progressTracker.appendChild(stepElement);
    });
}

// Function to update progress bar
function updateProgressBar() {
    const progressPercentage = ((currentStep + 1) / stepsData.length) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
}

// Function to handle next button click
function handleNextButtonClick() {
    if (currentStep < stepsData.length - 1) {
        const currentStepElement = progressTracker.children[currentStep];
        currentStepElement.classList.remove('active');
        currentStep++;
        const newStepElement = progressTracker.children[currentStep];
        newStepElement.classList.add('active');
        updateProgressBar();
    }
}

// Function to handle previous button click
function handlePreviousButtonClick() {
    if (currentStep > 0) {
        const currentStepElement = progressTracker.children[currentStep];
        currentStepElement.classList.remove('active');
        currentStep--;
        const newStepElement = progressTracker.children[currentStep];
        newStepElement.classList.add('active');
        updateProgressBar();
    }
}

// Function to add new step dynamically
function addNewStep(stepData) {
    const newStepElement = document.createElement('div');
    newStepElement.classList.add('step');
    newStepElement.innerHTML = `
        <span class="step-number">${stepData.number}</span>
        <span class="step-name">${stepData.name}</span>
    `;
    progressTracker.appendChild(newStepElement);
    stepsData.push(stepData);
    updateProgressBar();
}

// Function to remove existing step dynamically
function removeExistingStep(stepNumber) {
    const stepElement = progressTracker.querySelector(`.step:nth-child(${stepNumber})`);
    if (stepElement) {
        stepElement.remove();
        stepsData.splice(stepNumber - 1, 1);
        updateProgressBar();
    }
}

// Function to switch theme
function switchTheme(themeName) {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    themeStylesheet.href = `themes/${themeName}.css`;
}

// Function to translate text
function translateText(languageCode) {
    const stepElements = progressTracker.children;
    stepElements.forEach((stepElement, index) => {
        const stepNameElement = stepElement.querySelector('.step-name');
        const stepName = stepsData[index].name;
        const translatedStepName = translate(stepName, languageCode);
        stepNameElement.textContent = translatedStepName;
    });
}

//