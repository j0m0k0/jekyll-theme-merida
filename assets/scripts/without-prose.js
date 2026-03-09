// queries all elements that should not get prose attributes and adds a not-prose class to them.
// this is for elements who we don't have direct access to them
document.addEventListener("DOMContentLoaded", function () {
  const preElements = document.querySelectorAll("pre");

  preElements.forEach(function (pre) {
    pre.classList.add("not-prose");
  });
});
