/* eslint-disable prettier/prettier */

import { renderHeader } from "./header.js";
import { renderFooter } from "./footer.js";

renderHeader();

// Carrousel d'acteurs
const carousel = document.getElementById("carousel") as HTMLElement;
const prevButton = document.getElementById("prevButton") as HTMLButtonElement;
const nextButton = document.getElementById("nextButton") as HTMLButtonElement;

let currentIndex = 0;

const slides = carousel.children.length;

const updateCarousel = () => {
  const slideWidth = 200 + 16; // Largeur de l'image + marge
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
};

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides;
  updateCarousel();
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides) % slides;
  updateCarousel();
});

// Initialisation
updateCarousel();

renderFooter();
