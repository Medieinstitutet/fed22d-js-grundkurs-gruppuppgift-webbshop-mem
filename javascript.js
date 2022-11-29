/***************************************************************************************
 *                             Funktioner för meny
*************************************************************************************** */
const menuButton = document.getElementsByClassName('toggle_menu')[0];
const menuLinks = document.getElementsByClassName('menu_links')[0];

let menuOpen = false; //Menyn är stängd som default

//Funktion för menyn
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

menuButton.addEventListener('click', toggleMenu);

//Stänger menyn
const listItemLinks = document.querySelectorAll('.list_item');
listItemLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

function closeMenu() {
  menuOpen = false;
  menuButton.blur();
  menuButton.classList.remove('active');
  menuButton.classList.remove('active');
  menuButton.setAttribute('aria-expanded', false);
}

// Shoppingcart page toggle ----
const toggleShoppingCartBtn = document.querySelector('.shopping_cart');
const shoppingCartPage = document.querySelector('.shopping_basket');
const returnToShoppingCartBtn = document.querySelector('#toggle_shopping_cart');
toggleShoppingCartBtn.addEventListener('click', toggleOrderPage);
returnToShoppingCartBtn.addEventListener('click', toggleOrderPage);

/****************************************************************************
 *                  Funktioner för orderpage
 ****************************************************************************/

class Donut {
  // Template till våra donuts
  constructor(name, price, review, aspect, picSrc) {
    this.name = name;
    this.price = price;
    this.review = review; // 1-10
    this.aspect = aspect;
    this.selectCounter = 0;
    this.picSrc = picSrc;
  }

}
// Donuts-array
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
    'images/small/glasymunk2_liten.jpg',
    'images/small/glasymunk2_liten.jpg',
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

// Funktion för att skriva ut alla våra munkar till sidan
const donutPlacement = document.querySelectorAll('.donut_article');

function displayDonut1() {
  let shopCartBtnUp = '';
  let shopCartBtnDown = '';
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
            <div class="selectcounter">${donuts[i].selectCounter}</div>
            <div class="plus_minusBtn">
                <button data-operator="plus">+</button>
                <button data-operator="minus">-</button>
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
}
displayDonut1();

//Funktion för prisökning fredag 15.00 - måndag 03.00 

function fridayIncrease() {
  const date = new Date();
  console.log(date);
  const friday = date.getDay() === 5;
  const monday = date.getDay() === 1;
  const time = date.getHours();

  if ((friday && time > 15) || (monday && time <= 3)) {
    for (let i = 0; i < donuts.length; i++) {
      donuts[i].price = Math.floor(donuts[i].price * 1.15);
    }
  }
}
fridayIncrease();

//Funktioner för bildspel

function nextImage(btn) {
  const donutIndex = btn.currentTarget.id.replace('next-', '');
  const imageArray = donuts[donutIndex].picSrc;
  const currentImage = document.querySelector(`#img-${donutIndex}`);
  const currentImageSrc = document.querySelector(`#img-${donutIndex}`).getAttribute('src');
  console.log(currentImageSrc);

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
  const currentImageSrc = document.querySelector(`#img-${donutIndex}`).getAttribute('src');
  console.log(currentImageSrc);

  if (currentImageSrc === imageArray[0]) {
    currentImage.setAttribute('src', imageArray[1]);
  } else {
    currentImage.setAttribute('src', imageArray[0]);
  }
}
/****************************************************************************
 *                  Funktioner för shopping-basket
 ***************************************************************************/
