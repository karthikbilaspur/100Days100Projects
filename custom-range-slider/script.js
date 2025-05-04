const rangeSlider = document.getElementById('range-slider');
const rangeSliderTrack = document.querySelector('.range-slider-track');

rangeSlider.addEventListener('input', (e) => {
  const value = +e.target.value;
  const min = +e.target.min;
  const max = +e.target.max;
  const trackWidth = rangeSliderTrack.offsetWidth;
  const thumbWidth = document.querySelector('.range-slider-thumb').offsetWidth;
  const thumbLeft = (value - min) / (max - min) * (trackWidth - thumbWidth);
  document.querySelector('.range-slider-thumb').style.left = `${thumbLeft}px`;

  document.querySelector('.range-slider-label').style.left = `${thumbLeft + thumbWidth / 2}px`;
  document.querySelector('.range-slider-label').innerHTML = value;

  // Update background color based on value
  if (value <= 25) {
    rangeSliderTrack.style.background = 'linear-gradient(to right, #fff, #fff)';
  } else if (value <= 50) {
    rangeSliderTrack.style.background = 'linear-gradient(to right, #fff, #ffff00)';
  } else if (value <= 75) {
    rangeSliderTrack.style.background = 'linear-gradient(to right, #ffff00, #ff7f00)';
  } else {
    rangeSliderTrack.style.background = 'linear-gradient(to right, #ff7f00, #ff0000)';
  }

  // Update aria-valuenow attribute for accessibility
  rangeSlider.ariaValueNow = value;
});
