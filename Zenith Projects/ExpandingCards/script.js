const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  const cardHeader = card.querySelector('.card-header');
  const cardContent = card.querySelector('.card-content');
  const readMore = card.querySelector('.read-more');
  const chevron = cardHeader.querySelector('i');

  cardHeader.addEventListener('click', () => {
    cardContent.classList.toggle('show');
    chevron.classList.toggle('fa-chevron-up');
  });

  readMore.addEventListener('click', () => {
    cardContent.classList.toggle('show');
    chevron.classList.toggle('fa-chevron-up');
  });
});