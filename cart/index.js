
let cart=JSON.parse(localStorage.getItem("cart"))||[];

const productsContainer=document.getElementById("test");
const sideCart=document.getElementById("sideCart");
const sideCartItems=document.getElementById("sideCartItems");
const sideCartTotal=document.getElementById("sideCartTotal");
const cartCount=document.getElementById("cartCount");

function renderProducts(){
  productsContainer.innerHTML=" ";
  test.forEach(p=>{
    productsContainer.innerHTML+=`
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


function saveCart(){
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCartCount();
  renderSideCart();
}

function addToCart(id){
  const item=cart.find(i=>i.id===id);
  if(item) item.qty++;
  else{
    const p=test.find(p=>p.id===id);
    cart.push({...p,qty:1});
  }
  saveCart();
}

function updateCartCount(){
  const totalQty=cart.reduce((acc,i)=>acc+i.qty,0);
  cartCount.textContent=totalQty;
}

function toggleSideCart(){
  let x = sideCart.classList.toggle("active");
  console.log(x);
  renderSideCart();
}

function renderSideCart(){
  sideCartItems.innerHTML="";
  if(cart.length===0){
    sideCartItems.innerHTML=`<div class="empty-cart">
      <p>Your cart is empty Go shopping now!</p>
      <button onclick="goHome()">Go to Home</button>
    </div>`;
    sideCartTotal.textContent="0";
    return;
  }
  let total=0;
  cart.forEach(item=>{
    total+=item.price*item.qty;
    sideCartItems.innerHTML+=`
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
  sideCartTotal.textContent=total;
}

function increaseQty(id){
  cart.find(i=>i.id===id).qty++; saveCart();
}
function decreaseQty(id){
  const item=cart.find(i=>i.id===id);
   if(item.qty>1)item.qty--; 
   else removeItem(id); saveCart();
}
function removeItem(id){
  cart=cart.filter(i=>i.id!==id); saveCart();
}
function goToCartPage(){
  if(cart.length===0) return; window.location.href="cart.html";
}
function goHome(){toggleSideCart(); window.scrollTo({top:0,behavior:"smooth"});}


renderProducts();
renderSlider();
updateCartCount();
renderSideCart();
