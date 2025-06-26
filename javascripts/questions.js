document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".expand-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".cardd");

      document.querySelectorAll(".cardd").forEach((c) => {
        if (c !== card) {
          c.classList.remove("expanded");
        }
      });
      card.classList.toggle("expanded");
    });
  });
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxTilt = 10;
    document.querySelector(".cup1").style.transform = `rotate(${Math.min(
      maxTilt,
      scrollTop / 10
    )}deg)`;

    document.querySelector(".cup2").style.transform = `rotate(-${Math.min(
      maxTilt,
      scrollTop / 12
    )}deg)`;

    document.querySelector(".cup3").style.transform = `rotate(${Math.min(
      maxTilt,
      scrollTop / 14
    )}deg)`;
    document.querySelector(".cup4").style.transform = `rotate(-${Math.min(
      maxTilt,
      scrollTop / 10
    )}deg)`;

    document.querySelector(".cup5").style.transform = `rotate(${Math.min(
      maxTilt,
      scrollTop / 12
    )}deg)`;

    document.querySelector(".cup6").style.transform = `rotate(-${Math.min(
      maxTilt,
      scrollTop / 14
    )}deg)`;
  });
});
