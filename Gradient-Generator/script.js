// DOM Elements
const livePreview = document.getElementById('livePreview');
const gradientTypeSelect = document.getElementById('gradientType');

// Linear Gradient Controls
const linearControls = document.querySelector('.linear-controls');
const gradientAngleInput = document.getElementById('gradientAngle');
const angleValueSpan = document.getElementById('angleValue');

// Radial Gradient Controls
const radialControls = document.querySelector('.radial-controls');
const radialShapeSelect = document.getElementById('radialShape');
const radialSizeSelect = document.getElementById('radialSize');
const radialPositionXInput = document.getElementById('radialPositionX');
const positionXValueSpan = document.getElementById('positionXValue');
const radialPositionYInput = document.getElementById('radialPositionY');
const positionYValueSpan = document.getElementById('positionYValue');

// Color Stop Controls
const colorStopsContainer = document.getElementById('colorStopsContainer');
const colorStopList = document.getElementById('colorStopList');
const addColorStopBtn = document.getElementById('addColorStop');
const distributeStopsBtn = document.getElementById('distributeStops'); // New
const colorStopTrash = document.getElementById('colorStopTrash'); // New

// Code Output
const cssCodeOutput = document.getElementById('cssCodeOutput');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const copyMessage = document.getElementById('copyMessage');

// Presets
const presetBtns = document.querySelectorAll('.preset-btn');

// Save/Load Controls (New)
const gradientNameInput = document.getElementById('gradientNameInput');
const saveGradientBtn = document.getElementById('saveGradientBtn');
const savedGradientsSelect = document.getElementById('savedGradientsSelect');
const loadGradientBtn = document.getElementById('loadGradientBtn');
const deleteGradientBtn = document.getElementById('deleteGradientBtn');

// Undo/Redo Controls (New)
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');

// --- Global State ---
let gradientConfig = {
    type: 'linear',
    angle: 90,
    radial: {
        shape: 'ellipse',
        size: 'farthest-corner',
        positionX: 50,
        positionY: 50
    },
    colorStops: [
        { color: '#6dd5ed', stop: 0, id: 0 },
        { color: '#2193b0', stop: 100, id: 1 }
    ],
    nextColorStopId: 2 // For unique IDs
};

const defaultPresets = {
    preset1: { // Sunset
        type: 'linear',
        angle: 45,
        colorStops: [
            { color: '#f093fb', stop: 0, id: 0 },
            { color: '#f5576c', stop: 100, id: 1 }
        ]
    },
    preset2: { // Ocean
        type: 'linear',
        angle: 180,
        colorStops: [
            { color: '#4facfe', stop: 0, id: 0 },
            { color: '#00f2fe', stop: 100, id: 1 }
        ]
    },
    preset3: { // Forest
        type: 'radial',
        radial: { shape: 'ellipse', size: 'farthest-corner', positionX: 50, positionY: 50 },
        colorStops: [
            { color: '#a8ff78', stop: 0, id: 0 },
            { color: '#78ffd6', stop: 100, id: 1 }
        ]
    }
};

let savedGradients = JSON.parse(localStorage.getItem('savedGradients')) || {}; // New: Saved gradients
let history = []; // New: Undo/Redo history
let historyIndex = -1; // New: Current position in history

// --- Helper Functions ---

// New: Update history stack
function updateHistory() {
    // If we've undone, clear forward history
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    history.push(JSON.parse(JSON.stringify(gradientConfig))); // Deep copy
    historyIndex = history.length - 1;
    updateUndoRedoButtons();
}

