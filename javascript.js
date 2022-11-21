const menuButton = document.getElementsByClassName('toggle_menu')[0];
const menuLinks = document.getElementsByClassName('menu_links')[0];

let menuOpen = false; //Menyn är stängd som default

menuButton.addEventListener('click', () => {
    menuOpen = !menuOpen; //Gör att menyn får värdet true
    if (!menuOpen) {
        menuButton.blur();// Tar bort fokus från knappen
    }
    if (menuOpen) {
        menuButton.classList.add('active');
        menuLinks.classList.add('active');
    } else {
        menuButton.classList.remove('active');
        menuLinks.classList.remove('active');
    }
    menuButton.setAttribute('aria-expanded', true);
})

//Tar bort active när man klickar på en av länkarna. Gäller alla länkar
document.querySelectorAll('.list_item').forEach(link => link.
    addEventListener('click', () => { //Be om hjälp för att skriva om detta
        menuOpen = false;
        menuButton.blur();
        if (menuOpen) {
            menuButton.classList.add('active');
            menuLinks.classList.add('active');
        } else {
            menuButton.classList.remove('active');
            menuLinks.classList.remove('active');
        }
    }))


// Shoppingcart page toggle ----
const toggleShoppingCartBtn = document.querySelector(".shopping_cart");
const shoppingCartPage = document.querySelector(".shopping_basket");
const returnToShoppingCartBtn = document.querySelector("#toggle_shopping_cart");
toggleShoppingCartBtn.addEventListener("click", toggleOrderPage);
returnToShoppingCartBtn.addEventListener("click", toggleOrderPage);


// For Donut order page

class Donut {
    constructor(name, price, review, aspect, picSrc) {
        this.name = name;
        this.price = price;
        this.aspect = aspect;
        this.review = review; // 1-10
        this.selectCounter = 0;
        this.picSrc = picSrc;
    }
}
// Alla våra donuts anges nedan i denna array
const donuts =
    [new Donut(
        "Blåbärsmunk",
        20,
        8,
        "bär glasyr",
        ["images/small/blabarsmunk_liten.jpg", "images/small/blabarsmunk2_liten.jpg"]
    ), new Donut
        (
            "Chokladmunk",
            22,
            6,
            "choklad",
            "images/small/chokladmunk_liten.jpg"
        ), new Donut
        (
            "Dubbel chokladmunk",
            25,
            9,
            "choklad",
            "images/small/dubbelchoklad_liten.jpg"
        ), new Donut
        (
            "Glasyrmunk",
            15,
            7,
            "glasyr",
            "images/small/glasymunk2_liten.jpg"
        ), new Donut
        (
            "Sockermunk, glutenfri",
            30,
            5,
            "socker glutenfri",
            "images/small/sockermunk2_liten.jpg"
        ), new Donut
        (
            "Strösselmunk",
            32,
            4,
            "strössel glasyr",
            "images/small/strosselmunk_liten.jpg"
        ), new Donut
        (
            "Syltmunk, glutenfri",
            32,
            4,
            "socker glutenfri",
            "images/small/syltmunk_liten.jpg"
        ), new Donut
        (
            "Toppingmunk",
            32,
            6,
            "strössel glasyr",
            "images/small/toppingmunk_liten.jpg"
        ), new Donut
        (
            "Vaniljmunk",
            32,
            6,
            "vaniljkräm glasyr",
            "images/small/vaniljmunk_liten.jpg"
        ), new Donut
        (
            "Violmunk",
            32,
            6,
            "strössel glasyr",
            "images/small/violmunk2_liten.jpg"
        )
    ];
 

const donutPlacement = document.querySelectorAll(".donuts");
const selectedOrderplacment = document.querySelectorAll(".selectedOrder");
let plusbtn = document.querySelectorAll('button[data-operator="plus"]');
let minusbtn = document.querySelectorAll('button[data-operator="minus"]');
let shopCartBtnUp = '';
let shopCartBtnDown = '';

//bildspelsvariabler
const img1 = document.querySelector('#img1');
let currentImageIndex = 0; 


let img1 = null;

// Funktion lista nedan

function displayDonut1() {
    for (let i = 0; i < donutObjects.length; i++) { // Denna skriver ut alla våra donuts
        let donutNr = "nr" + i;
        const donutMarkup = `
        <div class="${donutNr} donuts">
             <figure>
                <img id="img1" class="img-1" src="" alt="" width="130" height="130">
                <figcaption>${donuts[i].review}/10</figcaption>
             </figure>
            <h4>${donuts[i].name}</h4>
            <ul>
              <li>${donuts[i].price}kr</li>
              <li>Innehåller: ${donuts[i].aspect}</li>
            </ul>
        </div> `;
        donutPlacement[i].outerHTML = donutMarkup;
    }
  img1 = document.querySelector("#img1"); // HTML-elementet existerar först efter att det skapats
  // MEN - man kan bara ha ett ID, det är som ett personnummer. Nu skapas flera img1-bilder.
  // Så, koden behöver vara:
  // <img id="img${i}" ...> för att ID:t ska bli unikt.
  console.log(img1);
}

