document.addEventListener('DOMContentLoaded', () => {
    // --- Constants and Configuration ---
    const DEGREE_PER_HOUR = 30; // 360 / 12 hours
    const DEGREE_PER_MINUTE = 6; // 360 / 60 minutes
    const DEGREE_PER_SECOND = 6; // 360 / 60 seconds
    const HOUR_HAND_MINUTE_OFFSET_DEGREE = 0.5; // 30 degrees / 60 minutes
    const MINUTE_HAND_SECOND_OFFSET_DEGREE = 0.1; // 6 degrees / 60 seconds

    const THEMES = {
        light: {
            '--bg-color': '#f0f2f5',
            '--primary-text-color': '#333333',
            '--secondary-text-color': '#666666',
            '--accent-color': '#007bff',
            '--analog-clock-face-color': '#ffffff',
            '--analog-clock-border-color': '#cccccc',
            '--hour-hand-color': '#333333',
            '--minute-hand-color': '#333333',
            '--second-hand-color': '#dc3545',
            '--center-point-color': '#dc3545',
            '--digital-display-bg': '#e9ecef',
            '--digital-time-color': '#333333',
            '--digital-date-color': '#666666',
            '--button-bg-color': '#007bff',
        },
        dark: {
            '--bg-color': '#2c3e50',
            '--primary-text-color': '#ecf0f1',
            '--secondary-text-color': '#bdc3c7',
            '--accent-color': '#3498db',
            '--analog-clock-face-color': '#34495e',
            '--analog-clock-border-color': '#2c3e50',
            '--hour-hand-color': '#ecf0f1',
            '--minute-hand-color': '#ecf0f1',
            '--second-hand-color': '#e74c3c',
            '--center-point-color': '#e74c3c',
            '--digital-display-bg': '#212121',
            '--digital-time-color': '#00ff00',
            '--digital-date-color': '#00cc00',
            '--button-bg-color': '#3498db',
        },
        custom: { /* Default values for custom, overwritten by color picker */
            '--bg-color': '#fce4ec',
            '--primary-text-color': '#880e4f',
            '--secondary-text-color': '#ad1457',
            '--accent-color': '#ec407a',
            '--analog-clock-face-color': '#ffe0b2',
            '--analog-clock-border-color': '#ffcc80',
            '--hour-hand-color': '#880e4f',
            '--minute-hand-color': '#880e4f',
            '--second-hand-color': '#d81b60',
            '--center-point-color': '#d81b60',
            '--digital-display-bg': '#f8bbd0',
            '--digital-time-color': '#4a148c',
            '--digital-date-color': '#7b1fa2',
            '--button-bg-color': '#ec407a',
        },
        vibrant: {
            '--bg-color': '#4CAF50',
            '--primary-text-color': '#fff',
            '--secondary-text-color': '#e0f2f1',
            '--accent-color': '#FFC107',
            '--analog-clock-face-color': '#8BC34A',
            '--analog-clock-border-color': '#689F38',
            '--hour-hand-color': '#fff',
            '--minute-hand-color': '#fff',
            '--second-hand-color': '#FF5722',
            '--center-point-color': '#FF5722',
            '--digital-display-bg': '#2E7D32',
            '--digital-time-color': '#FFECB3',
            '--digital-date-color': '#FFD54F',
            '--button-bg-color': '#FFC107',
        }
    };

    // --- Selectors ---
    const hourEl = document.querySelector('.clock.needle.hour');
    const minuteEl = document.querySelector('.clock.needle.minute');
    const secondEl = document.querySelector('.clock.needle.second');
    const timeEl = document.querySelector('.digital-display.time');
    const dateEl = document.querySelector('.digital-display.date');
    const gmtOffsetEl = document.querySelector('.digital-display.gmt-offset');
    const themeBtns = document.querySelectorAll('.theme-switcher.theme-btn');
    const customThemeOptions = document.querySelector('.custom-theme-options');
    const bgColorInput = document.getElementById('bg-color');
    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    const applyCustomColorsBtn = document.getElementById('apply-custom-colors');
    const resetCustomColorsBtn = document.getElementById('reset-custom-colors');

    // Theme Preview Elements
    const previewWrapper = document.querySelector('.theme-preview-wrapper');
    const previewHourEl = document.querySelector('.theme-preview-needle.hour');
    const previewMinuteEl = document.querySelector('.theme-preview-needle.minute');
    const previewSecondEl = document.querySelector('.theme-preview-needle.second');
    const previewTimeEl = document.querySelector('.theme-preview-time');
    const previewDateEl = document.querySelector('.theme-preview-date');

    // Basic error checking for elements
    const requiredElements = [hourEl, minuteEl, secondEl, timeEl, dateEl, gmtOffsetEl, themeBtns.length, customThemeOptions, bgColorInput, primaryColorInput, secondaryColorInput, applyCustomColorsBtn, resetCustomColorsBtn, previewHourEl, previewMinuteEl, previewSecondEl, previewTimeEl, previewDateEl];
    if (requiredElements.some(el =>!el || (typeof el === 'number' && el === 0))) {
        console.error('One or more essential clock elements not found. Please check HTML selectors.');
        // Potentially hide the entire clock app or show an error message to the user
        document.querySelector('.clock-app-section').innerHTML = "<p style='color:red; text-align:center;'>Error loading clock app. Missing essential elements.</p>";
        return; // Stop execution
    }

    // --- State ---
    let currentTheme = localStorage.getItem('clockTheme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark' : 'light');
    let customColors = JSON.parse(localStorage.getItem('customClockColors')) || {};

    // --- Functions ---

    /** Sets the analog and digital time. */
    function setTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const day = now.getDay();
        const date = now.getDate();
        const month = now.getMonth();
        const timezoneOffset = -now.getTimezoneOffset(); // in minutes

        const h = hours % 12; // 12-hour format for analog clock

        // Update Analog Clock Hands
        updateClockHand(hourEl, h, minutes, DEGREE_PER_HOUR, HOUR_HAND_MINUTE_OFFSET_DEGREE);
        updateClockHand(minuteEl, minutes, seconds, DEGREE_PER_MINUTE, MINUTE_HAND_SECOND_OFFSET_DEGREE);
        updateClockHand(secondEl, seconds, 0, DEGREE_PER_SECOND, 0);

        // Update Digital Display
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        timeEl.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        dateEl.textContent = `${getDayOfWeek(day)}, ${getMonth(month)} ${date.toString().padStart(2, '0')}`;
        gmtOffsetEl.textContent = `GMT${formatTimezoneOffset(timezoneOffset)}`;
    }

    /**
     * Updates a clock hand's rotation.
     * @param {HTMLElement} handEl - The hand element (hour, minute, second).
     * @param {number} value - The primary time value (e.g., hours, minutes, seconds).
     * @param {number} offsetValue - The secondary time value for smooth movement.
     * @param {number} degreePerUnit - Degrees per unit of the primary value.
     * @param {number} offsetDegreePerUnit - Degrees per unit of the secondary value.
     */
    function updateClockHand(handEl, value, offsetValue, degreePerUnit, offsetDegreePerUnit) {
        const rotation = (value * degreePerUnit) + (offsetValue * offsetDegreePerUnit);
        handEl.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
    }

    /**
     * Updates the preview clock hands.
     * @param {HTMLElement} handEl - The preview hand element.
     * @param {number} value - The time value.
     * @param {number} degreePerUnit - Degrees per unit.
     */
    function updatePreviewHand(handEl, value, degreePerUnit) {
        const rotation = value * degreePerUnit;
        handEl.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
    }

    /**
     * Gets the day of the week name.
     * @param {number} day - Day index (0-6).
     * @returns {string} Day name.
     */
    function getDayOfWeek(day) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[day];
    }

    /**
     * Gets the month name.
     * @param {number} month - Month index (0-11).
     * @returns {string} Month name.
     */
    function getMonth(month) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[month];
    }

    /**
     * Formats the GMT offset.
     * @param {number} offsetInMinutes - Timezone offset in minutes.
     * @returns {string} Formatted GMT offset (e.g., "+05:30").
     */
    function formatTimezoneOffset(offsetInMinutes) {
        const sign = offsetInMinutes >= 0? '+' : '-';
        const absOffset = Math.abs(offsetInMinutes);
        const hours = Math.floor(absOffset / 60);
        const minutes = absOffset % 60;
        return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    /**
     * Applies a selected theme to the document.
     * @param {string} themeName - Name of the theme to apply.
     */
    function applyTheme(themeName) {
        currentTheme = themeName;
        document.documentElement.classList.remove(...Object.keys(THEMES)); // Remove all theme classes
        document.documentElement.classList.add(themeName);
        localStorage.setItem('clockTheme', themeName); // Save preference

        // Show/hide custom theme options
        if (themeName === 'custom') {
            customThemeOptions.setAttribute('aria-hidden', 'false');
        } else {
            customThemeOptions.setAttribute('aria-hidden', 'true');
        }

        // Update button states
        themeBtns.forEach(btn => {
            btn.setAttribute('aria-pressed', btn.dataset.theme === themeName);
        });

        // If switching from custom, apply default custom colors
        if (themeName === 'custom' && Object.keys(customColors).length === 0) {
            // Initialize with default custom theme values if no custom colors saved
            Object.keys(THEMES.custom).forEach(prop => {
                document.documentElement.style.setProperty(prop, THEMES.custom[prop]);
            });
        } else if (themeName === 'custom' && Object.keys(customColors).length > 0) {
            // Apply saved custom colors
            applyCustomColors(customColors);
            updateColorPickers(customColors);
        } else {
            // Clear inline styles if not in custom mode
            Object.keys(THEMES.light).forEach(prop => { // Use light theme properties as a baseline to clear
                document.documentElement.style.removeProperty(prop);
            });
        }
        updateThemePreview();
    }

    /**
     * Updates the color pickers with current custom theme values.
     * @param {object} colors - Object containing color properties.
     */
    function updateColorPickers(colors) {
        bgColorInput.value = colors['--bg-color'] || getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
        primaryColorInput.value = colors['--primary-text-color'] || getComputedStyle(document.documentElement).getPropertyValue('--primary-text-color').trim();
        secondaryColorInput.value = colors['--analog-clock-face-color'] || getComputedStyle(document.documentElement).getPropertyValue('--analog-clock-face-color').trim();
    }

    /**
     * Applies custom colors to CSS variables.
     * @param {object} colors - Object with CSS variable names and hex values.
     */
    function applyCustomColors(colors) {
        Object.keys(colors).forEach(prop => {
            document.documentElement.style.setProperty(prop, colors[prop]);
        });
        localStorage.setItem('customClockColors', JSON.stringify(colors)); // Save custom colors
    }

    /** Updates the theme preview clock and digital display. */
    function updateThemePreview() {
        const previewBgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
        const previewPrimaryTextColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-text-color');
        const previewAnalogFaceColor = getComputedStyle(document.documentElement).getPropertyValue('--analog-clock-face-color');
        const previewAnalogBorderColor = getComputedStyle(document.documentElement).getPropertyValue('--analog-clock-border-color');
        const previewHourHandColor = getComputedStyle(document.documentElement).getPropertyValue('--hour-hand-color');
        const previewMinuteHandColor = getComputedStyle(document.documentElement).getPropertyValue('--minute-hand-color');
        const previewSecondHandColor = getComputedStyle(document.documentElement).getPropertyValue('--second-hand-color');
        const previewCenterPointColor = getComputedStyle(document.documentElement).getPropertyValue('--center-point-color');
        const previewDigitalTimeColor = getComputedStyle(document.documentElement).getPropertyValue('--digital-time-color');
        const previewDigitalDateColor = getComputedStyle(document.documentElement).getPropertyValue('--digital-date-color');

        // Update preview clock hands
        const now = new Date();
        const h = now.getHours() % 12;
        const m = now.getMinutes();
        const s = now.getSeconds();
        updatePreviewHand(previewHourEl, h + m / 60, DEGREE_PER_HOUR);
        updatePreviewHand(previewMinuteEl, m + s / 60, DEGREE_PER_MINUTE);
        updatePreviewHand(previewSecondEl, s, DEGREE_PER_SECOND);

        // Apply colors to preview elements
        previewWrapper.style.backgroundColor = previewAnalogFaceColor;
        previewWrapper.style.borderColor = previewAnalogBorderColor;
        previewWrapper.querySelector('.theme-preview-clock').style.backgroundColor = previewAnalogFaceColor;
        previewWrapper.querySelector('.theme-preview-clock').style.borderColor = previewAnalogBorderColor;
        previewWrapper.querySelector('.theme-preview-center-point').style.backgroundColor = previewCenterPointColor;
        previewHourEl.style.backgroundColor = previewHourHandColor;
        previewMinuteEl.style.backgroundColor = previewMinuteHandColor;
        previewSecondEl.style.backgroundColor = previewSecondHandColor;
        previewTimeEl.style.color = previewDigitalTimeColor;
        previewDateEl.style.color = previewDigitalDateColor;
        previewWrapper.querySelector('.preview-title').style.color = previewPrimaryTextColor; // Title color
    }

    // --- Event Listeners ---

    // Theme switcher buttons
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            applyTheme(btn.dataset.theme);
        });
    });

    // Custom color picker inputs
    [bgColorInput, primaryColorInput, secondaryColorInput].forEach(input => {
        input.addEventListener('input', () => {
            // Apply colors directly to CSS variables for live preview
            document.documentElement.style.setProperty(`--${input.id}`, input.value);
            updateThemePreview(); // Update preview as well
        });
    });

    // Apply custom colors button
    applyCustomColorsBtn.addEventListener('click', () => {
        const newCustomColors = {
            '--bg-color': bgColorInput.value,
            '--primary-text-color': primaryColorInput.value,
            '--secondary-text-color': secondaryColorInput.value,
            '--accent-color': bgColorInput.value, // Simple mapping, can be more complex
            '--analog-clock-face-color': secondaryColorInput.value,
            '--analog-clock-border-color': primaryColorInput.value,
            '--hour-hand-color': primaryColorInput.value,
            '--minute-hand-color': primaryColorInput.value,
            '--second-hand-color': primaryColorInput.value,
            '--center-point-color': primaryColorInput.value,
            '--digital-display-bg': bgColorInput.value,
            '--digital-time-color': primaryColorInput.value,
            '--digital-date-color': secondaryColorInput.value,
            '--button-bg-color': primaryColorInput.value,
        };
        applyCustomColors(newCustomColors);
        updateThemePreview();
    });

    // Reset custom colors button
    resetCustomColorsBtn.addEventListener('click', () => {
        localStorage.removeItem('customClockColors');
        customColors = {}; // Clear in-memory state
        applyTheme('custom'); // Re-apply custom to load default custom theme values
        updateColorPickers(THEMES.custom);
        updateThemePreview();
    });

    // Automatically update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Initialization ---
    applyTheme(currentTheme); // Apply stored or default theme
    if (currentTheme === 'custom' && Object.keys(customColors).length > 0) {
        updateColorPickers(customColors);
    } else {
        updateColorPickers(THEMES[currentTheme]); // Load current theme's colors into pickers
    }

    // Set initial time and update every second
    setInterval(setTime, 1000);
    setTime();
});
