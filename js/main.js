import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/style.css'


document.addEventListener("DOMContentLoaded", () => {

  // Dark mode
  const toggle = document.querySelector("#themeToggle");



  // Date auto
  const date = document.querySelector(".date");
  if (date) {
    date.textContent = new Date().getFullYear();
  }

  
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Sauvegarder
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

});
