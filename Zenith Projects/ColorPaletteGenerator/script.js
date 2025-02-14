document.addEventListener("DOMContentLoaded", function () {
    const colorList = document.getElementById('colorList');
    const searchInput = document.getElementById('searchInput');
    const refreshBtn = document.getElementById('refreshBtn');

    // Initial color palette generation
    generateColorPalette();

    // Generate color palette function
    function generateColorPalette() {
        const maxColorBoxes = 21;
        const colorListArray = [];

        for (let i = 0; i < maxColorBoxes; i++) {
            const randomHexColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
            colorListArray.push(randomHexColor);
        }

        renderColorList(colorListArray);
    }

    // Render color list
    function renderColorList(colorListArray) {
        colorList.innerHTML = ''; // Clear previous list

        colorListArray.forEach((hexValue, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('color');
            listItem.innerHTML = `
                <div class="rect-box" style="background: ${hexValue}"></div>
                <span class="hex-value">${hexValue}</span>
            `;
            listItem.addEventListener('click', () => copyColorToClipboard(hexValue, index));
            colorList.appendChild(listItem);
        });
    }

    // Copy color to clipboard
    function copyColorToClipboard(hexValue, index) {
        navigator.clipboard.writeText(hexValue)
            .then(() => {
                alert('Copied');
            })
            .catch(() => {
                alert('Failed to copy the color code!');
            });
    }

    // Search input event listener
    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();

        const colorMapping = {
            red: ["#FF0000", "#FF5733", "#c21919", "#FF6347", "#FF4500"],
            green: ["#00FF00", "#33FF73", "#C3FF00", "#228B22", "#008000"],
            blue: ["#0000FF", "#3373FF", "#00C3FF", "#1E90FF", "#4169E1"],
            // Add more color mappings as needed
        };

        const matchingColors = colorMapping[searchValue] || [];

        if (matchingColors.length > 0) {
            renderColorList(matchingColors);
        } else {
            generateColorPalette();
        }
    });

    // Refresh button event listener
    refreshBtn.addEventListener('click', generateColorPalette);
});