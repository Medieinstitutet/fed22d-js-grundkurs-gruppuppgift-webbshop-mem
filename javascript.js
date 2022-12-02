/**************************************************************
 *                       GLOBALA VARIBALER
 **************************************************************/
// Variabler för meny
const menuButton = document.getElementsByClassName('toggle_menu')[0];
const menuLinks = document.getElementsByClassName('menu_links')[0];
let menuOpen = false; //Menyn är stängd som default

menuButton.addEventListener('click', toggleMenu);

//Stänger menyn
const listItemLinks = document.querySelectorAll('.list_item');
listItemLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Variabler för Shoppingcart page toggle ----
const toggleShoppingCartBtn = document.querySelector('.shopping_cart');
const shoppingCartPage = document.querySelector('.shopping_basket');
const returnToShoppingCartBtn = document.querySelector('#toggle_shopping_cart');
toggleShoppingCartBtn.addEventListener('click', toggleOrderPage);
returnToShoppingCartBtn.addEventListener('click', toggleOrderPage);

//Varibaler för munkar
const donutPlacement = document.querySelectorAll('.donut_article');

//Varibaler för filter
const selectedOrderplacment = document.querySelectorAll('.selectedOrder'); // Dessa hämtar från inom displayDonut1(), och måste därför ligga efter
let bar = false;
let glasyr = false;
let choklad = false; // Alla alternativ till filter funktionen
let socker = false;
let strossel = false;
let open = false;

document.querySelector('#clearCartBtn').addEventListener('click', clearCart);
const sortSelect = document.querySelector('#sorting');
sortSelect.addEventListener('input', onSortSelect);
document
  .querySelector('#mainFilterBtn')
  .addEventListener('click', toggleFilterOptions);
const filterButtons = document.querySelector('.filterOptions').children;
for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener('click', toggleFilter);
}

//Variabler för varukorgen
let totalAmount = 0;
const totalAmountPlacement = document.querySelector('.total_amount');

//Variabler för betalningsformulär
const cardPaymentForm = document.querySelector('#cardPaymentForm');
const orderBtn = document.querySelector('#orderButton');
const cardNumber = document.querySelector('#cardnr');
const cardMonth = document.querySelector('#date');
const cardYear = document.querySelector('#year');
const cvc = document.querySelector('#cvc');

const lowestMonth = 0;
const highestMonth = 12;
const lowestYear = 2021;
const highestYear = 2030;
let controlForm = 0;

const cardOptionBtn = document.querySelector('#cardPaymentBtn');
const invoiceOptionBtn = document.querySelector('#invoicePaymentBtn');
cardOptionBtn.addEventListener('click', pickPaymentOption);
invoiceOptionBtn.addEventListener('click', pickPaymentOption);

let controlCardForm = 0;
let invoiceForm = 0;


//Återanvändbara datumvariabler
const date = new Date();
console.log(date)
const friday = date.getDay() === 5;
const monday = date.getDay() === 1;
const time = date.getHours();
/******************************************************************
 *                      FUNKTIONER
 *******************************************************************/
//Funktioner för menyn---------------------------------------------

function toggleMenu() {
  menuOpen = !menuOpen; //Gör att menyn får värdet true
  if (!menuOpen) {
    menuButton.blur(); // Tar bort fokus från knappen
  }
  if (menuOpen) {
    menuButton.classList.add('active');
    menuLinks.classList.add('active');
  } else {
    menuButton.classList.remove('active');
    menuLinks.classList.remove('active');
  }
  menuButton.setAttribute('aria-expanded', true);
}

function closeMenu() {
  menuOpen = false;
  menuButton.blur();
  menuButton.classList.remove('active');
  menuButton.setAttribute('aria-expanded', false);
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('darkMode');
}

/***********************************************************
 *                  Funktioner för orderpage
 ************************************************************/
