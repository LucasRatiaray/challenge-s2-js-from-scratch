import { registerUser, loginUser } from "./IndexedDBAuth";

// Gestion du formulaire
const authForm = document.getElementById("authForm") as HTMLFormElement;
const loginButton = document.getElementById("loginButton") as HTMLButtonElement;
const authStatus = document.getElementById("authStatus") as HTMLDivElement;

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  try {
    await registerUser(email, password);
    authStatus.textContent = "User registered successfully!";
  } catch {
    authStatus.textContent = "Error: User already exists!";
  }
});

loginButton.addEventListener("click", async () => {
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  const success = await loginUser(email, password);

  if (success) {
    authStatus.textContent = `Welcome back, ${email}!`;
  } else {
    authStatus.textContent = "Invalid email or password!";
  }
});
