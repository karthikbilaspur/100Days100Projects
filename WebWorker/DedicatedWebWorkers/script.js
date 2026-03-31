// --- Web Worker Code (worker.js equivalent - embedded as a string) ---
const workerCode = `
    function applyGrayscaleFilter(imageData) {
        const data = imageData.data; // This is a Uint8ClampedArray
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i]; // Red
            const g = data[i + 1]; // Green
            const b = data[i + 2]; // Blue

            // Simple grayscale conversion formula:
            const gray = (r * 0.299 + g * 0.587 + b * 0.114);

            data[i] = gray; // Set Red to gray
            data[i + 1] = gray; // Set Green to gray
            data[i + 2] = gray; // Set Blue to gray
            // Alpha (data[i + 3]) remains unchanged
        }
        return imageData; // Return the modified ImageData object
    }

    self.onmessage = (event) => {
        const imageData = event.data.imageData;
        const filteredImageData = applyGrayscaleFilter(imageData);
        self.postMessage(filteredImageData, [filteredImageData.data.buffer]);
    };
`;

// Create a Blob from the worker code string
const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
// Create a URL for the Blob (this acts like a worker.js file)
const workerUrl = URL.createObjectURL(workerBlob);

// --- Main Thread JavaScript ---
const filteredCanvas = document.getElementById('filtered-canvas');
const filteredCtx = filteredCanvas.getContext('2d');
const imageUpload = document.getElementById('image-upload');
const applyFilterButton = document.getElementById('apply-filter-button');
const mainThreadButton = document.getElementById('main-thread-button');
const uiCounterDisplay = document.getElementById('ui-counter-display');
const currentYearSpan = document.getElementById('current-year');

let workerInstance; // Renamed to avoid confusion with `worker` in Blob creation
let currentImageData = null;
let uiCounter = 0;

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Initialize canvas with a placeholder or default background
function initializeCanvas() {
    filteredCanvas.width = 400;
    filteredCanvas.height = 400;
    filteredCtx.fillStyle = '#3e4451'; // Match --secondary-bg from CSS
    filteredCtx.fillRect(0, 0, filteredCanvas.width, filteredCanvas.height);
    filteredCtx.fillStyle = '#ffffff'; // Match --text-color from CSS
    filteredCtx.textAlign = 'center';
    filteredCtx.textBaseline = 'middle';
    filteredCtx.font = '20px Arial';
    filteredCtx.fillText('Upload an image to start!', filteredCanvas.width / 2, filteredCanvas.height / 2);
}
initializeCanvas();

// === UI Responsiveness Demonstration ===
mainThreadButton.addEventListener('click', () => {
    uiCounter++;
    uiCounterDisplay.textContent = uiCounter;
});

// === Image Loading ===
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Ensure canvas matches image dimensions up to a max
                const maxWidth = 800; // Example max width for display
                const maxHeight = 600; // Example max height for display
                let width = img.naturalWidth;
                let height = img.naturalHeight;

                // Scale down if image is too large for display
                if (width > maxWidth || height > maxHeight) {
                    if (width / maxWidth > height / maxHeight) {
                        height = Math.round(height * (maxWidth / width));
                        width = maxWidth;
                    } else {
                        width = Math.round(width * (maxHeight / height));
                        height = maxHeight;
                    }
                }

                filteredCanvas.width = width;
                filteredCanvas.height = height;

                // Draw original to filtered canvas and get ImageData
                filteredCtx.clearRect(0, 0, filteredCanvas.width, filteredCanvas.height);
                filteredCtx.drawImage(img, 0, 0, width, height);
                currentImageData = filteredCtx.getImageData(0, 0, width, height);

                applyFilterButton.disabled = false;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        applyFilterButton.disabled = true;
        initializeCanvas(); // Reset canvas
        currentImageData = null;
    }
});

// === Web Worker Integration for Filter ===
applyFilterButton.addEventListener('click', () => {
    if (!currentImageData) {
        alert('Please upload an image first!');
        return;
    }

    applyFilterButton.textContent = 'Applying... (UI Responsive)';
    applyFilterButton.disabled = true;

    if (workerInstance) {
        workerInstance.terminate(); // Terminate existing worker if any
    }

    // Create a new worker instance using the Blob URL
    workerInstance = new Worker(workerUrl);

    // Message to worker with image data (using transferable objects for efficiency)
    // currentImageData.data is a Uint8ClampedArray, its buffer can be transferred.
    workerInstance.postMessage({ imageData: currentImageData }, [currentImageData.data.buffer]);

    // Listen for messages from the worker
    workerInstance.onmessage = (event) => {
        const filteredImageData = event.data;
        filteredCtx.putImageData(filteredImageData, 0, 0); // Draw filtered image

        applyFilterButton.textContent = 'Apply Grayscale Filter';
        applyFilterButton.disabled = false;

        // Terminate worker after use for resource management
        workerInstance.terminate();
        workerInstance = null;
    };

    // Handle errors from the worker
    workerInstance.onerror = (error) => {
        console.error("Worker error:", error);
        alert("An error occurred during image processing. Check console for details.");
        applyFilterButton.textContent = 'Apply Grayscale Filter';
        applyFilterButton.disabled = false;
        if (workerInstance) {
            workerInstance.terminate();
            workerInstance = null;
        }
    };
});