// Template till våra donuts ---------------------------------
class Donut {
  constructor(name, price, review, aspect, picSrc) {
    this.name = name;
    this.price = price;
    this.review = review; // 1-10
    this.aspect = aspect;
    this.selectCounter = 0;
    this.picSrc = picSrc;
    this.calcHasHappend = false;
  }
}
// Donuts-array ---------------------------------------------
const donuts = [
  new Donut('Blåbärsmunk', 20, 8, 'Bär, Glasyr', [
    'images/small/blabarsmunk_liten.jpg',
    'images/small/blabarsmunk2_liten.jpg',
  ]),
  new Donut('Chokladmunk', 22, 6, 'Choklad', [
    'images/small/chokladmunk_liten.jpg',
    'images/small/chokladmunk2_liten.jpg',
  ]),
  new Donut('Dubbel chokladmunk', 25, 9, 'Choklad', [
    'images/small/dubbelchoklad_liten.jpg',
    'images/small/dubbelchoklad2_liten.jpg',
  ]),
  new Donut('Glasyrmunk', 15, 7, 'Glasyr', [
    'images/small/glasyrmunk_liten.jpg',
    'images/small/glasyrmunk2_liten.jpg',
  ]),
  new Donut('Sockermunk, glutenfri', 30, 5, 'Socker, Glutenfri', [
    'images/small/sockermunk_liten.jpg',
    'images/small/sockermunk2_liten.jpg',
  ]),
  new Donut('Strösselmunk', 32, 4, 'Strössel, Glasyr', [
    'images/small/strosselmunk_liten.jpg',
    'images/small/strosselmunk2_liten.jpg',
  ]),
  new Donut('Syltmunk, glutenfri', 32, 4, 'Socker, Glutenfri', [
    'images/small/syltmunk_liten.jpg',
    'images/small/syltmunk2_liten.jpg',
  ]),
  new Donut('Toppingmunk', 32, 6, 'Strössel, Glasyr', [
    'images/small/toppingmunk_liten.jpg',
    'images/small/toppingmunk2_liten.jpg',
  ]),
  new Donut('Vaniljmunk', 32, 6, 'Vaniljkräm, Glasyr', [
    'images/small/vaniljmunk_liten.jpg',
    'images/small/vaniljmunk2_liten.jpg',
  ]),
  new Donut('Violmunk', 32, 6, 'Strössel, Glasyr', [
    'images/small/violmunk_liten.jpg',
    'images/small/violmunk2_liten.jpg',
  ]),
];

// Funktion för att skriva ut alla våra munkar till sidan ----------------
function displayDonut1() {
  for (let i = 0; i < donuts.length; i++) {
    let donutNr = 'nr' + i;
    const donutMarkup = `
        <div class="${donutNr} donuts">
             <figure id="img-slide" >
                <button id="prev-${i}" class='prev'> &#10094; </button>
                <img id="img-${i}" src="${donuts[i].picSrc[0]}" alt="" width="130" height="130">
                <button id="next-${i}" class='next'> &#10095; </button>
                <figcaption>${donuts[i].review}/10</figcaption>
             </figure>
            <h4>${donuts[i].name}</h4>
            <ul>
              <li class="price">${donuts[i].price}kr</li>
              <li>Innehåller: ${donuts[i].aspect}</li>
            </ul>
            <div class="counterAndBtns">
              <div class="selectcounter">${donuts[i].selectCounter}</div>
              <div class="plus_minusBtn">
                <button data-operator="plus">+</button>
                <button data-operator="minus">-</button>
              </div>
            </div>
           </div> `;
    donutPlacement[i].innerHTML = donutMarkup;
  }

  // Variabler till bildspel
  const nextBtns = document.querySelectorAll('.next');
  nextBtns.forEach((btn) => {
    btn.addEventListener('click', nextImage);
  });
  const prevBtns = document.querySelectorAll('.prev');
  prevBtns.forEach((btn) => {
    btn.addEventListener('click', prevImage);
  });
  resetCounterBtns();
}

// Funktion för plus & minusknappar -------------------------------
function resetCounterBtns() {
  let plusbtn = '';
  let minusbtn = '';
  plusbtn = document.querySelectorAll('button[data-operator="plus"]');
  minusbtn = document.querySelectorAll('button[data-operator="minus"]');
  for (let i = 0; i < plusbtn.length; i++) {
    plusbtn[i].addEventListener('click', countUp);
    minusbtn[i].addEventListener('click', countDown);
  }
}

//Funktion för prisökning fredag 15.00 - måndag 03.00 ------
function fridayIncrease() {
  if ((friday && time <= 15) || (monday && time >= 3)) {
    for (let i = 0; i < donuts.length; i++) {
      donuts[i].price = Math.floor(donuts[i].price * 1.15);
    }
  }
}
fridayIncrease();

//Funktioner för bildspel -------------------------------------
function nextImage(btn) {
  const donutIndex = btn.currentTarget.id.replace('next-', '');
  const imageArray = donuts[donutIndex].picSrc;
  const currentImage = document.querySelector(`#img-${donutIndex}`);
  const currentImageSrc = document
    .querySelector(`#img-${donutIndex}`)
    .getAttribute('src');

  //Byter bild beroende på bildens placering i arrayen
  if (currentImageSrc === imageArray[0]) {
    currentImage.setAttribute('src', imageArray[1]);
  } else {
    currentImage.setAttribute('src', imageArray[0]);
  }
}

