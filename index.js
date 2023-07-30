<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Lundsbjerggaard</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link rel="stylesheet" href="css/main.css" />
    <link rel="icon" href="img/Logo.svg" />
    <script
      src="https://kit.fontawesome.com/491b6e8995.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body onhashchange="pageChange()">
    <script
      async
      defer
      crossorigin="anonymous"
      src="https://connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v12.0&appId=386916509852451&autoLogAppEvents=1"
      nonce="HraLQt0x"
    ></script>

    <header>
      <div class="mobile-nav">
        <a href="#hjem"
          ><img
            src="./img/Logo.svg"
            alt="Lundsbjerggaards Logo"
            id="Logo-Burger"
        /></a>
        <button class="burger icon" id="burger">
          <img src="./img/burger.svg" alt="Burgermenu" />
        </button>
      </div>

      <nav class="tabbar" id="tabbar">
        <div class="product-nav">
          <a href="#produkter">Produkter</a>
        </div>
        <div class="logo-nav">
          <a href="#hjem"
            ><img src="img/Logo.svg" alt="Lundsbjerggaards Logo"
          /></a>
        </div>
        <div class="right-nav">
          <a href="#om">Om gården</a>
          <a href="#jersey" class="jersey-nav">Jersey</a>
        </div>
      </nav>
    </header>

    <section id="hjem" class="page">
      <section class="hero">
        <div class="content-forside">
          <div class="content-all-forside">
            <h1>Lundsbjerggaard</h1>
            <p>Gårdbutik med is og kød fra nordfynske Jersey køer</p>
            <button
              type="button"
              class="cta-btn"
              onclick="location.href='#produkter'"
            >
              Se vores udvalg
            </button>
          </div>
        </div>
      </section>
      <div class="wrapper">
        <section id="info-kort">
          <div class="info-kort-bg">
            <div class="info-kort-img">
              <img src="img/imagestack.png" alt="Billede af Jersey køer" />
            </div>
            <div class="info-kort-text">
              <h2>Jerseykoen</h2>
              <p>
                Jerseykoen er en smule udskilt på grund af dens størrelse. Men
                trods af det er den yderst effektiv til at producere mælk.
                Mælken er meget koncentreret i forhold til de andre store racer,
                som Rød dansk malkerace og Dansk holstein. Vores køer leverer
                mælk med 6,2% fedt og 4,3% protein. <br />
                <br />
                Ud over dens evne til at producere mælk har Jerseykoen en evne
                til at levere en fantastisk kvalitet kød. Jerseykød er kendt for
                deres kraftfulde smag, og flotte fedtmarmorering.
              </p>
              <button
                type="button"
                class="cta-btn"
                onclick="location.href='#jersey'"
              >
                Læs mere
              </button>
            </div>
          </div>
        </section>
        <div class="forslag-header">
          <h2 class="forslag-h2">Må vi anbefale?</h2>
          <div class="linje"></div>
          <section class="produkt-kort"></section>
        </div>

        <section id="kategorier-forside">
          <h2>Kategorier</h2>
          <div class="linje"></div>
          <div class="kategori-container">
            <div class="top-box" onclick="location.href='#produkter'">
              <h3>Kød</h3>
            </div>
            <div class="bund-box-venstre" onclick="location.href='#jersey'">
              <h3>Dansk Jersey</h3>
            </div>
            <div class="bund-box-højre" onclick="location.href='#om'">
              <h3>Om Gården</h3>
            </div>
          </div>
        </section>
      </div>
    </section>

    <section id="produkter" class="page">
      <section class="hero-produkter">
        <div class="content">
          <div class="content-all-produkter">
            <h1 class="produkt-hero-header">Produkter</h1>
            <div class="linje"></div>
            <p class="produkt-hero-p">
              Dansk jersey-kød af den fineste kvalitet
            </p>
          </div>
        </div>
      </section>
      <div id="nyhed_container"></div>
      <div class="center-content">
        <div class="product-content">
          <div class="desktop-nav">
            <div class="nav-container">
              <ul>
                <li class="boffer bofferSteaks">
                  <a href="#bofferSteaks">Bøffer/Steaks</a>
                </li>
                <li class="boffer stege"><a href="#stege">Hele stege</a></li>
                <li class="boffer hakket">
                  <a href="#hakket">Hakket oksekød</a>
                </li>
                <li class="boffer spegepolse">
                  <a href="#spegepolse">Spegepølse</a>
                </li>
                <li class="boffer is">
                  <a href="#is">Is</a>
                </li>
                <!-- <li class="boffer vin"><a href="#vin">Vin</a></li> -->
              </ul>
            </div>
          </div>

          <div class="mobile-produkt-nav">
            <h2>Kategorier</h2>
            <div class="mobile-nav-container">
              <ul>
                <li class="boffer bofferSteaks">
                  <a href="#all-bofferSteaks">Bøffer/Steaks</a>
                </li>
                <li class="boffer stege"><a href="#stege">Hele stege</a></li>
                <li class="boffer hakket">
                  <a href="#hakket">Hakket oksekød</a>
                </li>
                <li class="boffer spegepolse">
                  <a href="#spegepolse">Spegepølse</a>
                </li>
                <li class="boffer is"><a href="#is">Is</a></li>
              </ul>
            </div>
          </div>

          <div class="produkter">
            <div id="nyheder"></div>
            <section class="kategori boffer" id="bofferSteaks">
              <div id="piece" class="piece">
                <h1>Bøffer/Steaks</h1>
              </div>
              <div id="all-bofferSteaks"></div>
            </section>

            <section class="kategori stege" id="stege">
              <div class="piece">
                <h1>Hele stege</h1>
              </div>
              <div id="all-stege"></div>
            </section>

            <section class="kategori stege" id="hakket">
              <div class="piece">
                <h1>Hakket oksekød</h1>
              </div>
              <div id="all-hakket"></div>
            </section>

            <section class="kategori stege" id="spegepolse">
              <div class="piece">
                <h1>Spegepølse</h1>
              </div>
              <div id="all-spegepolse"></div>
            </section>

            <section class="kategori is" id="is">
              <div class="piece">
                <h1>Is</h1>
              </div>
              <div id="all-is"></div>
            </section>

            <!--
            <section class="kategori stege" id="vin">
              <div class="piece">
                <h1>Vin</h1>
              </div>
              <div id="all-vin"></div>
            </section> -->
          </div>
        </div>
      </div>
      <button id="tilTopBtn" title="Tag brugeren til toppen">
        <i class="fas fa-arrow-up"></i>
      </button>
    </section>

    <section id="specific-product" class="page">
      <div id="chosen-product"></div>
    </section>

    <section id="jersey" class="page">
      <div id="hero-jersey">
        <h1>Dansk Jersey</h1>
        <div class="linje"></div>
      </div>
      <div class="wrapper">
        <section class="about-us grid-container jersey_ko_om">
          <article class="about-us-text about_gaarden">
            <h2>Kvalitetskvæg</h2>
            <p>
              Jerseykoen er en smule udskilt på grund af dens størrelse. Men
              trods af det er den yderst effektiv til at producere mælk. Mælken
              er meget koncentreret i forhold til de andre store racer, som Rød
              dansk malkerace og Dansk holstein. Vores køer levere mælk med 6,2%
              fedt og 4,3% protein.<br /><br />
              Udover dens evne til at producerer mælk har Jerseykoen og en evne
              til at levere en fantastisk kvalitet kød. Jerseykød er kendt for
              deres kraftfulde smag, og flotte fedtmarmorering.
            </p>
          </article>
          <div class="img_box cowlife_box"></div>
        </section>
      </div>
      <section id="imagemapping-sektion">
        <h1>Udforsk dele af Jersey koen</h1>
        <p class="imagemapping_headertekst">
          Klik på de forskellige udskæringerne for at lære mere!
        </p>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1000 663"
          class="jersey_udforsk_ko"
        >
          <image width="1000" height="663" xlink:href="img/cuts.png"></image>
          <rect
            id="neck"
            x="148"
            y="58"
            fill="#fff"
            opacity="0"
            width="111"
            height="284"
          ></rect>
          <rect
            id="chuck"
            x="261"
            y="60"
            fill="#fff"
            opacity="0"
            width="206"
            height="291"
          ></rect>
          <rect
            id="brisket"
            x="223"
            y="340"
            fill="#fff"
            opacity="0"
            width="271"
            height="100"
          ></rect>
          <rect
            id="rib"
            x="464"
            y="70"
            fill="#fff"
            opacity="0"
            width="137"
            height="223"
          ></rect>
          <rect
            id="plate"
            x="499"
            y="294"
            fill="#fff"
            opacity="0"
            width="151"
            height="145"
          ></rect>
          <rect
            id="shortloin"
            x="602"
            y="67"
            fill="#fff"
            opacity="0"
            width="95"
            height="225"
          ></rect>
          <rect
            id="flank"
            x="654"
            y="317"
            fill="#fff"
            opacity="0"
            width="177"
            height="125"
          ></rect>
          <rect
            id="top-sirloin"
            x="697"
            y="49"
            fill="#fff"
            opacity="0"
            width="100"
            height="132"
          ></rect>
          <rect
            id="bottom-sirloin"
            x="702"
            y="182"
            fill="#fff"
            opacity="0"
            width="100"
            height="134"
          ></rect>
          <rect
            id="round"
            x="802"
            y="36"
            fill="#fff"
            opacity="0"
            width="137"
            height="281"
          ></rect>
        </svg>
        <div id="cut-beskrivelse">
          <div id="image-beskrivelse"></div>
          <div class="image-products" id="chuck-product"></div>
          <div class="image-products" id="brisket-product"></div>
          <div class="image-products" id="plate-product"></div>
          <div class="image-products" id="rib-product"></div>
          <div class="image-products" id="flank-product"></div>
          <div class="image-products" id="topsirloin-product"></div>
          <div class="image-products" id="round-product"></div>
        </div>
      </section>
    </section>
    <section id="om" class="page">
      <div class="about-video-hero-container">
        <video
          class="hero_video"
          playsinline
          autoplay
          muted
          loop
          id="bgvideo"
          poster="img/videoposter.jpg"
        >
          <source src="img/om-hero.mp4" />
        </video>
      </div>
      <section class="hero-about">
        <div class="content">
          <div class="about-content-hero">
            <h1>Lundsbjerggaard</h1>
            <div class="linje"></div>
            <h4 class="about-us-subheader">
              Familieejet gård gennem tre generationer
            </h4>
          </div>
        </div>
      </section>
      <div class="wrapper">
        <div class="familieejet-h2 margin-top">
          <h2>Familieejet landbrug</h2>
          <div class="linje margin-bottom"></div>
          <p></p>
        </div>
        <section class="about-us grid-container">
          <article class="about-us-text about_gaarden">
            <h2>Om os</h2>
            <p>
              Lundsbjerggaard er ejet af Mie & Otto W. Pedersen, og består af en
              konventionel mælkeproduktion og planteavlsejendom. <br /><br />
              Gården har været i familiens eje siden 1928, og Otto er 3.
              generation. I mange år har vi på Lundsbjerggaard søgt andre veje
              end den traditionelle produktionsform. Vi vil rigtig gerne tættere
              på forbrugerne, og vise hvad dansk landbrug rent faktisk kan
              præstere. Derfor har vi valgt at opdrætte renracede Jersey tyre,
              som giver en rigtig god kvalitet oksekød.
              <br /><br />
              Den gode kvalitet kommer blandt andet fordi kødet krogmodner i 3
              uger hos vores lokale slagter inden det bliver skåret op og
              pakket. <br /><br />
              I efteråret 2022 tog vi et stort skridt videre og begyndte at
              producere is af vores egen mælk. Isen er italiensk inspireret, og
              sortimentet vil blive udvidet med tiden.
              <br />
              <br />
              Så kig forbi vores gårdbutik og smag forskellen.
            </p>
          </article>
          <div class="img_boxes">
            <div class="img_box gaardejerne_img" src="/img/cheferne.jpg"></div>
            <p>Jesper- og Otto W. Pedersen ved indgangen til gårdbutikken</p>
          </div>
        </section>

        <section class="vores-vaerdier">
          <h2 class="vores-vaerdier-h2">Vores værdier</h2>
          <div class="linje margin-bottom"></div>
          <div class="focuspoints">
            <article class="focuspoint">
              <figure class="focuspoint-icon">
                <i class="fas fa-hands fa-2x" aria-hidden="true"></i>
              </figure>
              <h2 class="focuspoint-top-h2">Ansvarlighed</h2>
              <p class="minus-top">
                På Lundsbjerggaard søger vi altid at opnå de bedste forhold for
                vores dyr. Vi stiler efter at opnå bedre forhold i staldene i
                morgen, end i går. <br /><br />
                Vi ønsker ikke at udvikle et større landbrug i fremtiden, men
                derimod at forblive hvor vi er, og forarbejde og sælge flere af
                vores egne produkter direkte til forbruger i nærområdet og
                dermed skabe mere værdi og flere arbejdspladser på gården.
              </p>
            </article>

            <article class="focuspoint">
              <figure class="focuspoint-icon">
                <i class="fas fa-handshake fa-2x" aria-hidden="true"></i>
              </figure>
              <h2 class="focuspoint-top-h2">Bæredygtigt landbrug</h2>
              <p class="minus-top web-design-p">
                Alt gylle og dybstrøelsesmøg bliver kørt til Nature Energys
                biogasanlæg ved Bogense, hvor det hele bliver brugt til at
                udvinde biogas til det danske gasnet. <br /><br />
                På Lundsbjerggaard levere vi størstedelen af mælken til et lille
                mejeri der hedder Sømælk, som videredistribuerer mælken til
                mindre mejerier i Danmark. Mælken er NON GM certificeret - det
                vil sige at vi ikke fodre vores dyr, med genmodificerede
                foderstoffer fra den anden side af jordkloden.
              </p>
            </article>

            <article class="focuspoint">
              <figure class="focuspoint-icon">
                <i class="fas fa-map-marked-alt fa-2x" aria-hidden="true"></i>
              </figure>
              <h2 class="focuspoint-top-h2">Det lokale</h2>
              <p class="minus-top">
                Alle vores produkter bliver opdrættet eller produceret på
                Lundsbjerggaard og solgt i vores egen gårdbutik.<br /><br />
                Vores produkter bliver også solgt i lokale forretninger, eller
                serveres på lokale restauranter og spisesteder.<br /><br />Når
                dyrene skal slagtes, bliver de kun transporteret 15 km til
                Skallebølle slagtehus, ved Vissenbjerg, hvor det også bliver
                pakket.
              </p>
            </article>
          </div>
        </section>

        <section class="about-us grid-container">
          <div class="img_box visitnordfyn_img"></div>
          <article class="about-us-text about_visitnordfyn">
            <h2>VisitNordfyn skriver</h2>
            <figure>
              <blockquote
                cite="https://www.visitnordfyn.dk/nordfyn/explore/lundsbjerggaard-gaardbutik-gdk1119100"
              >
                <p>
                  Lundsbjerggard sælger lækkert kød fra jerseykalve. Du kan købe
                  mange forskellige udskæringer lige fra grillkød til osso buco,
                  gammeldags oksesteg, steaks og altid hakket oksekød. Det
                  varierer fra uge til uge, om der er fersk eller frosset kød,
                  og hvilke specifikke udskæringer man kan købe. I kan også købe
                  god vin i gårdbutikken, så I har noget der passer til
                  kødet.<br /><br />

                  Kalvene opdrættes lokalt, og de får lokalt produceret
                  grovfoder uden tilsætningsstoffer. Der er kort vej til
                  slagteren og kort vej tilbage til gårdbutikken, så der er ikke
                  lang transport. Dyrene har det godt i stalden, hvor der er
                  store båse til dem, hvor de kan gå frit.<br /><br />

                  Kalvene er tyrekalve, der ikke kan bruges i mælkeproduktionen
                  på gården.
                </p>
              </blockquote>
              <br />
              <figcaption>
                -
                <cite
                  ><a
                    href="https://www.visitnordfyn.dk/nordfyn/explore/lundsbjerggaard-gaardbutik-gdk1119100"
                    target="_blank"
                    >VisitNordfyn</a
                  ></cite
                >, 2021
              </figcaption>
            </figure>
          </article>
        </section>

        <h2 class="h2_facebook">
          Følg os på facebook og få de seneste nyheder
        </h2>
        <div class="linje margin-bottom"></div>
        <div
          class="fb-page"
          data-href="https://www.facebook.com/Lundsbjerggaard"
          data-tabs="timeline"
          data-height=""
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote
            cite="https://www.facebook.com/Lundsbjerggaard"
            class="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/Lundsbjerggaard"
              >Lundsbjerggaard</a
            >
          </blockquote>
        </div>
        <iframe
          class="googlemaps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19722.630626049813!2d10.172300717409529!3d55.48503554342718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ce63930a6d4c9%3A0x3c2b225579a9df4a!2sStormarken%2047%2C%205471%20S%C3%B8nders%C3%B8!5e0!3m2!1sen!2sdk!4v1639138691088!5m2!1sen!2sdk"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
    <footer>
      <div class="left-footer">
        <div class="address">
          <h2>Lundsbjerggaard</h2>
          <p>Stormarken 47 <br />5471 Søndersø</p>
        </div>
        <div class="contact-info">
          <p>
            +45 25 11 90 94<br /><a href="mailto:lundsbjerggaard@outlook.dk"
              >lundsbjerggaard@outlook.dk</a
            >
          </p>
        </div>
      </div>
      <div class="middle-footer">
        <h2>Åbningstider</h2>

        <p>Torsdag: kl. 15-18</p>
        <p>Fredag: kl. 10-14</p>
        <p>Lørdag: kl. 10-14</p>
        <p>Eller efter aftale</p>
      </div>
      <div class="right-footer">
        <div class="find-us">
          <h2>Følg os</h2>
          <a href="https://www.facebook.com/Lundsbjerggaard" target="_blank">
            <i class="fab fa-facebook fa-2x"></i
          ></a>
        </div>
        <div class="smiley">
          <h2>Kontrolrapport</h2>
          <a href="http://www.findsmiley.dk/923078" target="_blank"
            ><img
              src="./img/banner_gul.gif"
              alt="Billedelink til Kontrolrapport"
          /></a>
        </div>
      </div>
    </footer>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
      integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <script src="js/main.js" type="module"></script>
    <script src="js/spa.js"></script>
  </body>
</html>
