const apiUrl = `https://api.themoviedb.org`;
const apiKey = "e33d85365d7d139b64e59cc2738cf121";

// Movie Genres
const movieGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

// TV Show Genres
const tvGenres = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

// Function to get random items from an array
function getRandomItems(array: any[], numItems: number) {
  const shuffled = array.sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffled.slice(0, numItems); // Return the first numItems
}

export function generateStars(voteAverage: number) {
  const maxStars = 5;
  const rating = Math.round(voteAverage / 2); // Convertir la note sur 5
  let starsHtml = "";

  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      // Étoile pleine
      starsHtml += `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      `;
    } else {
      // Étoile vide
      starsHtml += `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      `;
    }
  }

  return starsHtml;
}

function displayMovies(movies: any[], type = "movie") {
  // Sélectionner le conteneur où les cartes seront insérées
  const moviesContainer = document.querySelector(`.grid.trending-${type}`);

  if (moviesContainer) {
    // Vider le conteneur au cas où il y aurait déjà du contenu
    moviesContainer.innerHTML = "";

    movies.forEach((movie) => {
      // Créer un élément div pour la carte
      const card = document.createElement("div");
      card.classList.add(
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "overflow-hidden",
      );

      // Générer le contenu HTML de la carte
      card.innerHTML = `
        <div class="h-48 md:h-48 lg:h-56 w-full overflow-hidden">
          <img class="w-full h-full object-cover" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">
            <a href="/detail.html?movie_id=${movie.id}">${movie.title ? movie.title : movie.name}</a>
          </h3>
          <div class="flex justify-between items-center gap-0.5">
            <div class="flex gap-0 text-yellow-500 hover:text-yellow-500">
              ${generateStars(movie.vote_average)}
            </div>
            <button class="text-gray-400 hover:text-red-500">
              <!-- Icône de favori -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z"/>
              </svg>
            </button>
          </div>
        </div>
      `;

      // Ajouter la carte au conteneur
      moviesContainer.appendChild(card);
    });
  } else {
    console.error("Le conteneur des films n'a pas été trouvé dans le DOM.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is fully loaded!");
  // Your code here

  // display movies trending today
  fetch(`${apiUrl}/3/trending/movie/day?api_key=${apiKey}&language=fr-FR`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Convert response to JSON
    })
    .then((data) => {
      const movies = data.results;
      displayMovies(movies);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // display tv trending today
  fetch(`${apiUrl}/3/trending/tv/day?api_key=${apiKey}&language=fr-FR`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Convert response to JSON
    })
    .then((data) => {
      console.log("new");
      const movies = data.results;
      console.log({ movies });
      displayMovies(movies, "tv");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // display movie genres
  // Merging the arrays
  const allGenres = [...movieGenres];

  // Get 8 random genres
  const randomGenres = getRandomItems(allGenres, 8);
  console.log({ randomGenres });
  // show genres
  const genresContainer = document.querySelector("#list-genres");

  if (genresContainer) {
    randomGenres.forEach((genre) => {
      const genreElement = document.createElement("div");
      genreElement.classList.add(
        "bg-gray-800",
        "shadow-xl",
        "group",
        "hover:cursor-pointer",
        "rounded-xl",
        "relative",
        "overflow-hidden",
      );
      genreElement.innerHTML = `
        <figure>
          <img
            src="https://img.freepik.com/free-photo/view-3d-cinema-theatre-room_23-2150866033.jpg?t=st=1730222456~exp=1730226056~hmac=73ec6c66c035488d546fe56b922ece6a676feed0b2a12243ce07d1c95507aea5&w=996"
            alt="${genre.name}"
            class="w-full h-44 object-cover opacity-30 group-hover:opacity-40"
          />
        </figure>
        <div class="absolute inset-0 flex justify-center items-center">
          <a href="/movies.html?genre_id=${genre.id}"><h2 class="uppercase font-bold text-xl text-white">${genre.name}</h2></a>
        </div>
      `;
      genresContainer.appendChild(genreElement);
    });
  } else {
    console.error("Le conteneur des genres n'a pas été trouvé dans le DOM.");
  }
});
