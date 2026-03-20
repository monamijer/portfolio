
document.addEventListener("DOMContentLoaded", () => {

  // -------- Dark mode toggle --------
  const toggle = document.querySelector("#themeToggle");
  if (toggle) {
    // Vérifier si un thème a été sauvegardé
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      toggle.textContent = "Light Mode";
    }

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      // Save the theme in localStorage
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggle.textContent = "Light Mode";
      } else {
        localStorage.setItem("theme", "light");
        toggle.textContent = "Dark Mode";
      }
    });
  }
  const date = document.querySelector(".date");
  if (date) {
    date.textContent = new Date().getFullYear();
  }
  
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", (e) => {
    setTimeout(() => {
      successMessage.classList.remove("d-none");
      form.reset();
    }, 500);
  });
});

});
