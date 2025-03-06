// script.js

const questionContainer = document.getElementById('question-container');
const answerContainer = document.getElementById('answer-container');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function loadQuestions() {
    try {
        const easyResponse = await fetch('easy.json');
        const middleResponse = await fetch('middle.json');
        const hardResponse = await fetch('hard.json');

        const easyQuestions = await easyResponse.json();
        const middleQuestions = await middleResponse.json();
        const hardQuestions = await hardResponse.json();

        questions = [...easyQuestions, ...middleQuestions, ...hardQuestions];
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

async function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        displayResult();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    answerContainer.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.textContent = answer;
        answerBtn.dataset.index = index;
        answerContainer.appendChild(answerBtn);
    });
}

loadQuestions().then(() => {
    displayQuestion();
});

answerContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const answerIndex = parseInt(event.target.dataset.index);
        const currentQuestion = questions[currentQuestionIndex];

        if (answerIndex === currentQuestion.correctAnswer) {
            score++;
        }

        // Disable submit button
        submitBtn.disabled = true;

        // Display next button
        nextBtn.style.display = 'block';
    }
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion();

    // Hide next button
    nextBtn.style.display = 'none';

    // Enable submit button
    submitBtn.disabled = false;
});

function displayResult() {
    resultContainer.textContent = `Your final score is ${score} out of ${questions.length}`;
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';
}