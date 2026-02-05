let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentStep = 1;


fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts();
    renderSlider();
    renderCartPageItems();
  });

function renderProducts() {
  const box = document.getElementById("products");
  if (!box) return;
  box.innerHTML = "";
  products.forEach(p => {
    box.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <strong>$${p.price}</strong>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function renderSlider() {
  const slider = document.getElementById("slider");
  if (!slider) return;
  slider.innerHTML = "";
  products.forEach(p => {
    slider.innerHTML += `
      <div class="slide">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
      </div>
    `;
  });
}

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else {
    const p = products.find(p => p.id === id);
    cart.push({ ...p, qty: 1 });
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartPageItems();
}

function renderCartPageItems() {
  const box = document.getElementById("cartPageItems");
  const totalBox = document.getElementById("cartPageTotal");
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (!box) return;
  box.innerHTML = "";
  let total = 0;
  if (cart.length===0) {
    totalBox.parentElement.style.display ="none";
    
  }else{
    totalBox.parentElement.style.display ="block"
  }

  if (cart.length === 0) {
    box.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty</p>
        <button onclick="goHome()">Go Shopping Now</button>
      </div>`;
    totalBox.style.display = "none";
    checkoutBtn.style.display = "none";
    return;
  }

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    box.innerHTML += `
      <div class="cart-page-item">
        <img src="${item.image}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
          <p>Subtotal: $${subtotal}</p>
        </div>
        <div class="cart-actions">
          <button class="qty-btn" onclick="decreaseQty(${item.id});renderCartPageItems()">-</button>
          ${item.qty}
          <button class="qty-btn" onclick="increaseQty(${item.id});renderCartPageItems()">+</button>
          <button class="remove-btn" onclick="removeItem(${item.id});renderCartPageItems()"><i class="bi bi-trash3-fill"></i></button>
        </div>
      </div>
    `;
  });

  totalBox.textContent = total;
  totalBox.style.display = "block";
  checkoutBtn.style.display = "block";
}

function increaseQty(id) {
  cart.find(i => i.id === id).qty++;
  saveCart();
}

function decreaseQty(id) {
  const item = cart.find(i => i.id === id);
  if (item.qty > 1) item.qty--;
  else removeItem(id);
  saveCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

function goHome() {
  window.location.href = "index.html";
}


const checkout = document.getElementById("checkout");

function openCheckout() {
  if (cart.length === 0) return; 
  checkout.classList.add("active");
  showStep(1);
  renderCheckoutItems();
}

function closeCheckout() {
  checkout.classList.remove("active");
}

function showStep(n) {
  currentStep = n;
  document.querySelectorAll(".step").forEach((s, i) => {
    s.classList.remove("active");
    if (i === n - 1) s.classList.add("active");
  });
}

function nextStep() {

  if (currentStep === 1) {
    const email = document.getElementById("custEmail").value.trim();
    const name = document.getElementById("custName").value.trim();
    const address = document.getElementById("custAddress").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    if (!email || !name || !address || !phone) {
      alert("Please fill in all fields before proceeding!");
      return;
    }
  }
  if (currentStep < 4) showStep(currentStep + 1);
}

function renderCheckoutItems() {
  const box = document.getElementById("checkoutItems");
  const totalBox = document.getElementById("checkoutTotal");
  box.innerHTML = "";
  let total = 0;
  cart.forEach(i => {
    total += i.price * i.qty;
    box.innerHTML += `<p>${i.name} × ${i.qty} = $${i.price * i.qty}</p>`;
  });
  totalBox.textContent = total;
}

//////////////////////////////////////
function finishCheckout() {
  const email = document.getElementById("custEmail").value.trim();
  const name = document.getElementById("custName").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const phone = document.getElementById("custPhone").value.trim();

  if (!email || !name || !address || !phone) {
    alert("Please fill in all required information!");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const newOrder = {
    name,
    email,
    address,
    phone,
    products: [...cart], 
    total: cart.reduce((sum, p) => sum + p.price * p.qty, 0),
    date: new Date().toLocaleString() 
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Your order has been placed successfully ");

  cart = [];
  localStorage.removeItem("cart");


  window.location.reload();
}


function goToCart() {
  window.location.href = "cart.html";
}



//////////////////////


