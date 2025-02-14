const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

let tasks = [];

// Load tasks from local storage
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => {
        const taskListItem = document.createElement('li');
        taskListItem.textContent = task;
        taskList.appendChild(taskListItem);
    });
}

addTaskButton.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        const taskListItem = document.createElement('li');
        taskListItem.textContent = task;
        taskList.appendChild(taskListItem);
        taskInput.value = '';
    }
});