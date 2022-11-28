// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkjsovjJCx7MgCdxHhF6QcneiIQoGo6XQ",
    authDomain: "pikawu-8c308.firebaseapp.com",
    projectId: "pikawu-8c308",
    storageBucket: "pikawu-8c308.appspot.com",
    messagingSenderId: "836999153596",
    appId: "1:836999153596:web:e6ce97acf1394b73c04db9",
    databaseURL: "https://pikawu-8c308-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



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
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');
const loginForget = document.querySelector('.login-forget');
const DEFAULT_PHOTO = userAvatarElem.src;

const setUsers = {
    user: null,
    initUser(handler) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }

            if (handler) {
                handler();
            }
        });
    },
    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('Некорректный email');
            return;
        }

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then()
            .catch(err => {
                const errCode = err.code;
                const errMessage = err.message;

                if (errCode === 'auth/wrong-password') {
                    alert('Неверный пароль');
                } else if (errCode === 'auth/user-not-found') {
                    alert('Пользователь не найден');
                } else {
                    alert(errMessage);
                }
            });

        /* const user = this.getUser(email);
        if (user && user.password === password) {
            this.authorizedUser(user);
            handler();
        } else {
            alert('Пользователь с такими данными не найден')
        } */
    },
    logOut(handler) {
        firebase.auth().signOut()
        /* this.user = null;
        if (handler) {
           handler(); 
        } */

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

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(data => {
                this.editUser(email.split('@')[0], null, handler);
            })
            .catch(err => {
                const errCode = err.code;
                const errMessage = err.message;

                if (errCode === 'auth/weak-password') {
                    alert('Слабый пароль');
                } else if (errCode === 'auth/email-already-in-use') {
                    alert('Данный email уже используется');
                } else {
                    alert(errMessage);
                }
            });

        /* if (!this.getUser(email)) {
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
        } */
    },
    editUser(displayName, photoURL, handler) {
        const user = firebase.auth().currentUser;
        if (displayName) {
            if (photoURL) {
                user.updateProfile({
                    displayName,
                    photoURL
                }).then(handler);
            } else {
                user.updateProfile({
                    displayName
                }).then(handler);
            }
        }
    },
    /* getUser(email) {
        return listUsers.find(item => item.email === email)
    },
    authorizedUser(user) {
        this.user = user;
    } */
    sendForget(email) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('Письмо отправлено');
            })
            .catch(err => {
                const errMessage = err.message;
                alert(errMessage);
            });
    }
};

const setPosts = {
    allPosts: [],
    addPost(title, text, tags, handler) {
        const user = firebase.auth().currentUser;
        this.allPosts.unshift({
            id: `postID${(+new Date()).toString(16)}-${user.uid}`,
            title,
            text,
            tags: tags.split(',').map(item => item.trim()),
            author: {
                displayName: setUsers.user.displayName,
                photo: setUsers.user.photoURL,
            },
            date: new Date().toLocaleString(),
            likes: 0,
            comments: 0,
        });

        firebase.database().ref('post').set(this.allPosts)
            .then(() => this.getPosts(handler));

    },
    getPosts(handler) {
        firebase.database().ref('post').on('value', snapshot => {
            this.allPosts = snapshot.val() || [];
            if (handler) {
                handler();
            }
        });
    }
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        sidebarNav.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photoURL || userAvatarElem.src;
        buttonNewPost.classList.add('visible');
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
        sidebarNav.style.display = 'none';
        buttonNewPost.classList.remove('visible');
        addPostElem.classList.remove('visible');
        postsWrapper.classList.add('visible');
    }
};

const showAddPost = () => {
    addPostElem.classList.add('visible');
    postsWrapper.classList.remove('visible');
};

const showAllPosts = () => {

    let postsHTML = '';

    setPosts.allPosts.forEach(({
        title,
        text,
        date,
        tags,
        likes,
        comments,
        author
    }) => {

        postsHTML += `
        <section class="post">
        <div class="post-body">
            <h2 class="post-title">${title}</h2>
            <p class="post-text">
            ${text}
            </p>
            <div class="tags">
               ${tags.map(tag => `<a href="#${tag}" class="tag">#${tag}</a>`)}
            </div>
        </div>

        <div class="post-footer">
            <div class="post-buttons">
                <button class="post-button likes">
                    <svg width="24" height="24" class="icon icon-like">
                        <use xlink:href="img/icons.svg#like"></use>
                    </svg>
                    <span class="likes-counter">${likes}</span>
                </button>
                <button class="post-button comments">
                    <svg width="21" height="21" class="icon icon-comment">
                        <use xlink:href="img/icons.svg#comment"></use>
                    </svg>
                    <span class="comments-counter">${comments}</span>
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
                    <a href="#" class="author-username">${author.displayName}</a>
                    <span class="post-time">${date}</span>
                </div>
                <a href="#" class="author link"><img src=${author.photo || "img/avatar.jpg"} alt="avatar"
                        class="author-avatar"></a>
            </div>
        </div>
    </section>
        `;
    });

    postsWrapper.innerHTML = postsHTML;

    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
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

    buttonNewPost.addEventListener('click', event => {
        event.preventDefault();
        showAddPost();
    });

    addPostElem.addEventListener('submit', event => {
        event.preventDefault();
        const {
            title,
            text,
            tags
        } = addPostElem.elements;

        if (title.value.length < 7) {
            alert('Слишком короткий заголовок');
            return;
        }

        if (text.value.length < 30) {
            alert('Слишком короткий текст поста');
            return;
        }

        setPosts.addPost(title.value, text.value, tags.value, showAllPosts);

        addPostElem.classList.remove('visible');
        addPostElem.reset();
    });

    loginForget.addEventListener('click', event => {
        event.preventDefault();
        setUsers.sendForget(emailInput.value);
        emailInput.value = '';
    });


    setUsers.initUser(toggleAuthDom);
    setPosts.getPosts(showAllPosts);
};

document.addEventListener('DOMContentLoaded', init);