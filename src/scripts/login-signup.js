"use strict";
const formContainer = document.querySelector(".form-container");
const showSignupLink = document.getElementById("showSignup");
const showLoginLink = document.getElementById("showLogin");
const showForgotLink = document.getElementById("showForgot");
const showLoginFromResetLink = document.getElementById("showLoginFromReset");
if (formContainer &&
    showSignupLink &&
    showLoginLink &&
    showForgotLink &&
    showLoginFromResetLink) {
    showSignupLink.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.add("show-signup");
        formContainer.classList.remove("show-forgot");
    });
    showLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.remove("show-signup");
        formContainer.classList.remove("show-forgot");
    });
    showForgotLink.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.remove("show-signup");
        formContainer.classList.add("show-forgot");
    });
    showLoginFromResetLink.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.remove("show-signup");
        formContainer.classList.remove("show-forgot");
    });
}
else {
    console.error("Un ou plusieurs éléments n'ont pas été trouvés dans le DOM.");
}
