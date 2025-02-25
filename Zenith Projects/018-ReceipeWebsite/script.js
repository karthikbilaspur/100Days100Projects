// script.js

const readMoreButton = document.querySelector('.read-more-button');
const readMoreContent = document.querySelector('.read-more-content');

readMoreButton.addEventListener('click', () => {
    if (readMoreContent.style.display === 'block') {
        readMoreContent.style.display = 'none';
        readMoreButton.textContent = 'Read More';
    } else {
        readMoreContent.style.display = 'block';
        readMoreButton.textContent = 'Read Less';
    }
});

const loadMoreButton = document.querySelector('.load-more-button');
const recipeContainer = document.querySelector('.recipe-container');

let currentPage = 1;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.body.offsetHeight;

    if (scrollPosition >= pageHeight) {
        currentPage++;
        loadRecipes();
    }
});
loadMoreButton.addEventListener('click', () => {
    currentPage++;
    loadRecipes();
});

function loadRecipes() {
    // Simulate loading recipes from a API
    const recipes = [
        {
            title: 'Recipe 1',
            image: 'recipe1.jpg',
            ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
            instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3']
        },
        {
            title: 'Recipe 2',
            image: 'recipe2.jpg',
            ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
            instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3']
        }
    ];

    const recipeHTML = recipes.map((recipe) => {
        return `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" class="lazy-load">
            <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            <button class="read-more-button">Read More</button>
            <div class="read-more-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            </div>
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h3>Instructions:</h3>
            <ol>
                ${recipe.instructions.map((instruction) => `<li>${instruction}</li>`).join('')}
            </ol>
        `;
    }).join('');

    recipeContainer.insertAdjacentHTML('beforeend', recipeHTML);

    const lazyLoadImages = document.querySelectorAll('.lazy-load');

    lazyLoadImages.forEach((image) => {
        image.addEventListener('load', () => {
            image.classList.add('loaded');
        });
    });
}

loadRecipes();

const lazyLoadImages = document.querySelectorAll('.lazy-load');

lazyLoadImages.forEach((image) => {
    image.addEventListener('load', () => {
        image.classList.add('loaded');
    });
});

const readMoreButtons = document.querySelectorAll('.read-more-button');

readMoreButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const readMoreContent = button.nextElementSibling;
        if (readMoreContent.style.display === 'block') {
            readMoreContent.style.display = 'none';
            button.textContent = 'Read More';
        } else {
            readMoreContent.style.display = 'block';
            button.textContent = 'Read Less';
        }
    });
});