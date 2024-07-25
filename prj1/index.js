const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const task = taskInput.value.trim();
    if (task !== '') {
        tasks.push({ text: task, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTaskList();
        taskInput.value = '';
    }
}

function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskListItem = document.createElement('li');
        taskListItem.textContent = task.text;
        if (task.completed) {
            taskListItem.classList.add('completed');
        }
        taskListItem.addEventListener('click', () => {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTaskList();
        });
        taskListItem.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            deleteTask(index);
        });
        taskList.appendChild(taskListItem);
    });
}

function deleteTask(index) {
    const taskListItem = taskList.children[index];
    taskListItem.remove();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTaskList();
