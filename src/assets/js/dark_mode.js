document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const htmlElement = document.documentElement; // Target the <html> element
  const moonIcon = document.getElementById("moon-icon");
  const sunIcon = document.getElementById("sun-icon");

  // Function to apply theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      if (moonIcon && sunIcon) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
      }
    } else {
      htmlElement.classList.remove('dark');
      if (moonIcon && sunIcon) {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
      }
    }
  }

  // Check for user's preferred theme in localStorage or system preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    applyTheme(currentTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light'); // Default to light if no preference is found
  }

  // Toggle dark mode
  darkModeToggle.addEventListener("click", () => {
    if (htmlElement.classList.contains("dark")) {
      applyTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      applyTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  });
});
