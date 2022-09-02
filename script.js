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
      pokemonImage.src = "";
      INF.style.display = "block";
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
    searchPokemon = 1;
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
  }
});

next.addEventListener("click", () => {
  //   if (searchPokemon < 649) {
  searchPokemon++;
  renderPokemon(searchPokemon);
  //   }
});

const cores = (type) => {
  let gridColor = [];
  for (let i = 0; i < type.length; i++) {
    switch (type[i]) {
      case "normal":
        gridColor.push("#A8A87C");
        break;
      case "fighting":
        gridColor.push("#C81D3A");
        break;
      case "flying":
        gridColor.push("#AC91EC");
        break;
      case "poison":
        gridColor.push("#A7409D");
        break;
      case "ground":
        gridColor.push("#E3C071");
        break;
      case "rock":
        gridColor.push("#BAA045");
        break;
      case "bug":
        gridColor.push("#A6B83A");
        break;
      case "ghost":
        gridColor.push("#735995");
        break;
      case "steel":
        gridColor.push("#B9B8CF");
        break;
      case "fire":
        gridColor.push("#F87F3D");
        break;
      case "water":
        gridColor.push("#6691EC");
        break;
      case "grass":
        gridColor.push("#6AC85C");
        break;
      case "electric":
        gridColor.push("#FBD04A");
        break;
      case "psychic":
        gridColor.push("#FF5788");
        break;
      case "ice":
        gridColor.push("#90D8D8");
        break;
      case "dragon":
        gridColor.push("#773BF2");
        break;
      case "dark":
        gridColor.push("#72584A");
        break;
      case "fairy":
        gridColor.push("#F599AC");
        break;
      default:
        gridColor.push("rgba(255, 255, 255, 0.8)");
        break;
    }
  }
  return gridColor;
};

const viewCards = async () => {
  let cardP = document.querySelector(".grid-container");
  let cardPI = document.querySelector(".dots");

  cardPI.style.width = "200px";
  let data;
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  if (APIResponse.status === 200) {
    data = await APIResponse.json();
  }
  let a = "";
  if (data) {
    for (let index = 1; index < 891; index++) {
      const data1 = await fetchPokemon(index);
      if (data1) {
        const type = data1.types.map((t) => {
          return t.type.name;
        });
        let cor = cores(type);

        a =
          a +
          `<div class="grid-item" style="background: linear-gradient(to bottom, ${
            cor[0]
          }, ${cor.length === 2 ? cor[1] : "#fff"});">
           <img src="${
             data1["sprites"]["versions"]["generation-v"]["black-white"][
               "front_default"
             ]
           }" class="pokemon-imageCard" alt="Pokemon"/><br/>
           <p>${type}</p>
         </div>`;
      }
    }
    cardPI.style.display = "none";
    cardP.innerHTML = a;
  }
};
viewCards();

renderPokemon(searchPokemon);
