const menuButton = document.getElementsByClassName('toggle_menu')[0];
const menuLinks = document.getElementsByClassName('menu_links')[0];

let menuOpen = false; //Menyn är stängd som default

menuButton.addEventListener('click', () => {
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
});

//Tar bort active när man klickar på en av länkarna. Gäller alla länkar
document.querySelectorAll('.list_item').forEach((link) =>
  link.addEventListener('click', () => {
    //Be om hjälp för att skriva om detta
    menuOpen = false;
    menuButton.blur();
    if (menuOpen) {
      menuButton.classList.add('active');
      menuLinks.classList.add('active');
    } else {
      menuButton.classList.remove('active');
      menuLinks.classList.remove('active');
    }

    menuButton.setAttribute('aria-expanded', true);
  })
);

//Tar bort active när man klickar på en av länkarna. Gäller alla länkar
document.querySelectorAll('.list_item').forEach((link) =>
  link.addEventListener('click', () => {
    //Be om hjälp för att skriva om detta
    menuOpen = false;
    menuButton.blur();
    if (menuOpen) {
      menuButton.classList.add('active');
      menuLinks.classList.add('active');
    } else {
      menuButton.classList.remove('active');
      menuLinks.classList.remove('active');
    }
  })
);

// Shoppingcart page toggle ----
const toggleShoppingCartBtn = document.querySelector('.shopping_cart');
const shoppingCartPage = document.querySelector('.shopping_basket');
const returnToShoppingCartBtn = document.querySelector('#toggle_shopping_cart');
toggleShoppingCartBtn.addEventListener('click', toggleOrderPage);
returnToShoppingCartBtn.addEventListener('click', toggleOrderPage);

/****************************************************************************
 *                  Funktioner för orderpage
 ****************************************************************************/

// For Donut order page

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
  new Donut('Blåbärsmunk', 20, 8, 'bär glasyr', [
    'images/small/blabarsmunk_liten.jpg',
    'images/small/blabarsmunk2_liten.jpg',
  ]),
  new Donut('Chokladmunk', 22, 6, 'choklad', [
    'images/small/chokladmunk_liten.jpg',
    'images/small/chokladmunk2_liten.jpg',
  ]),
  new Donut('Dubbel chokladmunk', 25, 9, 'choklad', [
    'images/small/dubbelchoklad_liten.jpg',
    'images/small/dubbelchoklad2_liten.jpg',
  ]),
  new Donut('Glasyrmunk', 15, 7, 'glasyr', [
    'images/small/glasymunk2_liten.jpg',
    'images/small/glasymunk2_liten.jpg',
  ]),
  new Donut('Sockermunk, glutenfri', 30, 5, 'socker glutenfri', [
    'images/small/sockermunk_liten.jpg',
    'images/small/sockermunk2_liten.jpg',
  ]),
  new Donut('Strösselmunk', 32, 4, 'strössel glasyr', [
    'images/small/strosselmunk_liten.jpg',
    'images/small/strosselmunk2_liten.jpg',
  ]),
  new Donut('Syltmunk, glutenfri', 32, 4, 'socker glutenfri', [
    'images/small/syltmunk_liten.jpg',
    'images/small/syltmunk2_liten.jpg',
  ]),
  new Donut('Toppingmunk', 32, 6, 'strössel glasyr', [
    'images/small/toppingmunk_liten.jpg',
    'images/small/toppingmunk2_liten.jpg',
  ]),
  new Donut('Vaniljmunk', 32, 6, 'vaniljkräm glasyr', [
    'images/small/vaniljmunk_liten.jpg',
    'images/small/vaniljmunk2_liten.jpg',
  ]),
  new Donut('Violmunk', 32, 6, 'strössel glasyr', [
    'images/small/violmunk_liten.jpg',
    'images/small/violmunk2_liten.jpg',
  ]),
];

const donutPlacement = document.querySelectorAll('.donut_article');

let shopCartBtnUp = '';
let shopCartBtnDown = '';

// Funktion lista nedan

// Denna skriver ut alla våra donuts på orderpage
function displayDonut1() {
  for (let i = 0; i < donuts.length; i++) {
    let donutNr = 'nr' + i;
    const donutMarkup = `
        <div class="${donutNr} donuts">
             <figure id="img-slide" >
                <button id="prev-${i}" class='prev'> &#10094; </button>
                <img id="img-${i}" src="${donuts[i].picSrc[0]}" alt="" width="130" height="130">
                <button id="next-${i}" class='next'> &#10095; </button>
                <!--<figcaption>${donuts[i].review}/10</figcaption>-->
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
           </div> `;
    donutPlacement[i].innerHTML = donutMarkup;
  }

  // Bild spel relaterat
  const nextBtns = document.querySelectorAll('.next');
  nextBtns.forEach((btn) => {
    btn.addEventListener('click', nextImage);
  });
  const prevBtns = document.querySelectorAll('.prev');
  prevBtns.forEach((btn) => {
    btn.addEventListener('click', prevImage);
  });
}

