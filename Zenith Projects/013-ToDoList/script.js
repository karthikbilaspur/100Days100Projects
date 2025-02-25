// script.js

// Get the todo list ul element
const todoListUl = document.getElementById('todo-list-ul');

// Get the add todo form element
const addTodoForm = document.getElementById('add-todo-form');

// Get the todo input element
const todoInput = document.getElementById('todo-input');

// Get the clear todo button element
const clearTodoBtn = document.getElementById('clear-todo-btn');

// Get the sort todo button element
const sortTodoBtn = document.getElementById('sort-todo-btn');

// Get the login button element
const loginBtn = document.getElementById('login-btn');

// Get the logout button element
const logoutBtn = document.getElementById('logout-btn');

// Initialize an empty todo list array
let todoList = [];

// Initialize a variable to store the current user
let currentUser = null;

// Function to add a todo item to the list
function addTodoItem(todoItem) {
    todoList.push(todoItem);
    displayTodoList();
}

// Function to display the todo list
function displayTodoList() {
    todoListUl.innerHTML = '';
    todoList.forEach((todoItem, index) => {
        const todoListItem = document.createElement('li');
        todoListItem.innerHTML = `
            <span>${todoItem}</span>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        todoListUl.appendChild(todoListItem);
    });
}

// Function to clear the todo list
function clearTodoList() {
    todoList = [];
    displayTodoList();
}

// Function to sort the todo list
function sortTodoList() {
    todoList.sort();
    displayTodoList();
}

// Function to edit a todo item
function editTodoItem(index, newTodoItem) {
    todoList[index] = newTodoItem;
    displayTodoList();
}

// Function to delete a todo item
function deleteTodoItem(index) {
    todoList.splice(index, 1);
    displayTodoList();
}

// Function to login
function login() {
    const username = prompt('Enter your username:');
    if (username) {
        currentUser = username;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    }
}

// Function to logout
function logout() {
    currentUser = null;
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
}

// Add event listener to the add todo form
addTodoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const todoItem = todoInput.value.trim();
    if (todoItem) {
        addTodoItem(todoItem);
        todoInput.value = '';
    }
});

// Add event listener to the clear todo button
clearTodoBtn.addEventListener('click', clearTodoList);

// Add event listener to the sort todo button
sortTodoBtn.addEventListener('click', sortTodoList);

// Add event listener to the login button
loginBtn.addEventListener('click', login);

// Add event listener to the logout button
logoutBtn.addEventListener('click', logout);

// Add event listener to the todo list ul element
todoListUl.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const index = parseInt(event.target.dataset.index);
        const newTodoItem = prompt('Enter new todo item:');
        if (newTodoItem) {
            editTodoItem(index, newTodoItem);
        }
    } else if (event.target.classList.contains('delete-btn')) {
        const index = parseInt(event.target.dataset.index);
        deleteTodoItem(index);
    }
});

// Function to save todo list to local storage
function saveTodoList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Function to load todo list from local storage
function loadTodoList() {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
        todoList = JSON.parse(storedTodoList);
        displayTodoList();
    }
}

// Load todo list from local storage
loadTodoList();

// Save todo list to local storage whenever it changes
setInterval(saveTodoList, 1000);