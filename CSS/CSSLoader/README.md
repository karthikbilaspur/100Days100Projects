# CSS Loader

This code creates a web page featuring a collection of eight different CSS loading animations.

HTML Structure (index.html):
   A main `div` with the class `container` holds the title "CSS Loaders" and two rows of loader examples.
   Each row (`row cf`) contains four columns (`three col`).
   Inside each column, there's a `div` with the class `loader` and a unique ID (e.g., `loader1` to `loader8`).
   Some loaders (`loader2`, `loader4`, `loader5`, `loader6`) contain multiple `span` elements, which are used as individual animated components.
   A simple `footer` with copyright information is included at the bottom.
   It links to a `styles.scss` (Sass) file, implying the CSS is preprocessed, and Google Fonts for 'Open Sans'.

CSS Styling (styles.scss):
   Global: Sets full width/height for html/body, removes default margins/paddings, and applies 'Open Sans' font.
   Grid System: Implements a simple 12column floatbased grid system using classes like `.twelve`, `.three`, etc., for width, and `.col` for common column styling (float, margin).
   Container & Layout:
       `.container`: Centers content, sets a maxwidth, and provides basic text alignment.
       `.cf` (Clearfix): Ensures parent elements properly contain floated children.
       `.row`: Adds vertical spacing between rows.
       `.three`: Sets a background color and padding for the loader containers.
   Loader Base:
       `.loader`: Defines a common base for all loaders (100px square, circular, relative positioning, centered).
   Specific Loaders (Animations):
       Loader 1 (Spinning Circle): Uses `:before` and `:after` pseudoelements to create two overlapping circles. The `:before` element has a partial colored border and is animated to `spin` 360 degrees.
       Loader 2 (Bouncing Dots): Three `span` elements are styled as dots. Each dot undergoes a `bounce` animation with a staggered delay, making them bounce up and down sequentially.
       Loader 3 (Moving Squares): Uses `:before` and `:after` pseudoelements, styled as squares. They perform a `squaremove` animation, traversing a square path while rotating, with a delay for the second square.
       Loader 4 (Fading Dots): Similar to Loader 2 but the three dots animate their `opacity` (`opacitychange`) with staggered delays, making them appear and disappear one after another.

The code demonstrates various pure CSS techniques for creating animated loading indicators using pseudoelements, transforms, and keyframe animations.
