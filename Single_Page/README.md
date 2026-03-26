# Auth Portal Code

This code implements a robust webbased authentication portal, featuring user login, registration, and a simulated TwoFactor Authentication (2FA) step.

HTML (index.html):
 Defines the core structure of the portal, including:
     A main wrapper for the entire application.
     A central authentication card that dynamically switches between login, register, and 2FA forms.
     A user dashboard displayed upon successful authentication.
     An enhanced footer section.

 Head Section Enhancements:
     Dynamic Title: The `<title>` tag is updated by JavaScript based on the active form or user status (Login, Register, 2FA, Welcome).
     SEO & Social Meta Tags: Comprehensive `<meta>` tags for `description`, `keywords`, and `author` to improve search engine visibility.
     Open Graph & Twitter Cards: Includes `og:` and `twitter:` meta tags for rich previews when shared on social media platforms like Facebook and Twitter.
     Favicon: A custom favicon (a 🔐 emoji) is embedded for better branding in browser tabs.
     External Resources: Links to Google Fonts (Poppins) for modern typography and Font Awesome for a wide range of icons (e.g., password visibility toggle, spinners, social media icons).

 Authentication Forms:
     Login Form: Collects email and password, includes a "Remember me" checkbox, and a "Forgot Password" link.
     Register Form: Collects username, email, password, and confirms password. Features a realtime password strength indicator.
     2FA Form: A new form for simulating TwoFactor Authentication, asking for a verification code.

 User Dashboard: A simple display for loggedin users, showing a welcome message and a logout button.

 Footer Enhancements:
     Copyright: Displays a dynamic copyright year with a clickable link to "KarthikCodingSolutions".
     Social Media Icons: Integrates Font Awesome social icons (GitHub, Twitter, LinkedIn) with clickable links.

CSS (styles.css):
 Provides a clean, modern, and visually appealing design using the Poppins font.
 Utilizes CSS variables for easy theme management (colors, fonts, shadows).
 Styles for the main layout, authentication card, and dashboard.
 Advanced styling for:
     Form inputs, labels, and error messages (dynamic styling for invalid fields).
     Password visibility toggle icons.
     A visual password strength indicator with distinct segments and colors (weak, medium, strong, very strong).
     Loading spinners within buttons to indicate active processes.
     Dynamic `authmessage` elements for success/error feedback.
 Specific styles for the 2FA form, including input formatting for the verification code and a resend button.
 Comprehensive styling for the enhanced footer, including icon sizing, spacing, and hover effects.
 Includes responsive design considerations for various screen sizes.

JavaScript (script.js):
 Core Logic: Manages the authentication flow, including switching between login, register, and 2FA forms.
 Simulated Backend: Uses `simulateApiCall()` with `setTimeout` to mimic network delays and simulate successful or failed API responses for login, registration, and 2FA.
 User Management: Stores simulated user data (username, passwordHash, 2FA status) in a `Map`.
 UI Control: Dynamically shows/hides forms, updates button states (loading spinners), and displays user feedback (success/error messages).
 Frontend Validation: Implements `validationRules` for email, password (with strength requirements), username, and 2FA codes. Provides realtime feedback on input fields.
 Password Visibility: Toggles password input type (password/text) with an eye icon.
 Password Strength Indicator: Dynamically updates the visual and textual strength of the password as the user types.
 "Remember Me" Functionality: Stores a user identifier in `localStorage` or `sessionStorage` to simulate keeping a user logged in across sessions (in a real app, this would involve refresh tokens).
 TwoFactor Authentication (2FA):
     Integrates a 2FA step after successful password login for users with simulated 2FA enabled.
     Provides a UI for entering the verification code and a simulated "Resend Code" feature with a cooldown timer.
 Dynamic Page Title: Updates the browser tab's title based on the current state of the application.
 Event Handling: Attaches event listeners to forms, buttons, tabs, and input fields for user interaction.
 Initialization: Checks for a remembered user on page load and restores the appropriate UI state.
