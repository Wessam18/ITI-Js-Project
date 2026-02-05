//  ==============================. Json parse and initiate =============================

var products;
var res = new XMLHttpRequest();

res.open("GET", "../products.json");
res.send();


res.onreadystatechange = function readyProd () {
  if (res.readyState === 4 && res.status === 200) {
     products = JSON.parse(res.responseText);
    console.log(products);}

    
//  ============================== pop up window (Description) =============================
function opendescription(i) {
  if (!products || !products[i]) return;

  const p = products[i];
  const popup = document.querySelector(".popUpDescription");

  /* ===== Fill Product Info ===== */
  popup.querySelector(".product-name").textContent = p.name;
  popup.querySelector(".product-price").textContent = `$${p.price.toFixed(2)}`;
  popup.querySelector(".foot-desc").textContent =
    `SKU: ${p.sku} | Category: ${p.type}`;

  /* ===== Images ===== */
  const mainImg = popup.querySelector("#main-img");

  p.img.forEach((src, index) => {
    const thumb = popup.querySelector(`#thumb-${index}`);
    if (thumb) {
      thumb.src = src;
      thumb.style.display = "block";
      if (index === 0) mainImg.src = src;

      // Thumbnail hover
      thumb.onmouseenter = () => mainImg.src = src;
    }
  });

  /* ===== Tabs ===== */
  const buttons = popup.querySelectorAll(".description-btns button");
  const content = popup.querySelector(".content");

  function setActiveTab(index) {
    buttons.forEach(btn => btn.classList.remove("active"));
    buttons[index].classList.add("active");

    content.classList.remove("show");
    setTimeout(() => content.classList.add("show"), 50);
  }

  function showDescription() {
    popup.querySelector(".foot-desc").innerHTML =
    `
    <h4>
    ${p.description}
    </h4>



    SKU: ${p.sku} | Category: ${p.type}`;

    setActiveTab(0);
  }

  function showInfo() {
    popup.querySelector(".foot-desc").innerHTML =
    `
    <h4>
    Weight: ${p.weight || "N/A"}
    </h4>
<h4>
    Dimensions: ${p.dimensions || "N/A"}
    </h4>

<h4>
    Materials: ${p.materials || "N/A"}
    </h4>

<h4>
    Colors:${p.colors?.join(", ") || "N/A"}
    </h4>

<h4>
    Sizes:${p.sizes?.join(", ") || "N/A"}
    </h4>



    SKU: ${p.sku} | Category: ${p.type}`;


    setActiveTab(1);
  }

  function showReviews() {
     popup.querySelector(".foot-desc").innerHTML =
    `
   <h4> No reviews yet ⭐⭐⭐⭐⭐ </h4>


    SKU: ${p.sku} | Category: ${p.type}`;
    setActiveTab(2);
  }

  // Bind tab buttons
  buttons[0].onclick = showDescription;
  buttons[1].onclick = showInfo;
  buttons[2].onclick = showReviews;

  // Show default tab
  showDescription();

  /* ===== Cart Button ===== */
  const cartBtn = popup.querySelector(".add-cart");
  cartBtn.innerText = "Add to Cart";
  cartBtn.onclick = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.find(item => item.id === p.id);

    if (found) {
      found.qty++;
    } else {
      cart.push({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.img[0],
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartBtn.innerText = "Added ✔";

    toggleSideCart();
  };

  /* ===== Wishlist Button ===== */
  const wishlistBtn = popup.querySelector(".wishlist");
  wishlistBtn.onclick = () => {
  };

  /* ===== Close Popup ===== */
  const closeBtn = popup.querySelector(".closeView");
  closeBtn.onclick = () => {
    popup.classList.remove("open-popUpDescription");
  };

  /* ===== Show Popup ===== */
  popup.classList.add("open-popUpDescription");
}


function closeDescription() {
  document
    .querySelector(".popUpDescription")
    .classList.remove("open-popUpDescription");
document.body.classList.remove("popup-open");



}






//  ============================== pop up window (quick view) =============================


function openPopUp(i) {
  
  const popUp = document.querySelector(".popUp");
    popUp.style =`background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),  url(${products[i].img[0]});`
  popUp.classList.add("open-popUp");

   

  popUp.innerHTML = `

    <div class="popUpContent">
     <div class="buttonPop">
        <button class="closeButton">&times;</button>
      </div>
      <div class="imgPop">
        <img src="${products[i].img[0]}" alt="">
      </div>
        <div class="NnP">
      <p>${products[i].name}</p>
      <p>$${products[i].price}</p>
      </div>
      <p>${products[i].description}</p>
    </div>
  `;

  document
    .querySelector(".closeButton")
    .addEventListener("click", closePopUp);
}

function closePopUp() {
  document.querySelector(".popUp").classList.remove("open-popUp");
}

function addbtn() {
  var cards = document.querySelectorAll(".Cards");
  cards.forEach((card) => {
    const img = card.querySelector(".Img");
    const productIndex = card.dataset.index;
    img.addEventListener("mouseenter", () => {
      if (img.querySelector(".quick-btn")) return;

      const btn = document.createElement("button");
      btn.textContent = "Quick View";
      btn.className = "quick-btn";

      img.appendChild(btn);

      btn.addEventListener("click", () => openPopUp(productIndex));
    });

    img.addEventListener("mouseleave", () => {
      const btn = img.querySelector(".quick-btn");
      if (btn) btn.remove();
    });
    card.addEventListener("click", () => {
    opendescription(productIndex);
});

  });
}


//  ============================== Display in shop =============================

function displayAll(x) {
    
    for(i=0; i< x ; i++){
            var loc= `description.html?id=${i+1}`;

            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
                    <div class="Img">
                        <img src="${products[i].img[0]}" alt="">
                    </div>
                    <div class="description">
                    <div class="CardsTxt">
                        <a href="${loc}"> ${products[i].name} </a>
                        <p>$${products[i].price}</p>
                    </div>
                    <button>
                            <i class="material-icons">favorite</i>
                    </button>
                    
                    </div>
                </section>
        `
    }
        addbtn()

}

function displayMen(){
    for(i=0; i<products.length; i++){
            var loc= `description.html?id=${i+1}`;

        if(products[i].type == "man"){

            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
                    <div class="Img">
                        <img src="${products[i].img[0]}" alt="">
                    </div>
                    <div class="description">
                    <div class="CardsTxt">
                        <a href="${loc}"> ${products[i].name} </a>
                        <p>$${products[i].price}</p>
                    </div>
                    <button>
                            <i class="material-icons">favorite</i>
                    </button>
                    
                    </div>
                </section>
        `
        addbtn()
        }
    }
}
function displayWomen(){
    for(i=0; i<products.length; i++){
            var loc= `description.html?id=${i+1}`;

        if(products[i].type == "woman"){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
                    <div class="Img">
                        <img src="${products[i].img[0]}" alt="">
                    </div>
                    <div class="description">
                    <div class="CardsTxt">
                        <a href="${loc}"> ${products[i].name} </a>
                        <p>$${products[i].price}</p>
                    </div>
                    <button>
                            <i class="material-icons">favorite</i>
                    </button>
                    
                    </div>
                </section>
        `
        addbtn()
        }
    }
}
function displayShoes(){
    for(i=0; i<products.length; i++){
            var loc= `description.html?id=${i+1}`;

        if(products[i].type == "shoe"){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
                    <div class="Img">
                        <img src="${products[i].img[0]}" alt="">
                    </div>
                    <div class="description">
                    <div class="CardsTxt">
                        <a href="${loc}"> ${products[i].name} </a>
                        <p>$${products[i].price}</p>
                    </div>
                    <button>
                            <i class="material-icons">favorite</i>
                    </button>
                    
                    </div>
                </section>
        `
        addbtn()
        }
    }
}
function displayWatch(){
    for(i=0; i<products.length; i++){
            var loc= `description.html?id=${i+1}`;

        if(products[i].type == "watch"){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
                    <div class="Img">
                        <img src="${products[i].img[0]}" alt="">
                    </div>
                    <div class="description">
                    <div class="CardsTxt">
                        <a href="${loc}"> ${products[i].name} </a>
                        <p>$${products[i].price}</p>
                    </div>
                    <button>
                            <i class="material-icons">favorite</i>
                    </button>
                    
                    </div>
                </section>
        `
        addbtn()
        }
    }
}
function displayBags(){
    for(i=0; i<products.length; i++){
            var loc= `description.html?id=${i+1}`;

        if(products[i].type == "bag"){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
                    <div class="Img">
                        <img src="${products[i].img[0]}" alt="">
                    </div>
                    <div class="description">
                    <div class="CardsTxt">
                        <a href="${loc}"> ${products[i].name} </a>
                        <p>$${products[i].price}</p>
                    </div>
                    <button>
                            <i class="material-icons">favorite</i>
                    </button>
                    
                    </div>
                </section>
        `
        addbtn()
        }
    }
}




function display(){
    if (document.querySelector(".cardDiv")?.childElementCount < products.length) {
                        if (products.length > 5) {
                        displayAll(6);
                                
                        const btnadd = document.querySelector(".cardDiv")
                        if (window.location.pathname.includes("home.html")){
                                    btnadd.innerHTML += ``
                                }else {
                        btnadd.innerHTML += `
                        <div class="loadMoreDiv" id="load">
                            <button class="loadMore">
                                Load More
                            </button>
                        </div>
                        `
                        document.querySelector("#load").addEventListener("click", function(){
                            document.querySelector(".cardDiv").innerHTML = ""
                            displayAll(products.length)
                        })}
                    } else{
                            document.querySelector(".cardDiv").innerHTML = ""
                            displayAll(products.length);
                        }
                        addbtn()
            }
            else{
                return
            }
}




display()

document.querySelectorAll(".ProductsNav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const category = this.dataset.category;

        if (category === "all") {
            display()
            if (document.querySelector(".cardDiv")?.childElementCount < 1) {
                document.querySelector(".cardDiv").innerHTML +=
        `
                No items in this category
        `
            }

        } else if (category === "women") {
            document.querySelector(".cardDiv").innerHTML = ""
            displayWomen();
            if (document.querySelector(".cardDiv")?.childElementCount < 1) {
                document.querySelector(".cardDiv").innerHTML +=
        `
                No items in this category
        `
            }

        } else if (category === "men") {
            document.querySelector(".cardDiv").innerHTML = ""
            displayMen();
            if (document.querySelector(".cardDiv")?.childElementCount < 1) {
                document.querySelector(".cardDiv").innerHTML +=
        `
                No items in this category
        `
            }

        } else if (category === "watches") {
            document.querySelector(".cardDiv").innerHTML = ""
            displayWatch();
            if (document.querySelector(".cardDiv")?.childElementCount < 1) {
                document.querySelector(".cardDiv").innerHTML +=
        `
                No items in this category
        `
            }

        } else if (category === "shoes") {
            document.querySelector(".cardDiv").innerHTML = ""
            displayShoes();
            if (document.querySelector(".cardDiv")?.childElementCount < 1) {
                document.querySelector(".cardDiv").innerHTML +=
        `
                No items in this category
        `
            }
        }
        else if (category === "bag") {
            document.querySelector(".cardDiv").innerHTML = ""
            displayBags();
            if (document.querySelector(".cardDiv")?.childElementCount < 1) {
                document.querySelector(".cardDiv").innerHTML +=
        `
                No items in this category
        `
            }
        }
        else if (category === "shoes") {
            document.querySelector(".cardDiv").innerHTML = ""
            displayShoes();
            if (document.querySelector(".cardDiv")?.childElementCount < 1) {
                document.querySelector(".cardDiv").innerHTML +=
        `
                No items in this category
        `
            }
        }

    });
});


