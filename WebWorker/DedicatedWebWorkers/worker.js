function generateMandelbrotImage(zoomLevel, iterationCount) {
    const canvasWidth = 800;
    const canvasHeight = 800;
    const imageData = new ImageData(canvasWidth, canvasHeight);
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            const real = (x - canvasWidth / 2) * 4 / zoomLevel;
            const imaginary = (y - canvasHeight / 2) * 4 / zoomLevel;
            const iteration = iterateMandelbrot(real, imaginary, iterationCount);
            const color = getColor(iteration, iterationCount);
            imageData.data[(y * canvasWidth * 4) + (x * 4)] = color.r;
            imageData.data[(y * canvasWidth * 4) + (x * 4) + 1] = color.g;
            imageData.data[(y * canvasWidth * 4) + (x * 4) + 2] = color.b;
            imageData.data[(y * canvasWidth * 4) + (x * 4) + 3] = 255;
        }
    }
    return imageData;
}

function iterateMandelbrot(real, imaginary, iterationCount) {
    let currentReal = real;
    let currentImaginary = imaginary;
    for (let i = 0; i < iterationCount; i++) {
        const newReal = currentReal * currentReal - currentImaginary * currentImaginary + real;
        const newImaginary = 2 * currentReal * currentImaginary + imaginary;
        currentReal = newReal;
        currentImaginary = newImaginary;
        if (currentReal * currentReal + currentImaginary * currentImaginary > 4) {
            return i;
        }
    }
    return iterationCount;
}

function getColor(iteration, iterationCount) {
    if (iteration === iterationCount) {
        return { r: 0, g: 0, b: 0 };
    } else {
        const hue = iteration / iterationCount;
        const r = Math.floor(hue * 255);
        const g = Math.floor((1 - hue) * 255);
        const b = 255 - r - g;
        return { r, g, b };
    }
}

self.onmessage = (event) => {
    const { zoomLevel, iterationCount } = event.data;
    const imageData = generateMandelbrotImage(zoomLevel, iterationCount);
    self.postMessage(imageData);
};