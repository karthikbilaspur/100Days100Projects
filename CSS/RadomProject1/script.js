const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = document.querySelector('input[type="search"]').value;
  console.log(`Searching for: ${searchTerm}`);
});

// Add event listener to window resize event
window.addEventListener('resize', () => {
  // Check if window width is less than 480px
  if (window.innerWidth < 480) {
    // Remove sidebar image
    const sidebarImage = document.querySelector('.sidebar-image');
    sidebarImage.remove();
  } else {
    // Add sidebar image
    const sidebar = document.querySelector('.sidebar');
    const image = document.createElement('img');
    image.src = 'image.jpg';
    image.alt = 'Image';
    image.className = 'sidebar-image';
    sidebar.appendChild(image);
  }
});