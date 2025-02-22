// Tabbed content
const tabs = document.querySelectorAll('.tabs li');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const tabPanelId = tab.querySelector('a').getAttribute('href');
        const tabPanel = document.querySelector(tabPanelId);

        tabs.forEach((tab) => tab.classList.remove('active'));
        tab.classList.add('active');

        tabPanels.forEach((tabPanel) => tabPanel.classList.remove('show'));
        tabPanel.classList.add('show');
    });
});

// Accordion menu
const accordionButtons = document.querySelectorAll('.accordion-button');
const accordionContents = document.querySelectorAll('.accordion-content');

accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;

        accordionButtons.forEach((button) => button.classList.remove('active'));
        button.classList.add('active');

        accordionContents.forEach((content) => content.classList.remove('show'));
        accordionContent.classList.add('show');
    });
});

// Dropdown menu
const dropdownButtons = document.querySelectorAll('.dropdown-button');
const dropdownContents = document.querySelectorAll('.dropdown-content');

dropdownButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const dropdownContent = button.nextElementSibling;

        dropdownButtons.forEach((button) => button.classList.remove('active'));
        button.classList.add('active');

        dropdownContents.forEach((content) => content.classList.remove('show'));
        dropdownContent.classList.add('show');
    });
});

// High contrast mode
const highContrastToggle = document.getElementById('high-contrast-toggle');

highContrastToggle.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast-mode');
});

// Screen reader support
const srOnlyElements = document.querySelectorAll('.sr-only');

srOnlyElements.forEach((element) => {
    element.addEventListener('focus', () => {
        element.classList.add('focused');
    });
    element.addEventListener('blur', () => {
        element.classList.remove('focused');
    });
});