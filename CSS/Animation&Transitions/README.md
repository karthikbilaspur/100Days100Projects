# Getting Started

To view this animated example:

1. Save the HTML code as `index.html`.
2. Save the CSS code as `style.css` in the same directory.
3. Save the JavaScript code as `script.js` in the same directory.
4. Open `index.html` in your web browser.

## JavaScript Functionality (`script.js`)

The `script.js` file handles the interactivity.

1. **Element Selection:** It selects the button, the animation box, and the duration/delay sliders and their display spans.
2. **Toggle Animation:** An event listener on `animateButton` toggles the `animate` class on `animationBox` when clicked.
3. **Update Duration:** An event listener on `durationInput` updates the `transitionDuration` CSS property of `animationBox` and the displayed value whenever the slider is moved.
4. **Update Delay:** Similarly, an event listener on `delayInput` updates the `transitionDelay` CSS property and the displayed value for the animation's delay.

### CSS Styling (`style.css`)

The `style.css` file provides the visual design for the page and defines the animation.

* **`animation-box`:** Styles the square box with a dark background.
* **`animation-box.animate`:** This class is toggled by JavaScript. When active, it applies a `transform` property to `rotate(360deg)` and `scale(2)`, making the box spin and double in size.
* **`transition` property:** The `transition` property on `.animation-box` defines how the `transform` changes smoothly over time, with `1s` as the default duration and `ease-in-out` for the timing function. This duration and delay are dynamically updated by JavaScript.
