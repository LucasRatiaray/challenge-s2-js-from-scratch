// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   avatarUrl: string;
//   favoriteMovies: string[];
//   showsWatched: number;
//   commentsPosted: number;
//   moviesWatched: number;
//   favoritesShows: string[];
//   socialLinks: {
//     instagram?: string;
//     twitter?: string;
//     facebook?: string;
//   };
// }

// // src/user.ts
// export const getUser = (): User => {
//   return {
//     id: 1,
//     name: "John Doe",
//     email: "johndoe@example.com",
//     avatarUrl:
//       "https://imgs.search.brave.com/vRBmCLSfyfao0DoPOhhg-hG-LSau0k2Wv1NkBj4gc5I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzgwLzYxLzk5/LzM2MF9GXzk4MDYx/OTk4M19jeTZuY2Rz/eUVPOXJOVFZtT2Nj/UFRTTXpWVm52YUxD/OS5qcGc",
//     favoriteMovies: ["Movie 1", "Movie 2", "Movie 3"],
//     showsWatched: 42,
//     commentsPosted: 123,
//     moviesWatched: 321,
//     favoritesShows: ["Show 1", "Show 2", "Show 3"],
//     socialLinks: {
//       instagram: "https://instagram.com/johndoe",
//       twitter: "https://twitter.com/johndoe",
//       facebook: "https://facebook.com/johndoe",
//     },
//   };
// };
// src/users.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  favoriteMovies: string[];
  showsWatched: number;
  commentsPosted: number;
  moviesWatched: number;
  favoritesShows: string[];
  socialLinks: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

// Fonction pour récupérer les données par défaut
export const defaultUser: User = {
  id: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  avatarUrl:
    "https://imgs.search.brave.com/vRBmCLSfyfao0DoPOhhg-hG-LSau0k2Wv1NkBj4gc5I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzgwLzYxLzk5/LzM2MF9GXzk4MDYx/OTk4M19jeTZuY2Rz/eUVPOXJOVFZtT2Nj/UFRTTXpWVm52YUxD/OS5qcGc",
  favoriteMovies: ["Movie 1", "Movie 2", "Movie 3"],
  showsWatched: 12,
  commentsPosted: 23,
  moviesWatched: 15,
  favoritesShows: ["Show 1", "Show 2", "Show 3"],
  socialLinks: {
    instagram: "https://instagram.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    facebook: "https://facebook.com/johndoe",
  },
};

// Sauvegarder les données utilisateur dans localStorage
export const saveUserToLocalStorage = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Charger les données utilisateur depuis localStorage
export const getUserFromLocalStorage = (): User => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : defaultUser;
};

// Exemple d'utilisation dans le code principal
export const getUser = (): User => {
  return getUserFromLocalStorage();
};