// New: Apply a history state
function applyHistoryState(state) {
    gradientConfig = JSON.parse(JSON.stringify(state)); // Deep copy
    
    // Update UI to reflect history state
    gradientTypeSelect.value = gradientConfig.type;
    gradientAngleInput.value = gradientConfig.angle;
    angleValueSpan.textContent = `${gradientConfig.angle}°`;
    radialShapeSelect.value = gradientConfig.radial.shape;
    radialSizeSelect.value = gradientConfig.radial.size;
    radialPositionXInput.value = gradientConfig.radial.positionX;
    positionXValueSpan.textContent = `${gradientConfig.radial.positionX}%`;
    radialPositionYInput.value = gradientConfig.radial.positionY;
    positionYValueSpan.textContent = `${gradientConfig.radial.positionY}%`;

    toggleRadialControls();
    renderColorStops(); // Renders color stop UI and updates preview
    updateUndoRedoButtons();
}

// New: Update Undo/Redo button states
function updateUndoRedoButtons() {
    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= history.length - 1;
}

function updatePreview() {
    let cssString = generateCssGradient();
    livePreview.style.background = cssString;
    cssCodeOutput.value = `background-image: ${cssString};\nbackground-image: -webkit-${cssString};\nbackground-image: -moz-${cssString};`; // Added vendor prefixes
    updateRemoveButtons();
}

function generateCssGradient() {
    const sortedStops = [...gradientConfig.colorStops].sort((a, b) => a.stop - b.stop);
    const stopsString = sortedStops.map(stop => `${stop.color} ${stop.stop}%`).join(', ');

    if (gradientConfig.type === 'linear') {
        return `linear-gradient(${gradientConfig.angle}deg, ${stopsString})`;
    } else { // radial
        const { shape, size, positionX, positionY } = gradientConfig.radial;
        return `radial-gradient(${shape} ${size} at ${positionX}% ${positionY}%, ${stopsString})`;
    }
}

function updateRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-color-stop-btn');
    removeButtons.forEach(btn => {
        btn.disabled = gradientConfig.colorStops.length <= 2; // Always keep at least 2 stops
    });
}

// New: Drag-and-drop variables
let draggedItem = null;

function renderColorStops() {
    colorStopList.innerHTML = ''; // Clear previous stops
    
    gradientConfig.colorStops.sort((a, b) => a.stop - b.stop).forEach(stop => {
        const stopDiv = document.createElement('div');
        stopDiv.className = 'color-stop-item';
        stopDiv.dataset.id = stop.id;
        stopDiv.draggable = true; // Make draggable

        stopDiv.innerHTML = `
            <input type="color" value="${stop.color}" aria-label="Color Picker">
            <input type="range" min="0" max="100" value="${stop.stop}" aria-label="Color stop position">
            <span class="stop-value">${stop.stop}%</span>
            <button class="remove-color-stop-btn" aria-label="Remove color stop"><i class="fas fa-trash-alt"></i></button>
        `;

        const colorInput = stopDiv.querySelector('input[type="color"]');
        const rangeInput = stopDiv.querySelector('input[type="range"]');
        const stopValueSpan = stopDiv.querySelector('.stop-value');
        const removeBtn = stopDiv.querySelector('.remove-color-stop-btn');

        // Event listeners for individual stop controls
        colorInput.addEventListener('input', (e) => {
            stop.color = e.target.value;
            updatePreview();
            updateHistory(); // Update history after change
        });

        rangeInput.addEventListener('input', (e) => {
            stop.stop = parseInt(e.target.value);
            stopValueSpan.textContent = `${stop.stop}%`;
            updatePreview();
        });
        rangeInput.addEventListener('change', updateHistory); // Save history only after range input is released

        removeBtn.addEventListener('click', () => {
            removeColorStop(stop.id);
            updateHistory(); // Update history after remove
        });

        // Drag-and-drop event listeners
        stopDiv.addEventListener('dragstart', () => {
            draggedItem = stopDiv;
            setTimeout(() => stopDiv.classList.add('dragging'), 0);
            colorStopTrash.classList.add('visible'); // Show trash on drag
        });

        stopDiv.addEventListener('dragend', () => {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
            colorStopTrash.classList.remove('visible'); // Hide trash
            colorStopTrash.classList.remove('drag-over-trash');
            updateHistory(); // Save history after drag-and-drop reorder
        });

        stopDiv.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            if (draggedItem && draggedItem!== stopDiv) {
                const boundingBox = stopDiv.getBoundingClientRect();
                const offset = boundingBox.y + (boundingBox.height / 2);
                if (e.clientY < offset) {
                    stopDiv.classList.add('drag-over'); // Top half
                    stopDiv.classList.remove('drag-over-bottom');
                } else {
                    stopDiv.classList.add('drag-over-bottom'); // Bottom half
                    stopDiv.classList.remove('drag-over');
                }
            }
        });

        stopDiv.addEventListener('dragleave', () => {
            stopDiv.classList.remove('drag-over', 'drag-over-bottom');
        });

        stopDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            stopDiv.classList.remove('drag-over', 'drag-over-bottom');

            if (draggedItem && draggedItem!== stopDiv) {
                const draggedId = parseInt(draggedItem.dataset.id);
                const targetId = parseInt(stopDiv.dataset.id);

                const draggedIndex = gradientConfig.colorStops.findIndex(s => s.id === draggedId);
                const targetIndex = gradientConfig.colorStops.findIndex(s => s.id === targetId);

                // Reorder in array
                const [removed] = gradientConfig.colorStops.splice(draggedIndex, 1);
                const boundingBox = stopDiv.getBoundingClientRect();
                const offset = boundingBox.y + (boundingBox.height / 2);

                if (e.clientY < offset) { // Drop before target
                    gradientConfig.colorStops.splice(targetIndex, 0, removed);
                } else { // Drop after target
                    gradientConfig.colorStops.splice(targetIndex + 1, 0, removed);
                }
                
                renderColorStops(); // Re-render the list after reordering
            }
        });

        colorStopList.appendChild(stopDiv);
    });
    updateRemoveButtons(); // Re-evaluate button states
    updatePreview(); // Ensure preview is up to date after re-render
}

