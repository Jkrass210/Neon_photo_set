const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");
const burger = document.querySelector("#burger");
const menuInside = document.querySelector("#menuInside");
const menuClose = document.querySelector("#menuClose");
const linkNav = document.querySelectorAll(".menu__link");
const menuTel = document.querySelector("#menuTel");
const closeAddeass = document.querySelector("#closeAddeass");
const boxAddrass = document.querySelector("#boxAddrass");
//настройка кнопки поиска в хедере
searchBtn.addEventListener('click', function () {
 searchInput.classList.toggle("search__input--active")
})
document.addEventListener('click', function(e) {
 if (e.target !== searchInput && e.target !== searchBtn) {
  searchInput.classList.remove("search__input--active");
 }
});
//настройка бургера
burger.addEventListener('click', function() {
 menuInside.classList.toggle("menu__inside--active")
 document.body.classList.toggle("stop-scroll");
});
menuClose.addEventListener('click', function() {
 menuInside.classList.remove("menu__inside--active")
 document.body.classList.remove("stop-scroll");
});
linkNav.forEach(function (elem) {
 elem.addEventListener('click', function() {
  menuInside.classList.remove("menu__inside--active");
   document.body.classList.remove("stop-scroll");
 })
});
menuTel.addEventListener('click', function() {
 menuInside.classList.remove("menu__inside--active")
 document.body.classList.remove("stop-scroll");
})
//карта
ymaps.ready(init);
function init(){
  var myMap = new ymaps.Map("myMap", {
    center: [55.760393, 37.618445],
    zoom: 14
  });
  var myPlacemark1 = new ymaps.Placemark([55.769535, 37.639985], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../images/Ellipse.svg',
    iconImageSize: [24, 24],
    iconImageOffset: [0, 0],
  });
  myMap.geoObjects.add(myPlacemark1);
  myMap.behaviors.disable("scrollZoom");
}
//закрыть поле адреса
closeAddeass.addEventListener('click', function() {
  boxAddrass.classList.add("contacts__address--hidden")
});