interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  popularity: number;
  vote_count: number;
}

interface ApiResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

type SortOption = 'az' | 'za' | 'popularity' | 'trending';

const apiUrl = 'https://api.themoviedb.org';
const apiKey = 'e33d85365d7d139b64e59cc2738cf121';

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

function sortShows(shows: TVShow[], sortType: SortOption): TVShow[] {
  switch (sortType) {
      case 'az':
          return [...shows].sort((a, b) => a.name.localeCompare(b.name));
      case 'za':
          return [...shows].sort((a, b) => b.name.localeCompare(a.name));
      case 'popularity':
          return [...shows].sort((a, b) => b.vote_average - a.vote_average);
      case 'trending':
          return [...shows].sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
      default:
          return shows;
  }
}

// Add missing generateStars function
function generateStars(rating: number): string {
  const starCount = Math.round(rating / 2);
  const fullStar = '★';
  const emptyStar = '☆';
  return fullStar.repeat(starCount) + emptyStar.repeat(5 - starCount);
}

function setupSortButtons(shows: TVShow[]): void {
  const sortButtons = {
      'az': document.getElementById('sort-az'),
      'za': document.getElementById('sort-za'),
      'popularity': document.getElementById('sort-popularity'),
      'trending': document.getElementById('sort-trending')
  };

  function updateActiveButton(activeButton: HTMLElement) {
      Object.values(sortButtons).forEach(button => {
          if (button) {
              button.classList.remove('bg-gray-200');
              button.classList.add('hover:bg-gray-100');
          }
      });
      activeButton.classList.add('bg-gray-200');
      activeButton.classList.remove('hover:bg-gray-100');
  }

  Object.entries(sortButtons).forEach(([sortType, button]) => {
      button?.addEventListener('click', () => {
          const sortedShows = sortShows(shows, sortType as SortOption);
          displayShows(sortedShows);
          if (button) updateActiveButton(button);
      });
  });
}

function displayGenreFilters(): void {
  const container = document.getElementById('genre-filters');
  if (!container) return;

  container.innerHTML = "";
  
  tvGenres.forEach(genre => {
      const button = document.createElement('button');
      button.className = "px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors";
      button.innerHTML = `<a href="/series.html?genre_id=${genre.id}">${genre.name}</a>`;
      container.appendChild(button);
  });
}

function displayShows(shows: TVShow[]): void {
  const container = document.querySelector('.movie-list');
  if (!container) return;

  container.innerHTML = "";
  
  shows.forEach(show => {
      const card = document.createElement('div');
      card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden');
      
      card.innerHTML = `
          <div class="h-48 md:h-48 lg:h-56 w-full overflow-hidden">
              <img class="w-full h-full object-cover" 
                   src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
                   alt="${show.name}">
          </div>
          <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">
                  <a href="/detail.html?show_id=${show.id}">${show.name}</a>
              </h3>
              <div class="flex justify-between items-center gap-0.5">
                  <div class="flex gap-0 text-yellow-500 hover:text-yellow-500">
                      ${generateStars(show.vote_average)}
                  </div>
                  <button class="text-gray-400 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z"/>
                      </svg>
                  </button>
              </div>
          </div>
      `;
      
      container.appendChild(card);
  });
}

async function initializePage(): Promise<void> {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page') || '1');
  const genreId = params.get('genre_id') || '';

  let url = `${apiUrl}/3/trending/tv/day?api_key=${apiKey}&language=fr-FR&page=${page}`;
  if (genreId) {
      url = `${apiUrl}/3/discover/tv?api_key=${apiKey}&language=fr-FR&page=${page}&with_genres=${genreId}`;
  }

  try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data: ApiResponse = await response.json();
      const shows = data.results;
      
      displayShows(shows);
      displayGenreFilters();
      generatePagination("tv", data.page, data.total_pages, data.total_results);
      setupSortButtons(shows);
      
  } catch (error) {
      console.error('Error fetching TV shows:', error);
  }
}

function generatePagination(category: string, currentPage: number, totalPages: number, totalResults: number): void {
  const container = document.getElementById('pagination');
  if (!container) return;

  container.innerHTML = '';

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Précédent';
  prevButton.className = 'px-3 py-1 bg-[#14213D] text-white rounded';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => updatePage(currentPage - 1, category));
  container.appendChild(prevButton);

  // Page numbers
  for (let i = 1; i <= Math.min(totalPages, 6); i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i.toString();
      pageButton.className = i === currentPage 
          ? 'px-3 py-1 bg-[#FCA311] text-[#14213D] rounded font-bold'
          : 'px-3 py-1 bg-[#14213D] text-white rounded';
      pageButton.addEventListener('click', () => updatePage(i, category));
      container.appendChild(pageButton);
  }

  // Next button
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Suivant';
  nextButton.className = 'px-3 py-1 bg-[#14213D] text-white rounded';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => updatePage(currentPage + 1, category));
  container.appendChild(nextButton);
}

// Add missing updatePage function
function updatePage(page: number, category: string): void {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('page', page.toString());
  window.location.href = currentUrl.toString();
}

document.addEventListener('DOMContentLoaded', initializePage);