function addColorStop() {
    const newId = gradientConfig.nextColorStopId++;
    const newColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'); // Random color
    
    // Calculate a sensible default stop position
    const sortedStops = [...gradientConfig.colorStops].sort((a,b) => a.stop - b.stop);
    let newStop = 50; // Default to middle
    if (sortedStops.length >= 2) {
        const lastStop = sortedStops[sortedStops.length - 1].stop;
        const firstStop = sortedStops[0].stop;
        newStop = Math.min(100, Math.max(0, (lastStop + firstStop) / 2)); // Average of first/last
        if (sortedStops.length === 2 && sortedStops[0].stop === 0 && sortedStops[1].stop === 100) {
            newStop = 50; // Specifically for 0,100 case
        } else {
            // Find a gap
            for(let i = 0; i < sortedStops.length - 1; i++) {
                if (sortedStops[i+1].stop - sortedStops[i].stop > 10) { // If gap is big enough
                    newStop = (sortedStops[i+1].stop + sortedStops[i].stop) / 2;
                    break;
                }
            }
        }
    } else if (sortedStops.length === 1) {
        newStop = sortedStops[0].stop + 25; // Add after existing
        if (newStop > 100) newStop = sortedStops[0].stop - 25;
        if (newStop < 0) newStop = 50;
    }
    newStop = Math.min(100, Math.max(0, newStop));

    gradientConfig.colorStops.push({ color: newColor, stop: newStop, id: newId });
    gradientConfig.colorStops.sort((a, b) => a.stop - b.stop); // Keep sorted
    renderColorStops(); // Re-render all stops to keep sorted and attached
    updateHistory(); // Update history after add
}

function removeColorStop(idToRemove) {
    if (gradientConfig.colorStops.length <= 2) return; // Prevent removing last two
    gradientConfig.colorStops = gradientConfig.colorStops.filter(stop => stop.id!== idToRemove);
    renderColorStops(); // Re-render all stops
}

