document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
  });
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    if (taskInput.value.trim() === '') {
      alert('Please enter a task.');
      return;
    }
  
    const task = taskInput.value;
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${task}</span>
      <button onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(listItem);
  
    saveTask(task);
  
    taskInput.value = '';
  }
  
  function removeTask(button) {
    const taskList = document.getElementById('taskList');
    const taskText = button.parentNode.querySelector('span').textContent;
  
    taskList.removeChild(button.parentNode);
  
    removeTaskFromStorage(taskText);
  }
  
  function clearTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
  
    clearTasksFromStorage();
  }
  
  function saveTask(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    let tasks = getTasksFromStorage();
    const taskList = document.getElementById('taskList');
  
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${task}</span>
        <button onclick="removeTask(this)">Remove</button>
      `;
      taskList.appendChild(listItem);
    });
  }
  
  function removeTaskFromStorage(task) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function clearTasksFromStorage() {
    localStorage.removeItem('tasks');
  }
  
  function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  