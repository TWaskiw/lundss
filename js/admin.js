// ==================== GENERAL ====================

// Alle
// Firebase import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

// Alle
// Import CRUD + database
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

// Alle
// Import auth + login
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

// Alle
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBnpudAe8UD65KZ7IPm8UtZl72KTYMKzXg",
  authDomain: "advanced-frontend-e2d51.firebaseapp.com",
  databaseURL: "advanced-frontend-e2d51.firebaseio.com",
  projectId: "advanced-frontend-e2d51",
  storageBucket: "advanced-frontend-e2d51.appspot.com",
  messagingSenderId: "407869533641",
  appId: "1:407869533641:web:fee7b71b904a6f1e0b4c18",
};

// Alle
// Initialize Firebase
initializeApp(firebaseConfig);
const _db = getFirestore();
const _auth = getAuth();

// Reference til arrays i firebase database
const _produkterRef = collection(_db, "produkter");
const _nyhederRef = collection(_db, "nyheder");

// Globale variabler
let _produkter = [];
let _nyheder = [];
let _valgteProduktId = "";
let _valgteImgFil = "";

// Alle (+Rasmus)
window.search = (value) => search(value);
window.visOpdater = (value) => visOpdater(value);
// ==================== READ ====================

// Alle
// Til at hente produkter data fra firebase
onSnapshot(_produkterRef, (snapshot) => {
  // Snapshot data fra firebase til objects
  _produkter = snapshot.docs.map((doc) => {
    const produkt = doc.data();
    produkt.id = doc.id;
    return produkt;
  });

  // Sigurd
  // Sorterer array af objects alfabetisk
  _produkter.sort((a, b) => a.name.localeCompare(b.name));
  // Append produkter ind i global variabel
  appendProdukter(_produkter);
});

// Alle
onSnapshot(_nyhederRef, (snapshot) => {
  // Snapshot data fra firebase til objects
  _nyheder = snapshot.docs.map((doc) => {
    const nyhed = doc.data();
    nyhed.id = doc.id;
    return nyhed;
  });
  appendNyheder(_nyheder);
});

// Alle
// Appender produkterne
function appendProdukter(produkter) {
  let htmlTemplate = "";
  for (const produkt of produkter) {
    htmlTemplate += /*html*/ `
    <article class="dashboard_products">
      <h3><span>${produkt.name}</span></h3>
      <img src="${produkt.img}" class="dashboard_product_img">
      <div class="dashboard_products_info">
	  <p><span class="nyheder_span">Beskrivelse:</span> ${produkt.description}</p>
	  <p><span class="nyheder_span">Kategori:</span> ${produkt.category}</p>
	  <p><span class="nyheder_span">Pris:</span> ${produkt.price}</p>
	  <p><span class="nyheder_span">Vægt:</span> ${produkt.weight}</p>
    <p><span class="nyheder_span">Kilopris:</span> ${produkt.kgprice}</p>
	  <p><span class="nyheder_span">Cut:</span> ${produkt.cut}</p>
    <p><span class="nyheder_span">Vist på forsiden?</span> ${
      produkt.forsideForslag
    }${forsideAntal()}</p>
    <div class="dashboard_lagerstatus"><p>Lagerstatus:</p>${optionalList(
      produkt
    )} ${produkt.stock}</div>
    </div>

    <!-- Opdater/slet knapper -->
    <div class="dashboard_buttons">
      <button class="btn-update-produkt" data-id="${
        produkt.id
      }">Opdater</button>
      <button class="btn-delete-produkt" data-id="${produkt.id}">Fjern</button>
    </div>
    </article>
    `;
  }
  document.querySelector("#content").innerHTML = htmlTemplate;

  //Bruger det enkelte produkts id til at vælge produkt der skal opdateres ved at kalde valgtProdukt()
  document.querySelectorAll(".btn-update-produkt").forEach((btn) => {
    btn.onclick = () => valgtProdukt(btn.getAttribute("data-id"));
  });

  //Bruger det enkelte produkts id til at vælge produkt der skal slettes ved at kalde sletProdukt()
  document.querySelectorAll(".btn-delete-produkt").forEach((btn) => {
    btn.onclick = () => sletProdukt(btn.getAttribute("data-id"));
  });
}

