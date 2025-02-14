const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
        <small class="strengths">Strengths: <span>${pokemon.strengths.join(', ')}</span> </small>
        <small class="weaknesses">Weaknesses: <span>${pokemon.weaknesses.join(', ')}</span> </small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()

const pokemonData = [
    {
        id: 1,
        name: 'Bulbasaur',
        description: 'A strange seed plant Pokémon that can photosynthesize.',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        types: ['grass', 'poison'],
        strengths: ['water', 'electric'],
        weaknesses: ['fire', 'ice', 'flying', 'bug']
    },
    {
        id: 2,
        name: 'Ivysaur',
        description: 'When the bulb on its back grows to a certain size, it blooms into a large flower.',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
        types: ['grass', 'poison'],
        strengths: ['water', 'electric'],
        weaknesses: ['fire', 'ice', 'flying', 'bug']
    },
    // Add more Pokémon data here...
];

let currentPokemonIndex = 0;
let filteredPokemon = pokemonData;

const pokemonNameElement = document.getElementById('pokemon-name');
const pokemonDescriptionElement = document.getElementById('pokemon-description');
const pokemonTypesElement = document.getElementById('pokemon-types');
const pokemonStrengthsElement = document.getElementById('pokemon-strengths');
const pokemonWeaknessesElement = document.getElementById('pokemon-weaknesses');
const pokemonImageElement = document.getElementById('pokemon-image');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const randomButton = document.getElementById('random-button');
const pokemonFilterElement = document.getElementById('pokemon-filter');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

previousButton.addEventListener('click', () => {
    currentPokemonIndex = (currentPokemonIndex - 1 + filteredPokemon.length) % filteredPokemon.length;
    updatePokemonInfo();
});

nextButton.addEventListener('click', () => {
    currentPokemonIndex = (currentPokemonIndex + 1) % filteredPokemon.length;
    updatePokemonInfo();
});

randomButton.addEventListener('click', () => {
    currentPokemonIndex = Math.floor(Math.random() * filteredPokemon.length);
    updatePokemonInfo();
});

pokemonFilterElement.addEventListener('change', (e) => {
    const selectedType = e.target.value;
    if (selectedType === 'all') {
        filteredPokemon = pokemonData;
    } else {
        filteredPokemon = pokemonData.filter((pokemon) => pokemon.types.includes(selectedType));
    }
    currentPokemonIndex = 0;
    updatePokemonInfo();
});

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemon = pokemonData.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm));
    updatePokemonList(filteredPokemon);
});

function updatePokemonInfo() {
    const currentPokemon = filteredPokemon[currentPokemonIndex];
    pokemonNameElement.textContent = currentPokemon.name;
    pokemonDescriptionElement.textContent = currentPokemon.description;
    pokemonTypesElement.textContent = `Types: ${currentPokemon.types.join(', ')}`;
    pokemonStrengthsElement.textContent = `Strengths: ${currentPokemon.strengths.join(', ')}`;
    pokemonWeaknessesElement.textContent = `Weaknesses: ${currentPokemon.weaknesses.join(', ')}`;
    pokemonImageElement.src = currentPokemon.imageUrl;
}

function updatePokemonList(pokemonList) {
    const pokeContainer = document.getElementById('poke-container');
    pokeContainer.innerHTML = '';
    pokemonList.forEach((pokemon) => {
        createPokemonCard(pokemon);
    });
}

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
        <small class="strengths">Strengths: <span>${pokemon.strengths.join(', ')}</span> </small>
        <small class="weaknesses">Weaknesses: <span>${pokemon.weaknesses.join(', ')}</span> </small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

updatePokemonInfo()