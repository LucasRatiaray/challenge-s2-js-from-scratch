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

interface MovieTrailer {
  id: number;
  title: string;
  release_date: string;
  videos: {
      results: {
          key: string;
          site: string;
          type: string;
      }[];
  };
}

async function displayTrailers() {
  const trailersContainer = document.querySelector('#trailers-content');
  if (!trailersContainer) return;

  try {
      // Fetch upcoming movies
      const response = await fetch(
          `${apiUrl}/3/movie/upcoming?api_key=${apiKey}&language=fr-FR&page=1`
      );
      const data = await response.json();
      
      // Get first 3 movies with trailers
      const moviesWithTrailers = [];
      for (const movie of data.results) {
          const videoResponse = await fetch(
              `${apiUrl}/3/movie/${movie.id}/videos?api_key=${apiKey}&language=fr-FR`
          );
          const videoData = await videoResponse.json();
          
          const trailer = videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
          if (trailer) {
              moviesWithTrailers.push({
                  ...movie,
                  trailerKey: trailer.key
              });
              if (moviesWithTrailers.length === 3) break;
          }
      }

      trailersContainer.innerHTML = '';

        // Display trailers
        moviesWithTrailers.forEach(movie => {
            const trailerCard = document.createElement('div');
            trailerCard.className = 'flex flex-col gap-4';
            
            const releaseDate = new Date(movie.release_date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            trailerCard.innerHTML = `
                <div class="aspect-video">
                    <iframe
                        src="https://www.youtube.com/embed/${movie.trailerKey}"
                        class="w-full h-full rounded-lg"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
                <div class="text-white">
                    <h3 class="text-xl font-bold">${movie.title}</h3>
                    <p class="text-gray-400">Sortie le ${releaseDate}</p>
                </div>
            `;

            trailersContainer.appendChild(trailerCard);
          });
  
      } catch (error) {
          console.error('Error fetching trailers:', error);
      }
  }

// Function to get random items from an array
function getRandomItems(array: any[], numItems: number) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numItems);
}

export function generateStars(voteAverage: number) {
  const maxStars = 5;
  const rating = Math.round(voteAverage / 2);
  let starsHtml = "";

  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      starsHtml += `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            `;
    } else {
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
  const moviesContainer = type === "movie"
      ? document.querySelector('#trending-content')
      : document.querySelector('#popular-content');

  if (moviesContainer) {
    moviesContainer.innerHTML = "";

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6';

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add(
          "bg-white",
          "rounded-lg",
          "shadow-md",
          "overflow-hidden",
      );

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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;

      gridContainer.appendChild(card);
    });

    moviesContainer.appendChild(gridContainer);
  } else {
    console.error("Le conteneur des films n'a pas été trouvé dans le DOM.");
  }
}

// Search functionality
const searchInput = document.querySelector('input[placeholder="Rechercher..."]') as HTMLInputElement;
if (searchInput) {
  searchInput.addEventListener('input', debounce(async (e: Event) => {
    const searchTerm = (e.target as HTMLInputElement).value;
    if (searchTerm.length > 2) {
      try {
        const response = await fetch(
            `${apiUrl}/3/search/multi?api_key=${apiKey}&language=fr-FR&query=${searchTerm}`
        );
        const data = await response.json();
        // Handle search results here
        console.log(data.results);
      } catch (error) {
        console.error('Error searching:', error);
      }
    }
  }, 500));
}

// Debounce helper function
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is fully loaded!");

  displayTrailers();
  // Fetch trending movies
  fetch(`${apiUrl}/3/trending/movie/day?api_key=${apiKey}&language=fr-FR`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        displayMovies(data.results, "movie");
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });

  // Fetch trending TV shows
  fetch(`${apiUrl}/3/trending/tv/day?api_key=${apiKey}&language=fr-FR`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        displayMovies(data.results, "tv");
      })
      .catch((error) => {
        console.error("Error fetching TV shows:", error);
      });

  // Display genres
  const genresContainer = document.querySelector("#genres-content");
  const randomGenres = getRandomItems(movieGenres, 16 );

  if (genresContainer) {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-2 md:grid-cols-4 gap-4';

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
                    <a href="/films.html?genre_id=${genre.id}">
                        <h2 class="uppercase font-bold text-xl text-white">${genre.name}</h2>
                    </a>
                </div>
            `;

      gridContainer.appendChild(genreElement);
    });

    genresContainer.appendChild(gridContainer);
  } else {
    console.error("Le conteneur des genres n'a pas été trouvé dans le DOM.");
  }
});