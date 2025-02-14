const workerPool = new WorkerPool('worker.js', 4);

document.getElementById('process-button').addEventListener('click', () => {
    const imageInput = document.getElementById('image-input');
    if (imageInput.files.length > 0) {
        const imageFile = imageInput.files[0];
        workerPool.postTask({ imageFile })
            .then((result) => {
                const outputContainer = document.getElementById('output-container');
                outputContainer.innerHTML = '';
                const outputImage = document.createElement('img');
                outputImage.src = result;
                outputContainer.appendChild(outputImage);
            })
            .catch((error) => {
                console.error(error);
            });
    }
});