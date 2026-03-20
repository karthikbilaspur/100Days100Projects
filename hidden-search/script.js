document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");
  const clearButton = document.querySelector(".clear-button");
  const productList = document.getElementById("product-list");
  const productItems = productList.querySelectorAll(".product-item");
  const noResultsMessage = document.getElementById("no-results");

  let searchTimeout; // For debouncing

  // Function to reset product text to original (removes highlighting)
  function resetProductText() {
    productItems.forEach(item => {
      item.querySelectorAll('[data-original-text]').forEach(element => {
        // Ensure element.dataset.originalText exists before setting
        if (element.dataset.originalText !== undefined) {
          element.innerHTML = element.dataset.originalText;
        }
      });
    });
  }

  function toggleSearchBar(forceHide = false) {
    const isActive = searchInput.classList.contains("active");

    if (forceHide && !isActive) {
      return; // If already hidden and forced to hide, do nothing.
    }

    // If we're forcing hide or toggling to hide
    if (forceHide || isActive) {
      searchInput.classList.remove("active");
      clearButton.classList.add("hidden"); // Ensure clear button is hidden
      searchInput.value = ""; // Clear input when hiding
      filterProducts(""); // Clear filters when search bar is closed
      resetProductText(); // Remove any highlighting
      // Remove animation class from search button when search input is hidden
      searchButton.classList.remove('search-active');
      searchButton.focus(); // Return focus to search button for accessibility
    } else { // Toggling to show
      searchInput.classList.add("active");
      if (searchInput.value.length === 0) {
        clearButton.classList.add("hidden");
      } else {
        clearButton.classList.remove("hidden");
      }
      searchInput.focus();
      // Add animation class to search button when search input is visible
      searchButton.classList.add('search-active');
    }
  }

  function highlightText(text, searchTerm) {
    if (!searchTerm) {
      return text;
    }
    // Escape special characters in the search term to prevent issues with RegExp
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi'); // 'gi' for global, case-insensitive
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  function filterProducts(searchTerm) {
    clearTimeout(searchTimeout); // Clear previous timeout

    // Debounce the filter function
    searchTimeout = setTimeout(() => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      let foundProducts = 0;

      resetProductText(); // Reset text before applying new highlights

      productItems.forEach(item => {
        const titleElement = item.querySelector('h3');
        const descriptionElement = item.querySelector('p');

        // Retrieve original text from data attributes
        const originalTitle = titleElement ? titleElement.dataset.originalText || '' : '';
        const originalDescription = descriptionElement ? descriptionElement.dataset.originalText || '' : '';

        const matchesTitle = originalTitle.toLowerCase().includes(lowerCaseSearchTerm);
        const matchesDescription = originalDescription.toLowerCase().includes(lowerCaseSearchTerm);

        if (lowerCaseSearchTerm === "" || matchesTitle || matchesDescription) {
          item.style.display = ""; // Show product
          foundProducts++;

          // Apply highlighting if there's a search term
          if (lowerCaseSearchTerm !== "") {
            if (titleElement) {
              titleElement.innerHTML = highlightText(originalTitle, lowerCaseSearchTerm);
            }
            if (descriptionElement) {
              descriptionElement.innerHTML = highlightText(originalDescription, lowerCaseSearchTerm);
            }
          }
        } else {
          item.style.display = "none"; // Hide product
        }
      });

      if (foundProducts === 0) {
        noResultsMessage.style.display = "block";
      } else {
        noResultsMessage.style.display = "none";
      }
    }, 300); // 300ms debounce time
  }

  // Toggle search bar on search button click
  searchButton.addEventListener("click", function() {
    toggleSearchBar();
  });

  // Clear search input on clear button click
  clearButton.addEventListener("click", function() {
    searchInput.value = "";
    filterProducts(""); // Clear filters
    clearButton.classList.add("hidden"); // Hide clear button after clearing
    searchInput.focus(); // Keep focus on search input
  });

  // Live filtering (debounced) as user types
  searchInput.addEventListener("input", function() {
    filterProducts(searchInput.value);
    // Show/hide clear button based on input value
    if (searchInput.value.length > 0) {
      clearButton.classList.remove("hidden");
    } else {
      clearButton.classList.add("hidden");
    }
  });

  // Hide search bar if clicked outside
  document.addEventListener("click", function(event) {
    const isClickInsideContainer = event.target.closest(".search-container");
    const isSearchButton = event.target === searchButton;

    if (!isClickInsideContainer && searchInput.classList.contains("active") && !isSearchButton) {
      toggleSearchBar(true); // Force hide
    }
  });

  // Keyboard Accessibility (Escape key)
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && searchInput.classList.contains("active")) {
      toggleSearchBar(true); // Force hide
    }
  });
});