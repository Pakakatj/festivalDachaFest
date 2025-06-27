document.addEventListener("DOMContentLoaded", () => {
  animateBurgerButton();
  animateBG();
});

function animateBurgerButton() {
  const burger = document.querySelector("#burger");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
  });
}

function animateBG() {
  const vdali = document.querySelector(".vdali-container");
  const middle = document.querySelector(".middle-container");
  const map = document.querySelector("#map-container");
  const plus = document.querySelector(".plus");
  const minus = document.querySelector(".minus");

  if (!plus || !minus) {
    console.warn("Кнопки .plus или .minus не найдены");
    return;
  }

  let cnt = 0;

  function updateView() {
    if (vdali && middle) {
      if (cnt === 0) {
        vdali.style.display = "block";
        vdali.style.opacity = "1";
        vdali.style.transform = "scale(1)";
        middle.style.display = "none";
      } else if (cnt === 1) {
        vdali.style.opacity = "0";
        setTimeout(() => {
          vdali.style.display = "none";
          middle.style.display = "block";
          middle.style.opacity = "1";
        }, 500);
      } else if (cnt >= 2) {
        middle.style.opacity = "0";
        setTimeout(() => {
          middle.style.display = "none";
          if (map) map.style.display = "block";
        }, 500);
      }
    }
  }
  plus.addEventListener("click", () => {
    cnt++;
    if (cnt > 2) cnt = 2;
    updateView();
  });

  minus.addEventListener("click", () => {
    cnt--;
    if (cnt < 0) cnt = 0;
    updateView();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  animateBG();

  const plusBtn = document.querySelector(".plus");
  const minusBtn = document.querySelector(".minus");

  let plusCount = 0;
  let minusCount = 0;

  if (plusBtn) {
    plusBtn.addEventListener("click", function () {
      plusCount++;
      checkDoubleClick(this, plusCount);
    });
  }

  if (minusBtn) {
    minusBtn.addEventListener("click", function () {
      minusCount++;
      checkDoubleClick(this, minusCount);
    });
  }

  function checkDoubleClick(button, count) {
    if (count % 2 === 0) {
      button.style.color = "black";
      button.style.borderColor = "black";
    } else {
      button.style.color = "white";
      button.style.borderColor = "white";
    }
  }
});
