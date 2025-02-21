const loadingContainer = document.querySelector('.loading-container');
const loadingBlur = document.querySelector('.loading-blur');

setTimeout(() => {
  loadingBlur.style.filter = 'blur(0px)';
}, 2000);

setTimeout(() => {
  loadingContainer.style.display = 'none';
}, 3000);

// Add event listener to loading container
loadingContainer.addEventListener('click', () => {
  console.log('Loading container clicked!');
});

// Add animation to loading dots
const loadingDots = document.querySelectorAll('.loading-dot');
loadingDots.forEach((dot, index) => {
  dot.style.animationDelay = `${index * 0.2}s`;
});