const counter = document.querySelector('.counter');
const nums = document.querySelectorAll('.num');
const finalMessage = document.querySelector('.final-message');
const replayButton = document.querySelector('#replay-button');
const pauseButton = document.querySelector('#pause-button');
const resumeButton = document.querySelector('#resume-button');
const timeRemainingElement = document.querySelector('#time-remaining');

let currentNum = 0;
let timerInterval = null;
let timeRemaining = 10;
let isPaused = false;

function animateCountdown() {
  nums[currentNum].classList.add('in');
  nums[currentNum].addEventListener('animationend', () => {
    nums[currentNum].classList.remove('in');
    nums[currentNum].classList.add('out');
    currentNum++;
    if (currentNum < nums.length) {
      animateCountdown();
    } else {
      counter.classList.add('hide');
      finalMessage.classList.add('show');
    }
  });
}

function updateTimer() {
  timeRemaining--;
  timeRemainingElement.textContent = timeRemaining;
  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    counter.classList.add('hide');
    finalMessage.classList.add('show');
  }
}

replayButton.addEventListener('click', () => {
  counter.classList.remove('hide');
  finalMessage.classList.remove('show');
  currentNum = 0;
  nums.forEach((num) => {
    num.classList.remove('in', 'out');
  });
  animateCountdown();
  timeRemaining = 10;
  timeRemainingElement.textContent = timeRemaining;
  timerInterval = setInterval(updateTimer, 1000);
  isPaused = false;
  pauseButton.style.display = 'inline-block';
  resumeButton.style.display = 'none';
});

pauseButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  isPaused = true;
  pauseButton.style.display = 'none';
  resumeButton.style.display = 'inline-block';
});

resumeButton.addEventListener('click', () => {
  timerInterval = setInterval(updateTimer, 1000);
  isPaused = false;
  pauseButton.style.display = 'inline-block';
  resumeButton.style.display = 'none';
});

animateCountdown();
timerInterval = setInterval(updateTimer, 1000);