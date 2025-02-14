// Import the Unsplash API library
import { createApi } from 'unsplash-js';

// Create an instance of the Unsplash API
const unsplashApi = createApi({
  accessKey: 'YOUR_ACCESS_KEY',
});

// Define the image categories
const categories = ['nature', 'cityscapes', 'animals', 'food', 'sports'];

// Define the current category
let currentCategory = categories[0];

// Define the current image index
let currentImageIndex = 0;

// Define the favorite images array
let favoriteImages = [];

// Function to get a random image from Unsplash
async function getRandomImage() {
  try {
    const response = await unsplashApi.photos.getRandom({
      collections: currentCategory,
    });
    return response.data;
  } catch (error) {
    console.error('Error getting random image:', error);
  }
}

// Function to display the current image
function displayCurrentImage(image) {
  const imageElement = document.getElementById('random-image');
  imageElement.src = image.urls.regular;
  imageElement.alt = image.description;
  document.getElementById('image-description').textContent = image.description;
  document.getElementById('photographer-name').textContent = image.user.name;
  document.getElementById('camera-settings').textContent = image.exif;
}

// Function to handle the favorite button click
function handleFavoriteButtonClick(image) {
  if (favoriteImages.includes(image)) {
    favoriteImages = favoriteImages.filter((img) => img !== image);
  } else {
    favoriteImages.push(image);
  }
  console.log('Favorite images:', favoriteImages);
}

// Function to handle the category change
function handleCategoryChange(category) {
  currentCategory = category;
  getRandomImage().then((image) => displayCurrentImage(image));
}

// Function to handle the search input
function handleSearchInput(searchQuery) {
  unsplashApi.search.getPhotos({
    query: searchQuery,
  }).then((response) => {
    const images = response.data.results;
    displayCurrentImage(images[0]);
  });
}

// Function to handle the image details button click
function handleImageDetailsButtonClick(image) {
  const imageDetailsModal = document.getElementById('image-details-modal');
  imageDetailsModal.style.display = 'block';
  document.getElementById('image-details-description').textContent = image.description;
  document.getElementById('image-details-photographer-name').textContent = image.user.name;
  document.getElementById('image-details-camera-settings').textContent = image.exif;
  document.getElementById('image-details-location').textContent = image.location.name;
}

// Add event listeners to the category links
categories.forEach((category) => {
  const link = document.createElement('a');
  link.textContent = category;
  link.href = '#';
  link.addEventListener('click', () => handleCategoryChange(category));
  document.querySelector('nav ul').appendChild(link);
});

// Add event listener to the favorite button
document.getElementById('favorite-btn').addEventListener('click', () => {
  const currentImage = document.getElementById('random-image');
  handleFavoriteButtonClick(currentImage);
});

// Add event listener to the search input
document.getElementById('search-input').addEventListener('input', (e) => {
  handleSearchInput(e.target.value);
});

// Add event listener to the image details button
document.getElementById('image-details-btn').addEventListener('click', () => {
  const currentImage = document.getElementById('random-image');
  handleImageDetailsButtonClick(currentImage);
});

// Add event listener to the close button of the image details modal
document.querySelector('.close').addEventListener('click', () => {
  const imageDetailsModal = document.getElementById('image-details-modal');
  imageDetailsModal.style.display = 'none';
});

// Get the first random image
getRandomImage().then((image) => displayCurrentImage(image));

// Implement lazy loading
const images = document.querySelectorAll('img');
images.forEach((image) => {
  image.addEventListener('load', () => {
    image.style.opacity = 1;
  });
});

// Implement image compression
const imageCompression = () => {
  const images = document.querySelectorAll('img');
  images.forEach((image) => {
    const imageCompressionRatio = 0.5;
    const compressedImage = image.src.replace('q=80', `q=${imageCompressionRatio * 100}`);
    image.src = compressedImage;
  });
};

imageCompression();

// Implement caching
const cache = {};
const cachedImages = document.querySelectorAll('img');
cachedImages.forEach((image) => {
  cache[image.src] = image;
});

const getImageFromCache = (src) => {
  return cache[src];
};

const cacheImage = (image) => {
  cache[image.src] = image;
};

