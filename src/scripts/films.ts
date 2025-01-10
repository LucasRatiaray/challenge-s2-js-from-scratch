// Types
interface Movie {
    id: number;
    title: string;
    name?: string;
    poster_path: string;
    vote_average: number;
    popularity: number;
    vote_count: number;
}

interface ApiResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

type SortOption = 'az' | 'za' | 'popularity' | 'trending';

// Constants
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

// Utility Functions
function generateStars(voteAverage: number): string {
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

function updatePage(page: number, category: string): void {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('page', page.toString());
    currentUrl.searchParams.set('category', category);
    window.location.href = currentUrl.toString();
}

// Display Functions
function displayMovies(movies: Movie[]): void {
    const container = document.getElementById('movies-container');
    if (!container) return;

    container.innerHTML = "";
    
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden');
        
        card.innerHTML = `
            <div class="h-48 md:h-48 lg:h-56 w-full overflow-hidden">
                <img class="w-full h-full object-cover" 
                     src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                     alt="${movie.title || movie.name}">
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">
                    <a href="/detail.html?movie_id=${movie.id}">${movie.title || movie.name}</a>
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
        
        container.appendChild(card);
    });
}

// handle sorting
function sortMovies(movies: Movie[], sortType: SortOption): Movie[] {
    switch (sortType) {
        case 'az':
            return [...movies].sort((a, b) => 
                (a.title || a.name || '').localeCompare(b.title || b.name || '')
            );
        case 'za':
            return [...movies].sort((a, b) => 
                (b.title || b.name || '').localeCompare(a.title || a.name || '')
            );
        case 'popularity':
            return [...movies].sort((a, b) => 
                (b.vote_average || 0) - (a.vote_average || 0)
            );
        case 'trending':
            // For trending, we'll use vote_count as a proxy for trending
            return [...movies].sort((a, b) => 
                (b.vote_count || 0) - (a.vote_count || 0)
            );
        default:
            return movies;
    }
}

// Add this function to handle sort button clicks
function setupSortButtons(movies: Movie[]): void {
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
    // Add click handlers
    Object.entries(sortButtons).forEach(([sortType, button]) => {
        button?.addEventListener('click', () => {
            const sortedMovies = sortMovies(movies, sortType as SortType);
            displayMovies(sortedMovies);
            if (button) updateActiveButton(button);
        });
    });
}

function displayGenreFilters(): void {
    const container = document.getElementById('genre-filters');
    if (!container) return;

    container.innerHTML = "";
    
    movieGenres.forEach(genre => {
        const button = document.createElement('button');
        button.className = "px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors";
        button.innerHTML = `<a href="/films.html?genre_id=${genre.id}">${genre.name}</a>`;
        container.appendChild(button);
    });
}

function displayPagination(category: string, currentPage: number, totalPages: number): void {
    const container = document.getElementById('pagination');
    if (!container) return;

    container.innerHTML = "";

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Précédent';
    prevButton.className = 'px-3 py-1 bg-[#14213D] text-white rounded';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => updatePage(currentPage - 1, category);
    container.appendChild(prevButton);

    // Page numbers
    for (let i = 1; i <= Math.min(totalPages, 6); i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i.toString();
        pageButton.className = i === currentPage 
            ? 'px-3 py-1 bg-[#FCA311] text-[#14213D] rounded font-bold'
            : 'px-3 py-1 bg-[#14213D] text-white rounded';
        pageButton.onclick = () => updatePage(i, category);
        container.appendChild(pageButton);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Suivant';
    nextButton.className = 'px-3 py-1 bg-[#14213D] text-white rounded';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => updatePage(currentPage + 1, category);
    container.appendChild(nextButton);
}

async function initializePage(): Promise<void> {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'now_playing';
    const page = parseInt(params.get('page') || '1');
    const genreId = params.get('genre_id') || '';

    let url = `${apiUrl}/3/movie/${category}?api_key=${apiKey}&language=fr-FR&page=${page}`;
    if (genreId) {
        url = `${apiUrl}/3/discover/movie?api_key=${apiKey}&language=fr-FR&page=${page}&with_genres=${genreId}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data: ApiResponse = await response.json();
        
        // Store movies in memory for sorting
        const movies = data.results;
        
        // Initial display
        displayMovies(movies);
        displayGenreFilters();
        displayPagination(category, data.page, data.total_pages);
        
        // Setup sort buttons
        setupSortButtons(movies);
        
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);