// Sigurd
// Appender nyhed(er)
function appendNyheder(nyhed) {
  let nyhedTemplate = "";
  for (let nyheden of nyhed) {
    nyhedTemplate += /*html*/ `
    <article>
    <p>${nyheden.nyNyhed}</p>
    <div class="dashboard_buttons">
    <button class="btn-delete-nyhed" data-id="${nyheden.id}">Fjern denne nyhed</button>
    </div>
    </article>
    `;
    console.log(nyheden);
    console.log(nyhed);
  }
  document.querySelector("#lavet-nyheder").innerHTML = nyhedTemplate;

  //Bruger den enkelte nyheds id til at slette nyheden ved at kalde fjernNyhed()
  document.querySelectorAll(".btn-delete-nyhed").forEach((btn) => {
    btn.onclick = () => fjernNyhed(btn.getAttribute("data-id"));
  });
}

// ==================== CREATE ====================
// Sigurd, Rune, Alexander
// Tilføjer et nyt produkt til firebase databasen
function nytProdukt() {
  // Får data fra input fields
  let nameInput = document.querySelector("#name");
  let descriptionInput = document.querySelector("#description");
  let cutInput = document.querySelector("#cut");
  let categoryInput = document.querySelector("#category");
  let priceInput = document.querySelector("#price");
  let weightInput = document.querySelector("#weight");
  let imageInput = document.querySelector("#imagePreview");
  let stockInput = document.querySelector("#lagerstatus");
  let kgpriceInput = document.querySelector("#kgprice");
  let forsideInput = document.querySelector('input[name="forslag"]:checked');

  // Sigurd, Rune
  // Variabel der indeholder data fra input fields til at lave et object, der tilføjes firebase databasen
  const nytProdukt = {
    // Gør det første bogstav i sætningen stort
    name: nameInput.value[0].toUpperCase() + nameInput.value.slice(1),
    // Gør det første bogstav i sætningen stort
    description:
      descriptionInput.value[0].toUpperCase() + descriptionInput.value.slice(1),
    cut: cutInput.value,
    category: categoryInput.value,
    price: priceInput.value,
    weight: weightInput.value,
    img: imageInput.src,
    stock: stockInput.value,
    kgprice: kgpriceInput.value,
    forsideForslag: forsideInput.value,
  };

  // Indbygget firebase funktion addDoc der tilføjer dataene til databasen
  addDoc(_produkterRef, nytProdukt);

  // Reset af input fields
  nameInput.value = "";
  descriptionInput.value = "";
  cutInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  weightInput.value = "";
  imageInput.src = "";
  stockInput.value = "";
  kgpriceInput.value = "";
  forsideInput.value = "";
}

// Sigurd
// Finder værdien fra vores <textarea>, fylder vores tomme <div> #showText med den værdi, og tillader samtidig at skrive mere
function textAreaNyhed() {
  let textContent = document.getElementById("textContent");
  let textContentPreset = document.getElementById("textContent").value;

  // Hvert tast der skrives i textContent opdateres i showText i realtime
  document.getElementById("showText").innerHTML = textContentPreset;
  textContent.onkeyup = textContent.onkeydown = function () {
    document.getElementById("showText").innerHTML = this.value;
  };
}
textAreaNyhed();

// Sigurd
// Tilføjer en nyhed til firebase databasen, fungerer præcis som ovenstående, bortset fra <textarea> ikke har et reset
function lavNyhed() {
  let nyhedInput = document.querySelector("#textContent");
  const nyNyheder = {
    nyNyhed: nyhedInput.value,
  };

  addDoc(_nyhederRef, nyNyheder);
}

