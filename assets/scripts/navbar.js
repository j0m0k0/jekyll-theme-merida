// Opening and closing the sandwich menu
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  btn.addEventListener("click", function () {
    menu.classList.toggle("hidden");
  });
});
