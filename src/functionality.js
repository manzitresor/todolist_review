/* eslint-disable no-use-before-define */
const taskContainer = document.querySelector('.task-container');
const addTaskInput = document.querySelector('#addTask');

function Task(index, description, completed) {
  this.index = index;
  this.description = description;
  this.completed = completed;
}

const storedTasks = localStorage.getItem('todotasks');
const taskArray = storedTasks ? JSON.parse(storedTasks) : [];

function addTask() {
  const description = addTaskInput.value;
  const task = new Task(taskArray.length + 1, description, false);
  taskArray.push(task);
  localStorage.setItem('todotasks', JSON.stringify(taskArray));
  addTaskInput.value = '';
}

function displayTasks() {
  taskContainer.innerHTML = '';
  const sortedTasks = taskArray.sort((x, y) => x.index - y.index);
  sortedTasks.forEach((task) => {
    const listItem = document.createElement('li');

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');

    const taskContentDiv = document.createElement('div');
    taskContentDiv.classList.add('task-content');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `task-${task.index}`;
    checkbox.checked = task.completed;

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.value = task.description;
    descriptionInput.disabled = task.completed;
    descriptionInput.classList.add('task-description');

    const iconContainerDiv = document.createElement('div');
    iconContainerDiv.classList.add('icon-container');

    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-ellipsis-v', 'edit-btn');

    const removeButton = document.createElement('i');
    removeButton.classList.add('fas', 'fa-trash-alt', 'remove-button');
    removeButton.dataset.index = task.index;

    listItem.appendChild(containerDiv);
    containerDiv.appendChild(taskContentDiv);
    taskContentDiv.appendChild(checkbox);
    taskContentDiv.appendChild(descriptionInput);
    containerDiv.appendChild(iconContainerDiv);
    iconContainerDiv.appendChild(editIcon);
    iconContainerDiv.appendChild(removeButton);

    taskContainer.appendChild(listItem);

    editIcon.addEventListener('click', () => {
      removeButton.style.display = 'block';
      editIcon.style.display = 'none';
      descriptionInput.disabled = false;
      descriptionInput.focus();
      descriptionInput.classList.toggle('selected');
    });

    descriptionInput.addEventListener('focus', () => {
      removeButton.style.display = 'block';
      editIcon.style.display = 'none';
      descriptionInput.disabled = false;
      descriptionInput.focus();
      descriptionInput.classList.toggle('selected');
    });

    descriptionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && descriptionInput.value !== '') {
        const taskIndex = parseInt(removeButton.dataset.index, 10);
        updateTask(taskIndex, descriptionInput.value);
        localStorage.setItem('todotasks', JSON.stringify(taskArray));
        descriptionInput.blur();
      }
    });

    descriptionInput.addEventListener('blur', () => {
      removeButton.style.display = 'block';
      editIcon.style.display = 'none';
      descriptionInput.disabled = true;
      const listItem = descriptionInput.closest('li');
      listItem.classList.remove('selected');
      descriptionInput.classList.remove('selected');
    });

    removeButton.addEventListener('click', (event) => {
      const taskIndex = parseInt(event.target.dataset.index, 10); // Retrieve index from dataset
      deleteTask(taskIndex);
    });
  });
}

function deleteTaskArray(index) {
  const deletedTaskIndex = taskArray.findIndex((task) => task.index === index);
  if (deletedTaskIndex !== -1) {
    taskArray.splice(deletedTaskIndex, 1);
    localStorage.setItem('todotasks', JSON.stringify(taskArray));
  }
}

function deleteTask(index) {
  const deletedTaskIndex = taskArray.findIndex((task) => task.index === index);
  if (deletedTaskIndex !== -1) {
    deleteTaskArray(index);
    for (let i = deletedTaskIndex; i < taskArray.length; i += 1) {
      taskArray[i].index = i + 1;
    }
    displayTasks();
  }
}

function updateTask(index, newDescription) {
  const task = taskArray.find((task) => task.index === index);
  if (task) {
    task.description = newDescription;
    localStorage.setItem('todotasks', JSON.stringify(taskArray));
    displayTasks();
  }
}

const formBtn = document.querySelector('.btn');

formBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addTask();
  displayTasks();
});

displayTasks();

export { displayTasks, taskArray };