function prevImage(btn) {
  const donutIndex = btn.currentTarget.id.replace('prev-', '');
  const imageArray = donuts[donutIndex].picSrc;
  const currentImage = document.querySelector(`#img-${donutIndex}`);
  const currentImageSrc = document
    .querySelector(`#img-${donutIndex}`)
    .getAttribute('src');

  if (currentImageSrc === imageArray[0]) {
    currentImage.setAttribute('src', imageArray[1]);
  } else {
    currentImage.setAttribute('src', imageArray[0]);
  }
}

/****************************************************************************
 *                  Funktioner för shopping-basket
 ***************************************************************************/
// Funktion för att skriva ut munkar till varukorg ---------------------
function displayDonutCart() {
  for (let i = 0; i < donuts.length; i++) {
    selectedOrderplacment[i].innerHTML = '';
    let donutNr = 'nr' + i;
    const cartOrderMarkup = `
            <div class="${donutNr} donuts">
                <img src="${donuts[i].picSrc[0]}" width="150" height="150 loading="lazy">
                <h4>${donuts[i].name}</h4>
                <ul>
                    <li>${donuts[i].price} kr</li>
                    <li>${donuts[i].selectCounter} st</li>
                </ul>
                <div class="cart_plus_minusBtn">
                        <button class="btn_cart_plus">+</button>
                        <button class="btn_cart_minus">-</button>
                </div>
            </div>
        `;

    if (donuts[i].selectCounter > 0) {
      selectedOrderplacment[i].innerHTML = cartOrderMarkup;
    }
  }
  let shopCartBtnUp = document.querySelectorAll('.btn_cart_plus');
  let shopCartBtnDown = document.querySelectorAll('.btn_cart_minus');
  for (let i = 0; i < shopCartBtnUp.length; i++) {
    shopCartBtnUp[i].addEventListener('click', countUpCart);
    shopCartBtnDown[i].addEventListener('click', countDownCart);
  }
}

// Funktion för uträkning av totalpris ------------------------------------
function calcTotalorder() {
  totalAmount = 0;
  let totalDonutAmount = 0;
  const fraktSelector = document.querySelector('.shipping_amount');
  for (let i = 0; i < donuts.length; i++) {
    // Kollar om mer än 10 av samma sort valts och ändrar priset därefter. Ändar tillbaka utifall de är mindre än 10.
    if (!donuts[i].calcHasHappend && donuts[i].selectCounter === 10) {
      donuts[i].calcHasHappend = true; // Säkerställer att de inte händer mer än en gång
      donuts[i].price *= 0.9;
      console.log(donuts[i].price);
      displayDonutCart();
    } else if (donuts[i].calcHasHappend && donuts[i].selectCounter < 10) {
      donuts[i].calcHasHappend = false;
      donuts[i].price /= 0.9;
      displayDonutCart();
    }
  }
  for (let i = 0; i < donuts.length; i++) {
    // Räknar ut totalen
    if (donuts[i].selectCounter > 0) {
      let combinedAmount = 0;
      combinedAmount = donuts[i].price * donuts[i].selectCounter;
      totalAmount += combinedAmount;
    }
    // Sköter frakt uträkningen
    totalDonutAmount += donuts[i].selectCounter;
  }
  if (totalDonutAmount > 15) {
    fraktSelector.innerHTML = 'GRATIS';
  } else {
    fraktSelector.innerHTML = '25kr';
    totalAmount += 25;
  }
  totalAmountPlacement.innerHTML = Math.floor(totalAmount) + 'kr';

  if (totalDonutAmount > 0)
    // Stänger av betala knappen om beställningen är tom

    document.querySelector('#paymentButton').disabled = false;
  else document.querySelector('#paymentButton').disabled = true;

  mondayDiscount();
  tuesdayDiscount();
}

//Funktion för måndagsrabatt -----------------------------------------------
function mondayDiscount() {
  if (monday) {
    totalAmountPlacement.innerHTML = Math.floor(totalAmount * 0.9) + 'kr';
    const discountText = document.querySelector('.discount_alert');
    const mondayDiscountText = 'Måndagsrabatt: 10 % på hela beställningen';
    discountText.innerHTML = 'Tillämpad rabatt: ' + mondayDiscountText;
  }
}
//Funktion för tisdagsrabatt --------------------------------------------
function tuesdayDiscount() {
  const tuesday = date.getDay() === 2;
  startDate = new Date(date.getFullYear(), 0, 1);
  let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  let weekNumber = Math.ceil(days / 7);
  console.log(weekNumber)

  if (
    (weekNumber % 2 == 0) && (tuesday && totalAmount > 25)) {
    console.log('japp')
    totalAmountPlacement.innerHTML = Math.floor(totalAmount * 0.75) + ' kr';
    const discountText = document.querySelector('.discount_alert');
    const tuesdayDiscountText = 'Tisdagsrabatt: 25 % på hela beställningen';
    discountText.innerHTML = 'Tillämpad rabatt: ' + tuesdayDiscountText;
  }
}
tuesdayDiscount();

