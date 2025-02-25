const form = document.querySelector('form');
const foodList = document.querySelector('.food-list');
const totalCalories = document.querySelector('.total-calories');
const totalFoodItems = document.querySelector('.total-food-items');
const averageCalories = document.querySelector('.average-calories');
const mostConsumedFood = document.querySelector('.most-consumed-food');
const deleteButton = document.querySelector('.delete-button');
const calorieChart = document.getElementById('calorie-chart').getContext('2d');

let foods = [];
let totalCaloriesCount = 0;
let totalFoodItemsCount = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const foodName = document.querySelector('#food-name').value;
    const foodQuantity = document.querySelector('#food-quantity').value;
    const foodCalories = document.querySelector('#food-calories').value;
    const foodCategory = document.querySelector('#food-category').value;

    const food = {
        name: foodName,
        quantity: foodQuantity,
        calories: foodCalories,
        category: foodCategory
    };

    foods.push(food);
    totalCaloriesCount += parseInt(foodCalories);
    totalFoodItemsCount++;

    displayFoods();
    updateStats();
    updateMostConsumedFood();
    updateCalorieChart();
});

deleteButton.addEventListener('click', () => {
    foods = [];
    totalCaloriesCount = 0;
    totalFoodItemsCount = 0;

    displayFoods();
    updateStats();
    updateMostConsumedFood();
    updateCalorieChart();
});

function displayFoods() {
    const foodHTML = foods.map((food) => {
        return `
            <li>
                ${food.name} x ${food.quantity} = ${food.calories} calories (${food.category})
            </li>
        `;
    }).join('');

    foodList.innerHTML = foodHTML;
}

function updateStats() {
    totalCalories.textContent = totalCaloriesCount;
    totalFoodItems.textContent = totalFoodItemsCount;
    averageCalories.textContent = (totalCaloriesCount / totalFoodItemsCount).toFixed(2);
}

function updateMostConsumedFood() {
    const mostConsumedFoodName = foods.reduce((max, current) => {
        return max.quantity > current.quantity ? max : current;
    }).name;

    mostConsumedFood.textContent = mostConsumedFoodName;
}

function updateCalorieChart() {
    const chart = new Chart(calorieChart, {
        type: 'bar',
        data: {
            labels: foods.map((food) => food.name),
            datasets: [{
                label: 'Calories',
                data: foods.map((food) => food.calories),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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
function updateCalorieChart() {
    const chart = new Chart(calorieChart, {
        type: 'bar',
        data: {
            labels: foods.map((food) => food.name),
            datasets: [{
                label: 'Calories',
                data: foods.map((food) => food.calories),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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