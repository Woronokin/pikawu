// объявлем переменную кнопки меню
let menuToggle = document.querySelector('#menu-toggle');
// объявлем переменную меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию
menuToggle.addEventListener('click', function(event){
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню при клике по кнопке
    menu.classList.toggle('visible')
})