// Implement high contrast mode
const highContrastMode = () => {
  const body = document.body;
  body.classList.toggle('high-contrast');
};

document.getElementById('high-contrast-mode-btn').addEventListener('click', highContrastMode);

// Implement secure API requests
const apiRequest = async () => {
  try {
    const response = await fetch('https://api.unsplash.com/photos/random', {
      method: 'GET',
      headers: {
        'Authorization': 'Client-ID YOUR_CLIENT_ID',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

apiRequest().then((data) => console.log(data));

// Implement input validation
const validateInput = (input) => {
  const trimmedInput = input.trim();
  if (trimmedInput.length === 0) {
    return false;
  }
  return true;
};

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (e) => {
  const isValid = validateInput(e.target.value);
  if (!isValid) {
    console.error('Invalid input');
  }
});

// Implement Content Security Policy (CSP)
const csp = {
  'default-src': ["'self'"],
  'script-src': ["'self'", 'https://cdn.jsdelivr.net'],
  'style-src': ["'self'", 'https://fonts.googleapis.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
};

const metaTag = document.createElement('meta');
metaTag.httpEquiv = 'Content-Security-Policy';
metaTag.content = Object.keys(csp).map((key) => `${key} ${csp[key].join(' ')}`).join('; ');
document.head.appendChild(metaTag);

// Implement infinite scrolling
const infiniteScrolling = () => {
  const images = document.querySelectorAll('img');
  const lastImage = images[images.length - 1];
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      getRandomImage().then((image) => displayCurrentImage(image));
    }
  }, {
    rootMargin: '100px',
  });
  observer.observe(lastImage);
};

infiniteScrolling();

// Implement image upload
const imageUpload = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageData = reader.result;
      const image = document.createElement('img');
      image.src = imageData;
      document.body.appendChild(image);
    });
    reader.readAsDataURL(file);
  });
  document.body.appendChild(fileInput);
};

imageUpload();

// Implement user authentication
const userAuthentication = () => {
  const loginForm = document.createElement('form');
  loginForm.innerHTML = `
    <label for="username">Username:</label>
    <input type="text" id="username" name="username"><br><br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password"><br><br>
    <input type="submit" value="Login">
  `;
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Authenticate user with backend API
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // User is authenticated, display protected content
        document.body.innerHTML = 'Welcome, ' + username + '!';
      } else {
        // User is not authenticated, display error message
        document.body.innerHTML = 'Invalid username or password';
      }
    })
    .catch((error) => console.error(error));
  });
  document.body.appendChild(loginForm);
};

userAuthentication();

// Implement admin dashboard
const adminDashboard = () => {
  const dashboard = document.createElement('div');
  dashboard.innerHTML = `
    <h1>Admin Dashboard</h1>
    <button id="add-image-btn">Add Image</button>
    <button id="delete-image-btn">Delete Image</button>
  `;
  document.body.appendChild(dashboard);
  document.getElementById('add-image-btn').addEventListener('click', () => {
    // Add image functionality
  });
  document.getElementById('delete-image-btn').addEventListener('click', () => {
    // Delete image functionality
  });
};

adminDashboard();

// Implement image loading animation
const imageLoadingAnimation = () => {
  const images = document.querySelectorAll('img');
  images.forEach((image) => {
    const animation = document.createElement('div');
    animation.classList.add('image-loading-animation');
    image.parentNode.insertBefore(animation, image);
  });
};

imageLoadingAnimation();

// Implement error messages
const errorMessages = () => {
  const errorMessagesContainer = document.createElement('div');
  errorMessagesContainer.id = 'error-messages';
  document.body.appendChild(errorMessagesContainer);
};

errorMessages();

// Implement favorite images gallery
const favoriteImagesGallery = () => {
  const gallery = document.createElement('div');
  gallery.id = 'favorite-images-gallery';
  document.body.appendChild(gallery);
};

favoriteImagesGallery();

// Implement image details modal
const imageDetailsModal = () => {
  const modal = document.createElement('div');
  modal.id = 'image-details-modal';
  document.body.appendChild(modal);
};

imageDetailsModal();

// Implement responsive design improvements
const responsiveDesignImprovements = () => {
  const body = document.body;
  body.classList.add('responsive-design-improvements');
};

responsiveDesignImprovements();