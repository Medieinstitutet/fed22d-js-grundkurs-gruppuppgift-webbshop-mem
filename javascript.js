const menuButton = document.getElementsByClassName('toggle_menu')[0];
const menuLinks = document.getElementsByClassName('menu_links')[0];

let menuOpen = false; //Menyn är stängd som default

menuButton.addEventListener('click', () =>{
    menuOpen =!menuOpen; //Gör att menyn får värdet true
    if(!menuOpen) menuButton.blur(); // Tar bort fokus från knappen
    menuLinks.classList.add('active');
    menuButton.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', true);
})

//Tar bort active när man klickar på en av länkarna. Gäller alla länkar
document.querySelectorAll('.list_item').forEach(n => n.
    addEventListener('click', () =>{
        menuOpen = false;
        menuButton.blur();
        menuButton.classList.remove('active');
        menuLinks.classList.remove('active');
        console.log('hej');
}))