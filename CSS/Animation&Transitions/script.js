// script.js

const animateButton = document.getElementById('animate-button');
const animationBox = document.querySelector('.animation-box');
const durationInput = document.getElementById('duration');
const durationValue = document.getElementById('duration-value');
const delayInput = document.getElementById('delay');
const delayValue = document.getElementById('delay-value');

animateButton.addEventListener('click', () => {
  animationBox.classList.toggle('animate');
});

durationInput.addEventListener('input', () => {
  const duration = durationInput.value + 's';
  animationBox.style.transitionDuration = duration;
  durationValue.textContent = duration;
});

delayInput.addEventListener('input', () => {
  const delay = delayInput.value + 's';
  animationBox.style.transitionDelay = delay;
  delayValue.textContent = delay;
});