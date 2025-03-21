$(document).ready(function() {
    // Search form submission
    $('#search-form').submit(function(event) {
        event.preventDefault();
        var searchQuery = $('#search-input').val();
        var cuisine = $('#cuisine-select').val();
        var location = $('#location-select').val();
        var rating = $('input[name="rating"]:checked').val();

        // API request
        $.ajax({
            type: 'GET',
            url: 'https://example.com/api/restaurants', // Replace with your API endpoint
            data: {
                search: searchQuery,
                cuisine: cuisine,
                location: location,
                rating: rating
            },
            dataType: 'json',
            success: function(data) {
                // Display search results
                displaySearchResults(data);
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    });

    // Display search results
    function displaySearchResults(data) {
        var searchResultsHtml = '';
        $.each(data, function(index, restaurant) {
            searchResultsHtml += `
                <div class="card">
                    <img src="${restaurant.image}" alt="${restaurant.name}">
                    <div class="card-body">
                        <h5 class="card-title">${restaurant.name}</h5>
                        <p class="card-text">${restaurant.description}</p>
                        <p class="card-text">Rating: ${restaurant.rating}/5</p>
                        <button class="btn btn-primary" onclick="viewRestaurantDetails(${restaurant.id})">View Details</button>
                    </div>
                </div>
            `;
        });
        $('#search-results').html(searchResultsHtml);
    }

    // View restaurant details
    function viewRestaurantDetails(id) {
        // API request
        $.ajax({
            type: 'GET',
            url: `https://example.com/api/restaurants/${id}`, // Replace with your API endpoint
            dataType: 'json',
            success: function(data) {
                // Display restaurant details
                displayRestaurantDetails(data);
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    // Display restaurant details
    function displayRestaurantDetails(data) {
        var restaurantDetailsHtml = `
            <div class="modal fade" id="restaurantDetailsModal" tabindex="-1" role="dialog" aria-labelledby="restaurantDetailsModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="restaurantDetailsModalLabel">${data.name}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>${data.description}</p>
                            <p>Rating: ${data.rating}/5</p>
                            <p>Address: ${data.address}</p>
                            <p>Phone Number: ${data.phoneNumber}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('#search-results').after(restaurantDetailsHtml);
        $('#restaurantDetailsModal').modal('show');
    }
});