// Funktion för inmatad rabattkod -----------------------------------
function inputDiscount() {
  const discountInput = document.querySelector('.discount_text');
  const discountButton = document.querySelector('.discount_button').addEventListener('click', inputDiscount);

  if (discountInput.value === 'a_damn_fine-cup_of-coffee') {
    console.log('japp');
    setSuccessFor(discountInput)
    totalAmountPlacement.innerHTML = totalAmount - totalAmount + ' kr';
    const discountText = document.querySelector('.discount_alert');
    const inputDiscountText =
      'Grattis! Vi älskar kaffe lika mycket som du gör och bjuder på din beställning.';
    discountText.innerHTML = inputDiscountText;
    discountInput.value = '';
  }else if(discountInput.value > 0 && discountInput.value != 'a_damn_fine-cup_of-coffee'){
    setErrorFor(discountInput, 'Du har inte angivit en giltig rabattkod');
  }
}
inputDiscount();

// Funktion för att lägga till gratis munk på Lucia -----------
function addLuciaDonut() {
  const lucia = date.getDate() === 13;
  const december = date.getMonth() === 11;
  const luciaMunk = {
    name: 'Luciamunk',
    price: 0,
    image: 'images/small/luciamunk.jpg',
  };
  const luciaPlacement = document.querySelector('.luciaOrder');
  const luciaDonutMarkup = `
        <img src=${luciaMunk.image} width="150" height="150 loading=" lazy">
          <h4>${luciaMunk.name}</h4 >
                <ul>
                    <li>${luciaMunk.price} kr</li>
                </ul>
            </div >
`;
  if (lucia && december) {
    console.log('japp');
    luciaPlacement.innerHTML = luciaDonutMarkup;
    const discountText = document.querySelector('.discount_alert');
    const luciaDiscountText = 'Gratis munk på Lucia!';
    discountText.innerHTML = 'Tillämpad rabatt: ' + luciaDiscountText;
  }
}
addLuciaDonut();

function countUp(e) {
  const controll =
    e.currentTarget.parentElement.parentElement.parentElement.attributes.class;
  const currentAmountSelected =
    e.currentTarget.parentElement.parentElement.children[0];
  const controlValueNumber = controll.value
    .replace('nr', '')
    .replace(' donuts', '');
  donuts[controlValueNumber].selectCounter++;
  currentAmountSelected.innerHTML = donuts[controlValueNumber].selectCounter;
}

function countDown(e) {
  const controll =
    e.currentTarget.parentElement.parentElement.parentElement.attributes.class;
  const currentAmountSelected =
    e.currentTarget.parentElement.parentElement.children[0];
  const controlValueNumber = controll.value
    .replace('nr', '')
    .replace(' donuts', '');
  if (donuts[controlValueNumber].selectCounter == 0) return;
  donuts[controlValueNumber].selectCounter--;
  currentAmountSelected.innerHTML = donuts[controlValueNumber].selectCounter;
}
// Togglar synligheten på varukorgen + placerar ut donuts med mer än 0 i antal + räknar ut totalen
function toggleOrderPage() {
  shoppingCartPage.classList.toggle('toggle-hidden');
  displayDonutCart();
  calcTotalorder();
  setTimeout(cartTimerClear, 9000000); // rensar efter 15min
  displayDonut1();
  document.querySelector('.order_page').classList.toggle('toggle-hidden');
}

//Funktion för timer i varukorgen -----------------------
function cartTimerClear() {
  clearCart();
  calcTotalorder();
  const timeClearNotice = document.querySelector('#forTimerClear');
  timeClearNotice.innerHTML = 'Du är för långsam...';
  timeClearNotice.classList.toggle('timerClear');
}

function countUpCart(e) {
  const controll = e.currentTarget.parentElement.parentElement.attributes.class;
  const currentAmountSelected =
    e.currentTarget.parentElement.parentElement.children[2].children[1];
  const controlValueNumber = controll.value
    .replace('nr', '')
    .replace(' donuts', '');
  donuts[controlValueNumber].selectCounter++;
  currentAmountSelected.innerHTML = donuts[controlValueNumber].selectCounter;
  calcTotalorder();
}

