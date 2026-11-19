/* login modal popup show hide */
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const loginMsgBox = document.getElementById('loginMsgBox');
const signupMsgBox = document.getElementById('signupMsgBox');
loginMsgBox.classList.add('hidden');
signupMsgBox.classList.add('hidden');

loginBtn.addEventListener("click", () => {
    modal.classList.add("show");
    loginMsgBox.classList.add('hidden');
    signupMsgBox.classList.add('hidden');
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("show");
    }
});

/* switch login / signup forms in the popup */
var signupLink = document.getElementById('signup');
var loginLink = document.getElementById('login');

var signupSection = document.getElementById('signupSection');
var loginSection = document.getElementById('loginSection');

signupLink.addEventListener('click', () => {
    loginSection.classList.add('hidden');
    signupSection.classList.remove('hidden');
});

loginLink.addEventListener('click', () => {
    loginSection.classList.remove('hidden');
    signupSection.classList.add('hidden');
});

/** password and confirma password match validation */
const password = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");

const validatePassword = () => {
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity(
            "Passwords do not match"
        );
    } else {
        confirmPassword.setCustomValidity("");
    }
}

password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validatePassword);

/** new user signup form */
const registerForm = document.getElementById("signupForm");
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("username").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let isUserExist = false;
    if (users && users.length > 0) {
        isUserExist = users.filter(user => user.email === email).length > 0;
    }
    if (!isUserExist) {
        users.push({
            name,
            email,
            password
        });
        localStorage.setItem('users', JSON.stringify(users));
        signupMsgBox.textContent = "Registration successful!";
        signupMsgBox.classList.add('success');
        signupMsgBox.classList.remove('error');
        signupMsgBox.classList.remove('hidden');
        setTimeout(() => {
            signupMsgBox.classList.add('hidden');
        }, 5000);
    } else {
        signupMsgBox.textContent = "User already exists";
        signupMsgBox.classList.add('error');
        signupMsgBox.classList.remove('success');
        signupMsgBox.classList.remove('hidden');
        setTimeout(() => {
            signupMsgBox.classList.add('hidden');
        }, 5000);
    }
    registerForm.reset();
});

const userSection = document.getElementById('userSection');
const userName = document.getElementById('userName');

/** check user has loggedin */
const checkLoggedin = (userDetails) => {
    if (userDetails) {
        sessionStorage.setItem('loggedinUser', JSON.stringify(userDetails));
        loginForm.reset();
        loginBtn.classList.add('hidden');
        userSection.classList.remove('hidden');
        userName.innerHTML = userDetails.name;
        modal.classList.remove("show");
    } else {
        loginMsgBox.textContent = "Invalid login details";
        loginMsgBox.classList.add('error');
        loginMsgBox.classList.remove('success');
        loginMsgBox.classList.remove('hidden');
        setTimeout(() => {
            loginMsgBox.classList.add('hidden');
        }, 5000);
    }
}

/** user login form */
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let isUserExist = [];
    if (users && users.length > 0) {
        isUserExist = users.filter(user => user.email === email && user.password === password);
    }
    checkLoggedin(isUserExist.length > 0 ? isUserExist[0] : '');
});


/* check user is loggedin on page load */
const loggedinUSer = sessionStorage.getItem('loggedinUser');
checkLoggedin(loggedinUSer ? JSON.parse(sessionStorage.getItem('loggedinUser')) : '');

/** user logout  */
const logout = document.getElementById('logoutBtn');
logout.addEventListener('click', () => {
    sessionStorage.removeItem('loggedinUser');
    loginBtn.classList.remove('hidden');
    userSection.classList.add('hidden');
    userName.innerHTML = '';
});