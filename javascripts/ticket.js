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
});
