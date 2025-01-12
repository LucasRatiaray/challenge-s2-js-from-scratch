// src/ts/components/home/GenreSection.ts
import { Movie } from "../../types/Movie";

// API key injected by webpack.DefinePlugin
const apiKey = process.env.API_KEY;

class GenreSection extends HTMLElement {
  constructor() {
    super();
    console.log("GenreSection: constructeur called");
  }

  async connectedCallback(): Promise<void> {
    console.log("GenreSection: connectedCallback called");

    const genreApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
    const discoverApiUrl = `https://api.themoviedb.org/3/discover/movie`;

    try {
      // Récupérer les genres
      const genreResponse = await fetch(genreApiUrl);
      const genreData = await genreResponse.json();

      const genres = genreData.genres;

      if (genres && genres.length > 0) {
        // Préparer les cartes de genres
        const genresHTML = await Promise.all(
          genres.map(async (genre: { id: number; name: string }) => {
            // Récupérer le film le mieux noté pour ce genre
            const movieResponse = await fetch(
              `${discoverApiUrl}?api_key=${apiKey}&with_genres=${genre.id}&sort_by=vote_average.desc`
            );
            const movieData = await movieResponse.json();
            const topMovie: Movie | null =
              movieData.results.length > 0 ? movieData.results[0] : null;

            // Préparer l'image de fond
            const backgroundImage = topMovie
              ? `https://image.tmdb.org/t/p/w500${topMovie.poster_path}`
              : "assets/images/default-genre-bg.webp";

            return `
              <div
                class="group relative w-[270px] h-[151px] flex-shrink-0 px-[16px] bg-[#14213D] rounded-[8px] flex items-center justify-center text-white font-bold text-[24px] overflow-hidden">
                <!-- Image de fond au hover -->
                <img src="${backgroundImage}" alt="${genre.name}"
                  class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-50">
                <!-- Overlay sombre au hover -->
                <div
                  class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <span class="z-10">${genre.name}</span>
              </div>
            `;
          })
        );

        // Injecter le contenu dans la section
        this.innerHTML = `
          <section class="mt-[32px] px-[104px] mb-[32px] relative">
            <div class="flex gap-[16px] items-center px-[20px]">
              <h2 class="text-[24px] font-bold text-black">Genres</h2>
              <svg width="21" height="6" viewBox="0 0 21 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_475_1945)">
                  <path d="M15.0161 1H19.0161V5" stroke="black" stroke-width="1.8" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path
                    d="M1.01611 3.00007C1.90311 1.71607 3.49611 0.96707 5.01611 1.00007C6.53611 0.96707 8.12911 1.71607 9.01611 3.00007C9.90311 4.28407 11.4961 5.03307 13.0161 5.00007C14.5361 5.03307 16.0161 4.00007 17.0161 3.00007L19.0161 1.00007"
                    stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_475_1945">
                    <rect width="20" height="6" fill="white" transform="translate(0.0161133)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div class="mt-[32px] flex flex-wrap gap-[16px] gap-y-[16px] h-full ">
              ${genresHTML.join("")}
            </div>
          </section>
        `;
      } else {
        this.innerHTML = `<p class="text-center text-gray-500">No genres available.</p>`;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des genres :", error);
      this.innerHTML = `<p class="text-center text-red-500">Failed to load genres. Please try again later.</p>`;
    }
  }
}

if (!customElements.get("genre-section")) {
  customElements.define("genre-section", GenreSection);
}
