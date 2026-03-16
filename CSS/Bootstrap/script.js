document.addEventListener('DOMContentLoaded', () => {
    const bgColorElement = document.getElementById('bg-color');
    const changeColorButton = document.getElementById('change-color');

    // Function to generate a random hex color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Function to set the background color
    const setRandomBackgroundColor = () => {
        const randomColor = getRandomColor();
        bgColorElement.style.backgroundColor = randomColor;
    };

    // Event listener for the button click
    changeColorButton.addEventListener('click', setRandomBackgroundColor);

    // Set an initial random background color when the page loads
    setRandomBackgroundColor();
});