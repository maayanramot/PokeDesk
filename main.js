"use strict";

import data from "./pokedex.json" assert { type: "json" };

// grid
function grid() {
  for (let i = 0; i < 12; i++) {
    //card
    const card = document.createElement("button");
    card.setAttribute("id", `${data[i]["id"]}`);
    card.className = "card";

    //id
    const id = document.createElement("p");
    id.innerText = `#00${data[i]["id"]}`;
    id.className = "id";
    card.appendChild(id);

    //image 
    const image = document.createElement("img");
    image.src = `${data[i]["image"]["hires"]}`;
    image.className = "image";
    card.appendChild(image);

    //name
    const name = document.createElement("p");
    name.innerText = `${data[i]["name"]["english"]}`;
    name.className = "name";
    card.appendChild(name);

    document.getElementsByClassName("grid")[0].appendChild(card);
  }
}
grid();

//----------------------------------------------------> modal
function createModal(idElem) {
  const modalContent = document.getElementsByClassName("modal-content");

  //left
  const left = document.createElement("div");
  left.className = "modal-left-part";

  //modal id
  const modalID = document.createElement("p");
  modalID.innerText = `#00${data[idElem]["id"]}`;
  modalID.className = "modal-poke-id";
  left.appendChild(modalID);

  //modal image
  const modalImg = document.createElement("img");
  modalImg.src = `${data[idElem]["image"]["hires"]}`;
  modalImg.className = "modal-poke-img";
  left.appendChild(modalImg);

  //name
  const modalName = document.createElement("p");
  modalName.innerText = `${data[idElem]["name"]["english"]}`;
  modalName.className = "modal-poke-name";
  left.appendChild(modalName);

  //type
  const typeContainer = document.createElement("div");
  typeContainer.className = "poke-types-container";

  for (let i = 0; i < `${data[idElem]["type"].length}`; i++) {
    
    const type = document.createElement("button");
    type.innerText = `${data[idElem]["type"][i]}`;
    type.setAttribute("id", `${data[idElem]["type"][i]}`);
    type.className = "poke-type";
    typeContainer.appendChild(type);
  }
  left.appendChild(typeContainer);
  modalContent[0].appendChild(left);

  //line
  const line = document.createElement("div");
  line.className = "vl";
  modalContent[0].appendChild(line);
  
  //right
  const right = document.createElement("div");
  right.className = "modal-right-part";

  //description container
  const descriptionContainer = document.createElement("div");
  descriptionContainer.className = "description-container";

  //title
  const descriptionTitle = document.createElement("div");
  descriptionTitle.innerText = `Description`;
  descriptionTitle.className = "description-title";
  descriptionContainer.appendChild(descriptionTitle);

  //description
  const description = document.createElement("div");
  description.innerText = `${data[idElem]["description"]}`;
  description.className = "description";
  descriptionContainer.appendChild(description);

  right.appendChild(descriptionContainer);

  //stats
  const statsContainer = document.createElement("div");
  statsContainer.className = "stats-div";

  //title
  const statsTitle = document.createElement("div");
  statsTitle.innerText = `Stats`;
  statsTitle.className = "stats-title";
  statsContainer.appendChild(statsTitle);

  //content
  const statsContent = document.createElement("div");
  statsContent.className = "stats-content";

  //left
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

  //right
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
  
  //total stats calculate
  const statsArray = [
    `${data[idElem]["base"]["HP"]}`,
    `${data[idElem]["base"]["Attack"]}`,
    `${data[idElem]["base"]["Defense"]}`,
    `${data[idElem]["base"]["Sp. Attack"]}`,
    `${data[idElem]["base"]["Sp. Defense"]}`,
    `${data[idElem]["base"]["Speed"]}`
  ];
  let sum = 0;
  statsArray.forEach((num) => sum += parseInt(num));

  const totalContainer = document.createElement("div");
  const total = document.createElement("p");
  total.innerText = `Total: ` + sum;
  total.className = "stats";
  totalContainer.appendChild(total);
  statsContent.appendChild(totalContainer);

  statsContainer.appendChild(statsContent);
  right.appendChild(statsContainer);

  modalContent[0].appendChild(right);

  //heart button
  const favoriteButton = document.createElement("img");
  favoriteButton.src = "./assets/heart.png";
  favoriteButton.className = "heart-button";
  modalContent[0].appendChild(favoriteButton); 

  favoriteButton.addEventListener("click", changeHeart);
  // favoriteButton.addEventListener('mouseover', () => favoriteButton.src = "./assets/fill-heart.png")
  // favoriteButton.addEventListener('mouseout', () => favoriteButton.src = "./assets/fill-heart-2.png")
  
  // change heart button
  let indicate = 'empty';
  function changeHeart() {
    if (indicate == 'empty') { 
      favoriteButton.src = "./assets/fill-heart-2.png";
      indicate = 'fill';
      localStorage.setItem(`${data[idElem]["name"]["english"]}` ,`${data[idElem]["id"]}`)
    } else if (indicate == 'fill') {
      favoriteButton.src = "./assets/heart.png";
      indicate = 'empty';
      localStorage.removeItem(`${data[idElem]["name"]["english"]}`)
    };
  }
  //when you favorite pokemon - keep the heart full
  const entries = Object.entries(localStorage);
  for (let i = 0; i < entries.length; i++) {
      if ( `${data[idElem]["id"]}` === entries[i][1]) {
        indicate = 'fill';
        favoriteButton.src = "./assets/fill-heart-2.png";
  }
     }
}

//Get modal elem
let modal = document.getElementById("simpleModal");
//Get open modal button
let modalBtn = document.querySelectorAll(".card");
//Listen for click
for (let i = 0; i < 12; i++) {
  modalBtn[i].addEventListener("click", openModal);
}
//Function to open modal
function openModal() {
  modal.style.display = "block";
  createModal(this.id - 1);
}

//Get close button
let closeBtn = document.getElementsByClassName("closeBtn")[0];
//Listen for close click
closeBtn.addEventListener("click", closeModal);
//Function to close modal
function closeModal() {
  modal.style.display = "none";
  clearModalContent();
}

//Listen for outside click
window.addEventListener("click", clickOutside);
//Function to close modal if outside click
function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none";
    clearModalContent();
  }
}

//Function to clear modal
function clearModalContent() {
  let modalContent = document.getElementsByClassName("modal-content")[0];
  modalContent.innerText = "";
}

const homePage = document.getElementById("homePage");
homePage.addEventListener("click", openHomePage);
//open home page
function openHomePage() {
  window.open("http://127.0.0.1:5500/index.html", "_self");
}

const favoriteBtn = document.getElementById("favorite");
favoriteBtn.addEventListener("click", favoritePage);
//open favorite page
function favoritePage() {
  window.open("http://127.0.0.1:5500/favorite.html", "_self");
}