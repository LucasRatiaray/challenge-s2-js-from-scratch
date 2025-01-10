const apiUrl = `https://api.themoviedb.org`
const apiKey = "e33d85365d7d139b64e59cc2738cf121"

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

function updatePage(page: number, category: string) {
    console.log({ page, category });
    window.location.href = `/series.html?page=${page}`;
}

function generateStars(voteAverage: number) {
  const maxStars = 5
  const rating = Math.round(voteAverage / 2)
  let starsHtml = ""

  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      starsHtml += `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      `
    } else {
      starsHtml += `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      `
    }
  }
  return starsHtml
}

function displayVideos(videos: any[]) {
  const mediaContent = document.getElementById('media-content')
  if (!mediaContent) return

  mediaContent.innerHTML = ''
  videos.forEach(video => {
    if (video.site === 'YouTube') {
      const videoDiv = document.createElement('div')
      videoDiv.className = 'mb-4'
      videoDiv.innerHTML = `
        <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/${video.key}" 
          frameborder="0" allowfullscreen
          class="rounded-lg">
        </iframe>
      `
      mediaContent.appendChild(videoDiv)
    }
  })
}

function displayImages(images: any[], type: 'backdrops' | 'posters') {
  const mediaContent = document.getElementById('media-content')
  if (!mediaContent) return

  mediaContent.innerHTML = ''
  const container = document.createElement('div')
  container.className = 'grid grid-cols-4 gap-4'

  images[type].forEach(image => {
    container.innerHTML += `
      <div class="aspect-[16/9] rounded-lg overflow-hidden">
        <img src="https://image.tmdb.org/t/p/w500${image.file_path}" 
             alt="Series ${type}" 
             class="w-full h-full object-cover">
      </div>
    `
  })

  mediaContent.appendChild(container)
}

function displayRecommendations(recommendations: any[]) {
  const container = document.getElementById('recommendations-grid')
  if (!container) return

  container.innerHTML = recommendations.map(series => `
    <div class="cursor-pointer" onclick="window.location.href='detail.html?series_id=${series.id}'">
      <div class="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
        <img 
          src="https://image.tmdb.org/t/p/w500${series.poster_path}"
          alt="${series.name}"
          class="w-full h-full object-cover"
        >
      </div>
      <h3 class="font-semibold text-sm">${series.name}</h3>
      <p class="text-sm text-gray-400">${series.first_air_date?.split('-')[0] || 'N/A'}</p>
    </div>
  `).join('')
}

document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search)
  const isSeries = params.has("series_id")

  if (!isSeries) return; // Only continue if this is a series

  const series_id = params.get("series_id") || ""

  // Fetch and display series details
  fetch(`${apiUrl}/3/tv/${series_id}?api_key=${apiKey}&language=fr-FR`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      return response.json()
    })
    .then(series => {
      const title = document.querySelector("#movie-title")
      if (title) title.textContent = series.name

      const poster = document.querySelector("#movie-poster")
      if (poster) {
        (poster as HTMLImageElement).src = `https://image.tmdb.org/t/p/w500${series.poster_path}`
        (poster as HTMLImageElement).alt = series.name
      }

      const genre = document.querySelector("#movie-genre")
      if (genre) {
        const genres = series.genres
        genre.textContent = genres.map((genre: any) => genre.name).join(", ")
      }

      const year = document.querySelector("#movie-year")
      if (year) year.textContent = series.first_air_date

      const rating = document.querySelector("#movie-rating")
      if (rating) rating.textContent = series.vote_average

      const overview = document.querySelector("#movie-synopsis")
      if (overview) overview.textContent = series.overview
    })
    .catch(error => console.error("Error fetching series data:", error))

  // Fetch and display credits
  fetch(`${apiUrl}/3/tv/${series_id}/credits?api_key=${apiKey}&language=fr-FR`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      return response.json()
    })
    .then(credits => {
      const creator = credits.crew.find((person: any) => person.job === "Creator")
      const directorName = document.querySelector("#movie-director")
      if (directorName) directorName.textContent = creator?.name || "Unknown"

      const actors = credits.cast.slice(0, 10)
      const actorsContainer = document.querySelector("#movie-actors")
      if (actorsContainer) {
        actorsContainer.innerHTML = ""
        actors.forEach((actor: any) => {
          const elem = document.createElement("div")
          elem.innerHTML = `
            <div class="bg-white rounded-lg overflow-hidden shadow">
              <div class="aspect-[3/4]">
                <img src="https://image.tmdb.org/t/p/w500/${actor.profile_path}" 
                     alt="${actor.name || "Unknown"}" 
                     class="w-full h-full object-cover" />
              </div>
              <div class="p-4">
                <h3 class="font-semibold">${actor.name || "Unknown"}</h3>
                <p class="text-sm text-gray-600">${actor.character || "Unknown"}</p>
              </div>
            </div>
          `
          actorsContainer.append(elem)
        })
      }
    })
    .catch(error => console.error("Error fetching credits:", error))

  // Fetch and display media and recommendations
  const mediaData = await fetch(`${apiUrl}/3/tv/${series_id}/videos?api_key=${apiKey}&language=fr-FR`)
    .then(r => r.json())
  const imagesData = await fetch(`${apiUrl}/3/tv/${series_id}/images?api_key=${apiKey}`)
    .then(r => r.json())

  const tabs = document.querySelectorAll('.media-tab')
  tabs[0].textContent = `Vidéos (${mediaData.results.length})`
  tabs[1].textContent = `Fonds d'écran (${imagesData.backdrops.length})`
  tabs[2].textContent = `Affiches (${imagesData.posters.length})`

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.replace('bg-[#FCA311]', 'bg-gray-200'))
      tab.classList.replace('bg-gray-200', 'bg-[#FCA311]')

      const type = (tab as HTMLElement).dataset.tabType
      switch(type) {
        case 'videos':
          displayVideos(mediaData.results)
          break
        case 'wallpapers':
          displayImages(imagesData, 'backdrops')
          break
        case 'posters':
          displayImages(imagesData, 'posters')
          break
      }
    })
  })

  displayVideos(mediaData.results)

  const recommendations = await fetch(
    `${apiUrl}/3/tv/${series_id}/recommendations?api_key=${apiKey}&language=fr-FR&page=1`
  )
    .then(r => r.json())
    .then(data => data.results.slice(0, 5))

  displayRecommendations(recommendations)
})