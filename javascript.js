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
        "Choklad Donut",
        20,
        8,
        "gluten",
        "images/small/blabarsmunk_liten.jpg"
    ), new Donut
        (
            "Blåbär Donut",
            22,
            6,
            "bär",
            "images/small/chokladmunk_liten.jpg"
        ), new Donut
        (
            "Jordgubbs Donut",
            25,
            9,
            "bär",
            "images/small/dubbelchoklad_liten.jpg"
        ), new Donut
        (
            "Vanilj Donut",
            15,
            7,
            "gluten",
            "images/small/glasymunk2_liten.jpg"
        ), new Donut
        (
            "Jordgubb & Vanilj Donut",
            30,
            5,
            "gluten bär",
            "images/small/sockermunk2_liten.jpg"
        ), new Donut
        (
            "placeholder donut 6",
            32,
            4,
            "placeholder aspect",
            "images/small/strosselmunk_liten.jpg"
        ), new Donut
        (
            "placeholder donut 7",
            32,
            4,
            "placeholder aspect",
            "images/small/syltmunk_liten.jpg"
        ), new Donut
        (
            "placeholder donut 8",
            32,
            6,
            "placeholder aspect",
            "images/small/toppingmunk_liten.jpg"
        ), new Donut
        (
            "placeholder donut 9",
            32,
            6,
            "placeholder aspect 19",
            "images/small/vaniljmunk_liten.jpg"
        ), new Donut
        (
            "placeholder donut 10",
            32,
            6,
            "placeholder aspect 10",
            "images/small/violmunk2_liten.jpg"
        )
    ];
const donutPlacement = document.querySelectorAll(".donuts");
let plusbtn = document.querySelectorAll('button[data-operator="plus"]');
let minusbtn = document.querySelectorAll('button[data-operator="minus"]');
for (let i = 0; i < plusbtn.length; i++) {
    plusbtn[i].addEventListener('click', countUp);
    minusbtn[i].addEventListener('click', countDown);
}
/* fungerar ej att lägga in denna i donutMarkup ännu 
<figure>
       <img src="${donuts[i].picSrc}" alt="${donuts[i].name}>
       <figcaption>${donuts[i].review}/10</figcaption>
   </figure>
*/ // Ska kolla med Jenni hur man löser det

// Funktion lista nedan

function displayDonut1() {
    for (let i = 0; i < donuts.length; i++) { // Denna skriver ut alla våra donuts
        let donutNr = "nr" + i;
        const donutMarkup = `
            <div class="${donutNr} donuts">
             <img src="${donuts[i].picSrc}" width="130px" height="130">
            <h4>${donuts[i].name}</h4>
            <ul>
              <li>${donuts[i].price}kr</li>
              <li>Innerhåller: ${donuts[i].aspect}</li>
            </ul>
        </div>
   `;
        donutPlacement[i].outerHTML = donutMarkup;
    }
}

function displayDonutCart() {
    const selectedOrderplacment = document.querySelectorAll(".selectedOrder")
    for (let i = 0; i < donuts.length; i++) {
        let donutNr = "nr" + i;
        const cartOrderMarkup = `
            <div class="${donutNr} donuts">
            <img src="${donuts[i].picSrc}" width="150px" height="150">
            <h4>${donuts[i].name}</h4>
            <ul>
               <li>${donuts[i].price}kr</li>
               <li>Antal: ${donuts[i].selectCounter}</li>
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
    let = totalAmount = 0;
    orderListAmount = 0;
    for (let i = 0; i < donuts.length; i++) {
        if (donuts[i].selectCounter > 0) {
            let = combinedAmount = 0;
            combinedAmount = donuts[i].price * donuts[i].selectCounter;
            totalAmount = totalAmount + combinedAmount;
            orderListAmount++;
        }
    }
    totalAmountPlacement.innerHTML = totalAmount + "kr";
}
// ----------------------------

displayDonut1();


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
    for (let i = 0; i < donuts.length; i++) {
        console.log("test");
        shopCartBtnUp[i].addEventListener('click', countUpCart);
        shopCartBtnDown[i].addEventListener('click', countDown);
    }
    function countUpCart(e) { // funkar bara en gång
        const controll= e.currentTarget.parentElement.parentElement.attributes.class;
        const updateCounter = document.querySelectorAll(".selectcounter");
        console.log(controll.value);
        for (let i = 0; i < donuts.length; i++) {
            if (controll.value == 'nr' + i + ' donuts') {
                donuts[i].selectCounter++;
                console.log(donuts[i].selectCounter);
                displayDonutCart();
            }
        }
        
        console.log('displayed');
    }

    // Nedan ej klar
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
}