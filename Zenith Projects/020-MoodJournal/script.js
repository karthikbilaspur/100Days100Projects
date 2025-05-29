// script.js

const form = document.querySelector('form');
const entryList = document.querySelector('.entry-list');
const happinessLevel = document.querySelector('.happiness-level');
const sadnessLevel = document.querySelector('.sadness-level');
const angerLevel = document.querySelector('.anger-level');
const neutralityLevel = document.querySelector('.neutrality-level');
const moodChart = document.getElementById('mood-chart').getContext('2d');

let entries = [];
let happinessCount = 0;
let sadnessCount = 0;
let angerCount = 0;
let neutralityCount = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const mood = document.querySelector('#mood').value;
    const entry = document.querySelector('#entry').value;
    const tags = document.querySelector('#tags').value;

    const newEntry = {
        mood,
        entry,
        tags
    };

    entries.push(newEntry);

    if (mood === 'happy') {
        happinessCount++;
    } else if (mood === 'sad') {
        sadnessCount++;
    } else if (mood === 'angry') {
        angerCount++;
    } else {
        neutralityCount++;
    }

    displayEntries();
    updateMoodStats();
    updateMoodChart();
});

function displayEntries() {
    const entryHTML = entries.map((entry) => {
        return `
            <li>
                Mood: ${entry.mood}<br>
                Entry: ${entry.entry}<br>
                Tags: ${entry.tags}
            </li>
        `;
    }).join('');

    entryList.innerHTML = entryHTML;
}

function updateMoodStats() {
    happinessLevel.textContent = happinessCount;
    sadnessLevel.textContent = sadnessCount;
    angerLevel.textContent = angerCount;
    neutralityLevel.textContent = neutralityCount;
}

function updateMoodChart() {
    const chart = new Chart(moodChart, {
        type: 'bar',
        data: {
            labels: ['Happy', 'Sad', 'Angry', 'Neutral'],
            datasets: [{
                label: 'Mood',
                data: [happinessCount, sadnessCount, angerCount, neutralityCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// Add event listener to delete button
const deleteButton = document.querySelector('.delete-button');

deleteButton.addEventListener('click', () => {
    entries = [];
    happinessCount = 0;
    sadnessCount = 0;
    angerCount = 0;
    neutralityCount = 0;

    displayEntries();
    updateMoodStats();
    updateMoodChart();
});

// Add event listener to entry list
entryList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const entryIndex = entries.findIndex((entry) => entry.entry === e.target.textContent);
        if (entryIndex !== -1) {
            entries.splice(entryIndex, 1);
            displayEntries();
            updateMoodStats();
            updateMoodChart();
        }
    }
});

// Add function to filter entries by mood
function filterEntriesByMood(mood) {
    const filteredEntries = entries.filter((entry) => entry.mood === mood);
    return filteredEntries;
}

// Add function to filter entries by tags
function filterEntriesByTags(tags) {
    const filteredEntries = entries.filter((entry) => entry.tags.includes(tags));
    return filteredEntries;
}

// Add event listener to filter buttons
const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const filterType = e.target.dataset.filterType;
        const filterValue = e.target.dataset.filterValue;
        let filteredEntries;

        if (filterType === 'mood') {
            filteredEntries = filterEntriesByMood(filterValue);
        } else if (filterType === 'tags') {
            filteredEntries = filterEntriesByTags(filterValue);
        }

        displayEntries(filteredEntries);
    });
});