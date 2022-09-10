const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image");
const INF = document.querySelector(".image-not-found");
const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");
const checkbox = document.getElementById("checkbox");
const cards = document.querySelector(".layout-cards");
const pokedex = document.querySelector(".layout-pokedex");
const vai = document.querySelector(".btn-nextCard");
const vem = document.querySelector(".btn-prevCard");
const cardP = document.querySelector(".grid-container");
const cardPI = document.querySelector(".dots");
const buttonsCard = document.querySelector(".buttonsCard");

const pokemonImageCard = document.querySelector(".pokemon-imageCard");

// const abbrPokemonName = document.querySelector(".abbr-pokemon-name");
const abbrPokemonName = document.createElement("abbr");
const PokemonData = document.querySelector(".pokemon-data");

let searchPokemon = 1;

checkbox.addEventListener("change", function () {
  pokedex.classList.toggle("hide");
  cards.classList.toggle("hide");
});

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};
const fetchPokemonURL = async (url) => {
  const APIResponse = await fetch(url);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonImage.src = "images/carregando.gif";
  pokemonName.innerHTML = "Loading...";
  INF.style.display = "none";
  pokemonNumber.innerHTML = "";
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonImage.style.display = "block";
    searchPokemon = data.id;
    pokemonName.innerHTML = data.name;
    if (data.name.length > 13) {
      console.log(data.name);
      abbrPokemonName.appendChild(pokemonName);
      abbrPokemonName.setAttribute("title", data.name);
      PokemonData.appendChild(abbrPokemonName);
      console.log(abbrPokemonName);
    } else {
      abbrPokemonName.innerHTML = "";
      PokemonData.appendChild(pokemonName);
    }
    pokemonNumber.innerHTML = data.id;
    if (
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ] === null
    ) {
      if (data.id < 899) {
        pokemonImage.src =
          data["sprites"]["versions"]["generation-v"]["black-white"][
            "front_default"
          ];
      } else {
        pokemonImage.src = "";
        INF.style.display = "block";
      }
    } else {
      pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ];
    }
    input.value = "";
  } else {
    pokemonName.innerHTML = "Not found";
    pokemonNumber.innerHTML = "";
    pokemonImage.style.display = "none";
    searchPokemon = 0;
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  input.value = "";
});

prev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  } else if (searchPokemon === 0) {
    searchPokemon = 905;
    renderPokemon(searchPokemon);
  }
});

next.addEventListener("click", () => {
  if (searchPokemon < 905) {
    searchPokemon++;
    renderPokemon(searchPokemon);
  } else if (searchPokemon > 905) {
    searchPokemon = 1;
    renderPokemon(searchPokemon);
  }
});

const cores = (type) => {
  let gridColor = [];
  for (let i = 0; i < type.length; i++) {
    switch (type[i]) {
      case "normal":
        gridColor.push("rgba(168, 168, 124, 1)");
        break;
      case "fighting":
        gridColor.push("rgba(223, 9, 46, 1)");
        break;
      case "flying":
        gridColor.push("rgba(172, 145, 236, 1)");
        break;
      case "poison":
        gridColor.push("rgba(167, 64, 157, 1)");
        break;
      case "ground":
        gridColor.push("rgba(227, 192, 113, 1)");
        break;
      case "rock":
        gridColor.push("rgba(186, 160, 69, 1)");
        break;
      case "bug":
        gridColor.push("rgba(166, 184, 58, 1)");
        break;
      case "ghost":
        gridColor.push("rgba(115, 89, 149, 1)");
        break;
      case "steel":
        gridColor.push("rgba(185, 184, 207, 1)");
        break;
      case "fire":
        gridColor.push("rgba(248, 127, 61, 1)");
        break;
      case "water":
        gridColor.push("rgba(102, 145, 236, 1)");
        break;
      case "grass":
        gridColor.push("rgba(106, 200, 92, 1)");
        break;
      case "electric":
        gridColor.push("rgba(251, 208, 74, 1)");
        break;
      case "psychic":
        gridColor.push("rgba(255, 87, 136, 1)");
        break;
      case "ice":
        gridColor.push("rgba(144, 216, 216, 1)");
        break;
      case "dragon":
        gridColor.push("rgba(119, 59, 242, 1)");
        break;
      case "dark":
        gridColor.push("rgba(114, 88, 74, 1)");
        break;
      case "fairy":
        gridColor.push("rgba(245, 153, 172, 1)");
        break;
    }
  }
  return gridColor;
};
const coresPokebolas = (type) => {
  let gridColor = [];
  for (let i = 0; i < type.length; i++) {
    switch (type[i]) {
      case "normal":
        gridColor.push("rgba(168, 168, 124, 0.5)");
        break;
      case "fighting":
        gridColor.push("rgba(223, 9, 46, 0.5)");
        break;
      case "flying":
        gridColor.push("rgba(172, 145, 236, 0.5)");
        break;
      case "poison":
        gridColor.push("rgba(167, 64, 157, 0.5)");
        break;
      case "ground":
        gridColor.push("rgba(227, 192, 113, 0.5)");
        break;
      case "rock":
        gridColor.push("rgba(186, 160, 69, 0.5)");
        break;
      case "bug":
        gridColor.push("rgba(166, 184, 58, 0.5)");
        break;
      case "ghost":
        gridColor.push("rgba(115, 89, 149, 0.5)");
        break;
      case "steel":
        gridColor.push("rgba(185, 184, 207, 0.5)");
        break;
      case "fire":
        gridColor.push("rgba(248, 127, 61, 0.5)");
        break;
      case "water":
        gridColor.push("rgba(102, 145, 236, 0.5)");
        break;
      case "grass":
        gridColor.push("rgba(106, 200, 92, 0.5)");
        break;
      case "electric":
        gridColor.push("rgba(251, 208, 74, 0.5)");
        break;
      case "psychic":
        gridColor.push("rgba(255, 87, 136, 0.5)");
        break;
      case "ice":
        gridColor.push("rgba(144, 216, 216, 0.5)");
        break;
      case "dragon":
        gridColor.push("rgba(119, 59, 242, 0.5)");
        break;
      case "dark":
        gridColor.push("rgba(114, 88, 74, 0.5)");
        break;
      case "fairy":
        gridColor.push("rgba(245, 153, 172, 0.5)");
        break;
    }
  }
  return gridColor;
};

