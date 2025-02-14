// Get all panels
const panels = document.querySelectorAll('.panel');

// Add event listeners to each panel
panels.forEach((panel, index) => {
    panel.addEventListener('click', () => {
        // Remove active class from all panels
        panels.forEach((panel) => panel.classList.remove('active'));

        // Add active class to the current panel
        panel.classList.add('active');
    });

    // Add keyboard navigation
    panel.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            // Remove active class from all panels
            panels.forEach((panel) => panel.classList.remove('active'));

            // Add active class to the current panel
            panel.classList.add('active');
        }
    });
});

// Add keyboard navigation to the container
document.querySelector('.container').addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Get the current active panel
        const currentPanel = document.querySelector('.panel.active');

        // Get the index of the current panel
        const currentIndex = Array.prototype.indexOf.call(panels, currentPanel);

        // Get the next or previous panel
        let nextPanel;
        if (event.key === 'ArrowLeft') {
            nextPanel = panels[(currentIndex - 1 + panels.length) % panels.length];
        } else {
            nextPanel = panels[(currentIndex + 1) % panels.length];
        }

        // Remove active class from all panels
        panels.forEach((panel) => panel.classList.remove('active'));

        // Add active class to the next panel
        nextPanel.classList.add('active');
    }
});

// Load panel content from external source
fetch('panel-content.json')
    .then(response => response.json())
    .then(data => {
        panels.forEach((panel, index) => {
            const panelContent = data[index];
            panel.innerHTML = `
                <h3>${panelContent.title}</h3>
                <p>${panelContent.description}</p>
                <button class="panel-button">Learn More</button>
            `;
        });
    })
    .catch(error => console.error('Error loading panel content:', error));

// Add event listener to panel buttons
const panelButtons = document.querySelectorAll('.panel-button');
panelButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Get the parent panel
        const panel = event.target.parentNode;

        // Get the panel's index
        const index = Array.prototype.indexOf.call(panels, panel);

        // Log the panel's index and title
        console.log(`Panel ${index} clicked: ${panel.querySelector('h3').textContent}`);
    });
});