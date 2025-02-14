const userDetailContainer = document.getElementById('user-detail-container');

async function fetchUserDetail(userId) {
    try {
        const response = await fetch(`https://randomuser.me/api/?seed=${userId}`);
        const data = await response.json();
        const user = data.results[0];
        renderUserDetail(user);
    } catch (error) {
        console.error(error);
    }
}

function renderUserDetail(user) {
    userDetailContainer.innerHTML = `
        <h2>${user.name.first} ${user.name.last}</h2>
        <p>${user.location.city}, ${user.location.country}</p>
        <p>${user.email}</p>
        <p>${user.phone}</p>
    `;
}

// Example usage:
fetchUserDetail('example-user-id');