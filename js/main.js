import '/bootstrap/dist/css/bootstrap.min.css'
import '/bootstrap/dist/js/bootstrap.bundle.min.js'
import '/bootstrap-icons/font/bootstrap-icons.css'
import '../css/style.css'


document.addEventListener("DOMContentLoaded", () => {

  // Dark mode
  const toggle = document.querySelector("#themeToggle");

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });
  }

  // Date auto
  const date = document.querySelector(".date");
  if (date) {
    date.textContent = new Date().getFullYear();
  }

});
