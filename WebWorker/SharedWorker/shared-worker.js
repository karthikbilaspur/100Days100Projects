let counter = 0;
self.onconnect = (event) => {
    const port = event.ports[0];
    port.onmessage = (event) => {
        if (event.data === 'increment') {
            counter++;
        } else if (event.data === 'decrement') {
            counter--;
        }
        port.postMessage(counter);
    };
};