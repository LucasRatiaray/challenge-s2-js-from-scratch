// src/ts/components/home/TrendSection.ts
import { Content } from "../../types/Content";

// API key injectée par Webpack
const apiKey = process.env.API_KEY;

class TrendSection extends HTMLElement {
  private currentCategory: 'movie' | 'tv' = 'movie';
  private buttons: NodeListOf<HTMLAnchorElement> | null = null;

  constructor() {
    super();
    console.log("TrendSection: constructor called");
  }

  async connectedCallback(): Promise<void> {
    console.log("TrendSection: connectedCallback called");
    this.render();
    await this.fetchAndRenderContents();
    this.addEventListeners();
  }

  /**
   * Rendu initial de la section avec les boutons.
   */
  render(): void {
    this.innerHTML = `
      <section class="mt-[32px] ps-[104px] relative">
        <div class="flex gap-[16px] items-center px-[20px]">
          <h2 class="text-[24px] font-bold text-black">Trends</h2>
          <a href="#" class="toggle-button active text-[18px] font-medium text-black rounded-full px-[32px] py-[4px] bg-[#FCA311]">Movies</a>
          <a href="#" class="toggle-button text-[18px] font-medium text-black rounded-full px-[32px] py-[4px] bg-[#D0D0D0]">Series</a>
        </div>
        <div class="mt-[32px] flex flex-nowrap gap-[32px] overflow-x-auto hide-scrollbar" id="contents-container">
          <!-- Contenu Dynamique -->
        </div>
      </section>
    `;
  }

  /**
   * Ajouter des écouteurs d'événements aux boutons "Movies" et "Series".
   */
  addEventListeners(): void {
    this.buttons = this.querySelectorAll('.toggle-button');

    this.buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedCategory = button.textContent?.toLowerCase();

        if (selectedCategory && (selectedCategory === 'movies' || selectedCategory === 'series')) {
          // Définir la catégorie en fonction du bouton sélectionné
          this.currentCategory = selectedCategory === 'movies' ? 'movie' : 'tv';
          this.updateActiveButton(button);
          this.fetchAndRenderContents();
        }
      });
    });
  }

  /**
   * Mettre à jour l'état actif des boutons.
   */
  updateActiveButton(activeButton: HTMLAnchorElement): void {
    if (this.buttons) {
      this.buttons.forEach((button) => {
        if (button === activeButton) {
          button.classList.add('active', 'bg-[#FCA311]', 'text-black');
          button.classList.remove('bg-[#D0D0D0]', 'text-black');
        } else {
          button.classList.remove('active', 'bg-[#FCA311]', 'text-black');
          button.classList.add('bg-[#D0D0D0]', 'text-black');
        }
      });
    }
  }

  /**
   * Récupérer et afficher les contenus en fonction de la catégorie actuelle.
   */
  async fetchAndRenderContents(): Promise<void> {
    const apiUrl = this.currentCategory === 'movie'
      ? "https://api.themoviedb.org/3/trending/movie/week"
      : "https://api.themoviedb.org/3/trending/tv/week";

    try {
      const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
      const data = await response.json();

      // Typage explicite des contenus
      const contents: Content[] = data.results as Content[];

      if (contents && contents.length > 0) {
        contents.sort((a: Content, b: Content) => b.vote_average - a.vote_average);

        const contentsHTML = contents
          .map((content: Content) => {
            const percentageScore = Math.round(content.vote_average * 10);
            const title = 'title' in content ? content.title : content.name;
            const releaseDate = 'release_date' in content ? content.release_date : content.first_air_date;
            const posterPath = content.poster_path
              ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
              : '/assets/images/img-unknow-movie.jpg'; // Image de remplacement

            return `
              <div class="relative w-[182px] flex-shrink-0 h-auto px-[16px] cursor-pointer" data-id="${content.id}" data-type="${this.currentCategory}">
                <div class="relative w-auto">
                  <img src="${posterPath}" alt="${title}" class="rounded-[8px] w-full h-auto object-cover">
                  <div class="absolute -bottom-2 -right-2 w-[50px] h-[50px] bg-[#14213D] rounded-full flex items-center justify-center border-4 border-white">
                    <span class="text-white text-[14px] font-bold">${percentageScore}<span class="text-[8px]">%</span></span>
                  </div>
                </div>
                <div class="w-auto mt-[10px] p-[8px]">
                  <h3 class="text-[18px] font-bold text-black">${title}</h3>
                  <span class="text-[14px] font-light text-[#777777]">${new Date(releaseDate).toLocaleDateString()}</span>
                </div>
              </div>
            `;
          })
          .join("");

        const container = this.querySelector('#contents-container');
        if (container) {
          container.innerHTML = contentsHTML;

          // Ajouter des événements de clic
          container.querySelectorAll("[data-id]").forEach((card) => {
            card.addEventListener("click", () => {
              const contentId = card.getAttribute("data-id");
              const contentType = card.getAttribute("data-type");
              if (contentId && contentType) {
                window.location.href = `/show.html?contentId=${contentId}&type=${contentType}`;
              }
            });
          });
        }
      } else {
        const container = this.querySelector('#contents-container');
        if (container) {
          container.innerHTML = `<p class="text-center text-gray-500">No trending ${this.currentCategory === 'movie' ? 'movies' : 'series'} available.</p>`;
        }
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération des contenus tendances (${this.currentCategory}):`, error);
      const container = this.querySelector('#contents-container');
      if (container) {
        container.innerHTML = `<p class="text-center text-red-500">Failed to load trending ${this.currentCategory === 'movie' ? 'movies' : 'series'}. Please try again later.</p>`;
      }
    }
  }
}

if (!customElements.get("trend-section")) {
  customElements.define("trend-section", TrendSection);
}
