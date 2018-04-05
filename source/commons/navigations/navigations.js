const hamburger = document.querySelector(".hamburger__container");
const navigations = document.querySelector(".navigations");
const body = document.querySelector("body");

hamburger.addEventListener('click', function() {
    navigations.classList.toggle("navigations--open");
    body.classList.toggle("overlay");

})