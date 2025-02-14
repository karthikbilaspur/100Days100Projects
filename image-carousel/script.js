const CAROUSEL_INTERVAL = 2000; // define constant for interval

const imgsContainer = document.getElementById('imgs');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const dotsContainer = document.getElementById('dots');

const images = [
    {
        src: 'https://images.unsplash.com/photo-1599394022918-6c2776530abb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1458&q=80',
    },
    {
        src: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    },
    {
        src: 'https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1492&q=80',
    },
];

let idx = 0;
let intervalId = null;

// Load images dynamically
images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image.src;
    img.style.transform = `rotateY(${index * 45}deg) translateZ(200px)`;
    imgsContainer.appendChild(img);
});

// Create dots dynamically
images.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
});

// Function to update dots
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === idx) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Function to run carousel
function run() {
    idx = (idx + 1) % images.length;
    changeImage();
    updateDots();
}

// Function to change image
function changeImage() {
    const imgs = document.querySelectorAll('#imgs img');
    imgs.forEach((img, index) => {
        img.style.transform = `rotateY(${(index - idx) * 45}deg) translateZ(200px)`;
    });
}

// Function to reset interval
function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(run, CAROUSEL_INTERVAL);
}

// Event listeners
rightBtn.addEventListener('click', () => {
    idx = (idx + 1) % images.length;
    changeImage();
    updateDots();
    resetInterval();
});

leftBtn.addEventListener('click', () => {
    idx = (idx - 1 + images.length) % images.length;
    changeImage();
    updateDots();
    resetInterval();
});

// Dot event listeners
dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
        const dotIndex = Array.prototype.indexOf.call(dotsContainer.children, e.target);
        idx = dotIndex;
        changeImage();
        updateDots();
        resetInterval();
    }
});

// Initialize interval
intervalId = setInterval(run, CAROUSEL_INTERVAL);