// New: Distribute stops evenly
function distributeStopsEvenly() {
    if (gradientConfig.colorStops.length < 2) return;

    gradientConfig.colorStops.sort((a, b) => a.stop - b.stop); // Ensure sorted
    const step = 100 / (gradientConfig.colorStops.length - 1);

    gradientConfig.colorStops.forEach((stop, index) => {
        stop.stop = Math.round(index * step);
    });
    renderColorStops();
    updateHistory(); // Update history after distribute
}

function applyPreset(presetName) {
    const preset = defaultPresets[presetName];
    if (!preset) return;

    // Reset nextColorStopId to ensure unique IDs for new stops
    gradientConfig.nextColorStopId = 0; 
    preset.colorStops.forEach(stop => {
        if (stop.id >= gradientConfig.nextColorStopId) {
            gradientConfig.nextColorStopId = stop.id + 1;
        }
    });

    gradientConfig.type = preset.type;
    gradientConfig.angle = preset.angle || 90;
    gradientConfig.radial = preset.radial || { shape: 'ellipse', size: 'farthest-corner', positionX: 50, positionY: 50 };
    gradientConfig.colorStops = JSON.parse(JSON.stringify(preset.colorStops)); // Deep copy to avoid modifying preset
    
    // Update UI elements to reflect preset
    gradientTypeSelect.value = gradientConfig.type;
    gradientAngleInput.value = gradientConfig.angle;
    angleValueSpan.textContent = `${gradientConfig.angle}°`;
    radialShapeSelect.value = gradientConfig.radial.shape;
    radialSizeSelect.value = gradientConfig.radial.size;
    radialPositionXInput.value = gradientConfig.radial.positionX;
    positionXValueSpan.textContent = `${gradientConfig.radial.positionX}%`;
    radialPositionYInput.value = gradientConfig.radial.positionY;
    positionYValueSpan.textContent = `${gradientConfig.radial.positionY}%`;
    
    toggleRadialControls(); // Show/hide radial controls based on type
    renderColorStops(); // Re-render color stops
    updatePreview(); // Final update
    updateHistory(); // Update history after preset
}

function toggleRadialControls() {
    if (gradientConfig.type === 'radial') {
        linearControls.classList.add('hidden');
        radialControls.classList.remove('hidden');
        radialControls.setAttribute('aria-hidden', 'false');
        linearControls.setAttribute('aria-hidden', 'true');

    } else {
        linearControls.classList.remove('hidden');
        radialControls.classList.add('hidden');
        linearControls.setAttribute('aria-hidden', 'false');
        radialControls.setAttribute('aria-hidden', 'true');
    }
}

// New: Save/Load functions
function saveGradient() {
    const name = gradientNameInput.value.trim();
    if (!name) {
        alert('Please enter a name for your gradient.');
        return;
    }
    savedGradients[name] = JSON.parse(JSON.stringify(gradientConfig)); // Deep copy
    localStorage.setItem('savedGradients', JSON.stringify(savedGradients));
    populateSavedGradients();
    gradientNameInput.value = ''; // Clear input
    alert(`Gradient "${name}" saved!`);
}

function loadGradient() {
    const name = savedGradientsSelect.value;
    if (!name ||!savedGradients[name]) return;
    applyHistoryState(savedGradients[name]); // Load directly into history for undo/redo
    updateHistory(); // Add to history
    alert(`Gradient "${name}" loaded!`);
}

function deleteGradient() {
    const name = savedGradientsSelect.value;
    if (!name ||!confirm(`Are you sure you want to delete "${name}"?`)) return;
    delete savedGradients[name];
    localStorage.setItem('savedGradients', JSON.stringify(savedGradients));
    populateSavedGradients();
    alert(`Gradient "${name}" deleted.`);
}

