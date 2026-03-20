import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/style.css'

// Dark mode
const toggle = document.querySelector("#themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Date auto
document.querySelector(".date").textContent = new Date().getFullYear();