function countDownCart(e) {
  const controll = e.currentTarget.parentElement.parentElement.attributes.class;
  const currentAmountSelected =
    e.currentTarget.parentElement.parentElement.children[2].children[1];
  const controlValueNumber = controll.value
    .replace('nr', '')
    .replace(' donuts', '');
  if (donuts[controlValueNumber].selectCounter == 1) {
    donuts[controlValueNumber].selectCounter--;
    e.currentTarget.parentElement.parentElement.innerHTML = '';
    calcTotalorder();
    return;
  }
  donuts[controlValueNumber].selectCounter--;
  currentAmountSelected.innerHTML = donuts[controlValueNumber].selectCounter;
  calcTotalorder();
}
//Funktion för att rensa varukorgen ---------------------------
/*
function clearCart() {
  // current_donuts_order och selectcounter har olika "längd" (vet ej varför?)
  // så därför blir det error när båda försöker loopas igenom - därav två separata loopar
  const currentDonutsOrder = document.querySelectorAll('.current_donuts_order');
  if (currentDonutsOrder !== null) {
    currentDonutsOrder.forEach((child) => {
      child.innerHTML = '';
    });
  }

  const selectCounter = document.querySelectorAll('.selectcounter');
  if (selectCounter !== null) {
    selectCounter.forEach((sc) => {
      // forEach = for-loop, men bara "kortare" syntax
      sc.innerHTML = '';
    });
  }

  document.querySelector('.shopping_basket').style.opacity = 0; // TODO
  calcTotalorder();
 */


// Ny clear version igen. 
function clearCart() {
  donuts.forEach((donut) => {
    donut.selectCounter = 0;
  });
  displayDonutCart();
  calcTotalorder();
}


// Sorterings funktion, sorterar när använderan gör ett val i select inputen
function onSortSelect() {
  switch (sortSelect.value) {
    case 'pricefalling':
      donuts.sort((a, b) => b.price - a.price);
      displayDonut1();
      break;
    case 'pricerising':
      donuts.sort((a, b) => a.price - b.price);
      displayDonut1();
      break;
    case 'lettersorting':
      donuts.sort((a, b) => a.name > b.name);
      displayDonut1();
      break;
    case 'reviewsorting':
      donuts.sort((a, b) => b.review - a.review);
      displayDonut1();
      break;
  }
}
// Visar toggle menyn när man trcker på Filter knappen, filterar sedan när man trycker igen och stänger den.
function toggleFilterOptions() {
  document.querySelector('.filterOptions').classList.toggle('toggle-hidden');
  toggleShoppingCartBtn.classList.toggle('toggle-hidden');
  sortSelect.classList.toggle('toggle-hidden');

  if (open) {
    open = false;
    for (let i = 0; i < donuts.length; i++) {
      donutPlacement[i].innerHTML = ''; // Tar bort donutsen som redan visas
      let donutNr = 'nr' + i;
      const donutMarkup = ` 
          <div class="${donutNr} donuts">
          <figure id="img-slide" >
            <button id="prev-${i}" class='prev'> &#10094; </button>
            <img id="img-${i}" src="${donuts[i].picSrc[0]}" alt="" width="130" height="130">
            <button id="next-${i}" class='next'> &#10095; </button>
            <figcaption>${donuts[i].review}/10</figcaption>
          </figure>
        <h4>${donuts[i].name}</h4>
        <ul>
          <li class="price">${donuts[i].price}kr</li>
          <li>Innehåller: ${donuts[i].aspect}</li>
        </ul>
        <div class="counterAndBtns">
          <div class="selectcounter">${donuts[i].selectCounter}</div>
            <div class="plus_minusBtn">
              <button data-operator="plus">+</button>
              <button data-operator="minus">-</button>
            </div>
           </div>
        </div> `; // Denna är grund html till donutsen som skrivs ut
      if (bar) {
        // Dessa if satser skriver ut donutsen som har ett true värde på dess aspekt.
        if (donuts[i].aspect.includes('Bär')) {
          donutPlacement[i].innerHTML = donutMarkup;
        }
      }
      if (glasyr) {
        if (donuts[i].aspect.includes('Glasyr')) {
          donutPlacement[i].innerHTML = donutMarkup;
        }
      }
      if (choklad) {
        if (donuts[i].aspect.includes('Choklad')) {
          donutPlacement[i].innerHTML = donutMarkup;
        }
      }
      if (socker) {
        if (donuts[i].aspect.includes('Socker')) {
          donutPlacement[i].innerHTML = donutMarkup;
        }
      }
      if (strossel) {
        if (donuts[i].aspect.includes('Strössel')) {
          donutPlacement[i].innerHTML = donutMarkup;
        }
      }
    }
    resetCounterBtns();
  }
  open = true; // Så koden triggas ändas när man stänger filter menyn
  if (!bar && !glasyr && !choklad && !socker && !strossel) {
    // Om man inte valt något alternativ så skrivs donutsen ut som vanligt
    displayDonut1();
  }
  // Animationer
  // gsap.from('#filterOptions', {x: 500, duration: 0.3})
  gsap.from('.filterOptions>button', { x: 400, duration: 0.6, stagger: 0.2 });
}
// Denna ändar värdet på de olika alternativen till true när de väljs, lägger även till css klassen highLighted så det syns vilka som är aktiva.
function toggleFilter(e) {
  const selectedFilter = e.currentTarget;
  switch (
    selectedFilter.innerHTML // Kanske kan skrivas om för att minska mängden kod
  ) {
    case 'Bär':
      selectedFilter.classList.toggle('highLighted');
      if (bar) {
        bar = false;
        break;
      }
      bar = true;
      break;
    case 'Glasyr':
      selectedFilter.classList.toggle('highLighted');
      if (glasyr) {
        glasyr = false;
        break;
      }
      glasyr = true;
      break;
    case 'Choklad':
      selectedFilter.classList.toggle('highLighted');
      if (choklad) {
        choklad = false;
        break;
      }
      choklad = true;
      break;
    case 'Socker':
      selectedFilter.classList.toggle('highLighted');
      if (socker) {
        socker = false;
        break;
      }
      socker = true;
      break;
    case 'Strössel':
      selectedFilter.classList.toggle('highLighted');
      if (strossel) {
        strossel = false;
        break;
      }
      strossel = true;
      break;
  }
}
displayDonut1();