function populateSavedGradients() {
    savedGradientsSelect.innerHTML = '<option value="">Load a gradient...</option>';
    const hasGradients = Object.keys(savedGradients).length > 0;
    savedGradientsSelect.disabled =!hasGradients;
    loadGradientBtn.disabled = true;
    deleteGradientBtn.disabled = true;

    for (const name in savedGradients) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        savedGradientsSelect.appendChild(option);
    }
}

// --- Event Listeners ---

// Gradient Type Switcher
gradientTypeSelect.addEventListener('change', (e) => {
    gradientConfig.type = e.target.value;
    toggleRadialControls();
    updatePreview();
    updateHistory();
});

// Linear Controls
gradientAngleInput.addEventListener('input', (e) => {
    gradientConfig.angle = parseInt(e.target.value);
    angleValueSpan.textContent = `${gradientConfig.angle}°`;
    updatePreview();
});
gradientAngleInput.addEventListener('change', updateHistory); // Save history only after release

// Radial Controls
radialShapeSelect.addEventListener('change', (e) => {
    gradientConfig.radial.shape = e.target.value;
    updatePreview();
    updateHistory();
});
radialSizeSelect.addEventListener('change', (e) => {
    gradientConfig.radial.size = e.target.value;
    updatePreview();
    updateHistory();
});
radialPositionXInput.addEventListener('input', (e) => {
    gradientConfig.radial.positionX = parseInt(e.target.value);
    positionXValueSpan.textContent = `${gradientConfig.radial.positionX}%`;
    updatePreview();
});
radialPositionXInput.addEventListener('change', updateHistory);
radialPositionYInput.addEventListener('input', (e) => {
    gradientConfig.radial.positionY = parseInt(e.target.value);
    positionYValueSpan.textContent = `${gradientConfig.radial.positionY}%`;
    updatePreview();
});
radialPositionYInput.addEventListener('change', updateHistory);

// Color Stop Controls
addColorStopBtn.addEventListener('click', addColorStop);
distributeStopsBtn.addEventListener('click', distributeStopsEvenly); // New listener

// Trash zone event listeners
colorStopTrash.addEventListener('dragover', (e) => {
    e.preventDefault();
    colorStopTrash.classList.add('drag-over-trash');
});
colorStopTrash.addEventListener('dragleave', () => {
    colorStopTrash.classList.remove('drag-over-trash');
});
colorStopTrash.addEventListener('drop', (e) => {
    e.preventDefault();
    colorStopTrash.classList.remove('drag-over-trash');
    if (draggedItem) {
        const idToRemove = parseInt(draggedItem.dataset.id);
        removeColorStop(idToRemove);
        updateHistory(); // Update history after deletion via drag
    }
});

// Copy to Clipboard
copyCodeBtn.addEventListener('click', () => {
    cssCodeOutput.select();
    document.execCommand('copy');
    copyMessage.classList.add('visible');
    setTimeout(() => {
        copyMessage.classList.remove('visible');
    }, 2000);
});

// Presets
presetBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        applyPreset(e.target.dataset.preset);
    });
});

// Save/Load Event Listeners (New)
saveGradientBtn.addEventListener('click', saveGradient);
loadGradientBtn.addEventListener('click', loadGradient);
deleteGradientBtn.addEventListener('click', deleteGradient);

savedGradientsSelect.addEventListener('change', () => {
    const selected = savedGradientsSelect.value;
    loadGradientBtn.disabled =!selected;
    deleteGradientBtn.disabled =!selected;
});

// Undo/Redo Event Listeners (New)
undoBtn.addEventListener('click', () => {
    if (historyIndex > 0) {
        historyIndex--;
        applyHistoryState(history[historyIndex]);
    }
});

redoBtn.addEventListener('click', () => {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        applyHistoryState(history[historyIndex]);
    }
});

// --- Initialization ---
// Initial rendering of color stops and controls
populateSavedGradients(); // Populate on load
toggleRadialControls();
updatePreview();
updateHistory(); // Save initial state to history