// ==================== UPDATE ====================
// Sigurd, Rune, Alexander
// Vælger et produkt ud fra dets id
function valgtProdukt(id) {
  // Global tom variabel som allerede er declared
  _valgteProduktId = id;
  // Finder produktets id
  const produkt = _produkter.find((produkt) => produkt.id == _valgteProduktId);
  // Udfylder input fields med dataene fre firebase
  document.querySelector("#nameUpdate").value = produkt.name;
  document.querySelector("#descriptionUpdate").value = produkt.description;
  document.querySelector("#cut-update").value = produkt.cut;
  document.querySelector("#category-update").value = produkt.category;
  document.querySelector("#price-update").value = produkt.price;
  document.querySelector("#weight-update").value = produkt.weight;
  document.querySelector("#imagePreviewUpdate").src = produkt.img;
  document.querySelector("#lagerstatus-update").value = produkt.stock;
  document.querySelector("#kgprice-update").value = produkt.kgprice;

  // Sigurd
  // Checker den radio button som matcher værdien fra forsideForslag property
  if (
    document.querySelector("#ja-forside-update").value ===
    produkt.forsideForslag
  ) {
    document.querySelector("#ja-forside-update").checked = true;
  }

  if (
    document.querySelector("#nej-forside-update").value ===
    produkt.forsideForslag
  ) {
    document.querySelector("#nej-forside-update").checked = true;
  }

  // Scroller ned til <form>
  document.querySelector("#form-update").scrollIntoView({
    behavior: "smooth",
  });
}

// Sigurd, Rune
// Opdaterer produktet som er valgt med valgtProdukt()
function opdaterProdukt() {
  // Variabel der indeholder data fra input fields til at opdatere object der ligger i firebase databasen
  const produktOpdater = {
    // Gør det første bogstav i hvert ord stort
    name:
      document.querySelector("#nameUpdate").value[0].toUpperCase() +
      nameUpdate.value.slice(1),
    // Gør det første bogstav i sætningen stort
    description:
      document.querySelector("#descriptionUpdate").value[0].toUpperCase() +
      descriptionUpdate.value.slice(1),
    cut: document.querySelector("#cut-update").value,
    category: document.querySelector("#category-update").value,
    price: document.querySelector("#price-update").value,
    weight: document.querySelector("#weight-update").value,
    img: document.querySelector("#imagePreviewUpdate").src,
    stock: document.querySelector("#lagerstatus-update").value,
    kgprice: document.querySelector("#kgprice-update").value,
    forsideForslag: document.querySelector(
      'input[name="forslag-update"]:checked'
    ).value,
  };
  const produktRef = doc(_produkterRef, _valgteProduktId);
  // Indbygget firebase funktion updateDoc der opdaterer dataene til databasen
  updateDoc(produktRef, produktOpdater);

  // Reset af input fields
  document.querySelector("#nameUpdate").value = "";
  document.querySelector("#descriptionUpdate").value = "";
  document.querySelector("#cut-update").value = "";
  document.querySelector("#category-update").value = "";
  document.querySelector("#price-update").value = "";
  document.querySelector("#weight-update").value = "";
  document.querySelector("#imagePreviewUpdate").src = "";
  document.querySelector("#lagerstatus-update").value = "";
  document.querySelector("#kgprice-update").value = "";
}

// ==================== DELETE ====================
// Sigurd, Rune
// Sletter produktet som er valgt med valgtProdukt()
function sletProdukt(id) {
  // Matcher med id
  const docRef = doc(_produkterRef, id);

  // Sigurd
  // Indbygget SweetAlert properties til at customize en alert, når sletProdukt() kaldes
  Swal.fire({
    title: "Er du sikker på at du vil slette dette produkt?",
    text: "Produktet kan ikke genoprettes.",
    icon: "warning",
    iconColor: "red",
    showCancelButton: true,
    showCloseButton: true,
    returnFocus: false,
    focusConfirm: false,
    allowEnterKey: false,
    cancelButtonText: "Annuller",
    confirmButtonColor: "green",
    cancelButtonColor: "#D72828",
    confirmButtonText: "Bekræft",
  })
    // Kaldes når der foretages en action efter at have trykket på enten "annuller", "bekræft", kryds eller ude af modal box
    .then((result) => {
      // Kaldes når der trykkes "bekræft"
      if (result.isConfirmed) {
        Swal.fire("Produktet er nu slettet.", "", "success"),
          // Sletter produktet med firebases indbyggede deleteDoc()
          deleteDoc(docRef);
      }
      // Produktet beholdes
      else {
        Swal.fire("Produktet blev beholdt.", "", "success");
      }
    });
}