//Kod för betalningsformulär
function clearForm() {
  console.log('clearform');
  const formController = document.querySelectorAll('.form_control');
  formController.forEach((div) => {
    const input = div.querySelector('input');
    if (input !== null) {
      input.value = '';
    }
    div.classList.remove('success', 'error');
  });

  document.querySelector('small').classList.add('toggle-hidden');
}

paymentForm.addEventListener('submit', (e) => {
  e.preventDefault(); //Förhindrar att skicka formuläret
  const maxInvoiceSum = 800;

  checkInputs();

  if (controlForm >= 7 && totalAmount >= maxInvoiceSum) {
    document.querySelector('#cardPaymentBtn').classList.remove('toggle-hidden');

    document.querySelector('.errorMsg').classList.remove('toggle-hidden');
  } else if (totalAmount < maxInvoiceSum) {
    document
      .querySelector('#invoicePaymentBtn')
      .classList.remove('toggle-hidden');
    document.querySelector('#cardPaymentBtn').classList.remove('toggle-hidden');
  }
});

function pickPaymentOption(e) {
  if (e.currentTarget.id == 'cardPaymentBtn') {
    document
      .querySelector('#cardPaymentForm')
      .classList.remove('toggle-hidden');

    cardOptionBtn.classList.add('active');
    invoiceOptionBtn.classList.remove('active');

    document
      .querySelector('#invoicePaymentForm')
      .classList.add('toggle-hidden');
  } else if (e.currentTarget.id == 'invoicePaymentBtn') {
    document
      .querySelector('#invoicePaymentForm')
      .classList.remove('toggle-hidden');

    invoiceOptionBtn.classList.add('active');
    cardOptionBtn.classList.remove('active');

    document.querySelector('#cardPaymentForm').classList.add('toggle-hidden');
  }
}
// Funktion för att kolla av formulär ---------------------------
function checkInputs() {
  const paymentForm = document.querySelector('form');
  const firstName = document.querySelector('#first_name');
  const lastName = document.querySelector('#last_name');
  const email = document.querySelector('#email');
  const adress = document.querySelector('#adress');
  const zipcode = document.querySelector('#zipcode');
  const postalAdress = document.querySelector('#postalAdress');
  const doorCode = document.querySelector('#doorcode'); //Ordna så det inte krävs att fylla i portkod
  const tel = document.querySelector('#tel');
  const paymentBtn = document.querySelector('#paymentBtn');

  const firstnameValue = firstName.value.trim(); //Trim tar bort eventuellt whitespace
  const lastnameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const adressValue = adress.value.trim();
  const zipcodeValue = zipcode.value.trim();
  const postalAdressValue = postalAdress.value.trim();
  const doorcodeValue = doorCode.value.trim();
  const telValue = tel.value.trim();

  //Blir väldigt mycket upprepning av kod här, går det att förenkla med en loop trots att jag även vill kolla unika statements för varje input?
  if (firstnameValue === '') {
    setErrorFor(firstName, 'Du måste fylla i fältet.');
  } else if (firstnameValue.length < 3) {
    setErrorFor(firstName, 'Ditt namn måste var längre än 3 bokstäver');
  } else {
    setSuccessFor(firstName);
    controlForm++;
  }

  if (lastnameValue === '') {
    setErrorFor(lastName, 'Du måste fylla i fältet');
  } else if (lastnameValue.length < 5) {
    setErrorFor(lastName, 'Ditt namn måste var längre än 2 bokstäver');
  } else {
    setSuccessFor(lastName);
    controlForm++;
  }

  if (emailValue === '') {
    setErrorFor(email, 'Du måste fylla i fältet');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Du måste ange en giltig E-mail');
  } else {
    setSuccessFor(email);
    controlForm++;
  }

  if (adressValue === '') {
    setErrorFor(adress, 'Du måste fylla i fältet');
  } else if (adressValue.length < 6) {
    setErrorFor(adress, 'Fältet måste vara längre än 6 bokstäver');
  } else {
    setSuccessFor(adress);
    controlForm++;
  }

  if (zipcodeValue === '') {
    setErrorFor(zipcode, 'Du måste fylla i fältet');
  } else if (!isZipcode(zipcodeValue)) {
    setErrorFor(zipcode, 'Du måste ange ett giltigt postnummer');
  } else {
    setSuccessFor(zipcode);
    controlForm++;
  }

  if (postalAdressValue === '') {
    setErrorFor(postalAdress, 'Du måste fylla i fältet');
  } else if (postalAdressValue.length < 6) {
    setErrorFor(postalAdress, 'Fältet måste vara längre än 4 bokstäver');
  } else {
    setSuccessFor(postalAdress);
    controlForm++;
  }

  if (doorcodeValue.length > 0) {
    setErrorFor(doorCode, 'Fältet måste bestå av 4 siffror');
  } else if (doorcodeValue.length > 4) {
    setErrorFor(doorCode, 'Du får inte ange mer än 4 siffror');
  } else if (doorcodeValue.length == 4) {
    setSuccessFor(doorCode);
  }

  if (telValue === '') {
    setErrorFor(tel, 'Du måste fylla i fältet');
  } else if (!isPhoneNumber(telValue)) {
    setErrorFor(tel, 'Du måste ange ett giltigt mobilnummer');
  } else {
    setSuccessFor(tel);
    controlForm++;
  }
}
//Funktioner för rätt & felmeddelanden---------
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  const icon = formControl.querySelector('i');

  icon.classList.remove('toggle-hidden'); //Tar bort klassen toggle-hidden vilket gör ikonen och texten synlig
  small.classList.remove('toggle-hidden');

  small.innerText = message;
  formControl.className = 'form_control error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  const icon = formControl.querySelector('i');

  icon.classList.remove('toggle-hidden');
  small.classList.add('toggle-hidden'); //Döljer texten för felmeddelande
  formControl.className = 'form_control success';
}

function isEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email);
}

function isPhoneNumber(tel) {
  return /^07(0|2|3|6|9)\d{7}$/g.test(tel);
}

function isZipcode(zipcode) {
  return /^[0-9]{3}\s?[0-9]{2}$/g.test(zipcode);
}

//Validering för samt beställningsmeddelanden för kortbetalningsformulär

cardPaymentForm.addEventListener('submit', (e) => {
    const saturday = date.getDay() === 6;
    const sunday = date.getDay() === 0;
  e.preventDefault(); //Förhindrar att skicka formuläret
  checkCardPaymentInputs();

  if ((controlCardForm >= 4) && (friday) && (time >= 11) && (time <=13)){
    clearCart();
    clearForm();
    alert('Tack för din beställning, Vi levererar dina munkar 15.00!');
  }else if(saturday || sunday){
    clearCart();
    clearForm();
    alert('Tack för din beställning, Vi levererar dina munkar om 90 minuter!');
  }else if(time >= 00 && time <= 6){
    clearCart();
    clearForm();
    alert('Tack för din beställning, Vi levererar dina munkar om 45 minuter!');
  }else{
    clearCart();
    clearForm();
    alert('Tack för din beställning, Vi levererar dina munkar om 30 minuter!');
  }
});

function checkCardPaymentInputs() {
  const cardNumberValue = cardNumber.value.trim();
  const cardMonthValue = cardMonth.value.trim();
  const cardYearValue = cardYear.value.trim();
  const cvcValue = cvc.value.trim();

  if (cardNumberValue === '') {
    setErrorFor(cardNumber, 'Du måste fylla i fältet');
  } else if (cardNumberValue.length < 16) {
    setErrorFor(cardNumber, 'Fältet måste bestå av 16 siffror');
  } else if (cardNumberValue.length > 16) {
    setErrorFor(cardNumber, 'Fältet får inte bestå av mer än 16 siffror');
  } else {
    setSuccessFor(cardNumber);
    controlCardForm++;
  }

  if (cardMonthValue === '') {
    setErrorFor(cardMonth, 'Du måste fylla i fältet');
  } else if (cardMonthValue <= lowestMonth) {
    setErrorFor(cardMonth, 'Du måste ange en tal högre än 1');
  } else if (cardMonthValue > highestMonth) {
    setErrorFor(cardMonth, 'Du får inte ange ett tal över 12');
  } else {
    setSuccessFor(cardMonth);
    controlCardForm++;
  }

  if (cardYearValue === '') {
    setErrorFor(cardYear, 'Du måste fylla i fältet');
  } else if (cardYearValue <= lowestYear) {
    setErrorFor(cardYear, 'Du måste ange ett högre tal än 2021');
  } else if (cardYearValue >= highestYear) {
    setErrorFor(cardYear, 'Du får inte ange ett högre årtal än 2030');
  } else {
    setSuccessFor(cardYear);
    controlCardForm++;
  }

  if (cvcValue === '') {
    setErrorFor(cvc, 'Du måste fylla i fältet');
  } else if (cvcValue.length < 3) {
    setErrorFor(cvc, 'Du måste ange 3 siffror');
  } else if (cvcValue.length > 3) {
    setErrorFor(cvc, 'Du får inte ange mer än 3 siffror');
  } else {
    setSuccessFor(cvc);
    controlCardForm++;
  }
}

