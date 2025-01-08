// src/editUser.ts
import { getUser, saveUserToLocalStorage, User } from "./users.js";

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  const user = getUser();

  // Initialiser les champs du formulaire avec les informations actuelles de l'utilisateur
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const avatarInput = document.getElementById("avatar") as HTMLInputElement;
  const favoriteMoviesInput = document.getElementById(
    "favoriteMovies"
  ) as HTMLInputElement;
  const favoriteShowsInput = document.getElementById(
    "favoriteShows"
  ) as HTMLInputElement;

  if (nameInput) nameInput.value = user.name;
  if (emailInput) emailInput.value = user.email;
  if (favoriteMoviesInput)
    favoriteMoviesInput.value = user.favoriteMovies.join(", ");
  if (favoriteShowsInput)
    favoriteShowsInput.value = user.favoritesShows.join(", "); // Initialiser les séries favorites

  // Gérer le changement de photo de profil
  const avatarPreview = document.getElementById(
    "preview-avatar"
  ) as HTMLImageElement;
  if (avatarPreview) avatarPreview.src = user.avatarUrl;

  if (avatarInput) {
    avatarInput.addEventListener("change", (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (avatarPreview) avatarPreview.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Sauvegarder les données modifiées
  const form = document.getElementById("edit-user-form") as HTMLFormElement;
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Récupérer la nouvelle valeur des films favoris
      const updatedFavoriteMovies = favoriteMoviesInput?.value
        ? favoriteMoviesInput.value.split(",").map((movie) => movie.trim())
        : [];

      // Récupérer la nouvelle valeur des séries favorites
      const updatedFavoriteShows = favoriteShowsInput?.value
        ? favoriteShowsInput.value.split(",").map((show) => show.trim())
        : [];

      // Créer un nouvel objet utilisateur avec les informations du formulaire
      const updatedUser: User = {
        id: user.id,
        name: nameInput?.value,
        email: emailInput?.value,
        avatarUrl: avatarPreview?.src || user.avatarUrl, // Utilise la nouvelle image si modifiée
        favoriteMovies: updatedFavoriteMovies, // Mettre à jour les films favoris
        showsWatched: user.showsWatched, // Garde la valeur actuelle
        commentsPosted: user.commentsPosted, // Garde la valeur actuelle
        moviesWatched: user.moviesWatched, // Garde la valeur actuelle
        favoritesShows: updatedFavoriteShows, // Mettre à jour les séries favorites
        socialLinks: user.socialLinks, // Garde les liens sociaux existants
      };

      // Sauvegarder l'utilisateur dans localStorage
      saveUserToLocalStorage(updatedUser);

      // Rediriger ou afficher un message de succès
      window.location.href = "/userDetail.html";
    });
  }
});