let currentImageIndex = 0;

function nextImage(btn) {
  const donutIndex = btn.currentTarget.id.replace('next-', ''); //donutIndex = donutsens placering i arrayen
  let i = 0;
  if (currentImageIndex + 1 > donuts[i].picSrc[0].length - 1) {
    currentImageIndex = 0;
  } else {
    currentImageIndex += 1;
  }
  document
    .querySelector(`#img-${donutIndex}`)
    .setAttribute('src', donuts[donutIndex].picSrc[1]); //plockar upp bild
}

function prevImage(btn) {
  const donutIndex = btn.currentTarget.id.replace('prev-', '');
  let i = 0;
  if (currentImageIndex - 1 < 0) {
    currentImageIndex = donuts[i].picSrc[1].length - 1;
  } else {
    currentImageIndex -= 1;
  }
  document
    .querySelector(`#img-${donutIndex}`)
    .setAttribute('src', donuts[donutIndex].picSrc[0]);
}

/****************************************************************************
 *                  Funktioner för shopping-basket
 ****************************************************************************/
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
function calcTotalorder() {
  const totalAmountPlacement = document.querySelector('.total_amount');
  let totalAmount = 0;
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].selectCounter > 0) {
      let combinedAmount = 0;
      combinedAmount = donuts[i].price * donuts[i].selectCounter;
      totalAmount = totalAmount + combinedAmount;
    }
  }
  totalAmountPlacement.innerHTML = totalAmount + 'kr';
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
  // Sorterings funktion

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
      donuts.sort((a, b) => a.review - b.review);
      displayDonut1();
      break;
  }
}

function toggleFilterOptions() {
  document.querySelector('.filterOptions').classList.toggle('toggle-hidden');
  toggleShoppingCartBtn.classList.toggle('toggle-hidden');
  sortSelect.classList.toggle('toggle-hidden');
}

function toggleFilter(e) {
  const filterValue = e.currentTarget.innerHTML;
}

// Functioner anges ovan ----------------------------
displayDonut1();

const selectedOrderplacment = document.querySelectorAll('.selectedOrder'); // Dessa hämtar från inom displayDonut1(), och måste därför ligga efter
let plusbtn = document.querySelectorAll('button[data-operator="plus"]');
let minusbtn = document.querySelectorAll('button[data-operator="minus"]');

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

/*
// Filter alternativ nedan
let bar = false;
let glasyr = false;
let choklad = false;
let socer = false;
let strossel = false;

filterButtons.forEach((i), () => {
  filterButtons[i].addEventListener('click', addFilter);
})
console.log(filterButtons);
// Filter ej klart ännu
*/

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

paymentForm.addEventListener('submit', (e) => { // e står för event
  e.preventDefault(); //Förhindrar att skicka formuläret

  checkInputs();
});

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
  }

  if (lastnameValue === '') {
    setErrorFor(lastName, 'Du måste fylla i fältet');
  } else if (lastnameValue.length < 5) {
    setErrorFor(lastName, 'Ditt namn måste var längre än 2 bokstäver');
  } else {
    setSuccessFor(lastName);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Du måste fylla i fältet');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Du måste ange en giltig E-mail');
  } else {
    setSuccessFor(email);
  }

  if (adressValue === '') {
    setErrorFor(adress, 'Du måste fylla i fältet');
  } else if (adressValue.length < 6) {
    setErrorFor(adress, 'Fältet måste vara längre än 6 bokstäver');
  } else {
    setSuccessFor(adress);
  }

  if (zipcodeValue === '') {
    setErrorFor(zipcode, 'Du måste fylla i fältet');
  } else if (zipcodeValue.length < 4) {
    setErrorFor(zipcode, 'Fältet måste bestå av 4 siffror');
  } else if (zipcodeValue.length > 4) {
    setErrorFor(zipcode, 'Du får inte ange mer än 4 siffror');
  } else if (zipcodeValue.length == 4) {
    setSuccessFor(zipcode);
  }

  if (postalAdressValue === '') {
    setErrorFor(postalAdress, 'Du måste fylla i fältet');
  } else if (postalAdressValue.length < 6) {
    setErrorFor(postalAdress, 'Fältet måste vara längre än 4 bokstäver');
  } else {
    setSuccessFor(postalAdress);
  }

  if(doorcodeValue.length < 4) {
    setErrorFor(doorCode, 'Fältet måste bestå av 4 siffror');
  } else if (doorcodeValue.length > 4) {
    setErrorFor(doorCode, 'Du får inte ange mer än 4 siffror');
  } else if (doorcodeValue.length == 4) {
    setSuccessFor(doorCode);
  }

  if (telValue === '') {
    setErrorFor(tel, 'Du måste fylla i fältet');
  } else if (telValue.length < 10) {
    setErrorFor(tel, 'Fältet måste bestå av 10 siffror');
  } else if (telValue.length > 10) {
    setErrorFor(telValue, 'Du får inte ange mer än 10 siffror');
  } else if (telValue.length == 10) {
    setSuccessFor(tel);
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
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
