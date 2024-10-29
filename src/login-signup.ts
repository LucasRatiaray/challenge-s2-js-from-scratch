import loadComponent from "./index.js";

// Sélection des éléments et ajout de types pour TypeScript
const formContainer = document.querySelector(".form-container") as HTMLElement;
const showSignupLink = document.getElementById(
  "showSignup",
) as HTMLAnchorElement;
const showLoginLink = document.getElementById("showLogin") as HTMLAnchorElement;
const showForgotLink = document.getElementById(
  "showForgot",
) as HTMLAnchorElement;
const showLoginFromResetLink = document.getElementById(
  "showLoginFromReset",
) as HTMLAnchorElement;

if (
  formContainer &&
  showSignupLink &&
  showLoginLink &&
  showForgotLink &&
  showLoginFromResetLink
) {
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
} else {
  console.error("Un ou plusieurs éléments n'ont pas été trouvés dans le DOM.");
}

loadComponent("./components/nav.html", "nav");
loadComponent("./components/footer.html", "footer");
