document.addEventListener("DOMContentLoaded", () => {
  let newTaskInput = document.getElementById("new-task-input");
  let addTaskBtn = document.getElementById("add-task-btn");
  let taskList = document.getElementById("task-list");

  // Function to save tasks to local storage
  function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll(".task-text").forEach(taskTextElement => {
      // Only save tasks that are not currently being edited
      if (!taskTextElement.closest("li").querySelector(".edit-input")) {
        tasks.push(taskTextElement.textContent);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to create a new task element
  function createTaskElement(taskText) {
    let listItem = document.createElement("li");
    listItem.classList.add("callout", "small"); // Foundation classes for styling

    let taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = taskText;

    let actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions"; // Custom class for actions container

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("button", "warning", "tiny", "margin-right-1"); // Foundation classes
    editBtn.addEventListener("click", () => editTask(listItem, taskSpan));

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("button", "alert", "tiny"); // Foundation classes
    deleteBtn.addEventListener("click", () => deleteTask(listItem));

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    listItem.appendChild(taskSpan);
    listItem.appendChild(actionsDiv);
    taskList.appendChild(listItem);
  }

  // Function to add a new task
  function addTask() {
    let taskText = newTaskInput.value.trim();

    if (taskText === "") {
      alert("Task cannot be empty!");
      return;
    }

    // Check for duplicate tasks (case-insensitive)
    let isDuplicate = Array.from(taskList.querySelectorAll(".task-text"))
      .map(el => el.textContent.toLowerCase())
      .includes(taskText.toLowerCase());

    if (isDuplicate) {
      alert("This task already exists!");
      return;
    }

    createTaskElement(taskText);
    saveTasks();
    newTaskInput.value = ""; // Clear the input field
  }

  // Function to edit a task
  function editTask(listItem, taskSpan) {
    let originalText = taskSpan.textContent;
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input"; // Custom class
    editInput.value = originalText;
    editInput.classList.add("small-12", "margin-bottom-1"); // Foundation input class

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("button", "success", "tiny", "margin-right-1"); // Foundation classes

    let actionsDiv = listItem.querySelector(".task-actions");
    // Change these lines to find the actual buttons instead of looking for specific classes
    let editBtn = actionsDiv.querySelector("button:first-child");
    let deleteBtn = actionsDiv.querySelector("button:last-child");

    // Replace task text with input field and change buttons
    listItem.replaceChild(editInput, taskSpan);
    actionsDiv.removeChild(editBtn);
    actionsDiv.removeChild(deleteBtn);
    actionsDiv.prepend(saveBtn); // Add save button to the beginning of actions

    editInput.focus();

    const saveChanges = () => {
      let newText = editInput.value.trim();

      if (newText === "") {
        alert("Edited task cannot be empty!");
        editInput.focus();
        return;
      }

      // Check for duplicate tasks (excluding the current task being edited)
      let isDuplicate = Array.from(taskList.querySelectorAll(".task-text"))
        .filter(el => el !== taskSpan) // Exclude the current span being edited
        .map(el => el.textContent.toLowerCase())
        .includes(newText.toLowerCase());

      if (isDuplicate) {
        alert("This task already exists!");
        editInput.focus();
        return;
      }

      taskSpan.textContent = newText;
      listItem.replaceChild(taskSpan, editInput);
      actionsDiv.removeChild(saveBtn);
      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(deleteBtn);
      saveTasks();
    };

    saveBtn.addEventListener("click", saveChanges);
    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveChanges();
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

  // Load tasks from local storage on page load
  (JSON.parse(localStorage.getItem("tasks")) || []).forEach(taskText => createTaskElement(taskText));
});
