# Upgraded Mega Preloader Project

This project demonstrates an enhanced web preloader combining Bootstrap for layout, custom CSS for animation and styling, a CSS sprite for a custom loading animation, and JavaScript for dynamic content loading simulation and preloader management.

## Features

   Responsive Layout: Utilizes Bootstrap 5 for a mobilefirst, responsive main content structure.
   Custom CSS Sprite Animation: Features a 5frame robot walking animation using a CSS sprite sheet and `@keyframes`.
   Dynamic Loading Experience:
       Typewriter effect for loading messages.
       Progress bar indicating loading progress.
   Smooth Transitions: Preloader fades out gracefully, and main content elements animate in with staggered delays using `animate.css`.
   Accessibility: Includes `ariahidden` for the preloader.
   Theming: Easy customization of colors and animation speeds via CSS variables.

## Technologies Used

 HTML5: Structure of the web page.
CSS3: Styling, custom animations, and layout.
JavaScript (ES6+): Preloader logic, simulated content loading, and dynamic text/progress updates.
Bootstrap 5: Frontend framework for responsive design and UI components.
Animate.css: A library of readytouse CSS animations for the main content's entrance effects.

    *   `index.html`: Contains the main HTML structure, Bootstrap and Animate.css CDN links, and links to our custom CSS and JS.
    *   `style.css`: Defines all the custom styles, preloader animations, sprite animation, and main content entrance animations.
    *   `script.js`: Handles the preloader's behavior, simulates content loading, updates the progress bar and loading text, and manages the fadeout/content reveal.
    *   `img/spritev2.png`: The 5frame robot walking animation sprite sheet. Make sure this image is present in the `img` subdirectory.

3.  Sprite Image:
    The project uses a custom 5frame robot sprite. The `style.css` expects an image named `spritev2.png` (or `sprite.png` if you've updated its name) in the `img/` folder. If you wish to use a different sprite, ensure you update the `backgroundimage` URL and the `steps()` and `backgroundposition` values in the `spriteloader` and `@keyframes playSprite` rules within `style.css` accordingly.

4.Open in Browser:
    Simply open the `index.html` file in your preferred web browser (e.g., Chrome, Firefox, Edge).

## How to Customize

Sprite Image: Replace `img/sprite.jpeg` with your own sprite sheet. Remember to adjust `width`, `height`, `steps()`, and `backgroundposition` in `style.css` to match your new sprite's dimensions and frame count.

Colors & Speed: Modify the CSS variables defined in `:root` in `style.css` (e.g., `preloaderbgstart`, `spriteanimationspeed`) to quickly change the preloader's look and feel.

Loading Messages: Edit the `loadingMessages` array in `script.js` to change the dynamic text displayed during loading.

Loading Duration: Adjust the `setTimeout` delays in `script.js` to simulate longer or shorter loading times.
Main Content Animations: Utilize different classes from [Animate.css](https://animate.style/) (e.g., `animate__bounceIn`, `animate__lightSpeedInLeft`) and adjust `animationdelay` in `index.html` or `style.css` for varied entrance effects.
Bootstrap Components: Integrate more Bootstrap components into `#maincontent` to further enhance the layout and functionality of your page.
