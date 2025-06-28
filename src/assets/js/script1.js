document.addEventListener("DOMContentLoaded", () => {
  // Get references to DOM elements
  let newTaskInput = document.getElementById("new-task-input");
  let addTaskBtn = document.getElementById("add-task-btn");
  let taskList = document.getElementById("task-list");

  // Function to save tasks to Local Storage
  function saveTasks() {
    let tasks = [];
    // Iterate through each task item in the list
    taskList.querySelectorAll(".task-text").forEach(taskTextSpan => {
      // Only save tasks that are not currently being edited
      if (!taskTextSpan.closest("li").querySelector(".edit-input")) {
        tasks.push(taskTextSpan.textContent);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to create a new task list item
  function createTaskElement(taskText) {
    let listItem = document.createElement("li");
    // Apply Foundation grid classes to the list item for alignment
    listItem.className = "grid-x align-middle grid-padding-x";

    let taskTextSpan = document.createElement("span");
    taskTextSpan.className = "task-text cell auto"; // 'cell auto' makes it take available space
    taskTextSpan.textContent = taskText;

    let taskActionsDiv = document.createElement("div");
    taskActionsDiv.className = "task-actions cell shrink"; // 'cell shrink' makes it take minimum space

    // Create Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "button tiny secondary"; // Foundation button classes: tiny for size, secondary for color
    editBtn.addEventListener("click", () => editTask(listItem, taskTextSpan));

    // Create Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "button tiny alert"; // Foundation button classes: tiny for size, alert for red color
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this task?")) {
        listItem.remove();
        saveTasks(); // Save tasks after deletion
      }
    });

    // Append buttons to action div
    taskActionsDiv.appendChild(editBtn);
    taskActionsDiv.appendChild(deleteBtn);

    // Append task text and actions to the list item
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(taskActionsDiv);

    // Append the new list item to the task list
    taskList.appendChild(listItem);
  }

  // Function to handle adding a new task
  function addTask() {
    let task = newTaskInput.value.trim();

    if (task === "") {
      alert("Task cannot be empty!");
      return;
    }

    // Check for duplicate tasks (case-insensitive, excluding current edited task)
    let isDuplicate = Array.from(taskList.querySelectorAll(".task-text"))
      .map(span => span.textContent.toLowerCase())
      .includes(task.toLowerCase());

    if (isDuplicate) {
      alert("This task already exists!");
      return;
    }

    createTaskElement(task); // Create and add the task
    saveTasks();             // Save tasks to local storage
    newTaskInput.value = ""; // Clear the input field
  }

  // Function to handle editing a task
  function editTask(listItem, taskTextSpan) {
    let originalText = taskTextSpan.textContent;
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input cell auto"; // Apply Foundation cell class
    editInput.value = originalText;

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "button tiny success"; // Foundation button classes

    let taskActionsDiv = listItem.querySelector(".task-actions");
    let editBtn = taskActionsDiv.querySelector(".button.secondary"); // Select by specific class
    let deleteBtn = taskActionsDiv.querySelector(".button.alert");   // Select by specific class

    // Temporarily remove existing buttons
    taskActionsDiv.removeChild(editBtn);
    taskActionsDiv.removeChild(deleteBtn);

    // Replace task text with input field
    listItem.replaceChild(editInput, taskTextSpan);
    taskActionsDiv.appendChild(saveBtn); // Add save button

    editInput.focus(); // Focus on the input field

    // Event listener for Save button
    saveBtn.addEventListener("click", () => {
      let newText = editInput.value.trim();

      if (newText === "") {
        alert("Edited task cannot be empty!");
        editInput.focus();
        return;
      }

      // Check for duplicate tasks (case-insensitive, excluding the task being edited)
      let existingTasks = Array.from(taskList.querySelectorAll(".task-text"))
        .filter(span => span !== taskTextSpan) // Exclude the current span
        .map(span => span.textContent.toLowerCase());

      if (existingTasks.includes(newText.toLowerCase())) {
        alert("This task already exists!");
        editInput.focus();
        return;
      }

      taskTextSpan.textContent = newText;
      listItem.replaceChild(taskTextSpan, editInput); // Replace input with updated text span

      // Restore original buttons
      taskActionsDiv.removeChild(saveBtn);
      taskActionsDiv.appendChild(editBtn);
      taskActionsDiv.appendChild(deleteBtn);
      saveTasks(); // Save changes after editing
    });

    // Allow saving on Enter key press
    editInput.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        saveBtn.click();
      }
    });
  }

  // Event Listeners for adding tasks
  addTaskBtn.addEventListener("click", addTask);
  newTaskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Load tasks from Local Storage on page load
  (JSON.parse(localStorage.getItem("tasks")) || []).forEach(task => createTaskElement(task));
});
