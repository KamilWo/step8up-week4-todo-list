# Skill8Up Week 3 TODO list Challenge

Note: There are two versions, light and dark.
The light version JS differs from the dark because it uses template literal.

## 🎯 Interactive TODO List Challenge

The project challenge was to build an **interactive TODO list web application** using JavaScript, using
*DOM manipulation** and **event handling** skills to the test to create a dynamic and user-friendly task management
tool.

## ✨ Core Functionalities & Features

* Easily add new tasks to the list.
* Tasks are immediately displayed on the web page as you add them.
* Only valid and non-empty tasks can be added, with feedback provided for invalid attempts.
* Remove tasks from the list with a click.
* Modify existing tasks and save the changes.

## 🧠 Key Learnings

By completing this challenge, I gained hands-on experience with:

* Learn how to read, create, update, and delete elements within the Document Object Model using JavaScript.
* Implement robust form validation and manage user inputs effectively.
* Master the use of event listeners to capture and respond to user actions.
* Efficiently update and render dynamic web content based on user interactions.
* Utilizing **event listeners** (e.g., `click`, `keypress`) to capture user interactions with buttons and input fields.
* Storing the tasks in local storage. After every add, delete, or edit operation, re-rendered the
  entire list from the storage to keep the DOM in sync.

## Printing

Media stylesheet for printing has been added, so the buttons and input are hidden.

---

## 🌐 Website public URL

[Github Pages URL](https://kamilwo.github.io/step8up-week4-todo-list)

---

## 🔍 Validation

[W3 HTML Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fkamilwo.github.io%2Fstep8up-week4-todo-list%2F)

[W3 CSS Validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fkamilwo.github.io%2Fstep8up-week4-todo-list&profile=css3svg&usermedium=all&warning=1)

### Automated Testing Tools
- **HTML Validation** ✓
  - Use [W3C Markup Validation Service](https://validator.w3.org/)
  - Ensure all pages pass without errors
  - Check for proper semantic structure

- **CSS Validation** 🎨
  - Use [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)
  - Verify CSS syntax and properties
  - Check for vendor prefix requirements

- **Accessibility Testing** ♿
  - Use [WAVE Web Accessibility Tool](https://wave.webaim.org/)
  - Check ARIA labels and roles
  - Verify color contrast ratios
  - Test keyboard navigation

- **Responsive Design Testing** 📱
  - Use Chrome DevTools Device Emulation
  - Test on multiple real devices
  - Verify breakpoints functionality

### Manual Testing Checklist
1. **Cross-browser Testing** 🌐
- Chrome
- Firefox
- Safari
- Edge

2. **Functionality Testing** ⚙️
- Navigation links
- Form submissions
- Interactive elements
- Search functionality

3. **Content Review** 📝
- Spelling and grammar
- Image alt texts
- Link text clarity
- Content consistency

4. **Performance Testing** ⚡
- Page load times
- Image optimization
- CSS/JS minification
- Mobile performance

5. **User Experience Testing** 👥
- Navigation flow
- Form usability
- Error message clarity
- Mobile touch targets

## 📚 Useful Online Resources

1. **MDN Web Docs - JavaScript DOM Manipulation**: A comprehensive guide to manipulating the Document Object Model with
   JavaScript.

* [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

2. **JavaScript Event Listeners**: Learn how to use `addEventListener` to handle various user interactions in your web
   applications.

* [Read more](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
