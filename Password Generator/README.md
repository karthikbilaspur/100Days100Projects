# Password Generator  

A robust and highly customizable webbased Strong Password Generator developed by KarthikCodingSolutions. This application empowers users to create secure, unique passwords tailored to specific criteria, featuring advanced generation logic, cryptographic hashing, and a polished user experience.

 Table of Contents

Features

This Password Generator comes packed with a wide range of features designed for security and usability:

 Highly Customizable Password Generation:
     Variable Length: Generate passwords from 8 to 128 characters.
     Character Type Selection: Include/exclude uppercase (AZ), lowercase (az), numbers (09), and a comprehensive set of symbols (`!@$%^&(){}[]=<>/,.`~+?_`"\'\\|;:`).
     Guaranteed Inclusion: Ensures at least one character from each selected type is present in the generated password (for 'Default' template).
     Cryptographically Secure Randomness: Leverages `window.crypto.getRandomValues` for more secure random number generation, enhancing password unpredictability.
     FisherYates Shuffle: Utilizes a cryptographically secure shuffle to randomize character order and prevent patterns.
 Password Templates:
     Default: Standard mix of selected character types.
     PIN: Generates numericonly passwords.
     Passphrase: Generates strong, memorable passphrases using an expanded dictionary of words and random separators.
 Usability & User Experience:
     Exclude Similar Characters: Option to avoid visually confusing characters (e.g., `i, l, 1, o, O, 0`).
     Realtime Strength Meter: Provides immediate, sophisticated feedback on password security, considering length, character variety, entropy, and common patterns/sequences.
     Copy to Clipboard: Oneclick copy functionality with nonintrusive "Copied!" feedback.
     Clear Input Validation: Instant feedback on password length constraints and character type selection.
     Dark/Light Mode Toggle: Allows users to switch between themes for optimal viewing comfort.
 Security Features:
     ClientSide Hashing (for Storage): Generated passwords can be hashed using `SHA256` or `SHA512` via the Web Crypto API before local storage.
     Local Storage for Hashes: Stores a limited number of hashed passwords in the browser's `localStorage` for quick reference (with a clear disclaimer about its security limitations).
     Clear Stored Hashes Option: Allows users to easily delete all locally stored hashes.
 Accessibility (A11y) Focused:
     Semantic HTML5: Uses appropriate HTML elements for better structure and meaning.
     ARIA Attributes: Enhanced with ARIA roles and properties (`arialabel`, `arialive`, `ariaexpanded`, `role="progressbar"`) for improved screen reader support.
     Keyboard Navigation: All interactive elements are fully keyboardnavigable with clear focus indicators.
     Skip Link: Provides a quick way for keyboard and screen reader users to jump to the main content.
 Responsive Design: Fully adapts to various screen sizes, from desktops to mobile devices.

 How It Works

The generator's core logic is implemented in JavaScript, focusing on cryptographic best practices where applicable:

1. User Input Collection: Gathers preferences for password length, character types, exclusion settings, and template selection.
2. Validation: Checks for valid length ranges and ensures at least one character type is selected for the 'Default' template.
3. Secure Randomness: Utilizes `window.crypto.getRandomValues` for all random selections (characters, words, shuffle positions) for enhanced security compared to `Math.random()`.
4. TemplateBased Generation:
     Default: Ensures a minimum of one character from each selected type is included, then fills the remaining length from a combined pool of all selected types.
     PIN: Generates a sequence of digits.
     Passphrase: Selects a random number of words from an expanded dictionary and joins them with random separators.
5. Secure Shuffling: Applies the FisherYates (Knuth) shuffle algorithm, also using cryptographically secure randomness, to thoroughly mix the generated characters.
6. Password Strength Assessment: A sophisticated algorithm evaluates the generated password based on:
     Length (with logarithmic scoring)
     Inclusion of different character types (uppercase, lowercase, numbers, symbols)
     Balance of character types
     Penalties for common patterns (e.g., repeating characters, keyboard sequences, weak dictionary words)
     Shannon Entropy calculation, providing a more scientific measure of randomness.

 Technologies Used

 HTML5: For semantic document structure and content.
 CSS3: For styling, responsive design, theme switching, and microinteractions. Includes custom properties (CSS variables) for easy theme management.
 JavaScript (ES6+): Powers all dynamic functionality, password generation logic, Web Crypto API integration, and DOM manipulation.
 Font Awesome: For scalable vector icons.
 Google Fonts (Poppins): For a modern and clean typography.

 Getting Started

To get a local copy up and running, follow these simple steps.

 Prerequisites

You only need a modern web browser (e.g., Chrome, Firefox, Edge, Safari) to run this application.

 Installation

1. Clone the repository (if applicable, or simply download the project files):

git clone https://github.com/karthikbilaspur/100Days100Projects

Code
2. Navigate to the project directory:
cd strongpasswordgenerator

Code
3. Open `index.html` in your web browser.
    You can usually do this by doubleclicking the `index.html` file, or by rightclicking and choosing "Open with..." your preferred browser.

 Usage

1. Password Length: Adjust the numeric input (`min="8"`, `max="128"`) to set your desired password length.
2. Character Types: Select the checkboxes to include/exclude uppercase, lowercase, numbers, and symbols. These are primarily active for the 'Default' template.
3. Exclude Similar Characters: Check this option to remove easily confused characters (like `l`, `1`, `I`, `O`, `0`) from the character pool.
4. Password Template:
     Default: Generates a highly randomized password based on your chosen character types.
     PIN: Creates a numericonly password of your specified length.
     Passphrase: Generates a sequence of dictionary words (e.g., `adventureapplegalaxy`) which are often easier to remember and strong due to their length.
5. Hash Algorithm: Choose between `SHA256` or `SHA512`. The generated password will be hashed using this algorithm before being stored in your browser's local storage.
6. Generate Password: Click the "Generate Password" button. Your new password will instantly appear in the result display.
7. Copy to Clipboard: Click the clipboard icon next to the generated password to copy it to your system clipboard. A "Copied!" tooltip will briefly appear.
8. Password Strength: Observe the realtime strength meter and text below the settings to gauge the security of your generated password.
9. Stored Passwords Hashes: Below the generator, you'll see a list of the last 10 generated password hashes.
10. Clear Stored Hashes: Use the "Clear Stored Hashes" button to remove all password hashes from your browser's local storage.
11. Dark/Light Mode: Toggle the moon/sun switch in the header to change the application's theme.

 Accessibility Features

The application is built with accessibility in mind:

 Semantic HTML: Ensures a logical structure understandable by screen readers.
 ARIA Attributes: Provides additional context for interactive elements (e.g., `arialabel`, `role="textbox"`, `arialive="assertive"` for dynamic content).
 Keyboard Navigation: All controls are reachable and operable via keyboard. Use `Tab` to navigate, `Space` or `Enter` to activate buttons/checkboxes, and arrow keys for select elements.
 Focus Indicators: Clear visual outlines are provided for focused elements.
 Skip Link: A "Skip to main content" link (hidden until focused) is available for quick navigation past the header.
 `sronly` class: Used for visually hidden text that provides important context to screen reader users.

 Security Considerations

While this generator prioritizes strong password generation and secure hashing, it's crucial to understand its limitations:

 ClientSide Security: All generation, hashing, and storage occur entirely within your browser. This means:
     No data is sent to a server.
     The hashes stored in `localStorage` are not a substitute for a secure password manager. They are susceptible to CrossSite Scripting (XSS) attacks if your browser or this page were compromised.
     `localStorage` itself is not encrypted; the hashes are only protected by the browser's SameOrigin Policy.
