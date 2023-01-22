"use strict";

import data from "./pokedex.json" assert { type: "json" };

//get from storage
const entries = Object.entries(localStorage);
for (let i = 0; i < entries.length; i++) {
    let idElement = entries[i][1];
    console.log(idElement);
}


// grid
function grid() {
    
    for (let i = 0; i < entries.length; i++) {
    let idElement = entries[i][1] - 1;
    //card
    const card = document.createElement("button");
    card.setAttribute("id", `${data[idElement]["id"]}`);
    card.className = "card";

    //id
    const id = document.createElement("p");
    id.innerText = `#00${data[idElement]["id"]}`;
    id.className = "id";
    card.appendChild(id);

    //image 
    const image = document.createElement("img");
    image.src = `${data[idElement]["image"]["hires"]}`;
    image.className = "image";
    card.appendChild(image);

    //name
    const name = document.createElement("p");
    name.innerText = `${data[idElement]["name"]["english"]}`;
    name.className = "name";
    card.appendChild(name);

    document.getElementsByClassName("grid")[0].appendChild(card);
  }
}
grid();

const homePage = document.getElementById("homePage");
homePage.addEventListener("click", openHomePage);
//open home page
function openHomePage() {
  window.open("http://127.0.0.1:5500/index.html", "_self");
}