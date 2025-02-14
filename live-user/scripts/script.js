const userList = document.getElementById('user-list');
const filterInput = document.getElementById('filter');
const loadMoreButton = document.getElementById('load-more-button');
const loadingIndicator = document.getElementById('loading-indicator');
const emptyState = document.getElementById('empty-state');

let currentPage = 1;
const usersPerPage = 10;

async function fetchUsers() {
    try {
        loadingIndicator.style.display = 'block';
        const response = await fetch(`https://randomuser.me/api/?page=${currentPage}&results=${usersPerPage}`);
        const data = await response.json();
        const users = data.results;
        renderUsers(users);
    } catch (error) {
        console.error(error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function renderUsers(users) {
    const userElements = users.map((user) => {
        const userElement = document.createElement('li');
        userElement.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `;
        return userElement;
    });
    userList.append(...userElements);
}

filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase();
    const userElements = userList.children;
    for (const userElement of userElements) {
        const userName = userElement.querySelector('.user-info h4').textContent.toLowerCase();
        if (userName.includes(filterValue)) {
            userElement.style.display = 'block';
        } else {
            userElement.style.display = 'none';
        }
    }
});

loadMoreButton.addEventListener('click', () => {
    currentPage++;
    fetchUsers();
});

fetchUsers();