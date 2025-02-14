const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const clearTasksBtn = document.getElementById('clear-tasks-btn');
const toggleModeBtn = document.getElementById('toggle-mode-btn');
const googleCalendarBtn = document.getElementById('google-calendar-btn');

let tasks = [];
let taskId = 0;
let isDarkMode = false;

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;
    const taskPriority = document.getElementById('task-priority').value;

    const task = {
        id: taskId,
        name: taskName,
        date: taskDate,
        time: taskTime,
        priority: taskPriority
    };

    tasks.push(task);
    taskId++;
    renderTaskList();
    taskForm.reset();
});

clearTasksBtn.addEventListener('click', () => {
    tasks = [];
    renderTaskList();
});

toggleModeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
});

googleCalendarBtn.addEventListener('click', () => {
    // TO DO: Implement Google Calendar integration
    console.log('Google Calendar button clicked!');
});

function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span class="task-name">${task.name}</span>
            <span class="task-date">${task.date}</span>
            <span class="task-time">${task.time}</span>
            <span class="task-priority">${task.priority}</span>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const taskId = e.target.dataset.id;
        tasks = tasks.filter((task) => task.id !== parseInt(taskId));
        renderTaskList();
    }
});