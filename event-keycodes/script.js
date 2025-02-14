const keyContainer = document.getElementById('key-container');
const clearKeysButton = document.getElementById('clear-keys-button');
const copyKeysButton = document.getElementById('copy-keys-button');

function createKeyElement(event) {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');

    const keyNameElement = document.createElement('div');
    keyNameElement.classList.add('key-name');
    keyNameElement.textContent = `Key: ${event.key === ' ' ? 'Space' : event.key}`;

    const keyCodeElement = document.createElement('div');
    keyCodeElement.classList.add('key-code');
    keyCodeElement.textContent = `Code: ${event.code}`;

    const keyValueElement = document.createElement('div');
    keyValueElement.textContent = `Key Code: ${event.keyCode}`;

    keyElement.appendChild(keyNameElement);
    keyElement.appendChild(keyCodeElement);
    keyElement.appendChild(keyValueElement);

    keyElement.addEventListener('click', () => {
        keyElement.remove();
    });

    return keyElement;
}

function handleKeydown(event) {
    try {
        const keyElement = createKeyElement(event);
        keyContainer.appendChild(keyElement);
    } catch (error) {
        console.error('Error handling keydown event:', error);
    }
}

function clearKeys() {
    while (keyContainer.firstChild) {
        keyContainer.removeChild(keyContainer.firstChild);
    }
}

function copyKeys() {
    const keysText = Array.from(keyContainer.children).map(key => {
        return `${key.querySelector('.key-name').textContent}\n${key.querySelector('.key-code').textContent}\n${key.querySelector('.key-value').textContent}\n`;
    }).join('\n');

    navigator.clipboard.writeText(keysText).then(() => {
        console.log('Keys copied to clipboard!');
    }).catch(error => {
        console.error('Error copying keys:', error);
    });
}

window.addEventListener('keydown', handleKeydown);
clearKeysButton.addEventListener('click', clearKeys);
copyKeysButton.addEventListener('click', copyKeys);