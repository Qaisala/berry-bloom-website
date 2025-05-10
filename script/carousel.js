// JavaScript for the Women's Carousel
const womensCarousel = document.getElementById("womensCarousel");
const womensSlideWidth = 170;
let womensAutoSlideTimer;
let isMouseOverWomensCarousel = false;

function scrollWomensCarousel(direction) {
  womensCarousel.scrollLeft += direction * womensSlideWidth;

  if (
    direction === 1 &&
    womensCarousel.scrollLeft >=
      womensCarousel.scrollWidth - womensCarousel.clientWidth - 5
  ) {
    womensCarousel.scrollLeft = 0;
  } else if (direction === -1 && womensCarousel.scrollLeft <= 5) {
    womensCarousel.scrollLeft =
      womensCarousel.scrollWidth - womensCarousel.clientWidth;
  }
}

function startWomensAutoSlide() {
  womensAutoSlideTimer = setInterval(() => {
    if (!isMouseOverWomensCarousel) {
      scrollWomensCarousel(1);
    }
  }, 2000);
}

function stopWomensAutoSlide() {
  clearInterval(womensAutoSlideTimer);
}

startWomensAutoSlide();

womensCarousel.addEventListener("mouseenter", () => {
  isMouseOverWomensCarousel = true;
  stopWomensAutoSlide();
});

womensCarousel.addEventListener("mouseleave", () => {
  isMouseOverWomensCarousel = false;
  startWomensAutoSlide();
});

// Target the buttons within the first .carousel-item
const womensCarouselItem = document.querySelector(
  ".parent-carsoul > div:first-child"
);
const womensPrevButton = womensCarouselItem.querySelector(
  ".carousel-button.prev"
);
const womensNextButton = womensCarouselItem.querySelector(
  ".carousel-button.next"
);

womensPrevButton.addEventListener("click", stopWomensAutoSlide);
womensNextButton.addEventListener("click", stopWomensAutoSlide);

// JavaScript for the Men's Carousel
const mensCarousel = document.getElementById("mensCarousel");
const mensSlideWidth = 170;
let mensAutoSlideTimer;
let isMouseOverMensCarousel = false;

function scrollMensCarousel(direction) {
  mensCarousel.scrollLeft += direction * mensSlideWidth;

  if (
    direction === 1 &&
    mensCarousel.scrollLeft >=
      mensCarousel.scrollWidth - mensCarousel.clientWidth - 5
  ) {
    mensCarousel.scrollLeft = 0;
  } else if (direction === -1 && mensCarousel.scrollLeft <= 5) {
    mensCarousel.scrollLeft =
      mensCarousel.scrollWidth - mensCarousel.clientWidth;
  }
}

function startMensAutoSlide() {
  mensAutoSlideTimer = setInterval(() => {
    if (!isMouseOverMensCarousel) {
      scrollMensCarousel(1);
    }
  }, 2000);
}

function stopMensAutoSlide() {
  clearInterval(mensAutoSlideTimer);
}

startMensAutoSlide();

mensCarousel.addEventListener("mouseenter", () => {
  isMouseOverMensCarousel = true;
  stopMensAutoSlide();
});

mensCarousel.addEventListener("mouseleave", () => {
  isMouseOverMensCarousel = false;
  startMensAutoSlide();
});

// Target the buttons within the second .carousel-item
const mensCarouselItem = document.querySelector(
  ".parent-carsoul > div:last-child"
);
const mensPrevButton = mensCarouselItem.querySelector(".carousel-button.prev");
const mensNextButton = mensCarouselItem.querySelector(".carousel-button.next");

mensPrevButton.addEventListener("click", stopMensAutoSlide);
mensNextButton.addEventListener("click", stopMensAutoSlide);