//Validering samt beställningsmeddelanden för fakturaformulär
invoicePaymentForm.addEventListener('submit', (e) => {
    const saturday = date.getDay() === 6;
    const sunday = date.getDay() === 0;
  e.preventDefault(); //Förhindrar att skicka formuläret
  checkInvoicePaymentInputs();

  if ((controlCardForm >= 1) && (friday) && (time >= 11) && (time <=13)){
    clearCart();
    clearForm();
    alert('Tack för din beställning, Vi levererar dina munkar 15.00!');
  }else if(saturday || sunday){
    clearCart();
    clearForm();
    alert('Tack för din beställning, Vi levererar dina munkar om 90 minuter!');
  }else if(time >= 00 && time <= 6){
    clearCart();
    clearForm();
    alert('Tack för din beställning, Vi levererar dina munkar om 45 minuter!');
  }else{
    clearCart();
    clearForm();
    alert('Tack för din beställning, Vi levererar dina munkar om 30 minuter!');
  }
});

function checkInvoicePaymentInputs() {
  const personalIdentity = document.querySelector('#idnr');  
  const personalIdentityValue = personalIdentity.value.trim();

  if (personalIdentityValue === '') {
    setErrorFor(personalIdentity, 'Du måste fylla i fältet');
  } else if (personalIdentityValue.length < 10) {
    setErrorFor(personalIdentity, 'Fältet måste innehålla 10 siffror');
  } else if (personalIdentityValue.length > 10) {
    setErrorFor(
      personalIdentity,
      'Fältet får inte innehålla mer än 10 siffror'
    );
  } else {
    setSuccessFor(personalIdentity);
    invoiceForm++;
  }
}

discountForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    checkDiscountInput();
});

function checkDiscountInput(){
    const discount = document.querySelector('#discount_text');
    const discountValue = discount.value.trim();

}


/**
 - När formuläret är godkänt ska betalningsalternativen dyka upp när man klickar på Betalning
 - Möjlighet att välja kort eller faktura
 - Knapp för att gå tillbaka om man vill byta betalningssätt?
 - Validering för formuläret
 - När allt är godkänt ska en ruta dyka upp som berättar att betalning är godkänd + övrig info.
 */

function christmasMode() {

  const priceText = document.querySelectorAll('.price')
  const christmas = date.getDate() === 24;
  const december = date.getMonth() === 11;

  if (christmas && december) {
    for (let i = 0; i < priceText.length; i++) {
      priceText[i].style.color = 'red';
    }
    document.body.classList.add('christmas');
    const darkModeButton = document.querySelector('#toggleDarkMode');
    darkModeButton.classList.add('toggle-hidden');
  }
}
christmasMode()

/**
 * Leveransregler
Generellt levereras beställningar 30 minuter från då beställningen läggs, med följande undantag:
Om det är helg så levereras munkarna istället om 1,5 h
Om det är mitt i natten, så sker leverans om 45 min
Om beställningen läggs någon gång på fredag mellan kl. 11 och 13 (då har personalen veckomöte) så är leveranstiden kl. 15.
 * 
 *Helg:
 const saturday = date.getDay() === 6;
 const sunday = date.GetDay() === 0;
 if (saturday && sunday){

 }

 Fredag:
 
 if ((friday && time >= 11) && (time <=13)){

 }

 if (time >= 24 && time <= 6){
  
 }
 *
 */
