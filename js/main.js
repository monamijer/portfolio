import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/style.css'


const span = document.querySelector(".date");
const year = new Date();
span.textContent = year.getFullYear();
