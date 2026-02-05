/* ================= CART ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsContainer = document.getElementById("products");
const sideCart = document.getElementById("sideCart");
const sideCartItems = document.getElementById("sideCartItems");
const sideCartTotal = document.getElementById("sideCartTotal");
const cartCount = document.getElementById("cartCount");

/* ================= pushProducts ================= */

let pushProducts = [];
// const gotId = Number(localStorage.getItem("selectedProductId"));
const gotId = Number(localStorage.getItem("selectedProductId")) || null;


/* ================= LOAD JSON ================= */

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    pushProducts = data;

    renderProductDetails();
    updateCartCount();
    renderSideCart();
  });

/* ================= RENDER PRODUCT DETAILS ================= */

function renderProductDetails() {

  const product = pushProducts.find(p => p.id === gotId);

  if (!product) {
    productsContainer.innerHTML = "<p>Product not found</p>";
    return;
  }

  productsContainer.innerHTML = `
    <div class="product">
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <strong>$${product.price}</strong>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
}


/* ================= SIDE CART ================= */

function renderSideCart() {

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!sideCartItems) return;

  sideCartItems.innerHTML = "";

  if (cart.length == 0) {
    sideCartItems.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty Go shopping now!</p>
        <button onclick="goHome()">Go to Home</button>
      </div>
    `;
    sideCartTotal.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.qty;

    sideCartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${item.price} × ${item.qty}</p>
          <div>
            <button class="qty-controls" onclick="decreaseQty(${item.id})">-</button>
            <button class="qty-controls" onclick="increaseQty(${item.id})">+</button>
            <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  sideCartTotal.textContent = total.toFixed(2);
}


/* ================= CART FUNCTIONS ================= */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderSideCart();
}

function addToCart(id) {

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {

    const product = pushProducts.find(p => p.id === id);

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.img?.[0],
      qty: 1
    });
  }

  saveCart();
}


/* ================= CART CONTROLS ================= */
function toggleSideCart() {
  renderSideCart();
  sideCart.classList.toggle("active");
}

function updateCartCount() {
  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  if (cartCount) cartCount.textContent = totalQty;
}


function increaseQty(id) {
  const item = cart.find(i => i.id === id);
  item.qty++;
  saveCart();
}

function decreaseQty(id) {
  const item = cart.find(i => i.id === id);

  if (item.qty > 1) {
    item.qty--;
  } else {
    removeItem(id);
    return;
  }

  saveCart();
}

function removeItem(id) {
  // Always read latest cart first
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderSideCart();
}

function closeCart () {
sideCart.classList.toggle("active");
}

/* ================= NAVIGATION ================= */

function goToCartPage() {
  if (cart.length === 0) return;
  window.location.href = "cart.html";
}

function goHome() {
  toggleSideCart();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon-container");
  const closeBtn = document.querySelector(".side-cart .close");
  const goToCartBtn = document.getElementById("goToCartPageBtn");

  if(cartIcon) cartIcon.addEventListener("click", toggleSideCart);
  if(closeBtn) closeBtn.addEventListener("click", closeCart);
  if(goToCartBtn) goToCartBtn.addEventListener("click", goToCartPage);
});