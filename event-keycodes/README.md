# Event KeyCodes

 Users understand keyboard events by displaying the details of each key press. It's built with HTML for structure, CSS for styling, and JavaScript for all the interactive logic.

Here's a summary of each part:

index.html (HTML Structure):
This file sets up the basic layout of the page.
It includes a main area (key-container) where information about pressed keys will appear.
It provides a set of interactive controls:
An input field to filter the displayed keys.
Buttons to sort the keys by their name, code, or numeric key code.
A "Clear Keys" button to remove all recorded key presses.
A "Copy Keys" button to copy all the recorded key data to the clipboard.
It also has a dedicated area (key-statistics) to show dynamic data about the key presses.
It links to the styles.css for appearance and script.js for functionality.
script.js (JavaScript Functionality):
This is the brain of the application.
Captures Key Presses: It listens for keydown events on the entire window. When a key is pressed, it captures details like the key name (event.key), the physical key code (event.code), and the numeric key code (event.keyCode).
Manages Key Data: It stores all captured key events in an internal array (allKeys) to efficiently manage and manipulate them. It also includes a throttling mechanism to prevent rapid duplicate entries if a key is held down.
Displays Key Information: For each key press, it dynamically creates a visual "card" (div.key) in the key-container displaying its name, code, and key code. Each card can be individually clicked to remove it.
Filtering: The filter-input allows users to type text, and the JavaScript instantly filters the displayed key cards, showing only those that match the input in their name, code, or key code.
Sorting: The "Sort" buttons reorder the displayed keys based on the selected criteria (key name, code, or key code value). Each button cycles through ascending, descending, and a default (newest first) order.
Statistics: The key-statistics area dynamically updates to show:
The total number of keys pressed.
The count of unique key combinations.
The most frequently pressed key.
Clear and Copy: It implements the functionality for the "Clear Keys" button (empties the display and internal data) and the "Copy Keys" button (copies all recorded key information to the user's clipboard).
Initial State: Displays an initial message prompting the user to press a key.
styles.css (CSS Styling):
This file controls the visual presentation and layout of the entire application.
Modern Design: It uses a dark theme with contrasting text and accent colors for a sleek, modern look.
Layout: Employs Flexbox for arranging the controls, key statistics, and the grid of key cards, ensuring a clean and centered layout.
Key Card Styling: Styles the individual key cards with a distinct background, rounded corners, padding, and hover effects (scaling and color change) for visual feedback.
Responsive Design: Uses media queries to adapt the layout and element sizes for different screen widths (mobile, tablet, desktop). For example, key cards might stack in a single column on very small screens or arrange into two or more columns on larger screens.
Accessibility: Includes media queries for accessibility features like forced-colors, prefers-contrast, and prefers-reduced-motion to provide a better experience for users with specific needs.
