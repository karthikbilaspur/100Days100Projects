# Advanced Guess the Number Game built with HTML5, CSS3, and JavaScript, designed for a more engaging and robust user experience compared to a basic version

Key Features and Advanced Aspects:

Difficulty Levels: Players can choose between Easy (1-50, 10 guesses), Medium (1-100, 7 guesses), and Hard (1-200, 5 guesses), directly impacting the game's parameters.
Attempts Limit: Each difficulty level comes with a predefined number of guesses, adding a strategic element.
Dynamic UI Management: Input fields and buttons are dynamically enabled/disabled based on the game state (e.g., disabled before game start, during gameplay, or after game end).
Visual Proximity Feedback: The body background color subtly changes to reflect how close the current guess is to the secret number (bg-near, bg-warm, bg-cool), providing more nuanced hints than just "too high/low."
Last Guess Hint Mechanism: If a player has only one guess remaining, a special hint is provided, revealing whether the secret number is even or odd.
Confetti Celebration: Upon a correct guess, a confetti animation (using the canvas-confetti library) is triggered for a celebratory effect.
Clear Separation of Concerns (JavaScript): The JavaScript logic is structured into distinct functions for initialization, guess checking, game ending, resetting, and applying visual effects, promoting maintainability and readability.
Enhanced Styling (CSS3): Uses custom CSS variables, Google Fonts (Press Start 2P, Roboto), and responsive design (@media queries) to create a modern and visually appealing retro-game aesthetic.
Accessibility (HTML/ARIA): Incorporates ARIA attributes (aria-label, aria-live) on key interactive elements and message areas to improve usability for screen reader users.
Robust Input Handling: Includes basic validation for user input to ensure it's a number within the specified range.
Keyboard Support: Allows users to submit their guess by pressing the Enter key.
