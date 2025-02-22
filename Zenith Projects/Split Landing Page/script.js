// Add event listener to start button
document.querySelector('.start-button').addEventListener('click', () => {
    document.querySelector('.intro').style.display = 'none';
    document.querySelector('.scene-1').style.display = 'block';
  });
  
  // Add event listener to window scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const scene1 = document.querySelector('.scene-1');
    const scene2 = document.querySelector('.scene-2');
  
    if (scrollPosition > scene1.offsetTop - window.innerHeight / 2) {
      scene1.classList.add('animate');
    }
  
    if (scrollPosition > scene2.offsetTop - window.innerHeight / 2) {
      scene2.classList.add('animate');
    }
  });