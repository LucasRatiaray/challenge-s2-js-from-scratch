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

function updatePage(page: number, category: string) {
  console.log({ page, category });
  window.location.href = `/movies.html?category=${category}&page=${page}`;
}

function generatePagination(
  category: string,
  current_page: number,
  total_page: number,
  total_results: number,
) {
  const paginationContainer = document.getElementById("pagination");
  console.log({ paginationContainer });

  if (paginationContainer) {
    paginationContainer.innerHTML = ""; // Clear the container

    // Previous button
    const prevButton = document.createElement("button");
    prevButton.textContent = "« Précédent";
    prevButton.className =
      "px-4 py-2 bg-blue-900 text-white rounded-l-lg hover:bg-blue-700 transition";
    prevButton.disabled = current_page === 1;
    prevButton.onclick = () => updatePage(current_page - 1, category);
    paginationContainer.appendChild(prevButton);

    // Page numbers
    for (let i = 1; i <= total_page; i++) {
      const pageButton = document.createElement("button");
      if (pageButton) {
        pageButton.textContent = `${i}`;
        pageButton.className = "px-4 py-2 bg-blue-900 text-white font-bold";
        if (i === current_page) {
          pageButton.classList.add("active", "bg-yellow-500", "text-black");
          pageButton.disabled = true; // Disable the current page button
        }
        pageButton.onclick = () => updatePage(i, category);
        paginationContainer.appendChild(pageButton);
      }
      if (i > 5) {
        break;
      }
    }

    // Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Suivant »";
    nextButton.className =
      "px-4 py-2 bg-blue-900 text-white rounded-r-lg hover:bg-blue-700 transition";
    nextButton.disabled = current_page === total_page;
    nextButton.onclick = () => updatePage(current_page + 1, category);
    paginationContainer.appendChild(nextButton);
  }
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

function displayMovies(movies: any[]) {
  // Sélectionner le conteneur où les cartes seront insérées
  const moviesContainer = document.querySelector(`.grid.movie-list`);

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

  // get current state of the URL
  const params = new URLSearchParams(window.location.search);

  // Access parameters directly
  const movie_id = params.get("movie_id") || "";

  // display movies trending today
  fetch(`${apiUrl}/3/movie/${movie_id}?api_key=${apiKey}&language=fr-FR`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Convert response to JSON
    })
    .then((data) => {
      const movie = data;

      // Display the movies
      const title = document.querySelector("#movie-title");
      if (title) {
        title.textContent = movie.title;
      }
      const poster = document.querySelector("#movie-poster");
      if (poster) {
        (poster as HTMLImageElement).src =
          `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        (poster as HTMLImageElement).alt = movie.title;
      }
      const genre = document.querySelector("#movie-genre");
      if (genre) {
        const genres = movie.genres;
        const genresText = genres.map((genre: any) => genre.name).join(", ");
        genre.textContent = genresText;
      }
      const year = document.querySelector("#movie-year");
      if (year) {
        year.textContent = movie.release_date;
      }

      const rating = document.querySelector("#movie-rating");
      if (rating) {
        rating.textContent = movie.vote_average;
      }

      const overview = document.querySelector("#movie-synopsis");
      if (overview) {
        overview.textContent = movie.overview;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  fetch(
    `${apiUrl}/3/movie/${movie_id}/credits?api_key=${apiKey}&language=fr-FR`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Convert response to JSON
    })
    .then((data) => {
      const credits = data;
      const director = data.crew.find(
        (person: any) => person.job === "Director",
      );
      const directorName = document.querySelector("#movie-director");
      if (directorName) {
        directorName.textContent = director?.name || "Unknown";
      }
      const actors = credits.cast.slice(0, 10);
      const actorsContainer = document.querySelector("#movie-actors");
      console.log({ actorsContainer });
      if (actorsContainer) {
        actorsContainer.innerHTML = "";

        actors.forEach((actor: any) => {
          const elem = document.createElement("div");
          console.log(actor);
          elem.className = "";

          elem.innerHTML = `
            <div class="bg-white rounded-lg overflow-hidden shadow">
              <div class="aspect-[3/4]">
                  <img src="https://image.tmdb.org/t/p/w500/${actor.profile_path}" alt="${actor.name || "Unknown"}" class="w-full h-full object-cover" />
              </div>
              <div class="p-4">
                  <h3 class="font-semibold">${actor.name || "Unknown"}</h3>
                  <p class="text-sm text-gray-600">${actor.character || "Unknown"}</p>
              </div>
          </div>
          `;
          actorsContainer.append(elem);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
