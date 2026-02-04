//  ==============================. Json parse and initiate =============================

var products;
var res = new XMLHttpRequest();

res.open("GET", "../products.json");
res.send();


res.onreadystatechange = function readyProd () {
  if (res.readyState === 4 && res.status === 200) {
    var products = JSON.parse(res.responseText);
    console.log(products);}



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
  });
}


//  ============================== Display in shop =============================

function displayAll(x) {
    
    for(i=0; i< x ; i++){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
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

function displayMen(){
    for(i=0; i<products.length; i++){
        if(products[i].type == "man"){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
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
}
function displayWomen(){
    for(i=0; i<products.length; i++){
        if(products[i].type == "woman"){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
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
}
function displayShoes(){
    for(i=0; i<products.length; i++){
        if(products[i].type == "shoe"){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
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
}
function displayWatch(){
    for(i=0; i<products.length; i++){
        if(products[i].type == "watch"){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
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
}
function displayBags(){
    for(i=0; i<products.length; i++){
        if(products[i].type == "bag"){
            document.querySelector(".cardDiv").innerHTML +=
        `
                <section class="Cards" data-index="${i}">
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
}



function display(){
    if (document.querySelector(".cardDiv")?.childElementCount < products.length) {
                        if (products.length > 5) {
                        displayAll(6);
                        const btnadd = document.querySelector(".cardDiv")
                        btnadd.innerHTML += `
                        <div class="loadMoreDiv">
                            <button class="loadMore">
                                Load More
                            </button>
                        </div>
                        `

                        document.querySelector(".loadMore").addEventListener("click", function(){
                            document.querySelector(".cardDiv").innerHTML = ""
                            displayAll(products.length)
                        })

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
        if(products[i].name.includes(searchInput)){
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
