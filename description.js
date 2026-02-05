// var params = new URLSearchParams(window.location.search);
// var id = Number(params.get("id")) ;

// // const selectedId = Number(params.get("id"));
// let products = [];
// // let products;

// let currentProduct = null;



// var xhr = new XMLHttpRequest();
// xhr.open("GET", "products.json");
// xhr.send();

// // fetch("products.json")
// //   .then(res => res.json())
// //   .then(data => {

// //     products = data;
// //     currentProduct = products.find(p => p.id === selectedId);

// //     if (!currentProduct) {
// //       document.body.innerHTML = "<h2>Product not found</h2>";
// //       return;
// //     }

// //     loadProduct();
// //     showDescription();
// //     setActive(0);
// //   });


// xhr.onreadystatechange = function() {
//     if(xhr.readyState === 4 && xhr.status === 200){
//         products = JSON.parse(xhr.responseText);
//         loadProduct();
//         showDescription();
//         setActive(0);
//     }

// currentProduct = products.find(p => p.id === id.id);


// function loadProduct(){
//     const p = products[id];
//      document.body.style.backgroundImage = `
//         linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
//         url(${p.img[0]})
//     `;
//     document.querySelector(".product-name").textContent = p.name;
//     document.querySelector(".product-price").textContent = `$${p.price.toFixed(2)}`;
//     document.querySelector(".foot-desc").textContent = `SKU: ${p.sku} | Category: ${p.type}`;

//     const mainImg = document.getElementById("main-img");

//     p.img.forEach((src,index)=>{
//         if(src){
//             const thumb = document.getElementById(`thumb-${index}`);
//             thumb.src = src;
//             if(index === 0) mainImg.src = src;
//             thumb.addEventListener("mouseenter", ()=> mainImg.src = src);
//         }
//     });
// }

// // Tabs
// const buttons = document.querySelectorAll(".description-btns button");
// const content = document.querySelector(".content");

// function setActive(index){
//     buttons.forEach(btn => btn.classList.remove("active"));
//     buttons[index].classList.add("active");
//     content.classList.remove("show");
//     setTimeout(()=> content.classList.add("show"),50);
// }

// function showDescription(){
//     content.innerHTML = `<p>${products[id].description}</p>`;
// }

// function showInfo(){
//     const p = products[id];
//     content.innerHTML = `
//         <p>
//        <strong> Weight</strong>: ${p.weight || "N/A"}<br>
//        <strong> Dimensions</strong>: ${p.dimensions || "N/A"}<br>
//         <strong>Materials</strong>: ${p.materials || "N/A"}<br>
//         <strong>Colors</strong>: ${p.colors?.join(", ") || "N/A"}<br>
//        <strong> Sizes</strong>: ${p.sizes?.join(", ") || "N/A"}
//         </p>
//     `;
// }

// function showReviews(){
//     const p = products[id];
//     content.innerHTML = `<p>${p.reviews?.length ? p.reviews.join("<br>") : "No reviews yet ⭐⭐⭐⭐⭐"}</p>`;
// }

// buttons[0].addEventListener("click", ()=>{ showDescription(); setActive(0); });
// buttons[1].addEventListener("click", ()=>{ showInfo(); setActive(1); });
// buttons[2].addEventListener("click", ()=>{ showReviews(); setActive(2); });


// const wishIcon = document.querySelector(".wishlist");

// const cartBtn = document.querySelector(".add-cart");

// cartBtn.onclick = function () {

//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   const found = cart.find(item => item.id === currentProduct.id);

//   if (found) {
//     found.qty++;
//   } else {

//     cart.push({
//       id: currentProduct.id,
//       name: currentProduct.name,
//       price: currentProduct.price,
//       image: currentProduct.img[0],
//       qty: 1
//     });
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));

//   cartBtn.innerText = "Added ✔";
//   console.log(cart);
// };

// document.addEventListener("DOMContentLoaded", () => {
//   const cartIcon = document.querySelector(".cart-icon-container");
//   if(cartIcon) cartIcon.addEventListener("click", toggleSideCart);
// });

// document.querySelectorAll(".close").forEach(btn => {
//   btn.addEventListener("click", e => {
//     const id = Number(btn.dataset.id);
//     removeItem(id);
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const productsContainer = document.getElementById("products");
//   renderProductDetails();
// });


// };
const params = new URLSearchParams(window.location.search);
const selectedId = Number(params.get("id"));

let products = [];
let currentProduct = null;

/* ================= LOAD JSON ================= */

const xhr = new XMLHttpRequest();
xhr.open("GET", "products.json");

xhr.onload = function () {

  if (xhr.status === 200) {

    products = JSON.parse(xhr.responseText);

    currentProduct = products.find(p => p.id === selectedId);

    // if (!currentProduct) {
    //   document.body.innerHTML = "<h2>Product not found</h2>";
    //   return;
    // }

    loadProduct();
    showDescription();
    setActive(0);
  }
};

xhr.send();

/* ================= LOAD PRODUCT ================= */

function loadProduct() {

  const p = currentProduct;

  document.body.style.backgroundImage = `
    linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
    url(${p.img[0]})
  `;

  document.querySelector(".product-name").textContent = p.name;
  document.querySelector(".product-price").textContent = `$${p.price.toFixed(2)}`;
  document.querySelector(".foot-desc").textContent =
    `SKU: ${p.sku} | Category: ${p.type}`;

  const mainImg = document.getElementById("main-img");

  p.img.forEach((src, index) => {

    const thumb = document.getElementById(`thumb-${index}`);

    if (thumb) {
      thumb.src = src;

      if (index === 0) mainImg.src = src;

      thumb.addEventListener("mouseenter", () => {
        mainImg.src = src;
      });
    }

  });
}

/* ================= TABS ================= */

const buttons = document.querySelectorAll(".description-btns button");
const content = document.querySelector(".content");

function setActive(index) {
  buttons.forEach(btn => btn.classList.remove("active"));
  buttons[index].classList.add("active");

  content.classList.remove("show");
  setTimeout(() => content.classList.add("show"), 50);
}

function showDescription() {
  content.innerHTML = `<p>${currentProduct.description}</p>`;
}

function showInfo() {

  const p = currentProduct;

  content.innerHTML = `
    <p>
    <strong>Weight:</strong> ${p.weight || "N/A"}<br>
    <strong>Dimensions:</strong> ${p.dimensions || "N/A"}<br>
    <strong>Materials:</strong> ${p.materials || "N/A"}<br>
    <strong>Colors:</strong> ${p.colors?.join(", ") || "N/A"}<br>
    <strong>Sizes:</strong> ${p.sizes?.join(", ") || "N/A"}
    </p>
  `;
}

function showReviews() {
  const p = currentProduct;

  content.innerHTML =
    `<p>${p.reviews?.length ? p.reviews.join("<br>") : "No reviews yet ⭐⭐⭐⭐⭐"}</p>`;
}

buttons[0].addEventListener("click", () => {
  showDescription();
  setActive(0);
});

buttons[1].addEventListener("click", () => {
  showInfo();
  setActive(1);
});

buttons[2].addEventListener("click", () => {
  showReviews();
  setActive(2);
});

/* ================= CART ================= */

const cartBtn = document.querySelector(".add-cart");

cartBtn.onclick = function () {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const found = cart.find(item => item.id === currentProduct.id);

  if (found) {
    found.qty++;
  } else {
    cart.push({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.img[0],
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  cartBtn.innerText = "Added ✔";
};
