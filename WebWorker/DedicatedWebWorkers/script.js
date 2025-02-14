const canvas = document.getElementById('mandelbrot-canvas');
const ctx = canvas.getContext('2d');
const zoomLevelInput = document.getElementById('zoom-level');
const iterationCountInput = document.getElementById('iteration-count');
const generateButton = document.getElementById('generate-button');

let worker;

generateButton.addEventListener('click', () => {
    const zoomLevel = parseInt(zoomLevelInput.value);
    const iterationCount = parseInt(iterationCountInput.value);
    worker = new Worker('worker.js');
    worker.postMessage({ zoomLevel, iterationCount });
    worker.onmessage = (event) => {
        const imageData = event.data;
        ctx.putImageData(imageData, 0, 0);
    };
});