// Sigurd
// Sletter nyheden som er valgt med data-id. Funktionen er ens med ovenstående sletProdukt()
function fjernNyhed(id) {
  let nyhedRef = doc(_nyhederRef, id);
  // Sigurd
  Swal.fire({
    title: "Er du sikker på at du vil fjerne nyheden?",
    text: "Nyheden kan ikke genoprettes.",
    icon: "warning",
    iconColor: "red",
    showCancelButton: true,
    showCloseButton: true,
    returnFocus: false,
    focusConfirm: false,
    allowEnterKey: false,
    cancelButtonText: "Annuller",
    confirmButtonColor: "green",
    cancelButtonColor: "#D72828",
    confirmButtonText: "Bekræft",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Nyheden er nu slettet.", "", "success"), deleteDoc(nyhedRef);
    } else {
      Swal.fire("Nyheden blev beholdt.", "", "success");
    }
  });
}

// ==================== CUSTOM SCRIPTS ====================

// Sigurd
// Funktion der anvendes i appendProdukter() til at vise hvor mange objects der vises på forsiden i index.html
function forsideAntal() {
  // Finder antal af objects der har property "forsideForslag" med værdien "Ja"
  let count = _produkter.filter((x) => x.forsideForslag == "Ja").length;

  // Tager det samlede antal af properties med "Ja"-værdi og minusser med det ønskede antal for at vise forskellen i sidste statement i forsideAntal()
  let desiredCount = 3;
  let countDifference = count - desiredCount;
  let htmlCount = "";

  // If/elseif/else statement ud fra hvilken værdi variablen "count" har
  if (count === 0) {
    htmlCount += `
    <span class="forside_vist">(${count}/3 vist)</span>
    `;
  } else if (count === 1) {
    htmlCount += `
    <span class="forside_vist">(${count}/3 vist)</span>
    `;
  } else if (count === 2) {
    htmlCount += `
    <span class="forside_vist">(${count}/3 vist)</span>
    `;
  } else if (count === 3) {
    htmlCount += `
    <span class="forside_vist">(${count}/3 vist)</span>
    `;
  }
  // Bruger vores formular countDifference hvis count er over 3, med et indbygget advarselstegn
  else {
    htmlCount += `
    <span class="forside_vist for_mange">(${count}/3 vist)</span><span data-tooltip="Der er lige nu sat ${count}/3 produkter på forsiden. Fjern ${countDifference}." data-flow="top"><img src="img/erroricon.svg"></span>
    `;
  }
  return htmlCount;
}

