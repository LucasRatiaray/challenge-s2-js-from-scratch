// src/ts/pages/home.ts
import "../components/home/BannerSection";
import "../components/home/PopularSection";
import "../components/home/TrendSection";
import "../components/home/TrailerSection";
import "../components/home/GenreSection";

function initializeHomePage(): void {
  console.log("Home Page charged");
  // Scripts spécifiques à la page d'accueil
}

window.addEventListener("DOMContentLoaded", initializeHomePage);
