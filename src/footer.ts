/* eslint-disable prettier/prettier */
export function renderFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <footer class="bg-primary dark:bg-gray-900">
      <div class="w-full max-w-screen-xl mx-auto md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <!-- Logo -->
          <a
            href="https://flowbite.com/"
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
          <ul
            class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400 gap-4"
          >
            <li>
              <a
                href="#"
                class="rounded-md py-2 px-4 text-primary bg-white text-md hover:bg-primary hover:text-secondary hover:border-2 hover:border-secondary"
                >Contact us</a
              >
            </li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M3 11c0-3.771 0-5.657 1.172-6.828S7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172S21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828S16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172S3 16.771 3 13z"
                />
                <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor" />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </g>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
              viewBox="0 0 14 14"
            >
              <g fill="none">
                <g clip-path="url(#primeTwitter0)">
                  <path
                    fill="currentColor"
                    d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
                  />
                </g>
                <defs>
                  <clipPath id="primeTwitter0">
                    <path fill="#fff" d="M0 0h14v14H0z" />
                  </clipPath>
                </defs>
              </g>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4a20 20 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2"
              />
            </svg>
          </ul>
        </div>
        <hr
          class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
        />
        <span class="block text-sm text-white sm:text-center dark:text-gray-400"
          >© 2024 <a href="" class="hover:underline">GeorgesHub™</a>. All
          Rights Reserved.</span
        >
      </div>
    </footer>
  `;
  document.body.append(footer);
}
