const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const buttonShiny = document.querySelector(".btn-shiny");

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
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data["sprites"]["other"]["home"]["front_default"];
    input.value = "";
    searchPokemon = data.id;

    buttonShiny.addEventListener("click", () => {
      if (!buttonShiny.dataset.clicked) {
        buttonShiny.setAttribute("data-clicked", "true");
        pokemonImage.src = data["sprites"]["other"]["home"]["front_shiny"];
        buttonShiny.innerHTML = "Normal";
      } else {
        buttonShiny.removeAttribute("data-clicked");
        pokemonImage.src = data["sprites"]["other"]["home"]["front_default"];
        buttonShiny.innerHTML = "Shiny&#10024;";
      }
    });
  } else {
    pokemonName.innerHTML = "MissingNo.";
    pokemonNumber.innerHTML = "000";
    pokemonImage.src = "/assets/missingno.png";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
