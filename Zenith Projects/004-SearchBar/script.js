// Get the search input, select, and button elements
const searchInput = document.getElementById('search-input');
const cuisineSelect = document.getElementById('cuisine-select');
const locationSelect = document.getElementById('location-select');
const ratingRadios = document.getElementsByName('rating');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const searchResultsDiv = document.querySelector('.search-results');

// Add event listener to the search button
searchBtn.addEventListener('click', () => {
    // Get the search query, selected cuisine, location, and rating
    const searchQuery = searchInput.value.trim();
    const selectedCuisine = cuisineSelect.value;
    const selectedLocation = locationSelect.value;
    const selectedRating = Array.from(ratingRadios).find(radio => radio.checked).value;

    // Log the search query, selected cuisine, location, and rating
    console.log(`Search Query: ${searchQuery}`);
    console.log(`Selected Cuisine: ${selectedCuisine}`);
    console.log(`Selected Location: ${selectedLocation}`);
    console.log(`Selected Rating: ${selectedRating}`);

   // Add event listener to the search button
searchBtn.addEventListener('click', () => {
    // Get the search query, selected cuisine, location, and rating
    const searchQuery = searchInput.value.trim();
    const selectedCuisine = cuisineSelect.value;
    const selectedLocation = locationSelect.value;
    const selectedRating = Array.from(ratingRadios).find(radio => radio.checked).value;

    // Log the search query, selected cuisine, location, and rating
    console.log(`Search Query: ${searchQuery}`);
    console.log(`Selected Cuisine: ${selectedCuisine}`);
    console.log(`Selected Location: ${selectedLocation}`);
    console.log(`Selected Rating: ${selectedRating}`);

    // TO DO: Make API call to fetch search results
    fetchSearchResults(searchQuery, selectedCuisine, selectedLocation, selectedRating)
        .then(results => {
            // Display search results
            displaySearchResults(results);
        })
        .catch(error => {
            console.error(error);
        });
});

// Add event listener to the reset button
resetBtn.addEventListener('click', () => {
    // Reset the search input, select, and rating filter
    searchInput.value = '';
    cuisineSelect.value = '';
    locationSelect.value = '';
    ratingRadios.forEach(radio => radio.checked = false);
});

// Function to fetch search results
function fetchSearchResults(searchQuery, cuisine, location, rating) {
    // TO DO: Implement API call to fetch search results
    // For now, return a mock response
    return new Promise(resolve => {
        const mockResults = [
            { name: 'Restaurant 1', cuisine: 'Italian', location: 'Mumbai', rating: 4.5 },
            { name: 'Restaurant 2', cuisine: 'Chinese', location: 'Delhi', rating: 4.2 },
            { name: 'Restaurant 3', cuisine: 'Indian', location: 'Bangalore', rating: 4.8 },
        ];
        resolve(mockResults);
    });
}

// Function to display search results
function displaySearchResults(results) {
    const searchResultsHtml = results.map(result => {
        return `
            <div>
                <h2>${result.name}</h2>
                <p>Cuisine: ${result.cuisine}</p>
                <p>Location: ${result.location}</p>
                <p>Rating: ${result.rating}/5</p>
            </div>
        `;
    }).join('');
    searchResultsDiv.innerHTML = searchResultsHtml;
}