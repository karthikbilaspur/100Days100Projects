// API endpoint for movie data
const apiEndpoint = 'https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY';

// Function to fetch movie data from API
async function fetchMovieData() {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

// Function to generate movie cards
function generateMovieCards(movies) {
    const movieGrid = document.querySelector('.movie-grid');
    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
            <p>Release Date: ${movie.release_date}</p>
        `;
        movieGrid.appendChild(movieCard);
    });
}

// Function to fetch TV show data from API
async function fetchTvShowData() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=YOUR_API_KEY');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching TV show data:', error);
    }
}

// Function to generate TV show cards
function generateTvShowCards(tvShows) {
    const tvShowGrid = document.querySelector('.tv-show-grid');
    tvShows.forEach((tvShow) => {
        const tvShowCard = document.createElement('div');
        tvShowCard.innerHTML = `
            <h2>${tvShow.name}</h2>
            <p>${tvShow.overview}</p>
            <p>First Air Date: ${tvShow.first_air_date}</p>
        `;
        tvShowGrid.appendChild(tvShowCard);
    });
}

// Function to handle search form submission
async function handleSearchFormSubmission(event) {
    event.preventDefault();
    const searchQuery = document.querySelector('input[type="search"]').value;
    const searchResults = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=YOUR_API_KEY&query=${searchQuery}`);
    const searchData = await searchResults.json();
    const searchResultsGrid = document.querySelector('.search-results');
    searchResultsGrid.innerHTML = '';
    searchData.results.forEach((result) => {
        const searchResultCard = document.createElement('div');
        searchResultCard.innerHTML = `
            <h2>${result.title || result.name}</h2>
            <p>${result.overview}</p>
            <p>Release Date: ${result.release_date || result.first_air_date}</p>
        `;
        searchResultsGrid.appendChild(searchResultCard);
    });
}

// Add event listener to search form
document.querySelector('form').addEventListener('submit', handleSearchFormSubmission);

// Fetch and generate movie cards
fetchMovieData().then((movies) => generateMovieCards(movies));

// Fetch and generate TV show cards
fetchTvShowData().then((tvShows) => generateTvShowCards(tvShows));