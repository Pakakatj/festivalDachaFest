console.log("JavaScript подключён!");

document.addEventListener("DOMContentLoaded", () => {
  clouds();

  const mapContainer = document.getElementById("map-container");
  const map = document.getElementById("map");
  function applyTransform() {
    console.log(`offsetX: ${offsetX}, offsetY: ${offsetY}, scale: ${scale}`);
    map.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  }
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let startX, startY;

  mapContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    if (e.deltaY < 0) {
      scale += zoomFactor;
    } else {
      scale -= zoomFactor;
      if (scale < 0.5) scale = 0.5;
    }
    applyTransform();
  });

  mapContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    offsetX += dx;
    offsetY += dy;
    startX = e.clientX;
    startY = e.clientY;
    applyTransform();
  });

  function applyTransform() {
    map.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  }

  document.querySelectorAll(".marker").forEach((marker) => {
    marker.addEventListener("mouseover", () => {
      console.log("marker");
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = marker.dataset.tooltip;
      marker.appendChild(tooltip);

      tooltip.style.left = `2vw`;
      // tooltip.style.left = `${-tooltip.offsetWidth / 2 + 10}vw`
      tooltip.style.top = `2vw`;
    });

    marker.addEventListener("mouseleave", () => {
      const tooltip = marker.querySelector(".tooltip");
      if (tooltip) tooltip.remove();
    });
  });
});

function clouds() {
  const clouds = document.querySelectorAll(".cloud");
  clouds.forEach((cloud) => {
    const randomDuration = Math.random() * (20 - 10) + 10;
    cloud.style.animationDuration = `${randomDuration}s`;
    cloud.style.animationName = "moveCloud";
    cloud.style.animationTimingFunction = "linear";
    cloud.style.animationIterationCount = "infinite";
  });
}

let x = 0;
let direction = 1;
const speed = 2;

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.classList.add("loaded");

  setTimeout(() => {
    loader.style.display = "none";
    document.getElementById("content").style.display = "block";
  }, 10000);
});
