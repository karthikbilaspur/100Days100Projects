const nav = document.querySelector('.rotating-nav');
const navItems = document.querySelectorAll('.rotating-nav li');
const angle = 360 / navItems.length;

navItems.forEach((item, index) => {
  item.style.transform = `rotateY(${angle * index}deg)`;
});

nav.addEventListener('mousemove', (event) => {
  const x = event.clientX - nav.offsetLeft - nav.offsetWidth / 2;
  const y = event.clientY - nav.offsetTop - nav.offsetHeight / 2;
  const angle = Math.atan2(y, x) * 180 / Math.PI;
  nav.querySelector('ul').style.transform = `rotateY(${angle}deg)`;
});

nav.addEventListener('mouseleave', () => {
  nav.querySelector('ul').style.transform = `rotateY(0deg)`;
});