const quizData = [
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets",
        hint: "It's a style sheet language used for styling web pages."
    },
    {
        question: "Which CSS property is used to set the background color of an element?",
        options: ["background-color", "color", "background-image", "text-color"],
        answer: "background-color",
        hint: "It's used to set the background color of an element."
    },
    {
        question: "What is the purpose of the CSS box model?",
        options: ["To define the layout of a web page", "To style the appearance of an element", "To define the structure of an HTML document", "To determine the size and position of an element"],
        answer: "To determine the size and position of an element",
        hint: "It's used to determine the size and position of an element."
    },
    {
        question: "Which CSS selector is used to select all elements of a particular class?",
        options: [".class", "#id", "tagname", "*"],
        answer: ".class",
        hint: "It's used to select all elements of a particular class."
    },
    {
        question: "What is the difference between inline and block-level elements in CSS?",
        options: ["Inline elements take up the full width of their parent, while block-level elements do not", "Inline elements do not take up the full width of their parent, while block-level elements do", "Inline elements are used for layout, while block-level elements are used for styling", "Inline elements are used for styling, while block-level elements are used for layout"],
        answer: "Inline elements do not take up the full width of their parent, while block-level elements do",
        hint: "It's a key difference between inline and block-level elements."
    },
    {
        question: "How do you add a comment in CSS?",
        options: ["/* comment */", "// comment", "# comment", "<!-- comment -->"],
        answer: "/* comment */",
        hint: "It's used to add a comment in CSS."
    },
    {
        question: "What is the purpose of the CSS z-index property?",
        options: ["To set the background color of an element", "To set the position of an element", "To determine the stacking order of elements", "To set the font size of an element"],
        answer: "To determine the stacking order of elements",
        hint: "It's used to determine the stacking order of elements."
    },
    {
        question: "Which CSS property is used to set the font size of an element?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        answer: "font-size",
        hint: "It's used to set the font size of an element."
    },
    {
        question: "What is the purpose of the CSS float property?",
        options: ["To set the position of an element", "To determine the stacking order of elements", "To allow an element to float to the left or right of its parent", "To set the background color of an element"],
        answer: "To allow an element to float to the left or right of its parent",
        hint: "It's used to allow an element to float to the left or right of its parent."
    },
    {
        question: "Which CSS property is used to set the opacity of an element?",
        options: ["opacity", "transparency", "visibility", "alpha"],
        answer: "opacity",
        hint: "It's used to set the opacity of an element."
    }
];

let currentQuestion = 0;
let score = 0;
let timer = 60; // 1 minute
let interval;

function startQuiz() {
    interval = setInterval(updateTimer, 1000);
    renderQuestion();
}

function renderQuestion() {
    const questionElement = document.getElementById("question");
    questionElement.textContent = quizData[currentQuestion].question;
    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";
    quizData[currentQuestion].options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => {
            checkAnswer(option);
        });
        optionsElement.appendChild(li);
    });
    const hintElement = document.getElementById("hint-btn");
    hintElement.addEventListener("click", () => {
        showHint();
    });
}

function updateTimer() {
    timer--;
    document.getElementById("timer").textContent = `Time remaining: ${timer} seconds`;
    if (timer === 0) {
        endQuiz();
    }
}

function checkAnswer(userAnswer) {
    const correctAnswer = quizData[currentQuestion].answer;
    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("result").textContent = "Correct!";
    } else {
        document.getElementById("result").textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= quizData.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
}

function endQuiz() {
    clearInterval(interval);
    document.getElementById("final-score").textContent = `Your final score is ${score} out of ${quizData.length}.`;
    document.getElementById("play-again-btn").addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        timer = 60;
        startQuiz();
    });
    document.getElementById("view-leaderboard-btn").addEventListener("click", () => {
        // TO DO: implement leaderboard functionality
    });
}

function showHint() {
    const hintElement = document.getElementById("hint");
    hintElement.textContent = quizData[currentQuestion].hint;
    hintElement.style.display = "block";
}

document.getElementById("start-quiz-btn").addEventListener("click", () => {
    document.querySelector(".start-quiz-container").style.display = "none";
    document.querySelector(".quiz-container").style.display = "block";
    startQuiz();
});