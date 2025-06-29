document.addEventListener("DOMContentLoaded", () => {
  const newTaskInput = document.getElementById("new-task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const todoListNameInput = document.getElementById("todo-list-name-input");
  const listTitle = document.getElementById("list-title");
  const clearListBtn = document.getElementById("clear-list-btn");
  const printListBtn = document.getElementById("print-list-btn");

  // Function to load tasks from Local Storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskText => addTaskToDOM(taskText));
  }

  // Function to save tasks to Local Storage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll(".task-text").forEach(taskElement => {
      if (!taskElement.closest("li").querySelector(".edit-input")) { // Only save if not currently editing
        tasks.push(taskElement.textContent);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to add a task to the DOM using a template literal
  function addTaskToDOM(taskText) {
    const listItemHTML = `
      <li>
        <span class="task-text">${taskText}</span>
        <div class="task-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </li>
    `;
    const tempDiv = document.createElement("div"); // Create a temporary div to parse the HTML string
    tempDiv.innerHTML = listItemHTML;
    const listItem = tempDiv.firstElementChild; // Get the actual li element

    // Attach event listeners
    listItem.querySelector(".edit-btn").addEventListener("click", () => editTask(listItem, listItem.querySelector(".task-text")));
    listItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(listItem));

    taskList.appendChild(listItem);
  }

  // Function to handle adding a new task
  function addTask() {
    const taskText = newTaskInput.value.trim();

    // Validation: Check if the task is empty
    if (taskText === "") {
      alert("Task cannot be empty!");
      return;
    }

    // Validation: Check for uniqueness (case-insensitive)
    const existingTasks = Array.from(taskList.querySelectorAll(".task-text")).map(span => span.textContent.toLowerCase());
    if (existingTasks.includes(taskText.toLowerCase())) {
      alert("This task already exists!");
      return;
    }

    addTaskToDOM(taskText);
    saveTasks(); // Save to local storage
    newTaskInput.value = ""; // Clear the input field
  }

  // Function to handle deleting a task
  function deleteTask(listItem) {
    if (confirm("Are you sure you want to delete this task?")) {
      listItem.remove();
      saveTasks(); // Save to local storage after deletion
    }
  }

  // Function to handle editing a task
  function editTask(listItem, taskTextSpan) {
    const originalText = taskTextSpan.textContent;

    // Create an input field for editing using a template
    const editInputHTML = `<input type="text" class="edit-input" value="${originalText}">`;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editInputHTML;
    const editInput = tempDiv.firstElementChild;

    // Create a save button using a template
    const saveButtonHTML = `<button class="save-btn">Save</button>`;
    tempDiv.innerHTML = saveButtonHTML; // Reuse tempDiv
    const saveButton = tempDiv.firstElementChild;

    // Replace task text span and buttons with edit input and save button
    const taskActionsDiv = listItem.querySelector(".task-actions");
    const originalEditButton = taskActionsDiv.querySelector(".edit-btn");
    const originalDeleteButton = taskActionsDiv.querySelector(".delete-btn");

    // Remove original buttons
    taskActionsDiv.removeChild(originalEditButton);
    taskActionsDiv.removeChild(originalDeleteButton);

    listItem.replaceChild(editInput, taskTextSpan);
    taskActionsDiv.appendChild(saveButton);

    editInput.focus(); // Focus on the input field

    // Event listener for saving changes
    saveButton.addEventListener("click", () => {
      const newText = editInput.value.trim();

      // Validation for edited task
      if (newText === "") {
        alert("Edited task cannot be empty!");
        editInput.focus(); // Keep focus on the input if invalid
        return;
      }

      // Check for uniqueness among other tasks (excluding the one being edited)
      const existingTasks = Array.from(taskList.querySelectorAll(".task-text"))
        .filter(span => span !== taskTextSpan) // Exclude the original span of the current task
        .map(span => span.textContent.toLowerCase());

      if (existingTasks.includes(newText.toLowerCase())) {
        alert("This task already exists!");
        editInput.focus(); // Keep focus on the input if not unique
        return;
      }

      taskTextSpan.textContent = newText;
      listItem.replaceChild(taskTextSpan, editInput);

      // Restore original buttons
      taskActionsDiv.removeChild(saveButton);
      taskActionsDiv.appendChild(originalEditButton);
      taskActionsDiv.appendChild(originalDeleteButton);

      saveTasks(); // Save to local storage after editing
    });

    // Allow saving with Enter key
    editInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        saveButton.click();
      }
    });
  }

  // Function to clear the list
  function clearList() {
    if (JSON.parse(localStorage.getItem("tasks") || []).length === 0) {
      alert("There are no tasks to clear! Please add some tasks first!");
      return;
    }
    if (confirm("Are you sure you want to clear all tasks? This action cannot be undone.")) {
      taskList.innerHTML = ""; // Clears all list items from the DOM
      saveTasks(); // Clears tasks from localStorage
    }
  }

  function printList() {
    if (JSON.parse(localStorage.getItem("tasks") || []).length === 0) {
      alert("There are no tasks to print!");
      return;
    }
    window.print(); // Triggers the browser's print dialog
  }

  // Event Listeners
  addTaskBtn.addEventListener("click", addTask);
  todoListNameInput.addEventListener("input", updateTitle);

  // Allow adding tasks with Enter key in the input field
  newTaskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Updates list title from input
  function updateTitle(e) {
    if (e.target.value !== "") {
      listTitle.textContent = e.target.value;
    } else {
      listTitle.textContent = "My TODO List";
    }
  }

  // Add event listener for the Clear List button
  clearListBtn.addEventListener("click", clearList);
  printListBtn.addEventListener("click", printList);

  // Load tasks when the page loads
  loadTasks();
});
