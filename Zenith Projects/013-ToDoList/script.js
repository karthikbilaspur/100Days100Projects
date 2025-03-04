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
    saveTodoList();
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
    saveTodoList();
}

// Function to sort the todo list
function sortTodoList() {
    todoList.sort();
    displayTodoList();
    saveTodoList();
}

// Function to edit a todo item
function editTodoItem(index, newTodoItem) {
    todoList[index] = newTodoItem;
    displayTodoList();
    saveTodoList();
}

// Function to delete a todo item
function deleteTodoItem(index) {
    todoList.splice(index, 1);
    displayTodoList();
    saveTodoList();
}

// Function to login
function login() {
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');
    if (username === 'admin' && password === 'password') {
        currentUser = username;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        alert('Invalid username or password');
    }
}

// Function to logout
function logout() {
    currentUser = null;
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
}

// Function to save todo list to local storage
function saveTodoList() {
    const encryptedTodoList = encrypt(todoList);
    localStorage.setItem('todoList', encryptedTodoList);
}

// Function to load todo list from local storage
function loadTodoList() {
    const encryptedTodoList = localStorage.getItem('todoList');
    if (encryptedTodoList) {
        const decryptedTodoList = decrypt(encryptedTodoList);
        todoList = decryptedTodoList;
        displayTodoList();
    }
}

// Function to encrypt data
function encrypt(data) {
    const encryptedData = btoa(JSON.stringify(data));
    return encryptedData;
}

// Function to decrypt data
function decrypt(encryptedData) {
    const decryptedData = JSON.parse(atob(encryptedData));
    return decryptedData;
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

// Load todo list from local storage
loadTodoList();