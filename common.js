/* login modal popup show hide */
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");

loginBtn.addEventListener("click", () => {
    modal.classList.add("show");
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
const password = document.getElementById("password");
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
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let isUserExist = false;
    if (users && users.length > 0) {
        isUserExist = users.filter(user => user.email === email).length > 0;
    }
    const msgBox = document.getElementById('signupMsgBox');
    if (!isUserExist) {
        users.push({
            name,
            email,
            password
        });
        localStorage.setItem('users', JSON.stringify(users));
        msgBox.textContent = "Registration successful!";
        msgBox.classList.add('success');
        msgBox.classList.remove('error');
        msgBox.classList.remove('hidden');
        setTimeout(() => {
            msgBox.classList.add('hidden');
        }, 5000);
    } else {
        msgBox.textContent = "User already exists";
        msgBox.classList.add('error');
        msgBox.classList.remove('success');
        msgBox.classList.remove('hidden');
        setTimeout(() => {
            msgBox.classList.add('hidden');
        }, 5000);
    }
    registerForm.reset();
});

const userSection = document.getElementById('userSection');
const userName = document.getElementById('userName');

/** check user has loggedin */
const checkLoggedin = (userDetails) => {
    const msgBox = document.getElementById('loginMsgBox');
    if (userDetails) {
        sessionStorage.setItem('loggedinUser', JSON.stringify(userDetails));
        loginForm.reset();
        loginBtn.classList.add('hidden');
        userSection.classList.remove('hidden');
        userName.innerHTML = userDetails.name;
        modal.classList.remove("show");
    } else {
        msgBox.textContent = "Invalid login details";
        msgBox.classList.add('error');
        msgBox.classList.remove('success');
        msgBox.classList.remove('hidden');
        setTimeout(() => {
            msgBox.classList.add('hidden');
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