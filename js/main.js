// Alle
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBnpudAe8UD65KZ7IPm8UtZl72KTYMKzXg",
  authDomain: "advanced-frontend-e2d51.firebaseapp.com",
  projectId: "advanced-frontend-e2d51",
  storageBucket: "advanced-frontend-e2d51.appspot.com",
  messagingSenderId: "407869533641",
  appId: "1:407869533641:web:fee7b71b904a6f1e0b4c18",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// reference to database
const _db = getFirestore();

// reference to products collection in database
const _productsRef = collection(_db, "produkter");
const _nyhedRef = collection(_db, "nyheder");
// global variable: product & news arrays
let _products = [];
let _nyhed = [];

// Alle
// impoterer funktioner til modulet
window.showProduct = (id) => showProduct(id);
window.showIs = (id) => showIs(id);
window.goBack = (id) => goBack(id);
window.appendProdukterForside = (products) => appendProdukterForside(products);
window.resetVaerdier = () => resetVaerdier();
window.vaerdier = (value) => vaerdier(value);
window.tilTopBtn = () => tilTopBtn();

// Thomas
// lave en ny scroll funktion, der tager brugeren ned på den sektion der klikkes på
function scrollToProductSection(id) {
  const productContainer = document.querySelector(id);
  const offset = 100;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = productContainer.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

document
  .querySelectorAll(".nav-container a, .mobile-nav-container a")
  .forEach((navElement) => {
    navElement.onclick = (element) => {
      element.preventDefault();
      const containerId = navElement.getAttribute("href");
      scrollToProductSection(containerId);
    };
  });

// Thomas & Rune
// Burger menu åben og luk
const burger = document.getElementById("burger");
const tabbar = document.getElementById("tabbar");
const LogoBurger = document.getElementById("Logo-Burger");

burger.addEventListener("click", () => {
  tabbar.classList.toggle("display");
});

tabbar.addEventListener("click", () => {
  tabbar.classList.remove("display");
});

LogoBurger.addEventListener("click", () => {
  tabbar.classList.remove("display");
});

// ========== READ ==========
// Alle
// onSnapshot: listen for realtime updates
onSnapshot(_productsRef, (snapshot) => {
  // mapping snapshot data from firebase in to product objects
  _products = snapshot.docs.map((doc) => {
    const product = doc.data();
    product.id = doc.id;
    return product;
  });

  filterProdukter(_products);
  // filterCuts(_products);
  appendProdukterForside(_products);
});

onSnapshot(_nyhedRef, (snapshot) => {
  // mapping snapshot data from firebase in to product objects
  _nyhed = snapshot.docs.map((doc) => {
    const nyhed = doc.data();
    nyhed.id = doc.id;
    return nyhed;
  });
  appendNyhed(_nyhed);
});

// Sigurd
//En funktion som giver forskellige output alt afhængig af lagerstatus
function optionalList(lager) {
  let htmlOptional = "";
  if (lager.stock == "På lager") {
    htmlOptional += /*html*/ `
      <span class="greendot"></span>
        `;
  }
  if (lager.stock == "Få på lager") {
    htmlOptional += /*html*/ `
      <span class="orangedot"></span>
        `;
  }
  if (lager.stock == "Ikke på lager") {
    htmlOptional += /*html*/ `
      <span class="reddot"></span>
        `;
  }
  return htmlOptional;
}

// Thomas & Rune
// Filtrer de forskellige produkter som du ser på produkt siden, så de ryger ind i den passende sektion
function filterProdukter(products) {
  let bofferSteaks = [];
  let stege = [];
  let hakketOkse = [];
  let spegePolse = [];
  let is = [];
  /* let vin = []; */
  for (const product of products) {
    if (product.category === "Bøffer/Steaks" && product.visProdukt === "Ja") {
      bofferSteaks.push(product);
    } else if (
      product.category === "Hele stege" &&
      product.visProdukt === "Ja"
    ) {
      stege.push(product);
    } else if (
      product.category === "Hakket oksekød" &&
      product.visProdukt === "Ja"
    ) {
      hakketOkse.push(product);
    } else if (
      product.category === "Spegepølse" &&
      product.visProdukt === "Ja"
    ) {
      spegePolse.push(product);
    } else if (product.category === "Is" && product.visProdukt === "Ja") {
      const found = is.find((currentIs) => product.name === currentIs.name);
      if (!found) {
        is.push(product);
      }
    } /* else if (product.category === "Vin") {
      vin.push(product); */
  }

  is = is.filter((product) => product.name !== "Is");

  appendProdukter(bofferSteaks, "all-bofferSteaks");
  appendProdukter(stege, "all-stege");
  appendProdukter(hakketOkse, "all-hakket");
  appendProdukter(spegePolse, "all-spegepolse");
  appendIs(is, "all-is");
  /*
  appendVin(vin, "all-vin"); */
}

// Thomas & Rune
// Her appendes appendes produkterne til produkt siden
function appendProdukter(products, containerId) {
  let htmlTemplate = "";
  for (let product of products) {
    htmlTemplate += /*html*/ `
    <article class="kort" onclick="showProduct('${product.id}')">
    <div class="kort-img kort-halv">
      <img src="${product.img}" class="kortImg">
      </div>
      <div class="kort-indhold kort-halv">
        <h3>${product.name}</h3>
        <p class="kgpris">${product.kgprice} kr/kg</p>
        <p class="vaegt">Ca. ${product.weight} g</p>
        <p class="pris">Fra ${product.price} kr,-</p>
        <div class="justify-content">
        <div class="dashboard_lagerstatus">${optionalList(product)} ${
      product.stock
    }</div>
    <button><img src="./img/pil.png"></button>
        </div>
        </div>
      </div>
    </article>
    `;
  }
  document.querySelector(`#${containerId}`).innerHTML = htmlTemplate;
}

function appendIs(products, containerId) {
  let htmlTemplate = "";
  for (let product of products) {
    htmlTemplate += /*html*/ `
    <article class="kort" onclick="showIs('${product.id}')">
    <div class="kort-img">
      <img src="${product.img}">
      </div>
      <div class="kort-indhold">
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <div class="justify-content-is">
    <button><img src="./img/pil.png"></button>
        </div>
        </div>
      </div>
    </article>
    `;
  }
  document.querySelector(`#${containerId}`).innerHTML = htmlTemplate;
}

//Thomas
//Produkter append til forsiden
function appendProdukterForside(products) {
  let htmlTemplate = "";
  for (let product of products) {
    if (product.forsideForslag === "Ja") {
      htmlTemplate += /*html*/ `
      <article class="kort" onclick="showProduct('${product.id}')">
      <div class="kort-img"></div>
        <img src="${product.img}">
        </div>
        <div class="kort-indhold">
          <h3>${product.name}</h3>
          <p class="kgpris">${product.kgprice} kr/kg</p>
          <p class="vaegt">Ca. ${product.weight} g</p>
          <p class="pris">Fra ${product.price} kr,-</p>
          <div class="justify-content">
          <div class="dashboard_lagerstatus">${optionalList(product)} ${
        product.stock
      }</div>
          <button><img src="./img/pil.png"></button>
          </div>
          </div>
        </div>
      </article>
      `;
    }
  }

  document.querySelector(".produkt-kort").innerHTML = htmlTemplate;
}

// Sigurd
// Appender alle nyheds sektioner
function appendNyhed(nyheder) {
  let htmlTemplate = "";
  for (let nyhed of nyheder) {
    htmlTemplate += /*html*/ `
      <article class="kort">
      <p>${nyhed.nyNyhed}</p>
      </article>
      `;
  }
  document.querySelector("#nyheder").innerHTML = htmlTemplate;
}

// Thomas & Rune
//Ala detail view, så gør showProduct meget det samme, hvor du appender informationer for en af objekterne i dit array til en produkt side
function showProduct(id) {
  const product = _products.find((product) => product.id == id);
  document.querySelector("#chosen-product").innerHTML = /*html*/ `
  <article class="product-card ${product.name}-color">
  <div onclick="goBack()" class="produkt-navigation mobile-produkt">
  <img src="./img/pil.png">
  <h2>Tilbage</h2>
  </div>
        <div class="produkt-img">
          <img src="${product.img}">
        </div>
        <div class="produkt-indhold">
        <div onclick="goBack()" class="produkt-navigation desktop-produkt">
        <img src="./img/pil.png">
        <h2>Tilbage</h2>
        </div>

        <div class="produkt-names">
          <h3>${product.name}</h3>
          <p class="description">${product.description}</p>
          </div>
<div class="produkt-information">
<div class="specifik-info">
<p class="specifik-info-top">Kilopris</p>
          <p class="specifik-info-bottom">${product.kgprice} kr/kg</p>
          </div>
          <div class="specifik-info">
          <p class="specifik-info-top">Generel vægt</p>
          <p class="specifik-info-bottom">Ca. ${product.weight} g</p>
          </div>
          <div class="specifik-info">
          <p class="specifik-info-top">Fra</p>
          <p class="specifik-info-bottom">${product.price} kr,-</p>
          </div>
          <div class="dashboard_lagerstatus-specifik specifik-info-bottom">${optionalList(
            product
          )} ${product.stock}
    </div>
    </div>
          </div>
        </div>
        </div>
  </article>
    `;
  navigateTo("specific-product");
}

function showIs(id) {
  const product = _products.find((product) => product.id == id);
  const products = _products.filter(
    (currentProduct) => currentProduct.name == product.name
  );

  const test = products
    .sort((a, b) => a.price - b.price)
    .map((product) => {
      return /*html*/ `
      <div class="specific-status"><div class="is-information">${
        product.weight
      } <p>${product.price} kr,-</p></div>
                <div class="dashboard_lagerstatus dashboard_lagerstatus-specifik-is">${optionalList(
                  product
                )} ${product.stock}
    </div></div>`;
    })
    .join("");

  document.querySelector("#chosen-product").innerHTML = /*html*/ `
  <article class="product-card ${product.name}-color">
  <div onclick="goBack()" class="produkt-navigation mobile-produkt">
  <img src="./img/pil.png">
  <h2>Tilbage</h2>
  </div>
        <div class="produkt-img">
          <img src="${product.img}">
        </div>
        <div class="produkt-indhold">
        <div onclick="goBack()" class="produkt-navigation desktop-produkt">
        <img src="./img/pil.png">
        <h2>Tilbage</h2>
        </div>

        <div class="produkt-names">
          <h3>${product.name}</h3>
          <p class="description">${product.description}</p>
          </div>
<div class="produkt-information-is">
${test}
    </div>
          </div>
        </div>
        </div>
  </article>
    `;
  navigateTo("specific-product");
}

function goBack() {
  window.history.back();
}

// // Alexander
// // Image mapping
// //Her genbruger vi vores filtrerings metode, her tager vi fat i Udskæringer
// function filterCuts(products) {
//   let chuck = [];
//   let brisket = [];
//   let plate = [];
//   let rib = [];
//   let flank = [];
//   let topsirloin = [];
//   let round = [];

//   for (const product of products) {
//     if (product.cut === "Højreb") {
//       rib.push(product);
//     } else if (product.cut === "Bryst") {
//       plate.push(product);
//     } else if (product.cut === "Bov") {
//       brisket.push(product);
//     } else if (product.cut === "Skank") {
//       flank.push(product);
//     } else if (product.cut === "Tyksteg") {
//       round.push(product);
//     } else if (product.cut === "Tyndsteg") {
//       topsirloin.push(product);
//     } else if (product.cut === "Tykkam") {
//       chuck.push(product);
//     }
//   }
//   appendCuts(rib, "rib-product");
//   appendCuts(brisket, "brisket-product");
//   appendCuts(plate, "plate-product");
//   appendCuts(flank, "flank-product");
//   appendCuts(chuck, "chuck-product");
//   appendCuts(topsirloin, "topsirloin-product");
//   appendCuts(round, "round-product");
// }

// // Alexander
// //Appender til jerseyko udskæringen
// function appendCuts(products, containerId) {
//   let htmlTemplate = "";
//   for (let product of products) {
//     htmlTemplate += /*html*/ `
//       <article class="kort" onclick="showProduct('${product.id}')">
//       <div class="kort-img-jersey kort-halv">
//         <img src="${product.img}">
//         </div>
//         <div class="kort-indhold kort-halv">
//           <h3>${product.name}</h3>
//                 <p style="text-align:left;">${product.description}</p>
//           <div class="justify-content">
//           <div class="dashboard_lagerstatus">${optionalList(product)} ${
//       product.stock
//     }</div>
//           <button><img src="./img/pil.png"></button>
//         </div>
//       </article>
//       `;
//   }
//   document.querySelector(`#${containerId}`).innerHTML = htmlTemplate;
//   document.querySelector(`#${containerId}`).style.display = "none";
// }

// // Alexander
// // Hver funktion tager fat i en del af image mapping, hvor de appender de passende informationer
// document.querySelector("#neck").addEventListener("click", function () {
//   clearArray();
//   let html = "";
//   html += `
//   <h1>Neck</h1>
//   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
//   `;
//   document.querySelector("#image-beskrivelse").innerHTML = html;
// });

// // Alexander
// document.querySelector("#chuck").addEventListener("click", function () {
//   clearArray();
//   document.querySelector("#image-beskrivelse").innerHTML = `
//   <h1>Chuck</h1>
//   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
//   <br><h3>Fra denne del kan vi tilbyde</h3>
//   `;
//   document.querySelector(`#chuck-product`).style.display = "grid";
// });

// // Alexander
// document.querySelector("#brisket").addEventListener("click", function () {
//   clearArray();
//   document.querySelector("#image-beskrivelse").innerHTML = `
//   <h1>Brisket</h1>
//   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
//   <br><h3>Fra denne del kan vi tilbyde</h3>
//   `;
//   document.querySelector(`#brisket-product`).style.display = "grid";
// });

// // Alexander
// document.querySelector("#plate").addEventListener("click", function () {
//   clearArray();
//   document.querySelector("#image-beskrivelse").innerHTML = `
//   <h1>Plate</h1>
//   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
//   <br><h3>Fra denne del kan vi tilbyde</h3>
//   `;
//   document.querySelector(`#plate-product`).style.display = "grid";
// });

// // Alexander
// document.querySelector("#rib").addEventListener("click", function () {
//   clearArray();
//   document.querySelector("#image-beskrivelse").innerHTML = `
//   <h1>Rib</h1>
//   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
//   <br><h3>Fra denne del kan vi tilbyde</h3>
//   `;
//   document.querySelector(`#rib-product`).style.display = "grid";
// });

// // Alexander
// document.querySelector("#shortloin").addEventListener("click", function () {
//   clearArray();
//   document.querySelector("#image-beskrivelse").innerHTML = `
//   <h1>Shortloin</h1>
//   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
//   `;
// });

// // Alexander
// document.querySelector("#flank").addEventListener("click", function () {
//   clearArray();
//   document.querySelector("#image-beskrivelse").innerHTML = `
//   <h1>Flank</h1>
//   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
//   <br><h3>Fra denne del kan vi tilbyde</h3>
//   `;
//   document.querySelector(`#flank-product`).style.display = "grid";
// });

// // Alexander
// document.querySelector("#top-sirloin").addEventListener("click", function () {
//   clearArray();
//   document.querySelector("#image-beskrivelse").innerHTML = `
//   <h1>Top Sirloin</h1>
//   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
//   `;
//   document.querySelector(`#topsirloin-product`).style.display = "grid";
// });

// // Alexander
// document
//   .querySelector("#bottom-sirloin")
//   .addEventListener("click", function () {
//     clearArray();
//     document.querySelector("#image-beskrivelse").innerHTML = `
//   <h1>Bottom Sirloin</h1>
//   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
//   `;
//   });

// // Alexander
// document.querySelector("#round").addEventListener("click", function () {
//   clearArray();
//   document.querySelector("#image-beskrivelse").innerHTML = `
//   <h1>Round</h1>
//   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
//   <br><h3>Fra denne del kan vi tilbyde</h3>
//   `;
//   document.querySelector(`#round-product`).style.display = "grid";
// });

// // Alexander
// // Sætter alle appendede produkter på jersey side til display none, som en nulstilling af funktionen
// function clearArray() {
//   document.querySelector(`#chuck-product`).style.display = "none";
//   document.querySelector(`#topsirloin-product`).style.display = "none";
//   document.querySelector(`#chuck-product`).style.display = "none";
//   document.querySelector(`#rib-product`).style.display = "none";
//   document.querySelector(`#plate-product`).style.display = "none";
//   document.querySelector(`#brisket-product`).style.display = "none";
//   document.querySelector(`#round-product`).style.display = "none";
//   document.querySelector(`#flank-product`).style.display = "none";
// }

// Thomas
// Luk alle værdier
function resetVaerdier() {
  document.getElementById("vaerdi-1").style.display = "none";
  document.getElementById("vaerdi-2").style.display = "none";
  document.getElementById("vaerdi-3").style.display = "none";
}

// Thomas
// Åbner værdi ved onclick
function vaerdier(value) {
  resetVaerdier();
  document.getElementById(value).style.display = "block";
}

var nav = $(".nav-container");
var navMobile = $(".mobile-nav-container");
var sections = $(".kategori");

$(window).on("scroll", function () {
  var cur_pos = $(this).scrollTop();

  sections.each(function (index) {
    var top = $(this).offset().top - 400,
      bottom = top + $(this).outerHeight();
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find(".boffer").removeClass("active");
      nav.find("." + $(this)[0].id).addClass("active");
      navMobile.find(".boffer").removeClass("active");
      navMobile.find("." + $(this)[0].id).addClass("active");
      if (
        navMobile.find("." + $(this)[0].id).offset().left > 100 ||
        navMobile.find("." + $(this)[0].id).offset().left < 0
      ) {
        navMobile.animate(
          {
            scrollLeft:
              navMobile.scrollLeft() +
              navMobile.find("." + $(this)[0].id).offset().left -
              22.5,
          },
          0
        );
      }
    }
  });
});

let mybutton = document.getElementById("tilTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    (document.body.scrollTop > 200 && screen.width < 1025) ||
    (document.documentElement.scrollTop > 200 && screen.width < 1025)
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

$("#tilTopBtn").click(function () {
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    600
  );
  return false;
});
