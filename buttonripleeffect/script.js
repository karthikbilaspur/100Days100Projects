const buttons = document.querySelectorAll('.ripple');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Calculate click position relative to the button
    const rect = button.getBoundingClientRect(); // Get button's position and size
    const xInside = e.clientX - rect.left;
    const yInside = e.clientY - rect.top;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = `${yInside}px`;
    circle.style.left = `${xInside}px`;

    // Append the circle
    button.appendChild(circle);

    // Get CSS variables to apply to the generated circle's animation
    const animationDuration = getComputedStyle(button).getPropertyValue('--animation-duration').trim();
    const animationTiming = getComputedStyle(button).getPropertyValue('--animation-timing').trim();

    // Check for a specific keyframe animation name, e.g., for "Big Pulse"
    let keyframeName = 'scale';
    if (button.classList.contains('big-pulse')) {
      keyframeName = 'bigPulseScale'; // Use a different keyframe for big-pulse
    }

    // Apply animation properties directly to the circle element
    // This allows us to use dynamic keyframe names
    circle.style.animation = `${keyframeName} ${animationDuration} ${animationTiming}`;

    // Define a custom keyframe for 'bigPulseScale' if it's the big-pulse button
    if (keyframeName === 'bigPulseScale') {
      // Create a style element to inject dynamic keyframes
      // This is a bit advanced; for a few keyframes, it's fine.
      // For many, consider using CSS classes or ensuring keyframes exist in CSS.
      if (!document.getElementById('bigPulseKeyframes')) {
        const style = document.createElement('style');
        style.id = 'bigPulseKeyframes';
        style.innerHTML = `
          @keyframes bigPulseScale {
            0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0.8; }
            50% { transform: translate(-50%, -50%) scale(2); opacity: 0.4; }
            100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; } /* Larger final scale */
          }
        `;
        document.head.appendChild(style);
      }
    }

    // Use animationend event to remove the circle
    circle.addEventListener('animationend', () => {
      circle.remove();
    }, { once: true }); // { once: true } ensures listener is removed after first use
  });
});