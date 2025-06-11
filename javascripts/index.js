document.addEventListener("DOMContentLoaded", () => {
  animateBurgerButton();
});

function animateBurgerButton() {
  const burger = document.querySelector("#burger");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
  });
}
