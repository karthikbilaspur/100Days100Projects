# PROJECT: Customer Feedback UI

OVERVIEW:
This is a simple interactive feedback web page that allows users to rate customer support performance using emojibased options and submit their response.

STRUCTURE:
1.HTML
 Displays a feedback panel with a question.
 Provides three rating options: Unhappy, Neutral, Satisfied.
 Includes a "Send Review" button.
 Links external CSS and JavaScript files.
 Uses Google Fonts (Montserrat).

2.CSS
 Centers the panel on the screen using Flexbox.
 Styles the feedback container with shadows and rounded corners.
 Adds hover and active effects for ratings.
 Styles button interactions (click, focus).
 Uses a soft color palette for a clean UI.

3.JavaScript
 Handles user interaction with rating selection.
 Tracks the selected rating (default: "Satisfied").
 Adds/removes "active" class on click.
 Updates UI dynamically after submission.
 Displays a thankyou message with selected feedback.
 Includes basic error handling function.

KEY FEATURES:
 Interactive emojibased rating system.
 Dynamic UI update without page reload.
 Simple and clean responsive design.
 Event delegation for efficient click handling.

LOGIC FLOW:
1.User selects a rating.
2. Selected rating is stored in a variable.
3. User clicks "Send Review".
4. Panel content is replaced with a thankyou message showing selected rating.

POTENTIAL IMPROVEMENTS:
 Add form validation (ensure selection before submission).
 Connect to backend/database to store feedback.
 Improve accessibility (ARIA labels, keyboard navigation).
 Add animations for smoother transitions.
 Use semantic HTML elements for better structure.
