# Simon Says Game Code

This code implements a classic "Simon Says" memory and reaction game.

HTML (index.html):
 Sets up the basic structure of a web page for the game.
 Includes meta tags for SEO and social media sharing.
 Links to external resources like Google Fonts (Bangers, Press Start 2P, Roboto) for a retro aesthetic and Font Awesome for social icons.
 Divides the page into a header (game title, tagline), main content area (game info like round/score, display for Simon Says commands, timer bar, game controls, and feedback), and a footer (copyright, social links, and "How to play" instructions).
 Dynamically adds a "Start New Game" button and a difficulty selector (Easy, Medium, Hard).

CSS (style.css  provided by me based on your request):
 Aims for a retrogaming aesthetic with a dark, contrasting color scheme (red, yellow, green, blue accents).
 Uses distinct fonts for headers, game text, and general body text.
 Styles the main game wrapper with borders and shadows.
 Formats game information (round, score), command display, and feedback messages.
 Crucially, it provides styling for a dynamic countdown timer bar.
 Buttons are styled with a "chunky" retro feel, including hover effects and disabled states.
 Includes basic responsiveness for different screen sizes.

JavaScript (script.js):
 Constants: Defines game commands, difficulty settings (command display time, action time, number of commands per round, delay), and game states (IDLE, SIMON_SAYS, AWAITING_ACTION, GAME_OVER).
 DOM Elements: Selects various HTML elements to interact with them.
 Game State Variables: Manages the game's current state, round, score, active commands, selected difficulty, and various timers/button references.
 Utility Functions:
     `getRandomCommand()`: Selects a random command from the predefined list.
     `delay(ms)`: A Promisebased function for pausing execution.
     `showFeedback()` and `clearFeedback()`: Manages messages displayed to the player.
     `setControlsDisabled()`: Enables/disables game control buttons.
     `resetTimerBar()` and `startTimerAnimation()`: Controls the visual countdown timer.
     `createActionButton()` and `removeActionButton()`: Dynamically adds/removes the "I did it!" button.
 Game Logic Functions:
     `nextRound()`: Increments round, updates score, generates new commands based on difficulty, and calls `displayCommandsToSimon()`.
     `displayCommandsToSimon()`: Iterates through the commands for the current round, displaying each one with "Simon says:" and managing the timer animation.
     `promptForAction()`: Changes the game state to `AWAITING_ACTION`, displays action prompt, creates the "I did it!" button, and starts a timer for the player's response.
     `handleActionButtonClick()`: Triggered when the player clicks "I did it!". Checks game state, stops timer, updates score, shows feedback, and moves to the next round.
     `endGame()`: Cleans up timers, disables controls, removes the action button, displays game over messages, and shows the final score.
     `initializeGame()`: Resets game state variables, sets difficulty, prepares the display, and starts the first round.

 Event Listeners:
     `startGameButton`: Calls `initializeGame()` to start or restart the game.
     `difficultySelect`: Updates the `difficulty` variable when the player changes it.
     `DOMContentLoaded`: Sets initial display messages and resets the timer bar when the page loads.
