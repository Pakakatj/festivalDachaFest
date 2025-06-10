console.log("JavaScript подключён!");

document.addEventListener("DOMContentLoaded", () => {
  clouds();
  renderProducts();
  updateCartCount();

  // === Код с кнопкой добавления товара и модалкой ===
  const button = document.getElementById("addButton");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeBtn");

  if (button) {
    button.addEventListener("click", () => {
      modal.style.display = "block";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

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

const products = [
  {
    id: 1,
    name: "футболка оверсайз",
    price: 3500,
    image: "images/Tshirt.png",
  },
  {
    id: 2,
    name: "шоппер",
    price: 899,
    image: "images/bag.png",
  },
  {
    id: 3,
    name: "резиновые сапоги",
    price: 3500,
    image: "images/boots.png",
  },
  {
    id: 4,
    name: "блокнот",
    price: 549,
    image: "images/book.png",
  },
  {
    id: 5,
    name: "набор ластиков",
    price: 199,
    image: "images/irrisers.png",
  },
  {
    id: 6,
    name: "постер 29,7х42см",
    price: 199,
    image: "images/poster.png",
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
  const index = cart.findIndex((p) => p.id === productID);

  if (index != -1) {
    if (cart[index].quantity > 0) {
      cart[index].quantity -= 1;
    }
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
