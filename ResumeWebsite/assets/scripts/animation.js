// Animations
const scrollElements = document.querySelectorAll(".scroll-animation");

scrollElements.forEach((element) => {
  element.style.opacity = 0;
});

window.addEventListener("scroll", () => {
  scrollElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    if (elementTop < viewportHeight) {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }
  });
});