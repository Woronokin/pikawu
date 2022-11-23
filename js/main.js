// объявлем переменную кнопки меню
let menuToggle = document.querySelector('#menu-toggle');
// объявлем переменную меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию
menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню при клике по кнопке
    menu.classList.toggle('visible')
})

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');


const listUsers = [{
        id: '01',
        email: 'test@mail.com',
        password: '12345',
        displayName: 'Woronokin'
    },

    {
        id: '02',
        email: 'maks117@test.ru',
        password: '123456',
        displayName: 'maksim'
    },

];

const setUsers = {
    user: null,
    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('Некорректный email');
            return;
        }
        const user = this.getUser(email);
        if (user && user.password === password) {
            this.authorizedUser(user);
            handler();
        } else {
            alert('Пользователь с такими данными не найден')
        }
    },
    logOut() {
        console.log('выход')
    },
    signUp(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('Некорректный email');
            return;
        }

        if (!email.trim() || !password.trim()) {
            alert('Введите данные')
            return;
        }
        if (!this.getUser(email)) {
            const user = { email, password, displayName: email.split('@')[0] };
            listUsers.push(user);
            this.authorizedUser(user)
            handler();
        } else {
            alert('Пользователь с таким email уже зарегистрирован')
        }
    },
    getUser(email) {
        return listUsers.find(item => item.email === email)
    },
    authorizedUser(user) {
        this.user = user;
    }
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user: ', user);

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
    }
}

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
});

loginSignup.addEventListener('click', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
});

toggleAuthDom();