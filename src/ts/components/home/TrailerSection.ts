// src/ts/components/home/TrailerSection.ts
import { Movie } from "../../types/Movie";

// API key injectée par Webpack
const apiKey = process.env.API_KEY;

class TrailerSection extends HTMLElement {
  constructor() {
    super();
    console.log("TrailerSection: constructeur called");
  }

  async connectedCallback(): Promise<void> {
    console.log("TrailerSection: connectedCallback called");

    const apiUrl = "https://api.themoviedb.org/3/trending/movie/week";

    try {
      // Étape 1 : Récupérer les films trending
      const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
      const data = await response.json();

      const movies: Movie[] = data.results;

      if (movies && movies.length > 0) {
        // Étape 2 : Récupérer les trailers pour les films
        const trailers = await Promise.all(
          movies.slice(0, 5).map(async (movie) => {
            const videoResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
            );
            const videoData = await videoResponse.json();
            const trailer = videoData.results.find(
              (video: any) =>
                video.type === "Trailer" && video.site === "YouTube"
            );

            return {
              title: movie.title,
              releaseDate: movie.release_date,
              trailerKey: trailer ? trailer.key : null,
            };
          })
        );

        // Étape 3 : Générer le contenu HTML des trailers (en iframe)
        const trailersHTML = trailers
          .filter((trailer) => trailer.trailerKey) // Ne garder que les films ayant un trailer
          .map((trailer) => {
            return `
              <div class="relative w-[322px] flex-shrink-0 h-auto px-[16px]">
                <iframe
                  class="rounded-[8px]"
                  width="322"
                  height="180"
                  src="https://www.youtube.com/embed/${
                    trailer.trailerKey
                  }?rel=0&showinfo=0"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  title="${trailer.title}"
                ></iframe>
                <div class="w-auto mt-[10px] p-[8px] text-center">
                  <h3 class="text-[18px] font-bold text-white">${
                    trailer.title
                  }</h3>
                  <span class="text-[14px] font-light text-white">${new Date(
                    trailer.releaseDate
                  ).toLocaleDateString()}</span>
                </div>
              </div>
            `;
          })
          .join("");

        // Étape 4 : Insérer le contenu dans la section
        this.innerHTML = `
          <section class="mt-[32px] ps-[50px] relative py-[32px] bg-[#14213D]">
            <div class="flex gap-[16px] items-center px-[74px]">
              <h2 class="text-[24px] font-bold text-white">Trailers</h2>
            </div>
            <div class="mt-[32px] flex flex-nowrap gap-[32px] overflow-x-auto hide-scrollbar">
              ${trailersHTML}
            </div>
          </section>
        `;
      } else {
        this.innerHTML = `<p class="text-center text-gray-500">No trailers available.</p>`;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des trailers :", error);
      this.innerHTML = `<p class="text-center text-red-500">Failed to load trailers. Please try again later.</p>`;
    }
  }
}

if (!customElements.get("trailer-section")) {
  customElements.define("trailer-section", TrailerSection);
}
