const body = document.querySelector("body");
const customButton = document.getElementById("customize-button");
const layer = document.getElementById("full-size-layer");
const layerCloseButton = document.querySelector(".layer-header svg");
const choiceContainers = document.querySelectorAll(".layer-choice");
const sumPrice = document.getElementById("price");
const list = document.querySelector(".summary-list > ul");
customButton.addEventListener("click", openAnpasser);
layerCloseButton.addEventListener("click", closeAnpasser);

// Je nach Auswahl wird der Preis angepasst
const prices = {
  städtetour: 500,
  landschaftstour: 500,
  gebirge: 250,
  wüste: 350,
  küsten: 500,
  flüsse: 200,
  wälder: 100,
  berlin: 500,
  kalifornien: 1200,
  madrid: 800,
  paris: 800,
  amsterdam: 600,
  "100 bis 200 km": 200,
  "200 bis 500 km": 400,
  "500 bis 1000 km": 800,
  "1000 bis 2000 km": 1500,
};

const customData = {
  art: "",
  ort: "",
  km: "",
};

let price = 0;

const choiceButtons = document.querySelectorAll(".layer-choices > span");

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => setChoice(button));
});

const artChoices = ["Landschaftstour", "Städtetour"];
const ortChoices = [
  "Berlin",
  "Kalifornien",
  "Madrid",
  "Paris",
  "Amsterdam",
  "Gebirge",
  "Wüste",
  "Küsten",
  "Flüsse",
  "Wälder",
];
const kmChoices = [
  "100 bis 200 km",
  "200 bis 500 km",
  "500 bis 1000 km",
  "1000 bis 2000 km",
];

function setChoice(choiceButton) {
  const choiceText = choiceButton.textContent;

  if (artChoices.includes(choiceText)) {
    customData["art"] = choiceText;
    customData["ort"] = "";
    customData["km"] = "";
    open2ndContainer(choiceText);
  }

  if (ortChoices.includes(choiceText)) {
    customData["ort"] = choiceText;
    customData["km"] = "";
    const kmContainer = getContainerWithHeader("Kilometeranzahl");
    kmContainer.setAttribute("data-show", "");
  }

  if (kmChoices.includes(choiceText)) {
    customData["km"] = choiceText;
  }

  renderData();
}

function open2ndContainer(choice) {
  resetAllContainer();
  let containerToOpen;

  if (choice === "Landschaftstour") {
    containerToOpen = getContainerWithHeader("Landschaftsart");
  }
  if (choice === "Städtetour") {
    containerToOpen = getContainerWithHeader("Städteauswahl");
  }

  containerToOpen.setAttribute("data-show", "");
}

function getContainerWithHeader(header) {
  for (const container of choiceContainers) {
    const headerElementText = container.querySelector("h3").textContent;
    if (headerElementText === header) return container;
  }
}

function resetAllContainer() {
  for (let i = 1; i < choiceContainers.length; i++) {
    choiceContainers[i].removeAttribute("data-show");
  }
}

function renderData() {

  resetSummary();

  // entfernt chosen von allen Elementen
  removeChosenFromAll();

  // Für jedes Element, das in customData vorhanden ist wird in der Zusammenfassung hinzugefügt und ausgewählt
  for (const [key, value] of Object.entries(customData)) {
    if (value.length) {
      const listItem = document.createElement("li");
      listItem.append(value);
      list.append(listItem);

      const priceOfValue = prices[`${value.toLowerCase()}`];
      price += priceOfValue;

      choiceButtons.forEach((btn) => {
        const text = btn.textContent;
        if (value === text) btn.setAttribute("data-chosen", "");
      });
    }
  }

  sumPrice.textContent = `${price} €`;
}

function resetSummary() {
  // leert die Liste
  list.replaceChildren();

  // setzt den Preis auf 0
  price = 0;

  sumPrice.textContent = "0 €";
}

function removeChosenFromAll() {
  for (const choiceBtn of choiceButtons) {
    choiceBtn.removeAttribute("data-chosen");
  }
}

function resetCustomData() {
  customData["art"] = "";
  customData["ort"] = "";
  customData["km"] = "";
}

function openAnpasser() {
  layer.setAttribute("data-show", true);
  body.setAttribute("data-scrollable", false);
}

function closeAnpasser() {
  layer.setAttribute("data-show", false);
  body.setAttribute("data-scrollable", true);
  resetCustomData();
  resetAllContainer();
  resetSummary();
  removeChosenFromAll();
}
