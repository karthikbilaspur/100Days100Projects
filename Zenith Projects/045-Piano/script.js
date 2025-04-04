const keys = document.querySelectorAll(".key"),
    note = document.querySelector(".nowplaying"),
    hints = document.querySelectorAll(".hints");

function playNote(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
        key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!key) return;

    const keyNote = key.getAttribute("data-note");

    key.classList.add("playing");
    note.innerHTML = keyNote;
    audio.currentTime = 0;
    audio.play();
}

function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
}

function hintsOn(e, index) {
    e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

hints.forEach((hint, index) => hintsOn(hint, index));

keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playNote);

// add event listeners for social share buttons
document.getElementById('share-fb').addEventListener('click', shareOnFacebook);
document.getElementById('share-tw').addEventListener('click', shareOnTwitter);
document.getElementById('share-ig').addEventListener('click', shareOnInstagram);

// function to share recording on Facebook
function shareOnFacebook() {
    const recordingUrl = 'https://example.com/recording.mp3'; // replace with actual recording URL
    const shareData = {
        title: 'Karthik Piano Recording',
        text: 'Check out my latest piano recording!',
        url: recordingUrl,
    };
    navigator.share(shareData).then(() => console.log('Shared on Facebook'));
}

// function to share recording on Twitter
function shareOnTwitter() {
    const recordingUrl = 'https://example.com/recording.mp3'; // replace with actual recording URL
    const shareData = {
        title: 'Karthik Piano Recording',
        text: 'Check out my latest piano recording! ' + recordingUrl,
        url: recordingUrl,
    };
    navigator.share(shareData).then(() => console.log('Shared on Twitter'));
}

// function to share recording on Instagram
function shareOnInstagram() {
    const recordingUrl = 'https://example.com/recording.mp3'; // replace with actual recording URL
    const shareData = {
        title: 'Karthik Piano Recording',
        text: 'Check out my latest piano recording!',
        url: recordingUrl,
    };
    navigator.share(shareData).then(() => console.log('Shared on Instagram'));
}


// add event listeners for menu buttons
document.getElementById('record-btn').addEventListener('click', recordAudio);
document.getElementById('playback-btn').addEventListener('click', playbackAudio);
document.getElementById('settings-btn').addEventListener('click', showSettings);

// function to record audio
function recordAudio() {
    // ... (record audio code)
}

// function to playback audio
function playbackAudio() {
    // ... (playback audio code)
}

// function to show settings
function showSettings() {
    const settingsDiv = document.querySelector('.settings');
    settingsDiv.style.display = 'block';
}

// add event listener for settings form submit
document.getElementById('settings-form').addEventListener('submit', saveSettings);

// function to save settings
function saveSettings(e) {
    e.preventDefault();
    const themeSelect = document.getElementById('theme-select');
    const instrumentSelect = document.getElementById('instrument-select');
    const theme = themeSelect.value;
    const instrument = instrumentSelect.value;

// save settings to local storage
localStorage.setItem('theme', theme);
localStorage.setItem('instrument', instrument);

// update piano theme and instrument
updatePianoTheme(theme);
updatePianoInstrument(instrument);
}

// function to update piano theme
function updatePianoTheme(theme) {
const pianoKeys = document.querySelectorAll('.key');
pianoKeys.forEach(key => {
    key.classList.remove('light', 'dark');
    key.classList.add(theme);
});
}

// function to update piano instrument
function updatePianoInstrument(instrument) {
const pianoKeys = document.querySelectorAll('.key');
pianoKeys.forEach(key => {
    key.setAttribute('data-instrument', instrument);
});
}

// add event listener for window load
window.addEventListener('load', loadSettings);

// function to load settings
function loadSettings() {
const theme = localStorage.getItem('theme');
const instrument = localStorage.getItem('instrument');

if (theme) {
    updatePianoTheme(theme);
}

if (instrument) {
    updatePianoInstrument(instrument);
}
}    