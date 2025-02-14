const sharedWorker = new SharedWorker('shared-worker.js');
sharedWorker.port.onmessage = (event) => {
    document.getElementById('counter-output').textContent = `Counter: ${event.data}`;
};
document.getElementById('decrement-button').addEventListener('click', () => {
    sharedWorker.port.postMessage('decrement');
});