let numero = 0;

vai.addEventListener("click", () => {
  numero = numero + 21;
  viewCards();
  window.scrollTo(0, 0);
});

vem.addEventListener("click", () => {
  if (numero >= 21) {
    numero = numero - 21;
    viewCards();
    window.scrollTo(0, 0);
  }
});

const NumberFormat = (n) => {
  if (n < 10) {
    return `00${n}`;
  } else if (n < 100) {
    return `0${n}`;
  } else {
    return `${n}`;
  }
};

const Pokebolas = () => {
  // coresPokebolas();
  let a;
  return (a = `
  <div class="geral">
  <div class="pokebola tam1">
    <div class="detalhe"></div>
  </div>
  </div>
  `);
};

const viewCards = async () => {
  cardPI.style.display = "block";
  buttonsCard.style.display = "none";

  let url = `https://pokeapi.co/api/v2/pokemon?offset=${numero}&limit=21`;

  let data;
  const APIResponse = await fetch(url);
  if (APIResponse.status === 200) {
    data = await APIResponse.json();
  }
  let a = "";
  console.log("url", url);

  if (data) {
    for (let index = 0; index < data.results.length; index++) {
      const data1 = await fetchPokemonURL(data.results[index].url);
      const type = data1.types.map((t) => {
        return t.type.name;
      });
      let cor = cores(type);
      let img =
        data1["sprites"]["versions"]["generation-v"]["black-white"][
          "front_default"
        ];
      // console.log(data1);
      a =
        a +
        // `<div onmouseover="overCard(${index})" onmouseout="outCard( ${index})" class="grid-item" style="background: linear-gradient(to bottom, ${
        //   cor[0]
        // }, #F0F0F0, ${cor.length === 2 ? cor[1] : "#F0F0F0"});">
        `<div class="grid-item" style="background: linear-gradient(${
          cor[0]
        } 0%,#FFFFFF 45%, #FFFFFF 55%, ${
          cor.length === 2 ? cor[1] : "#FFFFFF"
        } 100%); ">
        
              <div class="div-numPokemon">
                <img src="images/pokebola.png" class="pokebola-mini" alt="Pokemon"/>
                <p class="numPokemon">${NumberFormat(data1.id)}</p>
              </div>
              <div class="type">
                  <p class="p-tipo">${type[0]}</p>
                  <p class=${type.length == 2 ? "p-tipo" : ""}>${
          type.length == 2 ? type[1] : ""
        }</p>
                </div>
              <div class="img-info">
                <p class="p-titulo">${data1.name}</p>
                <img id="${index}"  src="${img}" class="pokemon-imageCard" alt="Pokemon"/><br/>
              </div>
             </div>`;
    }

    buttonsCard.style.display = "flex";
    cardPI.style.display = "none";
    cardP.innerHTML = a;
  }
};
viewCards();

renderPokemon(searchPokemon);
