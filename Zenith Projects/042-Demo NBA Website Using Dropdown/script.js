// NBA API endpoint
const apiEndpoint = 'https://api.nba.com/teams';

// Function to fetch team data from API
async function fetchTeams() {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching team data:', error);
    }
}

// Function to render team dropdown menus
async function renderTeams() {
    const teams = await fetchTeams();
    const easternTeams = teams.filter(team => team.conference === 'East');
    const westernTeams = teams.filter(team => team.conference === 'West');

    const easternTeamList = document.getElementById('eastern-teams');
    const westernTeamList = document.getElementById('western-teams');

    easternTeamList.innerHTML = '';
    westernTeamList.innerHTML = '';

    easternTeams.forEach(team => {
        const teamListItem = document.createElement('LI');
        teamListItem.innerHTML = `
            <a href="#" data-team-id="${team.id}">${team.name}</a>
        `;
        easternTeamList.appendChild(teamListItem);
    });

    westernTeams.forEach(team => {
        const teamListItem = document.createElement('LI');
        teamListItem.innerHTML = `
            <a href="#" data-team-id="${team.id}">${team.name}</a>
        `;
        westernTeamList.appendChild(teamListItem);
    });
}

// Function to toggle dropdown menus
function toggleDropdown(conference) {
    const dropdown = document.getElementById(conference);
    dropdown.classList.toggle('show');
}

// Function to handle team selection
function handleTeamSelection(event) {
    const teamId = event.target.dataset.teamId;
    const teamName = event.target.textContent;

    // Fetch team data from API
    fetch(`${apiEndpoint}/${teamId}`)
        .then(response => response.json())
        .then(data => {
            const teamInfo = data[0];
            const modal = document.getElementById('modal');
            const modalContent = modal.querySelector('.modal-content');
            const teamNameElement = modalContent.querySelector('#team-name');
            const teamInfoElement = modalContent.querySelector('#team-info');

            teamNameElement.textContent = teamName;
            teamInfoElement.textContent = `Conference: ${teamInfo.conference}, Division: ${teamInfo.division}`;

            modal.style.display = 'block';
        })
        .catch(error => console.error('Error fetching team data:', error));
}

// Function to handle modal close
function handleModalClose() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', renderTeams);
document.addEventListener('click', event => {
    if (event.target.classList.contains('dropbtn')) {
        toggleDropdown(event.target.dataset.conference);
    } else if (event.target.tagName === 'A' && event.target.dataset.teamId) {
        handleTeamSelection(event);
    } else if (event.target.classList.contains('close')) {
        handleModalClose();
    }
});

// Function to handle search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const teams = document.querySelectorAll('#eastern-teams li, #western-teams li');
    teams.forEach(team => {
        const teamName = team.textContent.toLowerCase();
        if (teamName.includes(searchTerm)) {
            team.style.display = 'block';
        } else {
            team.style.display = 'none';
        }
    });
}

// Function to handle modal window functionality
function handleModal(teamName, teamInfo) {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const teamNameElement = modalContent.querySelector('#team-name');
    const teamInfoElement = modalContent.querySelector('#team-info');
    teamNameElement.textContent = teamName;
    teamInfoElement.textContent = teamInfo;
    modal.style.display = 'block';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', handleSearch);
    const teams = document.querySelectorAll('#eastern-teams li, #western-teams li');
    teams.forEach(team => {
        team.addEventListener('click', event => {
            const teamName = event.target.textContent;
            const teamInfo = 'This is some sample team info.';
            handleModal(teamName, teamInfo);
        });
    });
});
