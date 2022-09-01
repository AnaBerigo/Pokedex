const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image");
const INF = document.querySelector(".image-not-found");
const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");
const checkbox = document.querySelector(".switch");
var checkboxUm = document.querySelector("#meu-checkbox");
var checkboxDois = document.querySelector("#meu-checkbox-dois");

// const abbrPokemonName = document.querySelector(".abbr-pokemon-name");
const abbrPokemonName = document.createElement("abbr");
const PokemonData = document.querySelector(".pokemon-data");

let searchPokemon = 1;

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
if (checkboxUm.checked == true) {
  console.log("checked1");
} else {
  console.log("não checked1");
}
if (checkboxDois.checked) {
  console.log("checked2");
} else {
  console.log("não checked2");
}
renderPokemon(searchPokemon);
