const menuButton = document.getElementsByClassName('toggle_menu')[0];
const menuLinks = document.getElementsByClassName('menu_links')[0];

let menuOpen = false; //Menyn är stängd som default

menuButton.addEventListener('click', () =>{
    menuOpen =!menuOpen; //Gör att menyn får värdet true
    if(!menuOpen){
        menuButton.blur();// Tar bort fokus från knappen
    } 
    if(menuOpen){
        menuButton.classList.add('active');
        menuLinks.classList.add('active');
    }else{
        menuButton.classList.remove('active');
        menuLinks.classList.remove('active');
    }
    menuButton.setAttribute('aria-expanded', true);
})

//Tar bort active när man klickar på en av länkarna. Gäller alla länkar
document.querySelectorAll('.list_item').forEach(link => link.
    addEventListener('click', () =>{ //Be om hjälp för att skriva om detta
        menuOpen = false;
        menuButton.blur();
if(menuOpen){
            menuButton.classList.add('active');
            menuLinks.classList.add('active');
        }else{
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
        this.review = review; // 1-10
        this.aspect = aspect;
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
/* fungerar ej att lägga in denna i donutMarkup ännu 
<figure>
       <img src="${donuts[i].picSrc}" alt="${donuts[i].name}>
       <figcaption>${donuts[i].review}/10</figcaption>
   </figure>
*/ // Ska kolla med Jenni hur man löser det

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
const plusbtn = document.querySelectorAll('button[data-operator="plus"]');
const minusbtn = document.querySelectorAll('button[data-operator="minus"]');
for (let i = 0; i < plusbtn.length; i++) {
    plusbtn[i].addEventListener('click', countUp);
    minusbtn[i].addEventListener('click', countDown);
}
function countUp(e) {
    const controll = e.currentTarget.parentElement.parentElement.firstElementChild.attributes.class;
    const updateCounter = document.querySelectorAll(".selectcounter");
    switch (controll.value) {

        case 'nr0 donuts':
            donuts[0].selectCounter++;
            updateCounter[0].innerHTML = donuts[0].selectCounter;
            break;
        case 'nr1 donuts':
            donuts[1].selectCounter++;
            updateCounter[1].innerHTML = donuts[1].selectCounter;
            break;
        case 'nr2 donuts':
            donuts[2].selectCounter++;
            updateCounter[2].innerHTML = donuts[2].selectCounter;
            break;
        case 'nr3 donuts':
            donuts[3].selectCounter++;
            updateCounter[3].innerHTML = donuts[3].selectCounter;
            break;
        case 'nr4 donuts':
            donuts[4].selectCounter++;
            updateCounter[4].innerHTML = donuts[4].selectCounter;
            break;
        case 'nr5 donuts':
            donuts[5].selectCounter++;
            updateCounter[5].innerHTML = donuts[5].selectCounter;
            break;
        case 'nr6 donuts':
            donuts[6].selectCounter++;
            updateCounter[6].innerHTML = donuts[6].selectCounter;
            break;
        case 'nr7 donuts':
            donuts[7].selectCounter++;
            updateCounter[7].innerHTML = donuts[7].selectCounter;
            break;
        case 'nr8 donuts':
            donuts[8].selectCounter++;
            updateCounter[8].innerHTML = donuts[8].selectCounter;
            break;
        case 'nr9 donuts':
            donuts[9].selectCounter++;
            updateCounter[9].innerHTML = donuts[9].selectCounter;
            break;
    }
}

function countDown(e) {
    const controll = e.currentTarget.parentElement.parentElement.firstElementChild.attributes.class;
    const updateCounter = document.querySelectorAll(".selectcounter");
    switch (controll.value) {

        case 'nr0 donuts':
            if (donuts[0].selectCounter <= 0)
                return;
            donuts[0].selectCounter--;
            updateCounter[0].innerHTML = donuts[0].selectCounter;
            break;
        case 'nr1 donuts':
            if (donuts[1].selectCounter <= 0)
                return;
            donuts[1].selectCounter--;
            updateCounter[1].innerHTML = donuts[1].selectCounter;
            break;
        case 'nr2 donuts':
            if (donuts[2].selectCounter <= 0)
                return;
            donuts[2].selectCounter--;
            updateCounter[2].innerHTML = donuts[2].selectCounter;
            break;
        case 'nr3 donuts':
            if (donuts[3].selectCounter <= 0)
                return;
            donuts[3].selectCounter--;
            updateCounter[3].innerHTML = donuts[3].selectCounter;
            break;
        case 'nr4 donuts':
            if (donuts[4].selectCounter <= 0)
                return;
            donuts[4].selectCounter--;
            updateCounter[4].innerHTML = donuts[4].selectCounter;
            break;
        case 'nr5 donuts':
            if (donuts[5].selectCounter <= 0)
                return;
            donuts[5].selectCounter--;
            updateCounter[5].innerHTML = donuts[5].selectCounter;
            break;
        case 'nr6 donuts':
            if (donuts[6].selectCounter <= 0)
                return;
            donuts[6].selectCounter--;
            updateCounter[6].innerHTML = donuts[6].selectCounter;
            break;
        case 'nr7 donuts':
            if (donuts[7].selectCounter <= 0)
                return;
            donuts[7].selectCounter--;
            updateCounter[7].innerHTML = donuts[7].selectCounter;
            break;
        case 'nr8 donuts':
            if (donuts[8].selectCounter <= 0)
                return;
            donuts[8].selectCounter--;
            updateCounter[8].innerHTML = donuts[8].selectCounter;
            break;
        case 'nr9 donuts':
            if (donuts[9].selectCounter <= 0)
                return;
            donuts[9].selectCounter--;
            updateCounter[9].innerHTML = donuts[9].selectCounter;
            break;
    }
}
function toggleOrderPage() { // Togglar synligheten på varukorgen + placerar ut donuts med mer än 0 i antal + räknar ut totalen
    shoppingCartPage.classList.toggle("toggle-hidden");
    const selectedOrderplacment = document.querySelectorAll(".selectedOrder")
    for (let i = 0; i < donuts.length; i++) {
        const cartOrderMarkup = `
            <img src="${donuts[i].picSrc}" width="150px" height="150">
            <h4>${donuts[i].name}</h4>
            <ul>
               <li>${donuts[i].price}kr</li>
               <li>Antal: ${donuts[i].selectCounter}</li>
          </ul>
        `;
        if (donuts[i].selectCounter > 0) {
            selectedOrderplacment[i].innerHTML = cartOrderMarkup;
        }
    }

    const totalAmountPlacement = document.querySelector(".total_amount");
    let = totalAmount = 0; 
    for (let i = 0; i < donuts.length; i++) {
        if (donuts[i].selectCounter > 0) {
            let = combinedAmount = 0;
            combinedAmount = donuts[i].price * donuts[i].selectCounter; 
            totalAmount = totalAmount + combinedAmount;
        }
    }
    totalAmountPlacement.innerHTML = totalAmount + "kr";
}

//Kod för betalningsformulär (Borde kanske vara Let istället för Const?)
const paymentForm = document.querySelector('form');
const firstName = document.getElementById('#first_name');
const lastLame = document.getElementById('#last_name');
const email = document.getElementById('#email');
const adress = document.getElementById('#adress');
const zipcode = document.getElementById('#zipcode');
const postalAdress = document.getElementById('#postalAdress');
//Skippa Portkoden då den inte är obligatorisk
const tel = document.getElementById('#tel');


console.log(paymentForm);

/**
 X HTML struktur för fromulär
 X Variabler för alla input-fält
 Funktion som visar felmeddelanden 
 Funktion som visar ett meddelande när formuläret är korrekt ifyllt (Du har lagt en beställning)
 I funktionen bör if-satser finnas för att avgöra om kriterierna är uppfyllda


 Felmeddelanden när användaren lämnar fältet utan att uppfylla kraven (Eller vid submit?)

 */