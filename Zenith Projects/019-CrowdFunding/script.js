let currentAmount = 0;
let treesPlanted = 0;
let carbonSequestered = 0;

document.getElementById('donate-btn').addEventListener('click', () => {
    document.getElementById('donation-form').style.display = 'block';
});

document.getElementById('submit-donation').addEventListener('click', (e) => {
    e.preventDefault();
    const amount = parseInt(document.getElementById('amount').value);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (amount > 0 && name !== '' && email !== '') {
        currentAmount += amount;
        document.getElementById('current-amount').innerText = currentAmount;
        if (currentAmount % 10000000 === 0) {
            treesPlanted++;
            document.getElementById('trees-planted').innerText = treesPlanted;
            carbonSequestered += 200; 
            document.getElementById('carbon-sequestered').innerText = carbonSequestered;
            const update = `Tree planted by ${name}! Total amount: ₹${currentAmount}`;
            const updateList = document.getElementById('update-list');
            const newUpdate = document.createElement('li');
            newUpdate.innerText = update;
            updateList.appendChild(newUpdate);
        }
        document.getElementById('donation-form').style.display = 'none';
        document.getElementById('amount').value = '';
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    }
});

// Initialize the map
const map = L.map('tree-planting-map').setView([20.593683, 78.962883], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c']
}).addTo(map);

// Add a marker to the map
L.marker([20.593683, 78.962883]).addTo(map);

// Add a popup to the marker
L.popup()
    .setLatLng([20.593683, 78.962883])
    .setContent('Tree planting location')
    .openOn(map);

// Add event listener to the FAQs section
document.getElementById('faqs').addEventListener('click', (e) => {
    if (e.target.tagName === 'H3') {
        const answer = e.target.nextElementSibling;
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
        } else {
            answer.style.display = 'block';
        }
    }
});

// Add event listener to the blog section
document.getElementById('blog').addEventListener('click', (e) => {
    if (e.target.tagName === 'H3') {
        const post = e.target.nextElementSibling;
        if (post.style.display === 'block') {
            post.style.display = 'none';
        } else {
            post.style.display = 'block';
        }
    }
});