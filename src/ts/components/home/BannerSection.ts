// src/ts/components/home/BannerSection.ts
import { Movie } from "../../types/Movie";

// API key injectée par Webpack
const apiKey = process.env.API_KEY;

class BannerSection extends HTMLElement {
  private timeout: NodeJS.Timeout | null = null;

  constructor() {
    super();
    console.log("BannerSection: constructor called");
  }

  connectedCallback(): void {
    console.log("BannerSection: connectedCallback called");

    this.innerHTML = `
      <section class="bg-cover bg-center bg-no-repeat flex flex-col w-auto h-[500px]"
        style="background-image: url('assets/images/hero-banner.jpg')">
        <div class="flex flex-col mt-[144px] items-center">
          <div class="w-[398px] flex flex-col">
            <h1 class="text-[36px] font-bold text-black">Welcome,</h1>
            <span class="text-[24px] text-black mt-2">Millions of films and series...</span>
            <span class="text-[24px] text-black mt-1">Take your pick!</span>
          </div>
          <form id="search-form" class="w-[440px] h-[40px] mt-[75px] relative">
            <label for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
              <input type="search" id="default-search"
                class="block w-full pl-4 pr-12 px-[16px] py-[8px] text-base text-gray-900 border border-gray-300 rounded-full bg-gray-50"
                placeholder="Search..." autocomplete="off" />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.73275 2.1665C6.69183 2.23584 4.91625 2.52509 3.70291 3.73409C2.64125 4.7925 2.28591 6.27992 2.16675 8.6665M16.2685 2.1665C19.3083 2.23584 21.0839 2.52509 22.2983 3.73409C23.36 4.7925 23.7153 6.27992 23.8334 8.6665M16.2685 23.8332C19.3083 23.7638 21.0839 23.4746 22.2983 22.2656C23.36 21.2072 23.7153 19.7198 23.8334 17.3332M9.73275 23.8332C6.69183 23.7638 4.91625 23.4746 3.70291 22.2656C2.64125 21.2072 2.28591 19.7198 2.16675 17.3332M16.2501 16.2498L18.4167 18.4165M17.3334 12.4582C17.3334 11.1652 16.8198 9.92527 15.9056 9.01103C14.9913 8.09679 13.7513 7.58317 12.4584 7.58317C11.1655 7.58317 9.92551 8.09679 9.01127 9.01103C8.09703 9.92527 7.58341 11.1652 7.58341 12.4582C7.58341 13.7511 8.09703 14.9911 9.01127 15.9053C9.92551 16.8196 11.1655 17.3332 12.4584 17.3332C13.7513 17.3332 14.9913 16.8196 15.9056 15.9053C16.8198 14.9911 17.3334 13.7511 17.3334 12.4582Z"
                    stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div id="suggestions" class="absolute top-[48px] left-0 w-full bg-white shadow-lg rounded-lg z-10 hidden max-h-[300px] overflow-y-auto">
                <!-- Suggestions apparaîtront ici -->
              </div>
            </div>
          </form>
        </div>
      </section>
    `;

    const input = this.querySelector<HTMLInputElement>("#default-search");
    const suggestionsBox = this.querySelector<HTMLDivElement>("#suggestions");

    input?.addEventListener("input", () => {
      const query = input.value.trim();
      if (this.timeout) clearTimeout(this.timeout);

      if (query.length > 1) {
        this.timeout = setTimeout(() => {
          this.fetchSuggestions(query, suggestionsBox);
        }, 300);
      } else {
        this.hideSuggestions(suggestionsBox);
      }
    });

    document.addEventListener("click", (event) => {
      if (!this.contains(event.target as Node)) {
        this.hideSuggestions(suggestionsBox);
      }
    });
  }

  async fetchSuggestions(
    query: string,
    suggestionsBox: HTMLDivElement | null
  ): Promise<void> {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const movies: Movie[] = data.results.slice(0, 5);
      this.displaySuggestions(movies, suggestionsBox);
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions :", error);
    }
  }

  displaySuggestions(
    movies: Movie[],
    suggestionsBox: HTMLDivElement | null
  ): void {
    if (!suggestionsBox) return;

    if (movies.length > 0) {
      suggestionsBox.innerHTML = movies
        .map(
          (movie) => `
          <div class="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-100 rounded-[8px]" data-id="${
            movie.id
          }">
            <img src="https://image.tmdb.org/t/p/w92${
              movie.poster_path
            }" alt="${movie.title}" class="w-12 h-16 rounded" />
            <div class="text-sm">
              <h3 class="font-bold text-gray-800">${movie.title}</h3>
              <p class="text-gray-500 text-xs">${new Date(
                movie.release_date
              ).toLocaleDateString()}</p>
            </div>
          </div>
        `
        )
        .join("");

      suggestionsBox.classList.remove("hidden");

      suggestionsBox.querySelectorAll("[data-id]").forEach((element) => {
        element.addEventListener("click", () => {
          const movieId = element.getAttribute("data-id");
          console.log(`Film sélectionné : ${movieId}`);
          window.location.href = `/movie/${movieId}`;
        });
      });
    } else {
      this.hideSuggestions(suggestionsBox);
    }
  }

  hideSuggestions(suggestionsBox: HTMLDivElement | null): void {
    if (suggestionsBox) {
      suggestionsBox.innerHTML = "";
      suggestionsBox.classList.add("hidden");
    }
  }
}

if (!customElements.get("banner-section")) {
  customElements.define("banner-section", BannerSection);
}
