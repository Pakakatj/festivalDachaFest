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

  let cnt = 0;

  plus.addEventListener("click", () => {
    cnt += 1;
    console.log(cnt);
    setInterval(() => {
      if (cnt == 1) {
        vdali.style.transform = "scale(3)";
        vdali.style.opacity = "0";
        setTimeout(() => {
          vdali.style.display = "none";
        }, 2000);
      } else if (cnt == 2) {
        // middle.style.transform = 'scale(3)'
        middle.style.opacity = "0";
        setTimeout(() => {
          middle.style.display = "none";
        }, 2000);
      } else if (cnt >= 3) {
        cnt = 2;
      }
    }, 100);
  });

  minus.addEventListener("click", () => {
    cnt -= 1;
    console.log(cnt);
    setInterval(() => {
      if (cnt == 0) {
        vdali.style.display = "block";
        vdali.style.transform = "scale(1)";
        vdali.style.opacity = "1";
      } else if (cnt == 1) {
        middle.style.display = "block";
        // middle.style.transform = 'scale(1)'
        middle.style.opacity = "1";
      } else if (cnt <= 0) {
        cnt = 0;
      }
    }, 100);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  let plusCount = 0;
  let minusCount = 0;

  document.querySelector(".plus").addEventListener("click", function () {
    plusCount++;
    checkDoubleClick(this, plusCount);
  });

  document.querySelector(".minus").addEventListener("click", function () {
    minusCount++;
    checkDoubleClick(this, minusCount);
  });

  function checkDoubleClick(button, count) {
    if (count % 2 === 0) {
      // Меняем цвет на черный каждые 2 нажатия
      button.style.color = "black";
      button.style.borderColor = "black";
    } else {
      // Возвращаем обратно на белый
      button.style.color = "white";
      button.style.borderColor = "white";
    }
  }
});
