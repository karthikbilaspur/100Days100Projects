const loveMe = document.querySelector('.loveMe');
const times = document.querySelector('#times');
const likedFeedback = document.querySelector('.liked-feedback'); // The heart on the image
const actionHeartIcon = document.querySelector('.post-actions .fa-heart'); // The heart in the actions bar

let timesClicked = 0;
let lastClick = 0; // To handle potential fake double-clicks (less relevant with dblclick event)

// Using 'dblclick' is great for strict double-click
loveMe.addEventListener('dblclick', (e) => {
    createHeart(e);
    // Add persistent liked feedback
    likedFeedback.classList.add('show');
    actionHeartIcon.classList.remove('far'); // Change to solid heart
    actionHeartIcon.classList.add('fas');
});

// Optional: If you want to allow "unliking" by double-clicking again,
// you'd need more complex state management. For now, we'll stick to
// just liking on double-click.

const createHeart = (e) => {
    const heart = document.createElement('i');
    heart.classList.add('fa-solid', 'fa-heart');

    // Get click position relative to the image container
    const x = e.clientX;
    const y = e.clientY;

    const leftOffset = e.target.getBoundingClientRect().left; // Use getBoundingClientRect for more accurate position
    const topOffset = e.target.getBoundingClientRect().top;

    const xInside = x - leftOffset;
    const yInside = y - topOffset;

    heart.style.top = `${yInside}px`;
    heart.style.left = `${xInside}px`;

    loveMe.appendChild(heart);

    times.innerHTML = ++timesClicked;

    // Remove the flying heart after animation
    setTimeout(() => heart.remove(), 1000);
};

// Reset persistent like after a short delay if you wanted to simulate an "unlike"
// but for a strict double-click "like only" scenario, we keep it liked.
// If you wanted a toggle, you'd need a single-click handler and a timer.