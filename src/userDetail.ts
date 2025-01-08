// src/useDetail.ts
import { getUser } from "./users.js";
import { renderHeader } from "./header.js";
renderHeader();

const user = getUser();

const userAvatar = document.getElementById("user-avatar") as HTMLImageElement;
const userName = document.getElementById("user-name") as HTMLElement;
const userEmail = document.getElementById("user-email") as HTMLElement;
const userMovies = document.getElementById("user-movies") as HTMLElement;
const userShows = document.getElementById("user-shows") as HTMLElement;
const showWatched = document.getElementById("show-watched") as HTMLElement;
const commentsPosted = document.getElementById(
  "comments-posted"
) as HTMLElement;
const moviesWatched = document.getElementById("movies-watched") as HTMLElement;
const userSocialLinks = document.getElementById(
  "user-social-links"
) as HTMLElement;

// Remplir les informations utilisateur
userAvatar.src = user.avatarUrl;
userName.textContent = user.name;
userEmail.textContent = user.email;

// Remplir les films favoris
user.favoriteMovies.forEach((movie) => {
  const listItem = document.createElement("li");
  listItem.textContent = movie;
  userMovies.appendChild(listItem);
});

user.favoritesShows.forEach((show) => {
  const listItem = document.createElement("li");
  listItem.textContent = show;
  userShows.appendChild(listItem);
});

showWatched.textContent = user.showsWatched.toString();
moviesWatched.textContent = user.moviesWatched.toString();
commentsPosted.textContent = user.commentsPosted.toString();

// Remplir les liens sociaux
if (user.socialLinks.instagram) {
  const instagramLink = document.createElement("a");
  instagramLink.href = user.socialLinks.instagram;
  instagramLink.textContent = "Instagram";
  userSocialLinks.appendChild(instagramLink);
}

if (user.socialLinks.twitter) {
  const twitterLink = document.createElement("a");
  twitterLink.href = user.socialLinks.twitter;
  twitterLink.textContent = "Twitter";
  userSocialLinks.appendChild(twitterLink);
}

if (user.socialLinks.facebook) {
  const facebookLink = document.createElement("a");
  facebookLink.href = user.socialLinks.facebook;
  facebookLink.textContent = "Facebook";
  userSocialLinks.appendChild(facebookLink);
}
