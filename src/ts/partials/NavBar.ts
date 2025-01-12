// src/ts/partials/NavBar.ts
class NavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(): void {
    const currentPath = window.location.pathname;

    this.innerHTML = `
      <nav
        class="flex items-center bg-[#14213D]/90 backdrop-blur-xl text-white rounded-full shadow-lg w-auto fixed top-[16px] left-1/2 transform -translate-x-1/2 z-50 px-[16px] py-[12px] gap-[10px]">
        <div class="h-[40px]">
          <svg class="h-full" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.3333 41.3337C32.4588 41.3337 40.6667 33.1258 40.6667 23.0003C40.6667 12.8748 32.4588 4.66699 22.3333 4.66699C12.2078 4.66699 4 12.8748 4 23.0003C4 33.1258 12.2078 41.3337 22.3333 41.3337Z"
              stroke="#FCA311" stroke-width="4" stroke-linejoin="round" />
            <path
              d="M22.3333 17.5005C23.0626 17.5005 23.7621 17.2108 24.2778 16.695C24.7935 16.1793 25.0833 15.4798 25.0833 14.7505C25.0833 14.0211 24.7935 13.3217 24.2778 12.8059C23.7621 12.2902 23.0626 12.0005 22.3333 12.0005C21.6039 12.0005 20.9044 12.2902 20.3887 12.8059C19.873 13.3217 19.5833 14.0211 19.5833 14.7505C19.5833 15.4798 19.873 16.1793 20.3887 16.695C20.9044 17.2108 21.6039 17.5005 22.3333 17.5005ZM22.3333 34.0005C23.0626 34.0005 23.7621 33.7108 24.2778 33.195C24.7935 32.6793 25.0833 31.9798 25.0833 31.2505C25.0833 30.5211 24.7935 29.8217 24.2778 29.3059C23.7621 28.7902 23.0626 28.5005 22.3333 28.5005C21.6039 28.5005 20.9044 28.7902 20.3887 29.3059C19.873 29.8217 19.5833 30.5211 19.5833 31.2505C19.5833 31.9798 19.873 32.6793 20.3887 33.195C20.9044 33.7108 21.6039 34.0005 22.3333 34.0005ZM14.0833 25.7505C14.8126 25.7505 15.5121 25.4608 16.0278 24.945C16.5435 24.4293 16.8333 23.7298 16.8333 23.0005C16.8333 22.2711 16.5435 21.5717 16.0278 21.0559C15.5121 20.5402 14.8126 20.2505 14.0833 20.2505C13.3539 20.2505 12.6544 20.5402 12.1387 21.0559C11.623 21.5717 11.3333 22.2711 11.3333 23.0005C11.3333 23.7298 11.623 24.4293 12.1387 24.945C12.6544 25.4608 13.3539 25.7505 14.0833 25.7505ZM30.5833 25.7505C31.3126 25.7505 32.0121 25.4608 32.5278 24.945C33.0435 24.4293 33.3333 23.7298 33.3333 23.0005C33.3333 22.2711 33.0435 21.5717 32.5278 21.0559C32.0121 20.5402 31.3126 20.2505 30.5833 20.2505C29.8539 20.2505 29.1544 20.5402 28.6387 21.0559C28.123 21.5717 27.8333 22.2711 27.8333 23.0005C27.8333 23.7298 28.123 24.4293 28.6387 24.945C29.1544 25.4608 29.8539 25.7505 30.5833 25.7505Z"
              stroke="#FCA311" stroke-width="4" stroke-linejoin="round" />
            <path d="M22.3333 41.3335H40.6666" stroke="#FCA311" stroke-width="4" stroke-linecap="round" />
          </svg>
        </div>

        <div class="flex items-center justify-center px-[16px] py-[8px] rounded-full home-link">
          <a href="/" class="font-bold text-[14px] uppercase" style="letter-spacing: 2px;">
            home
          </a>
        </div>

        <div class="flex items-center justify-center px-[16px] py-[8px] rounded-full movie-link">
          <a href="/movie.html" class="font-bold text-[14px] uppercase" style="letter-spacing: 2px;">
            movies
          </a>
        </div>

        <div class="flex items-center justify-center px-[16px] py-[8px] rounded-full series-link">
          <a href="/serie.html" class="font-bold text-[14px] uppercase" style="letter-spacing: 2px;">
            series
          </a>
        </div>

        <div class="flex items-center justify-center px-[16px] py-[8px] rounded-full bg-[#FCA311] gap-[4px]">
          <a href="/login.html" class="font-bold text-[14px] uppercase text-black" style="letter-spacing: 2px;">
            login
          </a>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_475_2256)">
              <path
                d="M8.66675 15.1109C10.5527 15.1109 12.3615 14.3617 13.6951 13.0281C15.0287 11.6945 15.7779 9.88577 15.7779 7.99978C15.7779 6.1138 15.0287 4.30506 13.6951 2.97147C12.3615 1.63788 10.5527 0.888672 8.66675 0.888672"
                stroke="black" stroke-width="1.8" stroke-linecap="round" />
              <path d="M1.55566 7.99967H10.4446M10.4446 7.99967L7.77789 5.33301M10.4446 7.99967L7.77789 10.6663"
                stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_475_2256">
                <rect width="16" height="16" fill="white" transform="translate(0.666748)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </nav>
    `;

    this.updateActiveLink(currentPath);
  }

  /**
   * Met à jour la classe des liens en fonction du chemin actuel.
   * @param currentPath Le chemin actuel de la page.
   */
  updateActiveLink(currentPath: string): void {
    const links = [
      { path: "/", className: ".home-link" },
      { path: "/movie.html", className: ".movie-link" },
      { path: "/serie.html", className: ".series-link" },
    ];

    links.forEach((link) => {
      const element = this.querySelector(link.className);
      if (element) {
        if (currentPath === link.path) {
          (element as HTMLElement).style.boxShadow = "inset 0 0 0 2px white";
        } else {
          (element as HTMLElement).style.boxShadow = "none";
        }
      }
    });
  }
}

if (!customElements.get("nav-bar")) {
  customElements.define("nav-bar", NavBar);
}
