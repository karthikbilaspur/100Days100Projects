# Dynamic Expanding Cards with Filter and View Modes

This project showcases a responsive web component featuring dynamic expanding cards with filtering, search, and switchable grid/list view modes. Built purely with HTML, CSS, and vanilla JavaScript, it's designed to be lightweight, interactive, and accessible without relying on external frameworks or libraries.

 ✨ Features

   Dynamic Card Generation: Cards are generated from a JavaScript data structure.
   Category Filtering: Filter cards by predefined categories ("Nature", "City").
   Text Search: Live search functionality to filter cards by keywords in their title, excerpt, or details.
   Grid and List View Modes: Toggle between a visually rich grid layout and a compact list layout.
   Expanding Card Details: Click or press Enter/Space on a card to reveal more detailed information, with smooth transitions.
   Responsive Design: Adapts seamlessly to various screen sizes, from mobile to desktop.
   Accessibility (A11y) Focused:
       Keyboard navigability for all interactive elements.
       ARIA attributes for improved screen reader experience.
       Live region announcements for search results.
       Focus management after card expansion/closure.
   URL Integration:
       Preselect a category using a URL parameter (e.g., `index.html?category=nature`).
       Directly link to and automatically expand a specific card using a URL hash (e.g., `index.htmlnature1`).

 🚀 How to Run

1. Save the files:
       `index.html` (HTML structure)
       `style.css` (CSS styling)
       `script.js` (JavaScript functionality)
    ...into the same folder on your computer.
2. Open `index.html`: Simply drag and drop the `index.html` file into your web browser, or rightclick and choose "Open with..." your preferred browser.

That's it! The page will load, and you can start interacting with the cards.

 🛠️ Usage
  Filtering and Searching
   Category Filter: Use the dropdown menu in the topright to select "All Categories", "Nature", or "City".
   Search Input: Type into the "Search cards..." input field to instantly filter cards based on their content.

 View Modes

   Grid View: Click the grid icon (🗩) to arrange cards in a multicolumn layout.
   List View: Click the list icon (☰) to stack cards vertically, each taking up more horizontal space.

 Interacting with Cards

   Expand Card: Click anywhere on a card (except the action button) or press `Enter` / `Space` when a card is focused to expand it and reveal more details.
   Close Card: Click the `X` button in the topright corner of an expanded card, or press `Enter` / `Space` when the `X` button is focused. When a card closes, keyboard focus returns to the card itself.
   Action Button: Each expanded card has an "Action Button" (e.g., "Learn More", "Explore Trails"). Clicking this button will trigger a simple JavaScript `alert()` in this demo.

 Direct Linking

   You can share direct links to the page with a specific category preselected:
       `yourfolder/index.html?category=nature`
       `yourfolder/index.html?category=city`
   You can also link directly to an expanded card:
       `yourfolder/index.htmlnature1` (This will load the page, filter to the "nature" category, and expand the "Mountain Serenity" card).

 📂 Project Structure
. ├── index.html ├── style.css └── script.js

 🎨 Customization

 Adding/Editing Card Data

Edit the `cardData` object within `script.js`. Each card entry has:
   `id`: Unique identifier (used for direct linking via URL hash).
   `imageSrc`: URL for the card's image (currently using `picsum.photos`).
   `imageAlt`: Alt text for the image.
   `title`: Main title of the card.
   `excerpt`: Short description visible in collapsed state.
   `details`: Longer description visible when expanded.
   `features`: An array of bullet points for the expanded details.
   `buttonText`: Text for the action button.
   `category`: The category the card belongs to (e.g., `'nature'`, `'city'`).

 Styling

Modify `style.css` to change colors, fonts, spacing, and the layout of cards in both grid and list views. CSS variables are used for easy theme adjustments.

 JavaScript Logic

The `script.js` file contains all the logic for rendering, filtering, searching, and managing card interactions. Feel free to extend or modify it for more complex behaviors.

This project serves as a solid foundation for building dynamic content displays on a single page using only native web technologies.
