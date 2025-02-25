// Get the play buttons
const playButtons = document.querySelectorAll('.play-button');

// Add event listeners to the play buttons
playButtons.forEach(button => {
    button.addEventListener('click', () => {
        const soundboundId = button.dataset.soundboundId;
        Soundbound.play(soundboundId);
    });
});

// Load the audio content for each course
const courses = document.querySelectorAll('.course-card');
courses.forEach(course => {
    const soundboundId = course.querySelector('button').dataset.soundboundId;
    Soundbound.load(soundboundId);
});