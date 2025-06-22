document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
  showModal();
  document.querySelector(".back-to-top").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

function showModal() {
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector("#closeBtn");

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
function formatPrice(price) {
  const formatted = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return formatted;
}

const products = [
  { id: 1, name: "футболка оверсайз", price: 3500, image: "images/Tshirt.png" },
  { id: 2, name: "шоппер", price: 899, image: "images/bag.png" },
  { id: 3, name: "резиновые сапоги", price: 3500, image: "images/boots.png" },
  { id: 4, name: "блокнот", price: 549, image: "images/book.png" },
  { id: 5, name: "набор ластиков", price: 199, image: "images/irrisers.png" },
  { id: 6, name: "постер 29,7х42см", price: 199, image: "images/poster.png" },
];

function renderProducts() {
  const productList = document.querySelector("#product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const quantity = getProductCount(product.id);

    const productCard = document.createElement("div");
    productCard.classList.add("card", "product");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-text">
        <h3>${product.name}</h3>
        <p>${formatPrice(product.price)}</p>
        <div class="buttons">
          <button onclick='removeFromCart(${product.id})'>-</button>
          <p>${quantity}</p>
          <button class="add-button" onclick='addToCart(${
            product.id
          })'>+</button>
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
  const cart = getCart();
  const item = cart.find((p) => p.id === productID);
  return item ? item.quantity : 0;
}

function removeFromCart(productID) {
  const cart = getCart();
  const index = cart.findIndex((p) => p.id === productID);

  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
  }

  setCart(cart);
}

function addToCart(productID) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  const cart = getCart();
  const index = cart.findIndex((p) => p.id === productID);

  if (index !== -1) {
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
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const cartCountElement = document.querySelector(".cart-count");
  if (count > 0) {
    cartCountElement.innerHTML = `🧺 ${count}`;
  } else {
    cartCountElement.innerHTML = `🧺`;
  }
}
