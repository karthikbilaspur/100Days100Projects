// script.js

const header = document.getElementById('header');
const title = document.getElementById('title');
const excerpt = document.getElementById('excerpt');
const profileImg = document.getElementById('profile_img');
const nameEl = document.getElementById('name');
const dateEl = document.getElementById('date');
const loadMoreBtn = document.getElementById('load-more-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

const animatedBgs = document.querySelectorAll('.animated-bg');
const animatedBgTexts = document.querySelectorAll('.animated-bg-text');

// Fallback images
const FALLBACK_HEADER_IMG = 'https://via.placeholder.com/350x200?text=Placeholder+Image';
const FALLBACK_PROFILE_IMG = 'https://via.placeholder.com/40x40?text=User';

// Theme persistence
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initial setup
applyTheme();
showLoadingState();
getData();

loadMoreBtn.addEventListener('click', () => {
  showLoadingState();
  getData();
});

themeToggleBtn.addEventListener('click', () => {
  isDarkMode =!isDarkMode;
  localStorage.setItem('darkMode', isDarkMode);
  applyTheme();
});

function applyTheme() {
  if (isDarkMode) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
  themeToggleBtn.textContent = isDarkMode? 'Toggle Light Mode' : 'Toggle Dark Mode';
}

function showLoadingState() {
  header.innerHTML = '&nbsp;';
  title.innerHTML = '&nbsp;';
  excerpt.innerHTML = `
    &nbsp;
    <span class="animated-bg animated-bg-text" style="width: 80%;"></span>
    <span class="animated-bg animated-bg-text" style="width: 90%;"></span>
    <span class="animated-bg animated-bg-text" style="width: 70%;"></span>
  `; // Varying widths
  profileImg.innerHTML = '&nbsp;';
  nameEl.innerHTML = '&nbsp;';
  dateEl.innerHTML = '&nbsp;';

  animatedBgs.forEach((bg) => bg.classList.add('animated-bg'));
  animatedBgTexts.forEach((bg) => bg.classList.add('animated-bg-text'));

  loadMoreBtn.disabled = true;
  loadMoreBtn.classList.add('loading'); // Add loading class for spinner
}

async function getData() {
  let postData = null;
  let randomUser = null;
  let headerImageUrl = FALLBACK_HEADER_IMG;
  let profileImageUrl = FALLBACK_PROFILE_IMG;

  try {
    // Simulate network delay for consistent animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Fetch a random post from JSONPlaceholder
    const postId = Math.floor(Math.random() * 100) + 1;
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    postData = await postResponse.json();

    // Fetch a random user for the profile image and name
    const userResponse = await fetch('https://randomuser.me/api/');
    const userData = await userResponse.json();
    randomUser = userData.results[0];

    // Try to get a real image for header, use fallback if it fails
    try {
      // Using a random ID for picsum.photos to get different images
      const picSumId = Math.floor(Math.random() * 1000);
      const testImage = new Image();
      testImage.src = `https://picsum.photos/id/${picSumId}/350/200`;
      await new Promise((resolve, reject) => {
        testImage.onload = resolve;
        testImage.onerror = reject;
      });
      headerImageUrl = testImage.src;
    } catch (imgError) {
      console.warn('Picsum image failed, using fallback.', imgError);
    }

    // Use random user thumbnail, fallback if that fails (less likely)
    if (randomUser && randomUser.picture && randomUser.picture.thumbnail) {
      profileImageUrl = randomUser.picture.thumbnail;
    }

  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Display error message
    title.innerHTML = 'Error Loading Content';
    excerpt.innerHTML = 'Could not fetch data. Please try again.';
    nameEl.innerHTML = 'System';
    dateEl.innerHTML = new Date().toLocaleDateString('en-US');
    profileImg.innerHTML = `<img src="${FALLBACK_PROFILE_IMG}" alt="Error" />`;
    header.innerHTML = `<img src="${FALLBACK_HEADER_IMG}" alt="Error" />`;

  } finally {
    // Populate content if successfully fetched
    if (postData && randomUser) {
        header.innerHTML = `<img src="${headerImageUrl}" alt="Card image" />`;
        title.innerHTML = postData.title.charAt(0).toUpperCase() + postData.title.slice(1);
        // Truncate body if it's too long for the excerpt
        let excerptText = postData.body.split('\n')[0];
        if (excerptText.length > 100) { // arbitrary length check
            excerptText = excerptText.substring(0, 97) + '...';
        }
        excerpt.innerHTML = excerptText;
        profileImg.innerHTML = `<img src="${profileImageUrl}" alt="${randomUser.name.first} ${randomUser.name.last}" />`;
        nameEl.innerHTML = `${randomUser.name.first} ${randomUser.name.last}`;
        const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        dateEl.innerHTML = new Date().toLocaleDateString('en-US', dateOptions);
    }

    // Remove loading states
    animatedBgs.forEach((bg) => bg.classList.remove('animated-bg'));
    animatedBgTexts.forEach((bg) => bg.classList.remove('animated-bg-text'));
    loadMoreBtn.disabled = false;
    loadMoreBtn.classList.remove('loading');
  }
}