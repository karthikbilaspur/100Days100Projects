# Button Ripple Variations

 ✨ Project Overview

This project showcases a dynamic button ripple effect with four distinct variations. Each button demonstrates a different ripple style, controlled through CSS variables and a single JavaScript function. It's a great example of interactive UI elements using modern web technologies.

 🚀 Demo

Click the buttons to see the ripple effects in action!

 🛠️ Technologies Used

* HTML5: For the page structure and button elements.
* CSS3: For styling, defining ripple animations, and using CSS variables for customization.
* JavaScript (ES6+): For handling click events, creating ripple elements dynamically, and managing animation.

 💡 Features

* Four distinct button ripple effects.
* Customizable ripple color, size, duration, and timing function using CSS variables.
* Responsive design for various screen sizes.
* Smooth animations and efficient DOM manipulation.
* Accessibility considerations (ARIA attributes, keyboard navigation).

 🚀 Getting Started

To get this project up and running locally, simply follow these steps:

 👨‍💻 How it Works

* HTML: Defines four sections, each with a `button` element.
* CSS: Styles the buttons and creates the base `.circle` element for the ripple. Each button variation (e.g., `.classic-ripple`, `.gentle-wave`) overrides specific CSS variables (`--ripple-color`, `--animation-duration`, etc.) to achieve its unique look.
* JavaScript:
* Listens for `click` events on all elements with the `.ripple` class.
* On click, it creates a `span` element with the class `circle`.
* Positions this `circle` at the exact click location.
* Applies the animation properties (duration, timing) that are defined in CSS using the button's inherited CSS variables.
* Removes the `circle` element once its animation is complete using the `animationend` event listener.
* Includes a special custom keyframe for the "Big Pulse" effect, injected dynamically for more unique animation control.
