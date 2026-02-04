const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id")) - 1;

let products;
const xhr = new XMLHttpRequest();
xhr.open("GET", "products.json");
xhr.send();



xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
        products = JSON.parse(xhr.responseText);
        loadProduct();
        showDescription();
        setActive(0);
    }
};

function loadProduct(){
    const p = products[id];
     document.body.style.backgroundImage = `
        linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
        url(${p.img[0]})
    `;
    document.querySelector(".product-name").textContent = p.name;
    document.querySelector(".product-price").textContent = `$${p.price.toFixed(2)}`;
    document.querySelector(".foot-desc").textContent = `SKU: ${p.sku} | Category: ${p.type}`;

    const mainImg = document.getElementById("main-img");

    p.img.forEach((src,index)=>{
        if(src){
            const thumb = document.getElementById(`thumb-${index}`);
            thumb.src = src;
            if(index === 0) mainImg.src = src;
            thumb.addEventListener("mouseenter", ()=> mainImg.src = src);
        }
    });
}

// Tabs
const buttons = document.querySelectorAll(".description-btns button");
const content = document.querySelector(".content");

function setActive(index){
    buttons.forEach(btn => btn.classList.remove("active"));
    buttons[index].classList.add("active");
    content.classList.remove("show");
    setTimeout(()=> content.classList.add("show"),50);
}

function showDescription(){
    content.innerHTML = `<p>${products[id].description}</p>`;
}

function showInfo(){
    const p = products[id];
    content.innerHTML = `
        <p>
       <strong> Weight</strong>: ${p.weight || "N/A"}<br>
       <strong> Dimensions</strong>: ${p.dimensions || "N/A"}<br>
        <strong>Materials</strong>: ${p.materials || "N/A"}<br>
        <strong>Colors</strong>: ${p.colors?.join(", ") || "N/A"}<br>
       <strong> Sizes</strong>: ${p.sizes?.join(", ") || "N/A"}
        </p>
    `;
}

function showReviews(){
    const p = products[id];
    content.innerHTML = `<p>${p.reviews?.length ? p.reviews.join("<br>") : "No reviews yet ⭐⭐⭐⭐⭐"}</p>`;
}

buttons[0].addEventListener("click", ()=>{ showDescription(); setActive(0); });
buttons[1].addEventListener("click", ()=>{ showInfo(); setActive(1); });
buttons[2].addEventListener("click", ()=>{ showReviews(); setActive(2); });
