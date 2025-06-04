console.log("JavaScript подключён!");

document.addEventListener("DOMContentLoaded", () => {
  clouds();
  animate();
  renderProducts();
  updateCartCount();

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
    marker.addEventListener("mouseenter", () => {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = marker.dataset.tooltip;
      marker.appendChild(tooltip);

      tooltip.style.left = `${-tooltip.offsetWidth / 2 + 10}vw`;
      tooltip.style.top = `-25vw`;
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

const glider = document.getElementById("glider");

let x = 0;
let direction = 1;
const speed = 2;

function animate() {
  x += direction * speed;

  if (x > window.innerWidth - (glider.width || 100) || x < -100) {
    direction *= -1;
  }

  glider.style.left = x + "vw";

  requestAnimationFrame(animate);
}
const products = [
  {
    id: 1,
    name: "Футболка",
    price: 3500,
    image:
      "https://static.insales-cdn.com/images/products/1/5982/769103710/DSCF0096.jpg",
  },
  {
    id: 2,
    name: "Кружка",
    price: 2000,
    image: "https://sublimagia.ru/image/cache/catalog/mugs/2397-600x600.jpg",
  },
  {
    id: 3,
    name: "Пин",
    price: 1500,
    image:
      "https://rockbunker.ru/upload/iblock/55f/9xbv232jog0ezdl846iq77swlw4rxhui.jpg",
  },
];

function renderProducts() {
  const productList = document.querySelector("#product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const quantity = getProductCount(product.id);

    const productCard = document.createElement("div");
    productCard.classList.add("card");
    productCard.classList.add("product");

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-text">
          <h3>${product.name}</h3>
          <p>${product.price}</p>
          <div class="buttons">
            <button onclick='removeFromCart(${product.id})'>-</button>
            <p>${quantity}</p>
            <button onclick='addToCart(${product.id})'>+</button>
          </div>
        </div>
    `;

    productList.appendChild(productCard);
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function getProductCount(productID) {
  let cart = getCart();
  const item = cart.find((p) => p.id === productID);

  return item ? item.quantity : 0;
}

function removeFromCart(productID) {
  let cart = getCart();
  console.log(cart);

  const index = cart.findIndex((p) => p.id === productID);

  if (index != -1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 0);
  }

  setCart(cart);
}

function addToCart(productID) {
  let cart = getCart();

  const index = cart.findIndex((p) => p.id === productID);

  if (index != -1) {
    cart[index].quantity += 1;
  } else {
    const item = products.find((p) => p.id === productID);

    if (item) {
      cart.push({ ...item, quantity: 1 });
    }
  }

  setCart(cart);
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderProducts();
}

function updateCartCount() {
  let cart = getCart();

  const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  if (count != 0) {
    document.querySelector(".cart-count").innerHTML = `🧺 ${count}`;
  }
}
