// объявлем переменную кнопки меню
let menuToggle = document.querySelector('#menu-toggle');
// объявлем переменную меню
let menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const sidebarNav = document.querySelector('.sidebar-nav');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');

const listUsers = [{
        id: '01',
        email: 'woronokin@mail.com',
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
    logOut(handler) {
        this.user = null;
        handler();
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
            const user = {
                email,
                password,
                displayName: email.split('@')[0]
            };
            listUsers.push(user);
            this.authorizedUser(user);
            handler();
        } else {
            alert('Пользователь с таким email уже зарегистрирован')
        }
    },
    editUser(userName, userPhoto, handler) {
        if (userName) {
            this.user.displayName = userName;
        }
        if (userPhoto) {
            this.user.photo = userPhoto;
        }

        handler();
    },
    getUser(email) {
        return listUsers.find(item => item.email === email)
    },
    authorizedUser(user) {
        this.user = user;
    }
};

const setPosts = {
    allPosts: [{
            title: 'Заголовок поста',
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Первую языкового ему своих грустный буквоград? До снова lorem подпоясал он, единственное диких по всей ты жаренные выйти от всех но своих, переулка правилами гор сбить заголовок запятых его. Предупредила это коварных подпоясал ipsum, о до обеспечивает гор алфавит безорфографичный свою необходимыми, вдали дороге подзаголовок если пунктуация меня грамматики вопроса жаренные парадигматическая на берегу своих. Оксмокс точках родного маленький необходимыми домах встретил, парадигматическа',
            tags: ['cвежее', 'новое', 'горячее', 'моё', 'случайность'],
            author: 'woronokin@mail.com',
            date: '27.11.22, 16:24:00',
            likes: 15,
            comments: 20
        },
        {
            title: 'Заголовок второго поста',
            text: 'Пунктуация строчка наш всеми которой она, если за текста составитель вскоре большого приставка. Одна все это текстами предупредила первую, путь власти приставка великий скатился, по всей ты рот маленький маленькая, текстов семантика безорфографичный ее! Послушавшись жизни вершину над своих он',
            tags: ['cвежее', 'новое', 'горячее', 'моё', 'случайность'],
            author: 'maks117@test.ru',
            date: '27.11.22, 16:27:00',
            likes: 47,
            comments: 13
        },
        {
            title: 'Заголовок поста 3',
            text: ' это коварных подпоясал ipsum, о до обеспечивает гор алфавит безорфографичный свою необходимыми, вдали дороге подзаголовок если пунктуация меня грамматики вопроса жаренные парадигматическая на берегу своих. Оксмокс точках родного маленький необходимыми домах встретил, парадигматическая',
            tags: ['cвежее', 'новое', 'горячее', 'моё', 'случайность'],
            author: 'woronokin@mail.com',
            date: '27.11.22, 16:24:00',
            likes: 17,
            comments: 25
        }
    ]
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user: ', user);

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        sidebarNav.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src;
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
        sidebarNav.style.display = 'none';
    }
};

const showAllPosts = () => {
    let postsHTML = '';

    setPosts.allPosts.forEach(post => {

        postsHTML += `
        <section class="post">
        <div class="post-body">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-text">
            ${post.text}
            </p>
            <div class="tags">
                <a href="#" class="tag">${post.tags}</a>
            </div>
        </div>

        <div class="post-footer">
            <div class="post-buttons">
                <button class="post-button likes">
                    <svg width="24" height="24" class="icon icon-like">
                        <use xlink:href="img/icons.svg#like"></use>
                    </svg>
                    <span class="likes-counter">${post.likes}</span>
                </button>
                <button class="post-button comments">
                    <svg width="21" height="21" class="icon icon-comment">
                        <use xlink:href="img/icons.svg#comment"></use>
                    </svg>
                    <span class="comments-counter">${post.comments}</span>
                </button>
                <button class="post-button save">
                    <svg width="19" height="19" class="icon icon-save">
                        <use xlink:href="img/icons.svg#save"></use>
                    </svg>
                </button>
                <button class="post-button share">
                    <svg width="17" height="19" class="icon icon-share">
                        <use xlink:href="img/icons.svg#share-alt"></use>
                    </svg>
                </button>
            </div>

            <div class="post-author">
                <div class="author-about">
                    <a href="#" class="author-username">${post.author}</a>
                    <span class="post-time">${post.date}</span>
                </div>
                <a href="#" class="author link"><img src="img/avatar.jpg" alt="avatar"
                        class="author-avatar"></a>
            </div>
        </div>
    </section>
        `;
    });

    postsWrapper.innerHTML = postsHTML
};

const init = () => {
    loginForm.addEventListener('submit', event => {
        event.preventDefault();

        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;

        setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
        loginForm.reset();
    });

    loginSignup.addEventListener('click', event => {
        event.preventDefault();
        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;

        setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
        loginForm.reset();
    });

    exitElem.addEventListener('click', event => {
        event.preventDefault();
        setUsers.logOut(toggleAuthDom);
    });

    editElem.addEventListener('click', event => {
        event.preventDefault();
        editContainer.classList.toggle('visible');
        editUsername.value = setUsers.user.displayName;
    });

    editContainer.addEventListener('submit', event => {
        event.preventDefault();
        setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
        editContainer.classList.remove('visible');
    });

    // отслеживаем клик по кнопке меню и запускаем функцию
    menuToggle.addEventListener('click', function (event) {
        // отменяем стандартное поведение ссылки
        event.preventDefault();
        // вешаем класс на меню при клике по кнопке
        menu.classList.toggle('visible')
    });

    showAllPosts();
    toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', () => {
    init();
});