// Sigurd
// Viser en advarsel, hvis admin er i gang med at sætte et ekstra object over på forsiden når max kapacitet (3) er nået
function godkendtForside() {
  // Sigurd
  // Finder antal af objects der har property "forsideForslag" med værdien "Ja"
  let count = _produkter.filter((x) => x.forsideForslag == "Ja").length;

  // Sigurd
  // Modal er triggered når max kapacitet er nået (3 eller over)
  if (count === 3 || count > 3) {
    Swal.fire({
      title: "Er du sikker på at du vil tilføje dette produkt?",
      text:
        "Du har allerede " +
        count +
        " produkter sat til at blive vist på forsiden.",
      icon: "warning",
      iconColor: "red",
      showCancelButton: true,
      showCloseButton: true,
      returnFocus: false,
      focusConfirm: false,
      allowEnterKey: false,
      cancelButtonText: "Annuller",
      confirmButtonColor: "green",
      cancelButtonColor: "#D72828",
      confirmButtonText: "Bekræft",
    })
      // Sigurd
      // Triggered når admin vælger "bekræft"
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Produktet er sat til at komme på forsiden.",
            "",
            "success"
          ),
            // Skifter radio button værdi til "ja"
            (document.querySelector("#ja_forside").checked = true);
          document.querySelector("#ja-forside-update").checked = true;
        }
        // Triggered når brugeren vælger "annuller"
        else {
          Swal.fire(
            "Produktet er ikke sat til at komme på forsiden.",
            "",
            "warning"
          ),
            // Skifter radio button værdi til "nej"
            (document.querySelector("#nej_forside").checked = true);
          document.querySelector("#nej-forside-update").checked = true;
        }
      });
  }
}

// Sigurd
// Funktion der viser en prik der repræsenterer lagerstatus, som bruges i appendProdukter()
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

// Alle
// Funktion der displayer et preview af den valgte img fil
function previewImg(file, previewId) {
  if (file) {
    // Den tomme globale variabel _valgteImgFil anvendes
    _valgteImgFil = file;
    let reader = new FileReader();
    reader.onload = (event) => {
      document
        .querySelector("#" + previewId)
        .setAttribute("src", event.target.result);
    };
    reader.readAsDataURL(file);
  }
}

// Sigurd
// Lader admin der er logget ind komme direkte hen til products
onAuthStateChanged(_auth, (user) => {
  if (user) {
    navigateTo("products");
    console.log(user);
  }

  // Henviser til login side, hvis der ikke er logget ind
  else {
    navigateTo("login");
    console.log(user);
  }
});

// Sigurd
// Login gennem firebase auth
function login() {
  // Tager værdi fra input fields
  const mail = document.querySelector("#login-mail").value;
  const password = document.querySelector("#login-password").value;

  // Indbygget firebase funktion der autentificerer ud fra match melelm input value og firebase database
  signInWithEmailAndPassword(_auth, mail, password)
    .then((userCredential) => {
      // Logger info om user
      const user = userCredential.user;
      console.log(user);
    })

    // Hvis der skete en fejl med login, vises en error message
    .catch((error) => {
      error.message = "Fejl ved login. Prøv igen.";
      document.querySelector(".login-message").innerHTML = error.message;
    });
}

// =========== ATTACH EVENTS ===========
// Alle
// Kalder opdaterProdukt() når der trykkes på button
document.querySelector("#btn-update").onclick = () => opdaterProdukt();

// Kalder nytProdukt() når der trykkes på button
document.querySelector("#btn-create").onclick = () => nytProdukt();

// Kalder lavNyhed() når der trykkes på button
document.querySelector("#lav-nyhed").onclick = () => lavNyhed();

// Sigurd
// Kalder godkendtForside() når der trykkes
document
  .getElementById("ja_forside")
  .addEventListener("click", godkendtForside);
document
  .getElementById("ja-forside-update")
  .addEventListener("click", godkendtForside);

// Kalder login() når der trykkes
document.querySelector("#btn-login").onclick = () => login();
// Viser vores img fil der er uploadet
window.previewImg = (file, previewId) => previewImg(file, previewId);

// Thomas
// Søg funktion
function search(value) {
  value = value.toLowerCase();
  let filteredProdukter = [];
  for (const produkt of _produkter) {
    console.log(produkt);
    let name = produkt.name.toLowerCase();
    if (name.includes(value)) {
      filteredProdukter.push(produkt);
    }
  }
  appendProdukter(filteredProdukter);
}

// Alle (+Rasmus)
// Hvis brugeren ikke er logget ind, sendes de tilbage til login side
function locationHashChanged() {
  if (location.hash === "#products" && _auth.currentUser === null) {
    navigateTo("login");
  }
  document.location.reload();
}

window.onhashchange = locationHashChanged;
