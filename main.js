"use strict";

import data from "./pokedex.json" assert { type: "json" };

function createPokeGrid() {
  for (let i = 0; i < 12; i++) {
    const pokeCard = document.createElement("button");
    pokeCard.className = "pokemon button";

    const pokeID = document.createElement("p");
    pokeID.innerText = `#00${data[i]["id"]}`;
    pokeCard.appendChild(pokeID);
    pokeID.className = "poke-id";

    pokeCard.setAttribute("id", `${data[i]["id"]}`);

    const pokeImg = document.createElement("img");
    pokeImg.src = `${data[i]["image"]["hires"]}`;
    pokeCard.appendChild(pokeImg);
    pokeImg.className = "poke-img";

    const pokeName = document.createElement("p");
    pokeName.innerText = `${data[i]["name"]["english"]}`;
    pokeCard.appendChild(pokeName);
    pokeName.className = "poke-name";

    const pokeGrid = document.getElementsByClassName("poke-grid");
    pokeGrid[0].appendChild(pokeCard);
  }
}
createPokeGrid();

function createModal(idElem) {
  const pokeModalContent = document.getElementsByClassName("modal-content");

  const modalLeftPart = document.createElement("div");
  modalLeftPart.className = "modal-left-part";

  const modalPokeID = document.createElement("p");
  modalPokeID.innerText = `#00${data[idElem]["id"]}`;
  modalLeftPart.appendChild(modalPokeID);
  modalPokeID.className = "modal-poke-id";

  const modalPokeImg = document.createElement("img");
  modalPokeImg.src = `${data[idElem]["image"]["hires"]}`;
  modalLeftPart.appendChild(modalPokeImg);
  modalPokeImg.className = "modal-poke-img";

  const modalPokeName = document.createElement("p");
  modalPokeName.innerText = `${data[idElem]["name"]["english"]}`;
  modalLeftPart.appendChild(modalPokeName);
  modalPokeName.className = "modal-poke-name";

  const pokeTypeCon = document.createElement("div");
  pokeTypeCon.className = "poke-types-container";
  for (let i = 0; i < `${data[idElem]["type"].length}`; i++) {
    const pokeType = document.createElement("button");
    pokeType.className = "poke-type";
    pokeType.innerText = `${data[idElem]["type"][i]}`;

    pokeType.setAttribute("id", `${data[idElem]["type"][i]}`);

    pokeTypeCon.appendChild(pokeType);
  }
  modalLeftPart.appendChild(pokeTypeCon);

  pokeModalContent[0].appendChild(modalLeftPart);

  const modalRightPart = document.createElement("div");
  modalRightPart.className = "modal-right-part";

  const line = document.createElement("div");
  pokeModalContent[0].appendChild(line);
  line.className = "vl";

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "description-div";

  const descriptionTitle = document.createElement("div");
  descriptionTitle.innerText = `Description`;
  descriptionDiv.appendChild(descriptionTitle);
  descriptionTitle.className = "description-title";

  const description = document.createElement("div");
  description.innerText = `${data[idElem]["description"]}`;
  descriptionDiv.appendChild(description);
  description.className = "description";

  modalRightPart.appendChild(descriptionDiv);

  const statsDiv = document.createElement("div");
  statsDiv.className = "stats-div";

  const statsTitle = document.createElement("div");
  statsTitle.innerText = `Stats`;
  statsDiv.appendChild(statsTitle);
  statsTitle.className = "stats-title";

  const statsContent = document.createElement("div");
  statsContent.className = "stats-content";

  const statsContentLeft = document.createElement("div");
  statsContentLeft.className = "stats-content-left";

  const pokeStats1 = document.createElement("div");
  pokeStats1.innerText = `HP` + ": " + `${data[idElem]["base"]["HP"]}`;
  pokeStats1.className = "stats";

  const pokeStats2 = document.createElement("div");
  pokeStats2.innerText = `Attack` + ": " + `${data[idElem]["base"]["Attack"]}`;
  pokeStats2.className = "stats";

  const pokeStats3 = document.createElement("div");
  pokeStats3.innerText =
    `Defense` + ": " + `${data[idElem]["base"]["Defense"]}`;
  pokeStats3.className = "stats";

  statsContentLeft.appendChild(pokeStats1);
  statsContentLeft.appendChild(pokeStats2);
  statsContentLeft.appendChild(pokeStats3);

  statsContent.appendChild(statsContentLeft);

  const statsContentRight = document.createElement("div");
  statsContentRight.className = "stats-content-right";

  const pokeStats4 = document.createElement("div");
  pokeStats4.innerText =
    `Sp. Attack` + ": " + `${data[idElem]["base"]["Sp. Attack"]}`;
  pokeStats4.className = "stats";

  const pokeStats5 = document.createElement("div");
  pokeStats5.innerText =
    `Sp. Defense` + ": " + `${data[idElem]["base"]["Sp. Defense"]}`;
  pokeStats5.className = "stats";

  const pokeStats6 = document.createElement("div");
  pokeStats6.innerText = `Speed` + ": " + `${data[idElem]["base"]["Speed"]}`;
  pokeStats6.className = "stats";

  statsContentRight.appendChild(pokeStats4);
  statsContentRight.appendChild(pokeStats5);
  statsContentRight.appendChild(pokeStats6);

  statsContent.appendChild(statsContentRight);

  statsDiv.appendChild(statsContent);
  modalRightPart.appendChild(statsDiv);

  pokeModalContent[0].appendChild(modalRightPart);

  const favoriteButton = document.createElement("button");
  favoriteButton.className = "favorite-button";
  const favoriteButtonImg = document.createElement("img");
  favoriteButtonImg.className = "heart-button";
  favoriteButtonImg.src = "./assets/favorite-heart.svg";

  favoriteButton.appendChild(favoriteButtonImg);
  pokeModalContent[0].appendChild(favoriteButton);
}

//Get modal elem
let modal = document.getElementById("simpleModal");
//Get open modal button
let modalBtn = document.querySelectorAll(".pokemon");
//Get close button
let closeBtn = document.getElementsByClassName("closeBtn")[0];

//Listen for click
for (let i = 0; i < 12; i++) {
  modalBtn[i].addEventListener("click", openModal);
}
//Listen for close click
closeBtn.addEventListener("click", closeModal);
//Listen for outside click
window.addEventListener("click", clickOutside);

//Function to open modal
function openModal() {
  modal.style.display = "block";
  createModal(this.id - 1);
}

function clearModalContent() {
  let modalContent = document.getElementsByClassName("modal-content")[0];
  modalContent.innerText = "";
}

//Function to close modal
function closeModal() {
  modal.style.display = "none";
  clearModalContent();
}
//Function to close modal if outside click
function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none";
    clearModalContent();
  }
}
