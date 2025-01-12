// src/ts/components/show/ShowSection.ts
import { Content } from "../../types/Content";
import { Movie } from "../../types/Movie";
import { Serie } from "../../types/Serie";

// API key injectée par Webpack
const apiKey = process.env.API_KEY;

class ShowSection extends HTMLElement {
  constructor() {
    super();
    console.log("ShowSection: constructor called");
  }

  /**
   * Fonction appelée lorsque le composant est ajouté au DOM.
   */
  async connectedCallback(): Promise<void> {
    console.log("ShowSection: connectedCallback called");

    const contentId = this.getContentIdFromUrl();
    const contentType = this.getContentTypeFromUrl();

    if (!contentId || !contentType) {
      this.innerHTML = `<p class="text-center text-red-500">No content selected. Please go back to the home page.</p>`;
      return;
    }

    try {
      const [content, credits, recommendations] = await Promise.all([
        this.fetchContentDetails(contentId, contentType),
        this.fetchContentCredits(contentId, contentType),
        this.fetchRecommendations(contentId, contentType),
      ]);

      this.renderContentDetails(content, credits.cast, recommendations);
      this.addRecommendationsClickListeners(); // Ajout de gestionnaires de clic
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du contenu :",
        error
      );
      this.innerHTML = `<p class="text-center text-red-500">Failed to load content details. Please try again later.</p>`;
    }
  }

  /**
   * Récupère l'ID du contenu depuis l'URL.
   */
  getContentIdFromUrl(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get("contentId");
  }

  /**
   * Récupère le type de contenu (movie ou tv) depuis l'URL.
   */
  getContentTypeFromUrl(): 'movie' | 'tv' | null {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (type === 'movie' || type === 'tv') {
      return type;
    }
    return null;
  }

  /**
   * Récupère les détails du contenu depuis l'API.
   */
  async fetchContentDetails(contentId: string, contentType: 'movie' | 'tv'): Promise<Content> {
    const apiUrl = `https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Failed to fetch ${contentType} details.`);
    return response.json();
  }

  /**
   * Récupère les crédits du contenu depuis l'API.
   */
  async fetchContentCredits(contentId: string, contentType: 'movie' | 'tv'): Promise<{ cast: any[] }> {
    const apiUrl = `https://api.themoviedb.org/3/${contentType}/${contentId}/credits?api_key=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Failed to fetch ${contentType} credits.`);
    return response.json();
  }

  /**
   * Récupère les recommandations de contenus depuis l'API.
   */
  async fetchRecommendations(contentId: string, contentType: 'movie' | 'tv'): Promise<Content[]> {
    const apiUrl = `https://api.themoviedb.org/3/${contentType}/${contentId}/recommendations?api_key=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Failed to fetch recommendations.`);
    const data = await response.json();
    return data.results as Content[];
  }

  /**
   * Fonction utilitaire pour obtenir le chemin de l'image ou une image de remplacement.
   */
  getImagePath(path: string | null, defaultPath: string, size: string = 'w500'): string {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : defaultPath;
  }

  /**
   * Rendu des détails du contenu (film ou série).
   */
  renderContentDetails(content: Content, cast: any[], recommendations: Content[]): void {
    const backdropPath = this.getImagePath(
      content.backdrop_path,
      '/assets/images/img-unknow-movie.jpg',
      'original' // Taille pour le backdrop
    );
    const posterPath = this.getImagePath(
      content.poster_path,
      '/assets/images/img-unknow-movie.jpg',
      'w500' // Taille pour le poster
    );

    const title = 'title' in content ? content.title : content.name;
    const releaseDate = 'release_date' in content ? content.release_date : content.first_air_date;

    this.innerHTML = `
      <section class="bg-cover bg-center bg-no-repeat flex flex-col w-auto h-[600px] relative pt-[118px] p-[32px]"
        style="background-image: url('${backdropPath}')">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="z-10 text-center flex gap-[70px]">
          <div class="min-w-[300px] h-[450px]">
            <img src="${posterPath}" alt="${title}" class="w-full h-full object-cover rounded-[8px]">
          </div>
          <div class="text-white flex flex-col gap-[16px] px-[32px] py-[16px]">
            <h3 class="text-[36px] font-bold text-start">
              ${title} <span class="font-normal">(${new Date(releaseDate).getFullYear()})</span>
            </h3>
            <p class="text-[16px] text-start">${content.genres
      .map((genre: { name: string }) => genre.name)
      .join(", ")}</p>
            <div class="flex items-center gap-[8px]">
              <div
                class="w-[50px] h-[50px] bg-[#14213D] rounded-full flex items-center justify-center border-4 border-white">
                <span class="text-white text-[14px] font-bold">${Math.round(
      content.vote_average * 10
    )}<span class="text-[8px]">%</span></span>
              </div>
              <span class="font-bold italic">Assessment score</span>
            </div>
            <p class="italic text-gray-200 font-thin text-start">${
      content.tagline || "No tagline available."
    }</p>
            <h4 class="text-[18px] font-bold text-start">Synopsis</h4>
            <p class="text-start light">${content.overview}</p>
            <div>
              <h5 class="text-[18px] font-bold text-start">${
      content.production_companies[0]?.name || "Unknown"
    }</h5>
              <p class="text-gray-200 font-thin text-start">Production Company</p>
            </div>
          </div>
        </div>
      </section>
      ${this.renderActorsSection(cast)}
      ${this.renderRecommendationsSection(recommendations)}
    `;
  }

  /**
   * Rendu de la section des acteurs avec images de remplacement si nécessaire.
   */
  renderActorsSection(cast: any[]): string {
    if (!cast || cast.length === 0) {
      return `<p class="text-center text-gray-500 mt-[32px] px-5 py-2 rounded-[8px] shadow-sm">No actors available.</p>`;
    }

    const actorsHTML = cast
      .slice(0, 10) // Limiter à 10 acteurs principaux
      .map((actor) => {
        const profilePath = this.getImagePath(
          actor.profile_path,
          '/assets/images/img-unknow-actor.jpg',
          'w500' // Taille pour les profils d'acteurs
        );

        return `
          <div class="relative w-[182px] flex-shrink-0 h-auto">
            <div class="relative w-auto">
              <img src="${profilePath}" alt="${actor.name}" class="rounded-tr-[8px] rounded-tl-[8px] w-full h-auto object-cover">
            </div>
            <div class="w-auto pt-[18px] p-[8px] mb-[32px] shadow-lg bg-white rounded-bl-[8px] rounded-br-[8px]">
              <h3 class="text-[18px] font-bold text-black mb-[4px]">${actor.name}</h3>
              <span class="text-[16px] font-light text-[#777777]">${actor.character}</span>
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <section class="mt-[32px] ps-[104px] relative">
        <div class="flex gap-[16px] items-center px-[20px]">
          <h2 class="text-[24px] font-bold text-black">Actors</h2>
        </div>
        <div class="mt-[32px] flex flex-nowrap gap-[32px] overflow-x-auto hide-scrollbar">
          ${actorsHTML}
        </div>
      </section>
    `;
  }

  /**
   * Rendu de la section des recommandations avec images de remplacement si nécessaire.
   */
  renderRecommendationsSection(recommendations: Content[]): string {
    if (!recommendations || recommendations.length === 0) {
      return `<p class="text-center text-gray-500">No recommendations available.</p>`;
    }

    const recommendationsHTML = recommendations
      .slice(0, 10) // Limiter à 10 recommandations
      .map((content) => {
        const backdropPath = this.getImagePath(
          content.backdrop_path,
          '/assets/images/img-unknow-movie.jpg',
        );

        const title = 'title' in content ? content.title : content.name;

        return `
          <div class="relative w-[322px] flex-shrink-0 h-auto px-[16px] cursor-pointer" data-id="${content.id}" data-type="${'title' in content ? 'movie' : 'tv'}">
            <div class="relative w-auto">
              <img src="${backdropPath}" alt="${title}" class="rounded-[8px] w-full h-[163px] object-cover">
            </div>
            <div class="flex w-auto mt-[10px] p-[8px] justify-between">
              <p class="text-[18px] font-thin text-white">${title}</p>
              <p class="text-[18px] font-thin text-white">${Math.round(
        content.vote_average * 10
      )}%</p>
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <section class="mt-[32px] ps-[104px] relative py-[32px] bg-[#14213D]">
        <div class="flex gap-[16px] items-center px-[74px]">
          <h2 class="text-[24px] font-bold text-white">Recommendations</h2>
        </div>
        <div id="recommendations" class="mt-[32px] flex flex-nowrap gap-[32px] overflow-x-auto hide-scrollbar">
          ${recommendationsHTML}
        </div>
      </section>
    `;
  }

  /**
   * Ajoute des gestionnaires de clic aux recommandations pour naviguer vers la page du contenu sélectionné.
   */
  addRecommendationsClickListeners(): void {
    const recommendations = this.querySelectorAll("#recommendations [data-id]");
    recommendations.forEach((element) => {
      element.addEventListener("click", () => {
        const contentId = element.getAttribute("data-id");
        const contentType = element.getAttribute("data-type");
        if (contentId && contentType) {
          window.location.href = `/show.html?contentId=${contentId}&type=${contentType}`;
        }
      });
    });
  }
}

// Définition du composant personnalisé si ce n'est pas déjà fait
if (!customElements.get("show-section")) {
  customElements.define("show-section", ShowSection);
}
