// src/ts/components/serie/SerieSection.ts
import { Serie, Genre } from "../../types/Serie";

// API key injectée par Webpack
const apiKey = process.env.API_KEY;

// Interface pour les réponses paginées de l'API
interface ApiResponse {
  page: number;
  results: Serie[];
  total_pages: number;
  total_results: number;
}

class SerieSection extends HTMLElement {
  private currentPage: number = 1;
  private totalPages: number = 1;
  private selectedGenre: number | null = null;
  private selectedSort: string = 'popularity.desc'; // Valeur par défaut
  private genres: Genre[] = [];
  private draggedElement: HTMLElement | null = null;

  constructor() {
    super();
    console.log("SerieSection: constructor called");
  }

  async connectedCallback(): Promise<void> {
    console.log("SerieSection: connectedCallback called");
    await this.fetchGenres(); // Récupérer les genres au chargement initial
    this.render(); // Rendu initial avec les filtres et tri
    await this.fetchAndRenderSeries(); // Récupérer et afficher les séries
    this.addEventListeners(); // Ajouter les écouteurs d'événements
  }

  /**
   * Récupère les genres depuis l'API.
   */
  async fetchGenres(): Promise<void> {
    const apiUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.genres = data.genres;
    } catch (error) {
      console.error("Erreur lors de la récupération des genres :", error);
    }
  }

  /**
   * Rendu initial de la section avec les filtres, tri et conteneur des séries.
   */
  render(): void {
    this.innerHTML = `
      <aside
        class="fixed top-0 left-0 z-40 w-auto h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div class="h-[606px] w-[253px] mt-[128px] ms-[47px] overflow-y-auto">
          <h1 class="text-[24px] font-bold px-[16px]">Series</h1>
          <div class="flex flex-col mt-[16px] py-[16px] bg-white gap-[16px] rounded-[8px]">
            <h2 class="text-[14px] px-[16px]">Sorting results</h2>
            <hr class="h-px bg-gray-200 border-0" />
            <form class="px-[16px]">
              <select id="sort-select" class="bg-[#29354E] text-white border border-gray-300 text-sm rounded-lg w-full p-2">
                <option value="popularity.desc" selected>Popular</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="first_air_date.desc">First Air Date Descending</option>
                <option value="first_air_date.asc">First Air Date Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
                <option value="vote_average.asc">Rating Ascending</option>
              </select>
            </form>
          </div>
          <div class="flex flex-col mt-[32px] py-[16px] bg-white gap-[16px] rounded-[8px]">
            <h2 class="text-[14px] px-[16px]">Filter results</h2>
            <hr class="h-px bg-gray-200 border-0" />
            <ul class="flex flex-wrap gap-[8px] px-[16px]" id="genres-list">
              ${this.genres.map(genre => `
                <a href="#" class="genre-filter px-[16px] py-[8px] text-[14px] text-[#29354E] border-2 border-[#29354E] rounded-full">
                  ${genre.name}
                </a>
              `).join('')}
            </ul>
          </div>
        </div>
      </aside>

      <div class="mt-[176px] sm:ml-[301px] pl-[48px]">
        <div class="mt-[32px] flex flex-wrap gap-[8px] gap-y-[32px] overflow-x-auto hide-scrollbar" id="series-container">
          <!-- Cartes Dynamiques -->
        </div>

        <nav class="flex justify-end mt-[32px] px-[144px] pb-[80px]">
          <ul class="inline-flex -space-x-px text-base h-10" id="pagination">
            <!-- Pagination Dynamique -->
          </ul>
        </nav>
      </div>
    `;
  }

  /**
   * Ajouter des écouteurs d'événements pour les filtres, tri et pagination.
   */
  addEventListeners(): void {
    const sortSelect = this.querySelector<HTMLSelectElement>('#sort-select');
    const genresList = this.querySelector<HTMLUListElement>('#genres-list');
    const pagination = this.querySelector<HTMLUListElement>('#pagination');

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        this.selectedSort = sortSelect.value;
        this.currentPage = 1; // Réinitialiser la page lors du tri
        this.fetchAndRenderSeries();
      });
    }

    if (genresList) {
      genresList.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (target && target.classList.contains('genre-filter')) {
          const genreName = target.textContent?.trim();
          const genre = this.genres.find(g => g.name.toLowerCase() === genreName?.toLowerCase());
          if (genre) {
            if (this.selectedGenre === genre.id) {
              this.selectedGenre = null; // Désélectionner si déjà sélectionné
              target.classList.remove('bg-[#29354E]', 'text-white');
              target.classList.add('text-[#29354E]', 'border-[#29354E]');
            } else {
              this.selectedGenre = genre.id;
              // Désélectionner les autres genres
              genresList.querySelectorAll('.genre-filter').forEach(el => {
                el.classList.remove('bg-[#29354E]', 'text-white');
                el.classList.add('text-[#29354E]', 'border-[#29354E]');
              });
              // Sélectionner le genre cliqué
              target.classList.remove('text-[#29354E]', 'border-[#29354E]');
              target.classList.add('bg-[#29354E]', 'text-white');
            }
            this.currentPage = 1; // Réinitialiser la page lors du filtre
            this.fetchAndRenderSeries();
          }
        }
      });
    }

    if (pagination) {
      pagination.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (target.tagName === 'A' && target.dataset.page) {
          const page = parseInt(target.dataset.page);
          if (page && page !== this.currentPage) {
            this.currentPage = page;
            this.fetchAndRenderSeries();
          }
        }
      });
    }
  }

  /**
   * Récupérer et afficher les séries en fonction des filtres, tri et pagination.
   */
  async fetchAndRenderSeries(): Promise<void> {
    const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=${this.selectedSort}&page=${this.currentPage}&with_genres=${this.selectedGenre || ''}`;

    try {
      const response = await fetch(apiUrl);
      const data: ApiResponse = await response.json();
      this.totalPages = data.total_pages;

      if (data.results && data.results.length > 0) {
        // Récupérer l'ordre sauvegardé pour la page actuelle
        const savedOrderKey = `orderedSeries_page_${this.currentPage}`;
        const savedOrder: string[] = JSON.parse(localStorage.getItem(savedOrderKey) || '[]');

        if (savedOrder.length > 0) {
          data.results.sort((a, b) => {
            const indexA = savedOrder.indexOf(a.id.toString());
            const indexB = savedOrder.indexOf(b.id.toString());
            return indexA - indexB;
          });
        }

        const seriesHTML = data.results
          .map((serie: Serie) => {
            const percentageScore = Math.round(serie.vote_average * 10);
            const posterPath = serie.poster_path
              ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
              : '/assets/images/img-unknow-movie.jpg'; // Image de remplacement

            return `
              <div
                class="relative w-[182px] flex-shrink-0 h-auto px-[16px] bg-white rounded-[8px] shadow-md cursor-pointer"
                data-id="${serie.id}"
                draggable="true"
              >
                <div class="relative w-auto">
                  <img src="${posterPath}" alt="${serie.name}" class="rounded-br-[8px] rounded-bl-[8px] w-full h-auto object-cover">
                  <div class="absolute -bottom-2 -right-2 w-[50px] h-[50px] bg-[#14213D] rounded-full flex items-center justify-center border-4 border-white">
                    <span class="text-white text-[14px] font-bold">${percentageScore}<span class="text-[8px]">%</span></span>
                  </div>
                </div>
                <div class="w-auto my-[10px] p-[8px]">
                  <h3 class="text-[18px] font-bold text-black justify-center">
                    <a href="#" class="hover:underline" data-id="${serie.id}" data-type="tv">
                      ${serie.name}
                    </a>
                  </h3>
                  <span class="text-[14px] font-light text-[#777777]">${new Date(serie.first_air_date).toLocaleDateString()}</span>
                </div>
              </div>
            `;
          })
          .join("");

        const container = this.querySelector<HTMLDivElement>('#series-container');
        if (container) {
          container.innerHTML = seriesHTML;

          // Ajouter des événements de clic aux cartes de séries
          container.querySelectorAll("[data-id]").forEach((card) => {
            card.addEventListener("click", (e) => {
              const target = e.target as HTMLElement;
              const link = target.closest('a[data-id]');
              if (link) {
                const serieId = link.getAttribute("data-id");
                const type = link.getAttribute("data-type");
                if (serieId && type) {
                  window.location.href = `/show.html?contentId=${serieId}&type=${type}`;
                }
              }
            });
          });

          // Ajouter les écouteurs pour drag-and-drop
          this.addDragAndDropListeners(container);
        }

        this.renderPagination();
      } else {
        const container = this.querySelector<HTMLDivElement>('#series-container');
        if (container) {
          container.innerHTML = `<p class="text-center text-gray-500">No series available.</p>`;
        }
        const pagination = this.querySelector<HTMLUListElement>('#pagination');
        if (pagination) {
          pagination.innerHTML = '';
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des séries :", error);
      const container = this.querySelector<HTMLDivElement>('#series-container');
      if (container) {
        container.innerHTML = `<p class="text-center text-red-500">Failed to load series. Please try again later.</p>`;
      }
      const pagination = this.querySelector<HTMLUListElement>('#pagination');
      if (pagination) {
        pagination.innerHTML = '';
      }
    }
  }

  /**
   * Ajouter les écouteurs d'événements pour drag-and-drop.
   */
  addDragAndDropListeners(container: HTMLDivElement): void {
    const draggableItems = container.querySelectorAll<HTMLElement>('[draggable="true"]');

    draggableItems.forEach(item => {
      item.addEventListener('dragstart', this.handleDragStart.bind(this));
      item.addEventListener('dragover', this.handleDragOver.bind(this));
      item.addEventListener('drop', this.handleDrop.bind(this));
      item.addEventListener('dragend', this.handleDragEnd.bind(this));
    });
  }

  /**
   * Gérer l'événement dragstart.
   */
  handleDragStart(event: DragEvent): void {
    const target = event.currentTarget as HTMLElement;
    this.draggedElement = target;
    target.classList.add('opacity-50');
    event.dataTransfer?.setData('text/plain', target.dataset.id || '');
    event.dataTransfer!.effectAllowed = 'move';
  }

  /**
   * Gérer l'événement dragover.
   */
  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    if (this.draggedElement && target !== this.draggedElement) {
      target.classList.add('border', 'border-dashed', 'border-blue-500');
      event.dataTransfer!.dropEffect = 'move';
    }
  }

  /**
   * Gérer l'événement drop.
   */
  handleDrop(event: DragEvent): void {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    if (this.draggedElement && target !== this.draggedElement) {
      target.classList.remove('border', 'border-dashed', 'border-blue-500');
      // Insérer la carte déplacée après la carte cible
      target.parentNode?.insertBefore(this.draggedElement, target.nextSibling);
      this.saveNewOrder();
    }
  }

  /**
   * Gérer l'événement dragend.
   */
  handleDragEnd(event: DragEvent): void {
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('opacity-50', 'border', 'border-dashed', 'border-blue-500');
    this.draggedElement = null;
  }

  /**
   * Sauvegarder le nouvel ordre des séries.
   */
  saveNewOrder(): void {
    const container = this.querySelector<HTMLDivElement>('#series-container');
    if (container) {
      const orderedIds = Array.from(container.children).map(child => child.getAttribute('data-id'));
      console.log("Nouvel ordre des séries :", orderedIds);
      const savedOrderKey = `orderedSeries_page_${this.currentPage}`;
      localStorage.setItem(savedOrderKey, JSON.stringify(orderedIds));
    }
  }

  /**
   * Rendu de la pagination.
   */
  renderPagination(): void {
    const pagination = this.querySelector<HTMLUListElement>('#pagination');
    if (!pagination) return;

    let paginationHTML = '';

    // Bouton "Previous"
    if (this.currentPage > 1) {
      paginationHTML += `
        <li>
          <a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-white bg-[#29354E] border border-e-0 border-[#E5E5E5] rounded-s-[8px] hover:bg-[#FCA311] hover:text-[#29354E]" data-page="${this.currentPage - 1}">Previous</a>
        </li>
      `;
    } else {
      paginationHTML += `
        <li>
          <span class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-400 bg-[#29354E] border border-e-0 border-[#E5E5E5] rounded-s-[8px]">Previous</span>
        </li>
      `;
    }

    // Pages (limité à 5 pages pour éviter trop de boutons)
    const maxPagesToShow = 5;
    const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i === this.currentPage) {
        paginationHTML += `
          <li>
            <span class="flex items-center justify-center px-4 h-10 leading-tight text-white bg-[#29354E] border border-[#E5E5E5]">${i}</span>
          </li>
        `;
      } else {
        paginationHTML += `
          <li>
            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-[#29354E] bg-[#FCA311] border border-[#E5E5E5] hover:bg-[#FCA311] hover:text-[#29354E]" data-page="${i}">${i}</a>
          </li>
        `;
      }
    }

    // Bouton "Next"
    if (this.currentPage < this.totalPages) {
      paginationHTML += `
        <li>
          <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-white bg-[#29354E] border border-[#E5E5E5] rounded-e-[8px] hover:bg-[#FCA311] hover:text-[#29354E]" data-page="${this.currentPage + 1}">Next</a>
        </li>
      `;
    } else {
      paginationHTML += `
        <li>
          <span class="flex items-center justify-center px-4 h-10 leading-tight text-gray-400 bg-[#29354E] border border-[#E5E5E5] rounded-e-[8px]">Next</span>
        </li>
      `;
    }

    pagination.innerHTML = paginationHTML;
  }
}

// Définition du composant personnalisé si ce n'est pas déjà fait
if (!customElements.get("serie-section")) {
  customElements.define("serie-section", SerieSection);
}
