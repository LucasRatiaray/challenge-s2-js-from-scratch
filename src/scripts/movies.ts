import axios from 'axios';

const apiKey = 'e33d85365d7d139b64e59cc2738cf121';
const apiUrl = `https://api.themoviedb.org/3/trending/movie/day`;

axios.get(apiUrl, {
  params: {
    api_key: apiKey,
    language: 'fr-FR',
  },
})
  .then(response => {
    const movies = response.data.results;
    // Appeler une fonction pour afficher les films
    displayMovies(movies);
  })
  .catch(error => console.error('Erreur lors de la récupération des films tendance :', error));

export function displayMovies(movies: any[]) {
  // Sélectionner le conteneur où les cartes seront insérées
  const moviesContainer = document.querySelector('.grid');

  if (moviesContainer) {
    // Vider le conteneur au cas où il y aurait déjà du contenu
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
      // Créer un élément div pour la carte
      const card = document.createElement('div');
      card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden');

      // Générer le contenu HTML de la carte
      card.innerHTML = `
        <div class="h-48 md:h-48 lg:h-56 w-full overflow-hidden">
          <img class="w-full h-full object-cover" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">${movie.title}</h3>
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
    console.error('Le conteneur des films n\'a pas été trouvé dans le DOM.');
  }
}

export function generateStars(voteAverage: number) {
  const maxStars = 5;
  const rating = Math.round(voteAverage / 2); // Convertir la note sur 5
  let starsHtml = '';

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
