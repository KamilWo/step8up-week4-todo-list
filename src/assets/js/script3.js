document.addEventListener("DOMContentLoaded", () => {
  let newTaskInput = document.getElementById("new-task-input");
  let addTaskBtn = document.getElementById("add-task-btn");
  let taskList = document.getElementById("task-list");
  let todoListNameInput = document.getElementById("todo-list-name-input");
  let listTitle = document.getElementById("list-title");
  let clearListBtn = document.getElementById("clear-list-btn");
  let printListBtn = document.getElementById("print-list-btn");

  function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll(".task-text").forEach(taskTextElement => {
      // Ensure we only save tasks that are not currently being edited
      if (!taskTextElement.closest("li").querySelector(".edit-input")) {
        tasks.push(taskTextElement.textContent);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function createTaskElement(taskText) {
    let listItem = document.createElement("li");
    let taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = taskText;

    let actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => (function(listItem, taskSpan) {
      let originalText = taskSpan.textContent;
      let editInput = document.createElement("input");
      editInput.type = "text";
      editInput.className = "edit-input";
      editInput.value = originalText;

      let saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className = "save-btn";

      let currentActions = listItem.querySelector(".task-actions");
      let currentEditBtn = currentActions.querySelector(".edit-btn");
      let currentDeleteBtn = currentActions.querySelector(".delete-btn");

      // Remove existing buttons
      currentActions.removeChild(currentEditBtn);
      currentActions.removeChild(currentDeleteBtn);

      // Replace span with input
      listItem.replaceChild(editInput, taskSpan);
      // Add save button
      currentActions.appendChild(saveBtn);

      editInput.focus();

      saveBtn.addEventListener("click", () => {
        let updatedText = editInput.value.trim();
        if (updatedText === "") {
          alert("Edited task cannot be empty!");
          editInput.focus();
          return;
        }

        // Check for duplicates, excluding the current task being edited
        const existingTasks = Array.from(taskList.querySelectorAll(".task-text"))
          .filter(el => el !== taskSpan) // Exclude the current span
          .map(el => el.textContent.toLowerCase());

        if (existingTasks.includes(updatedText.toLowerCase())) {
          alert("This task already exists!");
          editInput.focus();
          return;
        }

        taskSpan.textContent = updatedText;
        listItem.replaceChild(taskSpan, editInput);
        currentActions.removeChild(saveBtn);
        currentActions.appendChild(currentEditBtn);
        currentActions.appendChild(currentDeleteBtn);
        saveTasks();
      });

      editInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          saveBtn.click();
        }
      });
    })(listItem, taskSpan));

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this task?")) {
        listItem.remove();
        saveTasks();
      }
    });

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    listItem.appendChild(taskSpan);
    listItem.appendChild(actionsDiv);
    taskList.appendChild(listItem);
  }

  // Function to handle adding a new task
  function addTask() {
    let taskText = newTaskInput.value.trim();
    if (taskText === "") {
      alert("Task cannot be empty!");
      return;
    }

    // Check for duplicate tasks
    if (Array.from(taskList.querySelectorAll(".task-text")).map(e => e.textContent.toLowerCase()).includes(taskText.toLowerCase())) {
      alert("This task already exists!");
      return;
    }

    createTaskElement(taskText);
    saveTasks();
    newTaskInput.value = "";
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

  addTaskBtn.addEventListener("click", addTask);
  todoListNameInput.addEventListener("input", updateTitle);

  // Allow adding tasks with Enter key in the input field
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
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

  // Load tasks from localStorage on page load
  (JSON.parse(localStorage.getItem("tasks")) || []).forEach(taskText => createTaskElement(taskText));
});
