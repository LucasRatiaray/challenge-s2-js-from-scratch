// // src/useDetail.ts
// import { getUser } from "./users.js";
// import { renderHeader } from "./header.js";
// renderHeader();

// const user = getUser();

// const userAvatar = document.getElementById("user-avatar") as HTMLImageElement;
// const userName = document.getElementById("user-name") as HTMLElement;
// const userEmail = document.getElementById("user-email") as HTMLElement;
// const userMovies = document.getElementById("user-movies") as HTMLElement;
// const userShows = document.getElementById("user-shows") as HTMLElement;
// const showWatched = document.getElementById("show-watched") as HTMLElement;
// const commentsPosted = document.getElementById(
//   "comments-posted"
// ) as HTMLElement;
// const moviesWatched = document.getElementById("movies-watched") as HTMLElement;
// const userSocialLinks = document.getElementById(
//   "user-social-links"
// ) as HTMLElement;

// // Remplir les informations utilisateur
// userAvatar.src = user.avatarUrl;
// userName.textContent = user.name;
// userEmail.textContent = user.email;

// // Remplir les films favoris
// user.favoriteMovies.forEach((movie) => {
//   const listItem = document.createElement("li");
//   listItem.textContent = movie;
//   userMovies.appendChild(listItem);
// });

// user.favoritesShows.forEach((show) => {
//   const listItem = document.createElement("li");
//   listItem.textContent = show;
//   userShows.appendChild(listItem);
// });

// showWatched.textContent = user.showsWatched.toString();
// moviesWatched.textContent = user.moviesWatched.toString();
// commentsPosted.textContent = user.commentsPosted.toString();

// // Remplir les liens sociaux
// if (user.socialLinks.instagram) {
//   const instagramLink = document.createElement("a");
//   instagramLink.href = user.socialLinks.instagram;
//   instagramLink.textContent = "Instagram";
//   userSocialLinks.appendChild(instagramLink);
// }

// if (user.socialLinks.twitter) {
//   const twitterLink = document.createElement("a");
//   twitterLink.href = user.socialLinks.twitter;
//   twitterLink.textContent = "Twitter";
//   userSocialLinks.appendChild(twitterLink);
// }

// if (user.socialLinks.facebook) {
//   const facebookLink = document.createElement("a");
//   facebookLink.href = user.socialLinks.facebook;
//   facebookLink.textContent = "Facebook";
//   userSocialLinks.appendChild(facebookLink);
// }

// const editProfileButton = document.getElementById("edit-profile-btn");

// if (editProfileButton) {
//   editProfileButton.addEventListener("click", () => {
//     window.location.href = "/editUser.html";
//   });
// }

import { getUser } from "./users.js";
import { renderHeader } from "./header.js";

// Rendre l'en-tête de la page
renderHeader();

document.addEventListener("DOMContentLoaded", () => {
  const user = getUser();

  // Sélection des éléments du DOM
  const userAvatar = document.getElementById(
    "user-avatar"
  ) as HTMLImageElement | null;
  const userName = document.getElementById("user-name") as HTMLElement | null;
  const userEmail = document.getElementById("user-email") as HTMLElement | null;
  const userMovies = document.getElementById(
    "user-movies"
  ) as HTMLElement | null;
  const userShows = document.getElementById("user-shows") as HTMLElement | null;
  const showWatched = document.getElementById(
    "show-watched"
  ) as HTMLElement | null;
  const commentsPosted = document.getElementById(
    "comments-posted"
  ) as HTMLElement | null;
  const moviesWatched = document.getElementById(
    "movies-watched"
  ) as HTMLElement | null;
  const userSocialLinks = document.getElementById(
    "user-social-links"
  ) as HTMLElement | null;
  const editProfileButton = document.getElementById(
    "edit-profile-btn"
  ) as HTMLButtonElement | null;

  // Mettre à jour les informations utilisateur
  if (userAvatar) userAvatar.src = user.avatarUrl;
  if (userName) userName.textContent = user.name;
  if (userEmail) userEmail.textContent = user.email;

  // Ajouter les films favoris
  if (userMovies) {
    user.favoriteMovies.forEach((movie) => {
      const listItem = document.createElement("li");
      listItem.textContent = movie;
      userMovies.appendChild(listItem);
    });
  }

  // Ajouter les séries favorites
  if (userShows) {
    user.favoritesShows.forEach((show) => {
      const listItem = document.createElement("li");
      listItem.textContent = show;
      userShows.appendChild(listItem);
    });
  }

  // Mettre à jour les statistiques
  if (showWatched) showWatched.textContent = user.showsWatched.toString();
  if (moviesWatched) moviesWatched.textContent = user.moviesWatched.toString();
  if (commentsPosted)
    commentsPosted.textContent = user.commentsPosted.toString();

  // Ajouter les liens sociaux
  if (userSocialLinks) {
    if (user.socialLinks.instagram) {
      const instagramLink = document.createElement("a");
      instagramLink.href = user.socialLinks.instagram;
      instagramLink.textContent = "Instagram";
      instagramLink.target = "_blank";
      instagramLink.classList.add("mr-2", "hover:underline");
      userSocialLinks.appendChild(instagramLink);
    }

    if (user.socialLinks.twitter) {
      const twitterLink = document.createElement("a");
      twitterLink.href = user.socialLinks.twitter;
      twitterLink.textContent = "Twitter";
      twitterLink.target = "_blank";
      twitterLink.classList.add("mr-2", "hover:underline");
      userSocialLinks.appendChild(twitterLink);
    }

    if (user.socialLinks.facebook) {
      const facebookLink = document.createElement("a");
      facebookLink.href = user.socialLinks.facebook;
      facebookLink.textContent = "Facebook";
      facebookLink.target = "_blank";
      facebookLink.classList.add("hover:underline");
      userSocialLinks.appendChild(facebookLink);
    }
  }

  // Rediriger vers la page de modification de profil
  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
      window.location.href = "/editUser.html";
    });
  }
});