//funktioner för bildspel
function nextImage (){
    let i = 0;
    if (currentImageIndex + 1 > donuts[0].picSrc[0].length -1) {
        currentImageIndex = 0;
        
      }else {
        currentImageIndex +=1;
        
      }
      img1.setAttribute('src', donuts[0].picSrc[0]); 
    
    }
    nextImage ();
  console.log({ img1 });
  console.log(donuts[0].picSrc[0]);
  // img1.setAttribute('src', donuts[0].picSrc[0]);
nextImage(); // Denna anropas INNAN displayDonut1 har hunnit skapas, varför img1 är null - den finns inte än!

function displayDonutCart() {
    for (let i = 0; i < donuts.length; i++) {
        let donutNr = "nr" + i;
        const cartOrderMarkup = `
            <div class="${donutNr} donuts">
                <img src="${donuts[i].picSrc}" width="150" height="150 loading="lazy">
                <h4>${donuts[i].name}</h4>
                <ul>
                    <li>${donuts[i].price}kr</li>
                    <li>${donuts[i].selectCounter}</li>
                </ul>
                <div class="plus_minusBtn">
                        <button class="btn_cart_plus">+</button>
                        <button class="btn_cart_minus">-</button>
                </div>
            </div>
        `;
        if (donuts[i].selectCounter > 0) {
            selectedOrderplacment[i].innerHTML = cartOrderMarkup;
        }
    }
}
function calcTotalorder() {
    const totalAmountPlacement = document.querySelector(".total_amount");
    let totalAmount = 0;
    for (let i = 0; i < donuts.length; i++) {
        if (donuts[i].selectCounter > 0) {
            let combinedAmount = 0;
            combinedAmount = donuts[i].price * donuts[i].selectCounter;
            totalAmount = totalAmount + combinedAmount;
        }
    }
    totalAmountPlacement.innerHTML = totalAmount + "kr";
}

function countUp(e) {
    const controll = e.currentTarget.parentElement.parentElement.firstElementChild.attributes.class;
    const updateCounter = document.querySelectorAll(".selectcounter");
    for (let i = 0; i < donuts.length; i++) {
        if (controll.value == 'nr' + i + ' donuts') {
            donuts[i].selectCounter++;
            updateCounter[i].innerHTML = donuts[i].selectCounter;
        }
    }
}
function countDown(e) {
    const controll = e.currentTarget.parentElement.parentElement.firstElementChild.attributes.class;
    const updateCounter = document.querySelectorAll(".selectcounter");
    for (let i = 0; i < donuts.length; i++) {
        for (let i = 0; i < donuts.length; i++) {
            if (donuts[i].selectCounter <= 0) {
                return;
            }
            else if (controll.value == 'nr' + i + ' donuts') {
                donuts[i].selectCounter--;
                updateCounter[i].innerHTML = donuts[i].selectCounter;
            }
        }
    }
}

function toggleOrderPage() { // Togglar synligheten på varukorgen + placerar ut donuts med mer än 0 i antal + räknar ut totalen
    shoppingCartPage.classList.toggle("toggle-hidden");
    displayDonutCart();
    calcTotalorder();
    let shopCartBtnUp = document.querySelectorAll(".btn_cart_plus")
    let shopCartBtnDown = document.querySelectorAll(".btn_cart_minus")
    for (let i = 0; i < shopCartBtnUp.length; i++) {
        shopCartBtnUp[i].addEventListener('click', countUpCart);
        shopCartBtnDown[i].addEventListener('click', countDownCart);
    }
}

function countUpCart(e) {
    const controll = e.currentTarget.parentElement.parentElement.attributes.class;
    const currentAmountSelected = e.currentTarget.parentElement.parentElement.children[2].children[1];
    const controlValueNumber = controll.value.replace('nr', '').replace(' donuts', '');
    donuts[controlValueNumber].selectCounter++;
    currentAmountSelected.innerHTML = donuts[controlValueNumber].selectCounter;
    calcTotalorder();
}

function countDownCart(e) {
    const controll = e.currentTarget.parentElement.parentElement.attributes.class;
    const currentAmountSelected = e.currentTarget.parentElement.parentElement.children[2].children[1];
    const controlValueNumber = controll.value.replace('nr', '').replace(' donuts', '');
    if (donuts[controlValueNumber].selectCounter == 1) {
        donuts[controlValueNumber].selectCounter--;
        e.currentTarget.parentElement.parentElement.innerHTML = ''
        return;
    }
    donuts[controlValueNumber].selectCounter--;
    currentAmountSelected.innerHTML = donuts[controlValueNumber].selectCounter;
    calcTotalorder();
}

function clearCart() {

    for (let i = 0; i < donuts.length; i++) {
        donuts[i].selectCounter = 0;
        document.querySelector(".current_donuts_order").children[i].innerHTML = '';
        document.querySelectorAll(".selectcounter")[i].innerHTML = '';

    }
    calcTotalorder();
    
}

// Functioner anges ovan ---------------------------- 

for (let i = 0; i < plusbtn.length; i++) {
    plusbtn[i].addEventListener('click', countUp);
    minusbtn[i].addEventListener('click', countDown);
}
displayDonut1();
document.querySelector("#clearCartBtn").addEventListener('click', clearCart);








nextImage(); // Gör anropet här istället
