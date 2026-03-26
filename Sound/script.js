document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.getElementById('loading-progress');
    const mainContent = document.getElementById('main-content');
    const soundCategoriesContainer = document.querySelector('.sound-categories-container');
    const noResultsMessage = document.querySelector('.no-results');

    const searchInput = document.getElementById('search-input');
    const searchForm = document.querySelector('.search-form');
    const clearSearchButton = document.getElementById('clear-search-button');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');

    const volumeSlider = document.getElementById('volume-slider');
    const volumeLevelSpan = document.getElementById('volume-level');
    const muteToggleButton = document.getElementById('mute-toggle-button');
    const loopToggle = document.getElementById('loop-toggle');
    const playbackRateSlider = document.getElementById('playback-rate');
    const playbackRateValueSpan = document.getElementById('playback-rate-value');

    const recordButton = document.getElementById('record-button');
    const recordText = document.getElementById('record-text');
    const stopAllButton = document.getElementById('stop-all-button');
    const currentYearSpan = document.getElementById('current-year');

    // --- Configuration & State ---
    const BASE_AUDIO_PATH = 'assets/audio/';
    const SOUNDS_DATA = [
        { category: 'Favorites', files: [] }, // Dynamic category for favorites
        { category: 'Applause', files: ['applause-1', 'applause-2', 'applause-3'] },
        { category: 'Boos', files: ['boo-1', 'boo-2', 'boo-3'] },
        { category: 'Cheering', files: ['cheering-1', 'cheering-2', 'cheering-3'] },
        { category: 'Bells', files: ['bell-ding', 'bell-toll', 'doorbell'] },
        { category: 'Whooshes', files: ['whoosh-1', 'whoosh-2', 'whoosh-3'] },
        { category: 'Alerts', files: ['alert-beep', 'alert-siren', 'alert-alarm'] },
        { category: 'Animals', files: ['cat-meow', 'dog-bark', 'lion-roar'] },
        { category: 'Funny', files: ['boing', 'honk', 'wah-wah'] },
        // Add more categories and sounds as needed
    ];

    let audioContext; // Initialized in initializeApp
    let gainNode; // Global volume control node
    let loadedSounds = {}; // Stores {soundName: AudioBuffer}
    let playingSources = new Map(); // Stores {soundName: {source: AudioBufferSourceNode, localGain: GainNode, progressInterval: number}}
    let mediaRecorder; // For recording audio
    let audioChunks = []; // Stores recorded audio chunks
    let currentRecording = null; // Stores info about a sound being recorded

    let globalVolume = 0.5; // Initial volume, corresponds to slider value 50
    let isMuted = false;
    let loopEnabled = false;
    let playbackSpeed = 1.0;
    let favorites = new Set(JSON.parse(localStorage.getItem('soundboardFavorites') || '[]')); // Load favorites from local storage
    let userRecordedSounds = JSON.parse(localStorage.getItem('soundboardRecordings') || '[]'); // Load user recordings

    let allSoundButtons = []; // Cached array of all sound buttons for keyboard navigation

    // --- Utility Functions ---

    /**
     * Capitalizes the first letter of each word in a string.
     * @param {string} str
     * @returns {string}
     */
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    /**
     * Creates a user-friendly display name from a sound filename.
     * @param {string} soundFilename e.g., "applause-1"
     * @returns {string} e.g., "Applause 1"
     */
    function getSoundDisplayName(soundFilename) {
        return capitalizeWords(soundFilename.replace(/-/g, ' '));
    }

    /**
     * Loads a single audio file.
     * @param {string} soundName
     * @param {string} path
     * @returns {Promise<AudioBuffer>}
     */
    async function loadAudio(soundName, path) {
        const url = `${path}${soundName}.mp3`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} for ${url}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            loadedSounds[soundName] = audioBuffer;
            return audioBuffer;
        } catch (error) {
            console.error(`Failed to load or decode audio ${soundName} from ${url}:`, error);
            loadedSounds[soundName] = null; // Mark as failed
            return Promise.reject(error);
        }
    }

    /**
     * Plays a sound from the loaded buffer.
     * @param {string} soundName
     * @param {number} [volume] - Specific volume for this sound, defaults to global.
     * @param {boolean} [loop] - Whether to loop this sound, defaults to global loop toggle.
     * @param {number} [playbackRate] - Specific playback rate, defaults to global slider.
     */
    function playSound(soundName, volume = globalVolume, loop = loopEnabled, playbackRate = playbackSpeed) {
        if (!loadedSounds[soundName]) {
            console.warn(`Sound '${soundName}' not loaded or failed to load.`);
            return;
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('AudioContext resumed!');
                actuallyPlaySound(soundName, volume, loop, playbackRate);
            });
        } else {
            actuallyPlaySound(soundName, volume, loop, playbackRate);
        }
    }

    function actuallyPlaySound(soundName, volume, loop, playbackRate) {
        stopSound(soundName); // Always stop previous instance of the same sound

        const source = audioContext.createBufferSource();
        source.buffer = loadedSounds[soundName];
        source.loop = loop;
        source.playbackRate.value = playbackRate;

        const localGainNode = audioContext.createGain();
        localGainNode.gain.value = isMuted? 0 : volume;
        source.connect(localGainNode);
        localGainNode.connect(gainNode);

        source.start(0);

        const buttonElement = document.querySelector(`button[data-sound="${soundName}"]`);
        const progressBar = buttonElement? buttonElement.querySelector('.sound-progress') : null;

        let progressInterval = null;
        if (progressBar) {
            progressBar.style.width = '0%';
            progressBar.style.transition = 'none'; // Disable transition for reset
            requestAnimationFrame(() => {
                progressBar.style.transition = `width ${(source.buffer.duration / playbackRate)}s linear`;
                progressBar.style.width = '100%';
            });

            progressInterval = setInterval(() => {
                // If the sound ends early (e.g., manually stopped), clear interval
                if (!playingSources.has(soundName)) {
                    clearInterval(progressInterval);
                }
            }, 50); // Update frequently
        }

        playingSources.set(soundName, { source, localGain: localGainNode, progressInterval });
        if (buttonElement) buttonElement.classList.add('playing');

        source.onended = () => {
            source.disconnect();
            localGainNode.disconnect();
            playingSources.delete(soundName);
            if (buttonElement) buttonElement.classList.remove('playing');
            if (progressInterval) clearInterval(progressInterval);
            if (progressBar) {
                progressBar.style.transition = 'none'; // Disable transition before resetting
                progressBar.style.width = '0%';
            }
        };
    }

    /**
     * Stops a specific sound.
     * @param {string} soundName
     */
    function stopSound(soundName) {
        if (playingSources.has(soundName)) {
            const { source, localGain, progressInterval } = playingSources.get(soundName);
            source.stop(0); // Stop immediately
            source.disconnect();
            localGain.disconnect();
            playingSources.delete(soundName);
            const button = document.querySelector(`button[data-sound="${soundName}"]`);
            if (button) button.classList.remove('playing');
            if (progressInterval) clearInterval(progressInterval);
            const progressBar = button? button.querySelector('.sound-progress') : null;
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
            }
        }
    }

    /**
     * Stops all currently playing sounds.
     */
    function stopAllSounds() {
        playingSources.forEach(({ source, localGain, progressInterval }, soundName) => {
            source.stop(0);
            source.disconnect();
            localGain.disconnect();
            const button = document.querySelector(`button[data-sound="${soundName}"]`);
            if (button) button.classList.remove('playing');
            if (progressInterval) clearInterval(progressInterval);
            const progressBar = button? button.querySelector('.sound-progress') : null;
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
            }
        });
        playingSources.clear();
    }

    /**
     * Sets the global volume and updates UI.
     * @param {number} volume (0-100)
     */
    function setGlobalVolume(volume) {
        globalVolume = volume / 100;
        gainNode.gain.value = isMuted? 0 : globalVolume;
        volumeLevelSpan.textContent = `${volume}%`;
        localStorage.setItem('soundboardVolume', volume);
    }

    /**
     * Toggles mute state.
     */
    function toggleMute() {
        isMuted =!isMuted;
        muteToggleButton.classList.toggle('muted', isMuted);
        muteToggleButton.innerHTML = isMuted? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        gainNode.gain.value = isMuted? 0 : globalVolume;
        localStorage.setItem('soundboardMuted', isMuted);
    }

    /**
     * Saves favorites to local storage.
     */
    function saveFavorites() {
        localStorage.setItem('soundboardFavorites', JSON.stringify(Array.from(favorites)));
    }

    /**
     * Adds/removes a sound from favorites.
     * @param {string} soundName
     * @param {HTMLElement} button
     */
    function toggleFavorite(soundName, button) {
        if (favorites.has(soundName)) {
            favorites.delete(soundName);
            button.classList.remove('active');
        } else {
            favorites.add(soundName);
            button.classList.add('active');
        }
        saveFavorites();
        renderSoundboard(); // Re-render to update Favorites category
        applyFiltersAndSort(); // Apply current filters/sort after re-render
    }

    /**
     * Renders all sound categories and buttons based on current data.
     */
    function renderSoundboard(filteredData = SOUNDS_DATA) {
        soundCategoriesContainer.innerHTML = ''; // Clear previous content

        let dataToRender = [...filteredData];

        // Process user recorded sounds
        if (userRecordedSounds.length > 0) {
            dataToRender.push({ category: 'My Recordings', files: userRecordedSounds.map(s => s.name) });
        }

        // Always show Favorites category if there are favorites
        const favoriteSoundsArray = Array.from(favorites).filter(favName => loadedSounds[favName] || userRecordedSounds.some(s => s.name === favName));
        if (favoriteSoundsArray.length > 0) {
            // Find the 'Favorites' category, update its files, and move it to the top
            let favCategoryIndex = dataToRender.findIndex(cat => cat.category === 'Favorites');
            if (favCategoryIndex === -1) {
                // If it doesn't exist, create it and add to dataToRender
                dataToRender.unshift({ category: 'Favorites', files: favoriteSoundsArray });
            } else {
                // If it exists, update its files and ensure it's at the top
                dataToRender[favCategoryIndex].files = favoriteSoundsArray;
                const favCategory = dataToRender.splice(favCategoryIndex, 1)[0];
                dataToRender.unshift(favCategory);
            }
        } else {
            // Remove Favorites category if empty
            dataToRender = dataToRender.filter(cat => cat.category!== 'Favorites');
        }

        dataToRender.forEach(categoryData => {
            if (categoryData.files.length === 0 && categoryData.category!== 'Favorites') return; // Skip empty categories (unless Favorites which is handled)

            const categoryElement = document.createElement('div');
            categoryElement.classList.add('sound-category');
            categoryElement.setAttribute('data-category-name', categoryData.category.toLowerCase());

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = categoryData.category;
            categoryElement.appendChild(categoryTitle);

            const buttonsList = document.createElement('ul');
            buttonsList.classList.add('sound-buttons');
            buttonsList.setAttribute('aria-label', `${categoryData.category} sounds`);

            categoryData.files.forEach((soundName, index) => {
                const listItem = document.createElement('li');
                const button = document.createElement('button');
                button.classList.add('sound-button');
                button.setAttribute('data-sound', soundName);
                button.setAttribute('aria-label', getSoundDisplayName(soundName));
                button.setAttribute('data-keyboard-shortcut', index + 1); // For 1-9 shortcuts
                button.textContent = getSoundDisplayName(soundName);

                // Progress bar
                const progressBar = document.createElement('div');
                progressBar.classList.add('sound-progress');
                button.appendChild(progressBar);

                // Favorite toggle
                const favoriteToggle = document.createElement('button');
                favoriteToggle.classList.add('favorite-toggle');
                favoriteToggle.setAttribute('aria-label', 'Toggle Favorite');
                favoriteToggle.innerHTML = '<i class="fas fa-star"></i>';
                if (favorites.has(soundName)) {
                    favoriteToggle.classList.add('active');
                }
                favoriteToggle.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent playing sound when toggling favorite
                    toggleFavorite(soundName, favoriteToggle);
                });
                button.appendChild(favoriteToggle);

                // Event listeners for playing sound
                button.addEventListener('click', () => playSound(soundName));
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        playSound(soundName);
                    }
                });

                listItem.appendChild(button);
                buttonsList.appendChild(listItem);
            });
            categoryElement.appendChild(buttonsList);
            soundCategoriesContainer.appendChild(categoryElement);
        });
        cacheSoundButtons();
        addKeyboardNavigationEvents();
        populateCategoryFilter(); // Re-populate filter dropdown after rendering
    }

    /**
     * Caches all visible sound buttons for keyboard navigation.
     */
    function cacheSoundButtons() {
        allSoundButtons = Array.from(document.querySelectorAll('.sound-button'));
    }

    /**
     * Applies search, category filter, and sort order.
     */
    function applyFiltersAndSort() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value.toLowerCase();
        const sortOption = sortBy.value;

        // Combine original data with user recordings
        let combinedData = JSON.parse(JSON.stringify(SOUNDS_DATA.filter(cat => cat.category!== 'Favorites'))); // Deep copy and exclude initial favorites
        if (userRecordedSounds.length > 0) {
            combinedData.push({ category: 'My Recordings', files: userRecordedSounds.map(s => s.name) });
        }

        let filteredData = combinedData.map(categoryData => {
            let files = categoryData.files;

            // Apply search term
            if (searchTerm) {
                files = files.filter(soundName =>
                    getSoundDisplayName(soundName).toLowerCase().includes(searchTerm) ||
                    categoryData.category.toLowerCase().includes(searchTerm)
                );
            }

            // Apply category filter
            if (selectedCategory!== 'all' && selectedCategory!== categoryData.category.toLowerCase() && selectedCategory!== 'favorites') {
                files = []; // Hide files from other categories
            }

            // Sort files within categories
            if (sortOption === 'name-asc') {
                files.sort((a, b) => getSoundDisplayName(a).localeCompare(getSoundDisplayName(b)));
            } else if (sortOption === 'name-desc') {
                files.sort((a, b) => getSoundDisplayName(b).localeCompare(getSoundDisplayName(a)));
            }

            return {...categoryData, files };
        }).filter(categoryData => categoryData.files.length > 0 || (categoryData.category.toLowerCase() === selectedCategory && selectedCategory!== 'all')); // Keep category if selected, even if empty after search

        renderSoundboard(filteredData);

        const anyResults = document.querySelectorAll('.sound-button').length > 0;
        noResultsMessage.classList.toggle('hidden', anyResults);
    }

    /**
     * Populates the category filter dropdown.
     */
    function populateCategoryFilter() {
        categoryFilter.innerHTML = '<option value="all">All</option>';
        const uniqueCategories = new Set();
        SOUNDS_DATA.forEach(data => uniqueCategories.add(data.category));
        if (userRecordedSounds.length > 0) uniqueCategories.add('My Recordings');
        if (favorites.size > 0) uniqueCategories.add('Favorites');

        Array.from(uniqueCategories).sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category.toLowerCase();
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
        categoryFilter.value = localStorage.getItem('soundboardCategoryFilter') || 'all';
    }

    /**
     * Adds keyboard navigation (Arrow keys for button focus, 1-9 for quick play).
     */
    function addKeyboardNavigationEvents() {
        document.removeEventListener('keydown', handleGlobalKeyboardNavigation);
        document.addEventListener('keydown', handleGlobalKeyboardNavigation);

        function handleGlobalKeyboardNavigation(event) {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.tagName === 'SELECT') {
                return;
            }

            // Quick play with number keys 1-9
            if (!isNaN(parseInt(event.key)) && parseInt(event.key) >= 1 && parseInt(event.key) <= 9) {
                const shortcutIndex = parseInt(event.key) - 1;
                const targetButton = allSoundButtons[shortcutIndex];
                if (targetButton) {
                    targetButton.click();
                    targetButton.focus(); // Give visual focus
                    return;
                }
            }

            let nextButton = null;
            const focusedButton = document.activeElement;
            const focusedIndex = allSoundButtons.indexOf(focusedButton);

            if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault(); // Prevent page scroll

                if (focusedIndex === -1) {
                    nextButton = allSoundButtons[0];
                } else {
                    const currentRow = focusedButton.closest('ul.sound-buttons');
                    const buttonsInCurrentRow = Array.from(currentRow.querySelectorAll('.sound-button:not([style*="display: none"])')); // Only visible buttons
                    const focusedInRowIndex = buttonsInCurrentRow.indexOf(focusedButton);

                    if (event.key === 'ArrowLeft') {
                        nextButton = buttonsInCurrentRow[focusedInRowIndex - 1] || buttonsInCurrentRow[buttonsInCurrentRow.length - 1];
                    } else if (event.key === 'ArrowRight') {
                        nextButton = buttonsInCurrentRow[focusedInRowIndex + 1] || buttonsInCurrentRow[0];
                    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                        const allVisibleButtons = allSoundButtons.filter(btn => {
                            const li = btn.closest('li');
                            const category = btn.closest('.sound-category');
                            return li && category && li.style.display!== 'none' && category.style.display!== 'none';
                        });
                        const focusedVisibleIndex = allVisibleButtons.indexOf(focusedButton);
                        if (event.key === 'ArrowUp') {
                            nextButton = allVisibleButtons[focusedVisibleIndex - 1] || allVisibleButtons[allVisibleButtons.length - 1];
                        } else { // ArrowDown
                            nextButton = allVisibleButtons[focusedVisibleIndex + 1] || allVisibleButtons[0];
                        }
                    }
                }
            }

            if (nextButton) {
                nextButton.focus();
            }
        }
    }

    // --- Recording Logic ---

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' }); // Try mp3
                const audioUrl = URL.createObjectURL(audioBlob);
                const soundName = prompt('Enter a name for your recording:');
                if (soundName && soundName.trim()!== '') {
                    const uniqueSoundName = `rec-${Date.now()}-${soundName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
                    userRecordedSounds.push({ name: uniqueSoundName, category: 'My Recordings', url: audioUrl, blob: audioBlob });
                    localStorage.setItem('soundboardRecordings', JSON.stringify(userRecordedSounds.map(s => ({name: s.name, category: s.category, url: s.url})))); // Store URL, not blob
                    loadedSounds[uniqueSoundName] = audioContext.createBufferSource().buffer; // Placeholder, real buffer loaded on demand
                    // To actually load the blob into AudioBuffer:
                    audioBlob.arrayBuffer().then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)).then(buffer => {
                        loadedSounds[uniqueSoundName] = buffer;
                        renderSoundboard(); // Re-render to show new sound
                        applyFiltersAndSort();
                    }).catch(e => console.error("Error decoding recorded audio:", e));
                } else {
                    alert('Recording not saved. Please provide a name.');
                }
                stream.getTracks().forEach(track => track.stop()); // Stop mic access
                recordButton.classList.remove('recording');
                recordText.textContent = 'Record';
                recordButton.disabled = false;
            };

            mediaRecorder.start();
            recordButton.classList.add('recording');
            recordText.textContent = 'Stop Recording';
            recordButton.disabled = false; // Enable stop button
            recordButton.removeEventListener('click', startRecording);
            recordButton.addEventListener('click', stopRecording);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Cannot access microphone. Please ensure it is connected and permissions are granted.');
            recordButton.disabled = false;
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            recordButton.removeEventListener('click', stopRecording);
            recordButton.addEventListener('click', startRecording);
        }
    }

    // --- Event Listeners ---

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        applyFiltersAndSort();
    });

    searchInput.addEventListener('input', () => {
        applyFiltersAndSort(); // Live filter as user types
        if (searchInput.value === '') {
            clearSearchButton.classList.remove('active');
        } else {
            clearSearchButton.classList.add('active');
        }
    });

    clearSearchButton.addEventListener('click', () => {
        searchInput.value = '';
        applyFiltersAndSort();
        clearSearchButton.classList.remove('active');
        searchInput.focus();
    });

    categoryFilter.addEventListener('change', () => {
        localStorage.setItem('soundboardCategoryFilter', categoryFilter.value);
        applyFiltersAndSort();
    });

    sortBy.addEventListener('change', () => {
        localStorage.setItem('soundboardSortOrder', sortBy.value);
        applyFiltersAndSort();
    });

    volumeSlider.addEventListener('input', (event) => {
        setGlobalVolume(parseInt(event.target.value));
    });

    muteToggleButton.addEventListener('click', toggleMute);

    loopToggle.addEventListener('change', () => {
        loopEnabled = loopToggle.checked;
        localStorage.setItem('soundboardLoopEnabled', loopEnabled);
    });

    playbackRateSlider.addEventListener('input', (event) => {
        playbackSpeed = parseFloat(event.target.value);
        playbackRateValueSpan.textContent = `${playbackSpeed}x`;
        localStorage.setItem('soundboardPlaybackSpeed', playbackSpeed);
    });

    recordButton.addEventListener('click', startRecording);
    stopAllButton.addEventListener('click', stopAllSounds);

    // --- Initialization ---

    async function initializeApp() {
        currentYearSpan.textContent = new Date().getFullYear();
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);

        // Load saved preferences
        const savedVolume = parseInt(localStorage.getItem('soundboardVolume') || '50');
        const savedMuted = localStorage.getItem('soundboardMuted') === 'true';
        const savedLoop = localStorage.getItem('soundboardLoopEnabled') === 'true';
        const savedPlaybackSpeed = parseFloat(localStorage.getItem('soundboardPlaybackSpeed') || '1.0');
        const savedCategoryFilter = localStorage.getItem('soundboardCategoryFilter') || 'all';
        const savedSortOrder = localStorage.getItem('soundboardSortOrder') || 'default';

        volumeSlider.value = savedVolume;
        setGlobalVolume(savedVolume);
        isMuted = savedMuted;
        muteToggleButton.classList.toggle('muted', isMuted);
        muteToggleButton.innerHTML = isMuted? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        loopToggle.checked = savedLoop;
        loopEnabled = savedLoop;
        playbackRateSlider.value = savedPlaybackSpeed;
        playbackSpeed = savedPlaybackSpeed;
        playbackRateValueSpan.textContent = `${savedPlaybackSpeed}x`;
        categoryFilter.value = savedCategoryFilter;
        sortBy.value = savedSortOrder;

        // Combine all sound names (including user recordings)
        let allSoundNames = SOUNDS_DATA.flatMap(category => category.files);
        userRecordedSounds.forEach(rec => {
            allSoundNames.push(rec.name);
            // Recreate blob for recorded sounds from URL if needed (e.g., if reloaded from LS)
            // This is a simplification; in a real app, you'd store blobs in IndexedDB or on a server.
            // For now, we'll assume the URL is directly usable by AudioContext if the user just recorded it.
            if (rec.url && rec.name.startsWith('rec-') &&!loadedSounds[rec.name]) {
                fetch(rec.url)
                   .then(response => response.arrayBuffer())
                   .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                   .then(audioBuffer => {
                        loadedSounds[rec.name] = audioBuffer;
                        renderSoundboard(); // Re-render once recorded sounds are loaded
                        applyFiltersAndSort();
                    })
                   .catch(e => console.error(`Error loading recorded sound from URL ${rec.url}:`, e));
            }
        });

        let loadedCount = 0;
        const promises = allSoundNames.filter(name =>!name.startsWith('rec-')).map(soundName => // Exclude recordings initially, handle them above
            loadAudio(soundName, BASE_AUDIO_PATH)
              .finally(() => {
                    loadedCount++;
                    loadingProgress.textContent = `${Math.floor((loadedCount / allSoundNames.filter(name =>!name.startsWith('rec-')).length) * 100)}%`;
                })
        );

        try {
            await Promise.all(promises);
            console.log('All initial audio assets processed.');
            loadingScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            searchInput.focus();

            renderSoundboard(); // Initial render after loading
            applyFiltersAndSort(); // Apply any saved filters/sort
        } catch (error) {
            console.error("Some audio assets failed to load:", error);
            loadingScreen.querySelector('p').textContent = 'Some sounds failed to load. Proceeding with available sounds.';
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                searchInput.focus();
            }, 3000);
            renderSoundboard(); // Render even with errors
            applyFiltersAndSort(); // Apply any saved filters/sort
        }

        // Check for microphone support
        if (!navigator.mediaDevices ||!navigator.mediaDevices.getUserMedia) {
            recordButton.disabled = true;
            recordText.textContent = 'Recording Not Supported';
            recordButton.title = 'Your browser does not support audio recording.';
        }
    }

    initializeApp();
});