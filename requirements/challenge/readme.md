# The Interactive TODO List

## Challenge

Now that you're familiar with making web pages interactive using JavaScript, it's time to put your skills to the test!
In this challenge, you will create an interactive TODO list application.

### Requirements:

- Users should be able to **add new tasks** to the list.
- Tasks should be displayed dynamically on the web page.
- Ensure that only **valid tasks** (non-empty or sensible values) are allowed to be added.
- Users should be able to **delete tasks** from the list.

### BONUS:

- Implement an **edit feature** so users can modify existing tasks and save changes.

## Key Learnings

By completing this exercise, you will learn:

- How to manipulate the **Document Object Model (DOM)** using JavaScript.
- How to **read, create, update, and delete** elements within the DOM.
- How to handle **user inputs** and implement **form validation**.
- Bonus: How to implement editing functionality for dynamic web content.

## User Story

As a user, I want to be able to manage my tasks using a simple web-based TODO list. I should be able to add new tasks,
delete tasks, and, for bonus points, edit existing tasks and save the changes. The application should give me feedback
if I try to add invalid tasks.

## Acceptance Criteria

- Users can add a task by typing into an input field and clicking a button. The new task is immediately displayed in the
  task list.
- Tasks must be validated before being added (e.g., non-empty and unique).
- Users can delete tasks from the list, and the task should be removed from the DOM.
- (Bonus) Users can click an "Edit" button for a task, modify the text, and save the changes.

## Getting Started

To get started with this exercise:

1. Create a new folder for the project.
2. Set up an `index.html` file with an input field for adding tasks and a section to display the task list.
3. Use JavaScript to:
  - Handle the addition of new tasks.
  - Validate the task input.
  - Dynamically display and update tasks on the page.
  - Implement the delete functionality.
4. (Bonus) Add functionality to allow tasks to be edited in place and saved.

## Hints

- Use **event listeners** to capture user actions (e.g., clicking the "Add" button or hitting the "Enter" key).
- Store tasks in an **array** and render the array's contents into the DOM after every operation (add, delete, or edit).

## Submission

Once your site has been migrated and deployed, submit the link to your GitHub Repo and GitHub Pages deployment.

## Useful Online Resources

1. **MDN Web Docs - JavaScript DOM Manipulation**

  - This documentation provides comprehensive information about how to use JavaScript to manipulate the DOM.
  - [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

2. **JavaScript Event Listeners**
  - A guide on how to use event listeners in JavaScript to handle user interactions.
  - [Read more](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
