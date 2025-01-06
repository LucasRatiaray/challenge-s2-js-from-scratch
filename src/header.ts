/* eslint-disable prettier/prettier */
export function renderHeader() {
  const header = document.createElement("header");
  header.innerHTML = `
        <nav class="bg-primary border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex items-center justify-between mx-auto p-1">
    <!-- Logo -->
    <a
      href="index.html"
      class="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <lord-icon
        src="https://cdn.lordicon.com/ulttckpo.json"
        trigger="loop"
        delay="2000"
        colors="primary:#121331,secondary:#e4e4e4,tertiary:#f4ce14,quaternary:#495e57"
        class="w-16 h-16"
      >
      </lord-icon>
      <span
        class="self-center text-3xl font-extrabold whitespace-nowrap text-secondary dark:text-white"
        >GeorgesHub</span
      >
    </a>
    <!-- Barre de recherche -->
    <div class="flex-1 flex justify-center mx-4">
      <div class="relative hidden md:block">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-700 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Icône de recherche</span>
        </div>
        <input
          type="text"
          id="search-navbar"
          class="block w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-500 rounded-md bg-gray-50 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Rechercher..."
        />
      </div>
    </div>
    <!-- Liens de navigation -->
    <div class="flex items-center">
      <!-- Liens pour les écrans moyens et plus grands -->
      <div class="hidden xl:block">
        <ul class="flex space-x-8 items-center">
          <li>
            <a
              href="#"
              class="text-white font-semibold underline underline-offset-8 decoration-secondary dark:text-white hover:text-white dark:hover:text-blue-500"
              >Movies</a
            >
          </li>
          <li>
            <a
              href="#"
              class="text-white font-semibold underline underline-offset-8 decoration-secondary dark:text-white hover:text-white dark:hover:text-blue-500"
              >Series</a
            >
          </li>
          <li>
            <a
              href="#"
              class="text-white font-semibold underline underline-offset-8 decoration-secondary dark:text-white hover:text-white dark:hover:text-blue-500"
              >Genres</a
            >
          </li>
          <li>
            <a
              href="#"
              class="text-white font-semibold underline underline-offset-8 decoration-secondary dark:text-white hover:text-white dark:hover:text-blue-500"
              >Our Reviews</a
            >
          </li>

          <button
            onclick="window.location.href='/login-signup.html'"
            type="button"
            class="text-primary bg-secondary hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full py-1 px-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
        </ul>
      </div>
      <!-- Bouton du menu pour les petits écrans -->
      <button
        data-collapse-toggle="navbar-search"
        type="button"
        class="inline-flex items-center p-2 ml-1 text-sm text-secondary rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-search"
        aria-expanded="false"
      >
        <span class="sr-only">Ouvrir le menu principal</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
  </div>
  <!-- Menu mobile -->
  <div
    class="items-center justify-between hidden w-full md:hidden"
    id="navbar-search"
  >
    <div class="relative mt-3">
      <!-- Barre de recherche mobile -->
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="text"
        id="search-navbar-mobile"
        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Rechercher..."
      />
    </div>
    <ul
      class="flex flex-col p-4 mt-4 space-y-2 font-medium border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    >
      <li>
        <a
          href="#"
          class="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
          >Accueil</a
        >
      </li>
      <li>
        <a
          href="#"
          class="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
          >À propos</a
        >
      </li>
      <li>
        <a
          href="#"
          class="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
          >Services</a
        >
      </li>
    </ul>
  </div>
</nav>

    `;
  document.body.prepend(header); // Insérer le header au début du body
}