//  ============================== Filter and Search =============================

const searchBtn = document.querySelector("#search");
const container = document.querySelector(".FilterAndSearch");

searchBtn.addEventListener("click", () => {
    container.classList.toggle("show-search");
    document.querySelector("#searchIn").focus();
});

function search (){
    var searchInput = document.querySelector("#searchIn").value
    document.querySelector(".cardDiv").innerHTML = ""
    for(i=0; i<products.length; i++){
        if(products[i].name.toLowerCase().includes(searchInput)){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards">
                    <div class="Img">
                        <img src="${products[i].img[0]}" alt="">
                    </div>

                    <div class="description">
                    <div class="CardsTxt">
                        <a href=""> ${products[i].name} </a>
                        <p>$${products[i].price}</p>
                    </div>
                    <button>
                            <i class="material-icons">favorite</i>
                    </button>
                    
                    </div>
                </section>
        `
        addbtn()
        
        }
    }
    if (document.querySelector(".cardDiv")?.childElementCount < 1) {
                document.querySelector(".cardDiv").innerHTML +=
        `
                No items in this category
        `
            }
}

console.log(search)
document.querySelector("#searchIn").addEventListener("input", search);

    // ========== Filter ========

const filterBtn = document.querySelector("#filter");
const sidebar = document.querySelector(".filterSidebar");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".closeFilter");

filterBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
});

closeBtn.addEventListener("click", closeFilter);
overlay.addEventListener("click", closeFilter);

function closeFilter(){
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
}


function filter (){
    var filterMin = document.querySelectorAll(".price")[0].value
    var filterMax = document.querySelectorAll(".price")[1].value
    document.querySelector(".cardDiv").innerHTML = ""
    for(i=0; i<products.length; i++){
        if(products[i].price >= filterMin & products[i].price <= filterMax ){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards">
                    <div class="Img">
                        <img src="${products[i].img[0]}" alt="">
                    </div>
                    <div class="description">
                    <div class="CardsTxt">
                        <a href=""> ${products[i].name} </a>
                        <p>$${products[i].price}</p>
                    </div>
                    <button>
                            <i class="material-icons">favorite</i>
                    </button>
                    
                    </div>
                </section>
        `
        addbtn()
        
        }
    }
    if (document.querySelector(".cardDiv")?.childElementCount < 1) {
                document.querySelector(".cardDiv").innerHTML +=
        `
                No items in this category
        `
            }
}

document.querySelector("#Apply").addEventListener("click", filter);


};