function displayDonutCart() {
  for (let i = 0; i < donuts.length; i++) {
    let donutNr = 'nr' + i;
    const cartOrderMarkup = `
            <div class="${donutNr} donuts">
                <img src="${donuts[i].picSrc[0]}" width="150" height="150 loading="lazy">
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
let totalAmount = 0;
const totalAmountPlacement = document.querySelector('.total_amount');
function calcTotalorder() {
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].selectCounter > 0) {
      let combinedAmount = 0;
      let totalAmount = 0;  
      combinedAmount = donuts[i].price * donuts[i].selectCounter;
      totalAmount = totalAmount + combinedAmount;
    }
  }
  totalAmountPlacement.innerHTML = totalAmount + 'kr';
  mondayDecrease();
}

function countUp(e) {
  const controll = e.currentTarget.parentElement.parentElement.attributes.class;
  const updateCounter = document.querySelectorAll('.selectcounter');
  for (let i = 0; i < donuts.length; i++) {
    if (controll.value == 'nr' + i + ' donuts') {
      donuts[i].selectCounter++;
      updateCounter[i].innerHTML = donuts[i].selectCounter;
    }
  }
}
function countDown(e) {
  const controll = e.currentTarget.parentElement.parentElement.attributes.class;
  const updateCounter = document.querySelectorAll('.selectcounter');
  for (let i = 0; i < donuts.length; i++) {
    if (controll.value == 'nr' + i + ' donuts') {
      if (donuts[i].selectCounter <= 0) {
        return;
      }
      donuts[i].selectCounter--;
      updateCounter[i].innerHTML = donuts[i].selectCounter;
    }
  }
}

function toggleOrderPage() {
  // Togglar synligheten på varukorgen + placerar ut donuts med mer än 0 i antal + räknar ut totalen
  shoppingCartPage.classList.toggle('toggle-hidden');
  displayDonutCart();
  calcTotalorder();
  let shopCartBtnUp = document.querySelectorAll('.btn_cart_plus');
  let shopCartBtnDown = document.querySelectorAll('.btn_cart_minus');
  for (let i = 0; i < shopCartBtnUp.length; i++) {
    shopCartBtnUp[i].addEventListener('click', countUpCart);
    shopCartBtnDown[i].addEventListener('click', countDownCart);
  }
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

function clearCart() {
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].selectCounter = 0;
    document.querySelector('.current_donuts_order').children[i].innerHTML = '';
    document.querySelectorAll('.selectcounter')[i].innerHTML = '';
  }
  calcTotalorder();
}

function onSortSelect() {
  // Sorterings funktion, sorterar när använderan gör ett val i select inputen

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

function toggleFilterOptions() {
  // Visar toggle menyn när man trcker på Filter knappen, filterar sedan när man trycker igen och stänger den.
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
              <li>${donuts[i].price}kr</li>
              <li>Innehåller: ${donuts[i].aspect}</li>
            </ul>
            <div class="selectcounter">${donuts[i].selectCounter}</div>
            <div class="plus_minusBtn">
                <button data-operator="plus">+</button>
                <button data-operator="minus">-</button>
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
  }
  open = true; // Så koden triggas ändas när man stänger filter menyn
  if (!bar && !glasyr && !choklad && !socker && !strossel) {
    // Om man inte valt något alternativ så skrivs donutsen ut som vanligt
    displayDonut1();
  }
}

function toggleFilter(e) {
  // Denna ändar värdet på de olika alternativen till true när de väljs, lägger även till css klassen highLighted så det syns vilka som är aktiva.
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

const selectedOrderplacment = document.querySelectorAll('.selectedOrder'); // Dessa hämtar från inom displayDonut1(), och måste därför ligga efter
let plusbtn = document.querySelectorAll('button[data-operator="plus"]');
let minusbtn = document.querySelectorAll('button[data-operator="minus"]');
let bar = false;
let glasyr = false;
let choklad = false; // Alla alternativ till filter funktionen 
let socker = false;
let strossel = false;
let open = false;
for (let i = 0; i < plusbtn.length; i++) {
  plusbtn[i].addEventListener('click', countUp);
  minusbtn[i].addEventListener('click', countDown);
}

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

//Funktion för måndagsrabatt
function mondayDecrease() {
  const date = new Date();
  console.log(date);
  const monday = date.getDay() ===1;
  if (monday) {
    console.log(totalAmount * 0.9);
    totalAmountPlacement.innerHTML = totalAmount * 0.9 + 'kr';
    const discountText = document.querySelector('.discount_amount');
    const mondayDiscountText = 'Måndagsrabatt: 10 % på hela beställningen';
    discountText.innerHTML = 'Tillämpad rabatt: ' + mondayDiscountText;
  }
}

//Kod för betalningsformulär
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


function clearForm() {
  const formController = document.querySelectorAll('.form_control');
  formController.forEach((div) => {
    div.classList.remove('success', 'error');
  });
  document.querySelector('small').classList.add('toggle-hidden');
}

paymentForm.addEventListener('submit', (e) => {
  // e står för event
  e.preventDefault(); //Förhindrar att skicka formuläret

  checkInputs();
  
  if (controlForm >= 7) {
    document.querySelector('#cardPaymentBtn').classList.remove('toggle-hidden');
    document.querySelector('#invoicePaymentBtn').classList.remove('toggle-hidden');
  }
});

let controlForm = 0;

const cardOptionBtn = document.querySelector('#cardPaymentBtn');
const invoiceOptionBtn = document.querySelector('#invoicePaymentBtn');

function pickPaymentOption(e) {
  if (e.currentTarget.id == 'cardPaymentBtn') {
    document.querySelector('#cardPaymentForm').classList.remove('toggle-hidden');

    cardOptionBtn.classList.add('active');
    invoiceOptionBtn.classList.remove('active');

    console.log(cardOptionBtn);

    document.querySelector('#invoicePaymentForm').classList.add('toggle-hidden');
  } else if (e.currentTarget.id == 'invoicePaymentBtn') {
    document.querySelector('#invoicePaymentForm').classList.remove('toggle-hidden');

    invoiceOptionBtn.classList.add('active');
    cardOptionBtn.classList.remove('active');
    console.log(invoiceOptionBtn);

    document.querySelector('#cardPaymentForm').classList.add('toggle-hidden');
  }
}

cardOptionBtn.addEventListener('click', pickPaymentOption);
invoiceOptionBtn.addEventListener('click', pickPaymentOption);

function checkInputs() {
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

//Validering för kortbetalningsformulär
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


cardPaymentForm.addEventListener('submit', (e) => {
  // e står för event
  e.preventDefault(); //Förhindrar att skicka formuläret
  checkCardPaymentInputs();

  if(controlCardForm >= 4){
    setSuccessFor(cardNumber);  
    clearForm();
    alert('Du har lagt en beställning');
  }
});

let controlCardForm = 0;

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

//Validering för fakturaformulär
const invoicePaymentForm = document.querySelector('#invoicePaymentForm');
const personalIdentity = document.querySelector('#idnr');

invoicePaymentForm.addEventListener('submit', (e) => {
    // e står för event
    e.preventDefault(); //Förhindrar att skicka formuläret
  
    checkInvoicePaymentInputs();
});

function checkInvoicePaymentInputs(){
    const personalIdentityValue = personalIdentity.value.trim();

    if(personalIdentityValue === ''){
        setErrorFor(personalIdentity, 'Du måste fylla i fältet');
    }else if(personalIdentityValue.length < 10){
        setErrorFor(personalIdentity, 'Fältet måste innehålla 10 siffror');
    }else if(personalIdentityValue.length > 10){
        setErrorFor(personalIdentity, 'Fältet får inte innehålla mer än 10 siffror');
    }else{
        setSuccessFor(personalIdentity);
    }
}

/**
 - När formuläret är godkänt ska betalningsalternativen dyka upp när man klickar på Betalning
 - Möjlighet att välja kort eller faktura
 - Knapp för att gå tillbaka om man vill byta betalningssätt?
 - Validering för formuläret
 - När allt är godkänt ska en ruta dyka upp som berättar att betalning är godkänd + övrig info.
 */

/**
 * KLAR Måndagar 10% rabatt på hela summan - Detta visas i
 * varukorgssammanställningen som en rad med texten "Måndagsrabatt: 10 % på hela beställningen".
 *
 * KLAR Fredag kl 15 - mån kl 03.00 15% högre pris på alla munkar
 * 10 munkar av samma sort = 10% rabatt för just denna sort
 * Om rabattkod a_damn_fine-cup_of-coffee matas in blir hela beställningen gratis
 * Om det är jämn vecka och tisdag, så får man 25 kr rabatt på beställningen förutsatt att totalsumman överstiger 25 kr.
 */
