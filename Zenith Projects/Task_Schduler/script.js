// Task class
class Task {
    constructor(id, name, date, time, priority) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.time = time;
        this.priority = priority;
    }
}

// Task list class
class TaskList {
    constructor() {
        this.tasks = [];
        this.taskId = 0;
        this.loadTasks();
    }

    // Add task to list
    addTask(task) {
        this.tasks.push(task);
        this.taskId++;
        this.saveTasks();
        this.renderTaskList();
    }

    // Remove task from list
    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTaskList();
    }

    // Clear task list
    clearTasks() {
        this.tasks = [];
        this.taskId = 0;
        this.saveTasks();
        this.renderTaskList();
    }

    // Save tasks to local storage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Load tasks from local storage
    loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
    }

    // Render task list
    renderTaskList() {
        const taskListElement = document.getElementById('task-list');
        taskListElement.innerHTML = '';
        this.tasks.forEach((task) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <span class="task-name">${task.name}</span>
                <span class="task-date">${task.date}</span>
                <span class="task-time">${task.time}</span>
                <span class="task-priority">${task.priority}</span>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            `;
            taskListElement.appendChild(taskItem);
        });
    }

    // Sort tasks by priority
    sortTasksByPriority() {
        this.tasks.sort((a, b) => {
            if (a.priority === 'high' && b.priority !== 'high') {
                return -1;
            } else if (a.priority !== 'high' && b.priority === 'high') {
                return 1;
            } else if (a.priority === 'medium' && b.priority === 'low') {
                return -1;
            } else if (a.priority === 'low' && b.priority === 'medium') {
                return 1;
            } else {
                return 0;
            }
        });
        this.renderTaskList();
    }
}

// Initialize task list
const taskList = new TaskList();

// Get form elements
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDateInput = document.getElementById('task-date');
const taskTimeInput = document.getElementById('task-time');
const taskPriorityInput = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-task-btn');
const clearTasksBtn = document.getElementById('clear-tasks-btn');
const sortTasksBtn = document.getElementById('sort-tasks-btn');

// Add event listeners
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = taskNameInput.value.trim();
    const taskDate = taskDateInput.value.trim();
    const taskTime = taskTimeInput.value.trim();
    const taskPriority = taskPriorityInput.value.trim();

    if (taskName && taskDate && taskTime && taskPriority) {
        const task = new Task(taskList.taskId, taskName, taskDate, taskTime, taskPriority);
        taskList.addTask(task);
        taskForm.reset();
    } else {
        alert('Please fill in all fields');
    }
});

clearTasksBtn.addEventListener('click', () => {
    taskList.clearTasks();
});

sortTasksBtn.addEventListener('click', () => {
    taskList.sortTasksByPriority();
});

// Delete task event listener
document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const taskId = e.target.dataset.id;
        taskList.removeTask(taskId);
    }
});