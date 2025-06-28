/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.html", // This covers all HTML files in src and its subdirectories
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        'primary-hover': '#0056b3',
        background: '#f4f4f4',
        'container-bg': '#fff',
        'text-dark': '#333',
        'text-medium': '#555',
        'border-light': '#ddd',
        'light-border': '#eee',
        'task-item-bg': '#f9f9f9',
        'delete-btn': '#dc3545',
        'delete-btn-hover': '#c82333',
        'edit-btn': '#ffc107',
        'edit-btn-hover': '#e0a800',
        'save-btn': '#28a745',
        'save-btn-hover': '#218838',
        // Specific colors for todo list types
        'personal-todo-bg': '#e0f7fa', // Light Cyan
        'work-todo-bg': '#ffe0b2',     // Light Orange
        'shopping-todo-bg': '#f3e5f5', // Light Purple
      },
      spacing: {
        'sm': '8px',
        'md': '10px',
        'lg': '15px',
        'xl': '25px',
        'input-padding': '12px',
        'container-padding': '30px',
        'body-padding-top': '50px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '5px',
        'lg': '8px',
      },
      boxShadow: {
        'light': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'focus': '0 0 0 .2rem rgba(0, 123, 255, .25)',
      },
    },
  },
  plugins: [],
}
