document.addEventListener("DOMContentLoaded", function () {
  var menuButton = document.querySelector(".menu-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  var scrollButtons = document.querySelectorAll("[data-scroll]");

  function scrollToId(id) {
    var target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (mobileNav) mobileNav.classList.remove("open");
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    }
  }

  scrollButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      scrollToId(button.getAttribute("data-scroll"));
    });
  });

  document.querySelectorAll(".mobile-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      var id = link.getAttribute("href").replace("#", "");
      scrollToId(id);
    });
  });

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuButton.textContent = open ? "×" : "☰";
    });
  }

  var form = document.getElementById("service-form");
  var message = document.getElementById("form-message");
  if (form && message) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      message.hidden = false;
      message.innerHTML = "<strong>Request noted.</strong> This demo form is not connected to a backend yet. Please call or WhatsApp ElectroFrost so your request can be acted on.";
      form.reset();
      message.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
});