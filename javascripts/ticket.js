document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("tariff-toggle");
  const childOption = document.getElementById("child-option");
  const adultOption = document.getElementById("adult-option");

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      childOption.classList.remove("active");
      adultOption.classList.add("active");
    } else {
      childOption.classList.add("active");
      adultOption.classList.remove("active");
    }
  });
  // Скрываем чашки после окончания загрузки
  window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");

    loader.classList.add("loaded");

    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";

      // Прячем чашки после завершения загрузки
      document.body.classList.add("hide-cups");
    }, 1000);
  });

  // Прячем чашки при прокрутке вниз
  let hasScrolled = false;

  window.addEventListener("scroll", () => {
    if (!hasScrolled && window.scrollY > 50) {
      document.body.classList.add("hide-cups");
      hasScrolled = true;
    }
  });
});
