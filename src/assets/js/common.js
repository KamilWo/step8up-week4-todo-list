document.addEventListener("DOMContentLoaded", () => {
  // Desktop Todo Types Dropdown
  const todoTypesDropdownBtn = document.getElementById('todo-types-dropdown-btn');
  const todoTypesDropdown = document.getElementById('todo-types-dropdown');

  if (todoTypesDropdownBtn && todoTypesDropdown) {
    todoTypesDropdownBtn.addEventListener('click', () => {
      todoTypesDropdown.classList.toggle('hidden');
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (event) => {
      if (!todoTypesDropdownBtn.contains(event.target) && !todoTypesDropdown.contains(event.target)) {
        todoTypesDropdown.classList.add('hidden');
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu if clicked outside (optional, but good UX)
    // This is tricky with fixed header and overlay, often better managed by explicit close button or navigating.
    // For simplicity, we'll just toggle.
  }

  // Mobile Todo Types Dropdown inside mobile menu
  const mobileTodoTypesDropdownBtn = document.getElementById('mobile-todo-types-dropdown-btn');
  const mobileTodoTypesDropdown = document.getElementById('mobile-todo-types-dropdown');

  if (mobileTodoTypesDropdownBtn && mobileTodoTypesDropdown) {
    mobileTodoTypesDropdownBtn.addEventListener('click', () => {
      mobileTodoTypesDropdown.classList.toggle('hidden');
    });
  }

  // Close all menus when a navigation link is clicked (for mobile UX)
  const allNavLinks = document.querySelectorAll('nav a');
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden'); // Close mobile menu
      }
      if (todoTypesDropdown) {
        todoTypesDropdown.classList.add('hidden'); // Close desktop dropdown
      }
    });
  });
});
