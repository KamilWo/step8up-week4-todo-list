document.addEventListener("DOMContentLoaded", () => {
  const newTaskInput = document.getElementById("new-task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const currentTodoTypeSpan = document.getElementById("current-todo-type");

  // Get current todo type from URL parameter or default to 'personal'
  const urlParams = new URLSearchParams(window.location.search);
  const currentType = urlParams.get('type') || 'personal';

  // Update displayed todo type and body class for styling
  currentTodoTypeSpan.textContent = currentType.charAt(0).toUpperCase() + currentType.slice(1); // Capitalize first letter
  document.body.className = document.body.className.split(' ').filter(c => !c.startsWith('todo-type-')).join(' ') + ` todo-type-${currentType}`;
  document.querySelector('.todo-container').classList.add(`bg-${currentType}-todo-bg`);


  // Function to get storage key based on current todo type
  function getStorageKey() {
    return `tasks_${currentType}`;
  }

  // Function to save tasks to local storage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll(".task-text").forEach(taskTextElement => {
      if (!taskTextElement.closest("li").querySelector(".edit-input")) {
        tasks.push(taskTextElement.textContent);
      }
    });
    localStorage.setItem(getStorageKey(), JSON.stringify(tasks));
  }

  // Function to create a new task item
  function createTaskElement(taskText) {
    const listItem = document.createElement("li");
    // Using direct Tailwind classes for robust styling
    listItem.className = "flex justify-between items-center break-all p-lg mb-md rounded-md border border-light-border dark:border-gray-500 bg-task-item-bg dark:bg-gray-600 transition-colors duration-300";

    const taskTextSpan = document.createElement("span");
    taskTextSpan.className = "task-text text-lg text-text-medium mr-md flex-grow dark:text-gray-200";
    taskTextSpan.textContent = taskText;

    const taskActionsDiv = document.createElement("div");
    taskActionsDiv.className = "task-actions flex gap-sm";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    // Explicit Tailwind classes for edit button
    editButton.className = "px-3 py-2 bg-edit-btn text-text-dark rounded-sm cursor-pointer text-sm border-none transition-colors duration-200 hover:bg-edit-btn-hover dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-700 focus:outline-none";
    editButton.addEventListener("click", () => editTask(listItem, taskTextSpan));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    // Explicit Tailwind classes for delete button
    deleteButton.className = "px-3 py-2 bg-delete-btn text-white rounded-sm cursor-pointer text-sm border-none transition-colors duration-200 hover:bg-delete-btn-hover dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none";
    deleteButton.addEventListener("click", () => deleteTask(listItem));

    taskActionsDiv.appendChild(editButton);
    taskActionsDiv.appendChild(deleteButton);
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(taskActionsDiv);
    taskList.appendChild(listItem);
  }

  // Function to add a new task
  function addTask() {
    const taskText = newTaskInput.value.trim();

    if (taskText === "") {
      alert("Task cannot be empty!");
      return;
    }

    const existingTasks = Array.from(taskList.querySelectorAll(".task-text")).map(span => span.textContent.toLowerCase());
    if (existingTasks.includes(taskText.toLowerCase())) {
      alert("This task already exists!");
      return;
    }

    createTaskElement(taskText);
    saveTasks();
    newTaskInput.value = "";
  }

  // Function to edit an existing task
  function editTask(listItem, taskTextSpan) {
    const originalText = taskTextSpan.textContent;
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input p-sm border border-border-light rounded-sm text-lg mr-md flex-grow focus:outline-none focus:border-primary focus:shadow-focus dark:bg-gray-600 dark:border-gray-500 dark:text-white";
    editInput.value = originalText;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    // Explicit Tailwind classes for save button
    saveButton.className = "save-btn px-3 py-2 bg-save-btn text-white rounded-sm cursor-pointer text-sm border-none transition-colors duration-200 hover:bg-save-btn-hover dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none";

    const taskActionsDiv = listItem.querySelector(".task-actions");
    const editButton = taskActionsDiv.querySelector(".edit-btn");
    const deleteButton = taskActionsDiv.querySelector(".delete-btn");

    listItem.replaceChild(editInput, taskTextSpan);
    taskActionsDiv.removeChild(editButton);
    taskActionsDiv.removeChild(deleteButton);
    taskActionsDiv.appendChild(saveButton);

    editInput.focus();

    saveButton.addEventListener("click", () => {
      const newText = editInput.value.trim();
      if (newText === "") {
        alert("Edited task cannot be empty!");
        editInput.focus();
        return;
      }

      const existingTasks = Array.from(taskList.querySelectorAll(".task-text"))
        .filter(span => span !== taskTextSpan)
        .map(span => span.textContent.toLowerCase());
      if (existingTasks.includes(newText.toLowerCase())) {
        alert("This task already exists!");
        editInput.focus();
        return;
      }

      taskTextSpan.textContent = newText;
      listItem.replaceChild(taskTextSpan, editInput);
      taskActionsDiv.removeChild(saveButton);
      taskActionsDiv.appendChild(editButton);
      taskActionsDiv.appendChild(deleteButton);
      saveTasks();
    });

    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveButton.click();
      }
    });
  }

  // Function to delete a task
  function deleteTask(listItem) {
    if (confirm("Are you sure you want to delete this task?")) {
      listItem.remove();
      saveTasks();
    }
  }

  // Event listeners
  addTaskBtn.addEventListener("click", addTask);
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Load tasks from local storage on page load for the current type
  const savedTasks = JSON.parse(localStorage.getItem(getStorageKey())) || [];
  savedTasks.forEach(task => createTaskElement(task));
});
