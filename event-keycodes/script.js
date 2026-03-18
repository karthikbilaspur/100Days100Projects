const keyContainer = document.getElementById('key-container');
const clearKeysButton = document.getElementById('clear-keys-button');
const copyKeysButton = document.getElementById('copy-keys-button');
const filterInput = document.getElementById('filter-input');
const sortNameButton = document.getElementById('sort-name-button');
const sortCodeButton = document.getElementById('sort-code-button');
const sortKeyCodeButton = document.getElementById('sort-key-code-button');
const keyStatistics = document.getElementById('key-statistics');

let allKeys = []; // Store all key data for sorting, filtering, and stats
let lastKeyPressedTimestamp = 0;
const THROTTLE_DELAY = 50; // milliseconds to prevent rapid duplicate key events

let sortState = {
    name: 'none', // 'none', 'asc', 'desc'
    code: 'none',
    keyCode: 'none'
};

// Function to update sort button texts and state
function updateSortButtonText(button, key) {
    let newText;
    switch (sortState[key]) {
        case 'none':
            newText = `Sort by ${key.replace('keyCode', 'Key Code')} (Asc)`;
            break;
        case 'asc':
            newText = `Sort by ${key.replace('keyCode', 'Key Code')} (Desc)`;
            break;
        case 'desc':
            newText = `Sort by ${key.replace('keyCode', 'Key Code')} (Default)`;
            break;
    }
    button.textContent = newText;
}

function createKeyElement(eventData) {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    keyElement.setAttribute('data-key-name', eventData.key);
    keyElement.setAttribute('data-key-code', eventData.code);
    keyElement.setAttribute('data-key-keycode-value', eventData.keyCode);

    const keyNameElement = document.createElement('div');
    keyNameElement.classList.add('key-name');
    keyNameElement.textContent = eventData.key === ' '? 'Space' : eventData.key;
    keyNameElement.innerHTML = `Key: <span>${keyNameElement.textContent}</span>`;

    const keyCodeElement = document.createElement('div');
    keyCodeElement.classList.add('key-code');
    keyCodeElement.textContent = eventData.code;
    keyCodeElement.innerHTML = `Code: <span>${keyCodeElement.textContent}</span>`;

    const keyValueElement = document.createElement('div');
    keyValueElement.classList.add('key-value'); // Added class for consistency
    keyValueElement.textContent = eventData.keyCode;
    keyValueElement.innerHTML = `Key Code: <span>${keyValueElement.textContent}</span>`;

    keyElement.appendChild(keyNameElement);
    keyElement.appendChild(keyCodeElement);
    keyElement.appendChild(keyValueElement);

    keyElement.addEventListener('click', (e) => {
        if (e.target.tagName!== 'SPAN') { // Prevent removing if clicking on the span content for copy
            removeKey(eventData.id);
        }
    });

    return keyElement;
}

function renderKeys(keysToRender = allKeys) {
    keyContainer.innerHTML = ''; // Clear current display
    if (keysToRender.length === 0) {
        keyContainer.innerHTML = '<div class="initial-message">Press any key to see its key code information!</div>';
    } else {
        keysToRender.forEach(eventData => {
            keyContainer.appendChild(createKeyElement(eventData));
        });
    }
    updateStatistics();
}

function handleKeydown(event) {
    // Throttle repeated keydown events for the same key to avoid duplicates when holding a key
    if (event.timeStamp - lastKeyPressedTimestamp < THROTTLE_DELAY && allKeys.some(k => k.key === event.key && k.code === event.code)) {
        return;
    }
    lastKeyPressedTimestamp = event.timeStamp;

    const newKeyData = {
        id: Date.now() + Math.random(), // Unique ID for removal
        key: event.key === ' '? 'Space' : event.key,
        code: event.code,
        keyCode: event.keyCode || event.which // event.which for older browsers
    };

    allKeys.unshift(newKeyData); // Add to the beginning for "newest first" default
    filterAndRenderKeys();
}

function removeKey(idToRemove) {
    allKeys = allKeys.filter(key => key.id!== idToRemove);
    filterAndRenderKeys();
}

function clearKeys() {
    allKeys = [];
    renderKeys();
}

function copyKeys() {
    const keysText = allKeys.map(key => {
        return `Key: ${key.key}\nCode: ${key.code}\nKey Code: ${key.keyCode}`;
    }).join('\n\n');

    navigator.clipboard.writeText(keysText).then(() => {
        alert('All key data copied to clipboard!');
    }).catch(error => {
        console.error('Error copying keys:', error);
        alert('Failed to copy keys. Please try again.');
    });
}

