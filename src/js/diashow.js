const images = document.querySelectorAll(".img-container > img");
const body = document.querySelector("body");

const SVGClose = document.createElement("svg");
SVGClose.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!
                        Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License -
                        https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>`;
SVGClose.addEventListener('click', deleteBackgroundLayer);

const SVGPrevious = document.createElement("svg");
SVGPrevious.innerHTML = `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 448 512"
                        >
                        <!--!
                        Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License -
                        https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                        />
                        </svg>`;

const SVGNext = document.createElement("svg");
SVGNext.innerHTML = `<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 448 512"
                    >
                    <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                    />
                    </svg>`;

for (const img of images) {
  const containerImages = img.parentNode.children;
  img.addEventListener("click", () => {
    openDiashow(img.cloneNode(), containerImages);
  });
}

function openDiashow(clickedImage, containerImages) {
  body.classList.add("no-scroll");
  createBackgroundLayer(clickedImage, containerImages);
}

function createBackgroundLayer(clickedImage, containerImages) {
  const layer = document.createElement("div");
  layer.classList.add("diashow");

  const layerImageContainer = document.createElement("div");
  layerImageContainer.classList.add("layer-img-container");
  for (let i = 0; i < containerImages.length; i++) {
    const currentImage = containerImages[i].cloneNode();
    currentImage.addEventListener('click', () => {
        setMainImage(currentImage);
    })
    if (currentImage.getAttribute("src") == clickedImage.getAttribute("src")) {
      currentImage.classList.add("active-img");
    }
    layerImageContainer.append(currentImage);
  }

//   const layerButtons = document.createElement("div");
//   layerButtons.classList.add("layer-buttons");
//   layerButtons.append(SVGPrevious, SVGNext);

  const mainImageContainer = document.createElement('div');
  mainImageContainer.classList.add('main-img-container');
  mainImageContainer.append(clickedImage);

  const container = document.createElement('div');
  container.classList.add('container');
  container.append(SVGClose, document.createElement('div'), mainImageContainer, layerImageContainer)

  layer.append(container);
  body.append(layer);
}

function setMainImage(image) {
    const mainImageContainer = document.querySelector('.main-img-container');
    mainImageContainer.querySelector('img').remove();
    mainImageContainer.prepend(image.cloneNode());
    const layerImageContainer = document.querySelector('.layer-img-container');
    for (let image of layerImageContainer.children) {
        image.classList.remove('active-img');
    }
    image.classList.add('active-img');
}

function deleteBackgroundLayer() {
    body.classList.remove('no-scroll');
    document.querySelector('.diashow').remove();
}