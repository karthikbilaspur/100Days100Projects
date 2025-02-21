const searchToggle = document.querySelector('.search-toggle');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#search-input');
const searchSubmit = document.querySelector('.search-submit');
const searchResults = document.querySelector('.search-results');

searchToggle.addEventListener('click', () => {
  searchForm.classList.toggle('show');
});

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    fetch(`https://api.example.com/search?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        const resultsHtml = data.results.map(result => {
          return `<li><a href="${result.url}">${result.title}</a></li>`;
        }).join('');
        searchResults.innerHTML = `<ul>${resultsHtml}</ul>`;
        searchResults.style.display = 'block';
      })
      .catch(error => console.error(error));
  } else {
    searchResults.style.display = 'none';
  }
});

searchSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    window.location.href = `https://www.example.com/search?q=${searchTerm}`;
  }
});

document.addEventListener('click', (event) => {
  if (!searchForm.contains(event.target) && !searchToggle.contains(event.target)) {
    searchForm.classList.remove('show');
  }
});

// Add event listener to search results
searchResults.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const url = event.target.href;
    window.open(url, '_blank');
  }
});