function filterAndRenderKeys() {
    const filterText = filterInput.value.toLowerCase().trim();
    let filteredKeys = allKeys;

    if (filterText) {
        filteredKeys = allKeys.filter(key =>
            key.key.toLowerCase().includes(filterText) ||
            key.code.toLowerCase().includes(filterText) ||
            String(key.keyCode).includes(filterText)
        );
    }
    
    // Re-apply sorting to filtered keys if a sort order is active
    let currentSortKey = Object.keys(sortState).find(key => sortState[key]!== 'none');
    if (currentSortKey) {
        performSort(filteredKeys, currentSortKey, sortState[currentSortKey]);
    } else {
        renderKeys(filteredKeys); // Render with only filtering
    }
}

function performSort(keysArray, sortBy, order) {
    keysArray.sort((a, b) => {
        let valA, valB;

        // Special handling for keyCode as it's numeric
        if (sortBy === 'keyCode') {
            valA = a[sortBy];
            valB = b[sortBy];
            if (order === 'asc') return valA - valB;
            if (order === 'desc') return valB - valA;
        } else {
            valA = a[sortBy].toLowerCase();
            valB = b[sortBy].toLowerCase();
            if (order === 'asc') return valA.localeCompare(valB);
            if (order === 'desc') return valB.localeCompare(valA);
        }
        return 0; // Should not happen if 'none' is handled
    });
    renderKeys(keysArray);
}

function handleSortClick(sortBy) {
    // Reset other sort states
    for (const key in sortState) {
        if (key!== sortBy) {
            sortState[key] = 'none';
        }
    }

    // Cycle through 'none', 'asc', 'desc'
    switch (sortState[sortBy]) {
        case 'none':
            sortState[sortBy] = 'asc';
            break;
        case 'asc':
            sortState[sortBy] = 'desc';
            break;
        case 'desc':
            sortState[sortBy] = 'none'; // Back to default (newest first)
            break;
    }

    // Update all button texts
    updateSortButtonText(sortNameButton, 'name');
    updateSortButtonText(sortCodeButton, 'code');
    updateSortButtonText(sortKeyCodeButton, 'keyCode');

    if (sortState[sortBy] === 'none') {
        filterAndRenderKeys(); // Re-render in default (newest first) order
    } else {
        const keysToSort = [...allKeys]; // Create a copy to sort
        performSort(keysToSort, sortBy, sortState[sortBy]);
    }
}

function updateStatistics() {
    if (allKeys.length === 0) {
        keyStatistics.textContent = 'No keys pressed yet.';
        return;
    }

    const totalKeys = allKeys.length;

    const uniqueKeys = new Set(allKeys.map(k => `${k.key}-${k.code}-${k.keyCode}`));
    const totalUniqueKeys = uniqueKeys.size;

    const keyCounts = {};
    allKeys.forEach(k => {
        const keyIdentifier = `${k.key}`; // Simpler identifier for frequency
        keyCounts[keyIdentifier] = (keyCounts[keyIdentifier] || 0) + 1;
    });

    let mostFrequentKey = 'N/A';
    let maxCount = 0;
    for (const key in keyCounts) {
        if (keyCounts[key] > maxCount) {
            maxCount = keyCounts[key];
            mostFrequentKey = key;
        }
    }

    keyStatistics.innerHTML = `
        Total Keys Pressed: <strong>${totalKeys}</strong> |
        Unique Key Combinations: <strong>${totalUniqueKeys}</strong> |
        Most Frequent Key: <strong>${mostFrequentKey}</strong> (${maxCount} times)
    `;
}

// Event Listeners
window.addEventListener('keydown', handleKeydown);
clearKeysButton.addEventListener('click', clearKeys);
copyKeysButton.addEventListener('click', copyKeys);
filterInput.addEventListener('input', filterAndRenderKeys);
sortNameButton.addEventListener('click', () => handleSortClick('key'));
sortCodeButton.addEventListener('click', () => handleSortClick('code'));
sortKeyCodeButton.addEventListener('click', () => handleSortClick('keyCode'));

// Initialize sort button texts
updateSortButtonText(sortNameButton, 'key');
updateSortButtonText(sortCodeButton, 'code');
updateSortButtonText(sortKeyCodeButton, 'keyCode');

// Initial render for statistics
updateStatistics();