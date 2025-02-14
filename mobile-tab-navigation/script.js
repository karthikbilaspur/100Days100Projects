const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-tab-target');
        const targetPanel = document.querySelector(target);

        // Remove active class from all buttons and panels
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        tabPanels.forEach((panel) => panel.classList.remove('active'));

        // Add active class to the current button and panel
        button.classList.add('active');
        targetPanel.classList.add('active');
    });
});

// Add event listener to the form submit
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted!');
});