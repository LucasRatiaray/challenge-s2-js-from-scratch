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

async function fetchMovieMedia(movieId: string) {
  const videosResponse = await fetch(`${apiUrl}/3/movie/${movieId}/videos?api_key=${apiKey}&language=fr-FR`);
  const imagesResponse = await fetch(`${apiUrl}/3/movie/${movieId}/images?api_key=${apiKey}`);
  
  const videos = await videosResponse.json();
  const images = await imagesResponse.json();
  
  return { videos, images };
}

function displayVideos(videos: any[]) {
  const mediaContent = document.getElementById('media-content');
  if (!mediaContent) return;

  mediaContent.innerHTML = '';
  videos.forEach(video => {
      if (video.site === 'YouTube') {
          const videoDiv = document.createElement('div');
          videoDiv.className = 'mb-4';
          videoDiv.innerHTML = `
              <iframe width="560" height="315" 
                  src="https://www.youtube.com/embed/${video.key}" 
                  frameborder="0" allowfullscreen
                  class="rounded-lg">
              </iframe>
          `;
          mediaContent.appendChild(videoDiv);
      }
  });
}

function displayImages(images: any[], type: 'backdrops' | 'posters') {
  const mediaContent = document.getElementById('media-content');
  if (!mediaContent) return;

  mediaContent.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'grid grid-cols-4 gap-4';

  images[type].forEach(image => {
      container.innerHTML += `
          <div class="aspect-[16/9] rounded-lg overflow-hidden">
              <img src="https://image.tmdb.org/t/p/w500${image.file_path}" 
                   alt="Movie ${type}" 
                   class="w-full h-full object-cover">
          </div>
      `;
  });

  mediaContent.appendChild(container);
}

async function fetchMovieRecommendations(movieId: string) {
  try {
      const response = await fetch(
          `${apiUrl}/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=fr-FR&page=1`
      );
      const data = await response.json();
      return data.results.slice(0, 5); // Return only first 5 recommendations
  } catch (error) {
      console.error("Error fetching recommendations:", error);
      return [];
  }
}

function displayRecommendations(recommendations: any[]) {
  const container = document.getElementById('recommendations-grid');
  if (!container) return;

  container.innerHTML = recommendations.map(movie => `
      <div class="cursor-pointer" onclick="window.location.href='detail.html?movie_id=${movie.id}'">
          <div class="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
              <img 
                  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                  alt="${movie.title}"
                  class="w-full h-full object-cover"
              >
          </div>
          <h3 class="font-semibold text-sm">${movie.title}</h3>
          <p class="text-sm text-gray-400">${movie.release_date?.split('-')[0] || 'N/A'}</p>
      </div>
  `).join('');
}
document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const isMovie = params.has("movie_id");

  if (!isMovie) return; // Only continue if this is a movie

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
    const movieId = params.get("movie_id") || "";
    const mediaData = await fetchMovieMedia(movieId);

    // Update tab counts
    const tabs = document.querySelectorAll('.media-tab');
    tabs[0].textContent = `Vidéos (${mediaData.videos.results.length})`;
    tabs[1].textContent = `Fonds d'écran (${mediaData.images.backdrops.length})`;
    tabs[2].textContent = `Affiches (${mediaData.images.posters.length})`;

    // Add click handlers to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            tabs.forEach(t => t.classList.replace('bg-[#FCA311]', 'bg-gray-200'));
            tab.classList.replace('bg-gray-200', 'bg-[#FCA311]');

            // Display appropriate content
            const type = (tab as HTMLElement).dataset.tabType;
            switch(type) {
                case 'videos':
                    displayVideos(mediaData.videos.results);
                    break;
                case 'wallpapers':
                    displayImages(mediaData.images, 'backdrops');
                    break;
                case 'posters':
                    displayImages(mediaData.images, 'posters');
                    break;
            }
        });
    });

    // Show videos by default
    displayVideos(mediaData.videos.results);
    
    const recommendations = await fetchMovieRecommendations(movieId);
    displayRecommendations(recommendations);
});
