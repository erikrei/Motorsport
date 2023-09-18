// -------------------------- Header

const navigationIcon = document.querySelector(".nav-icon");
const navigation = document.querySelector("nav");

navigationIcon.addEventListener("click", () => {
  navigationIcon.classList.toggle("active");
  // Wenn Menü offen ist, wird display: flex der Navigation hinzugefügt
  navigationIcon.classList.contains("active")
    ? navigation.classList.add("d-flex")
    : navigation.classList.remove("d-flex");
});

// --------------------------- Slideshow

const prevButton = document.querySelector(".slide-prev");
const nextButton = document.querySelector(".slide-next");
let currentImage = document.querySelector("article.active");
const slideshowImagesTotal = document.querySelectorAll("section article");
let imageIndex = 0;

const slideshowBars = document.querySelectorAll(".slide-bar");

prevButton.addEventListener("click", () => {
  if (imageIndex - 1 >= 0) {
    imageIndex--;
  } else {
    imageIndex = slideshowImagesTotal.length - 1;
  }
  currentImage = slideshowImagesTotal[imageIndex];
  setSlideshowImageAndBar(currentImage, imageIndex);
});

nextButton.addEventListener("click", () => {
  if (imageIndex + 1 <= slideshowImagesTotal.length - 1) {
    imageIndex++;
  } else {
    imageIndex = 0;
  }
  currentImage = slideshowImagesTotal[imageIndex];
  setSlideshowImageAndBar(currentImage, imageIndex);
});

for (const bar of slideshowBars) {
  bar.addEventListener("click", () => {
    // Index bekommen vom geklicktem Element
    const clickedIndex = [...bar.parentElement.children].indexOf(bar);
    // imageIndex updaten
    imageIndex = clickedIndex;

    setSlideshowImageAndBar(slideshowImagesTotal[clickedIndex], clickedIndex);

    // Fügt der angeklickten Bar die 'active' Klasse hinzu
    addActiveClassElement(bar);
  });
}

function setSlideshowImageAndBar(element, index) {
  removeActiveClassArray(slideshowImagesTotal);
  removeActiveClassArray(slideshowBars);
  addActiveClassElement(slideshowBars[index]);
  addActiveClassElement(element);
}

function removeActiveClassArray(elementArr) {
  for (const element of elementArr) {
    element.classList.remove("active");
  }
}

function removeActiveClassElement(element) {
  element.classList.remove("active");
}

function addActiveClassElement(element) {
  element.classList.add("active");
}
