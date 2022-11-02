const lists_pokemons = document.getElementById("lists__pokemons");
const buttons = document.getElementById("buttons");
let urlPokemon = "https://pokeapi.co/api/v2/pokemon";
let btnNext;
let btnPrevious;
let templateHtml;
let 페이지번호 = 1;

const 포켓몬정보_가져오기 = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    포켓몬_데이터(results.results);

    btnNext = results.next ? `<button class="btn btn-next" data-url=${results.next}>⏩</button>` : "";
    btnPrevious = results.previous ? `<button class="btn btn-previous" data-url=${results.previous}>⏪</button>` : "";
    buttons.innerHTML = `${btnPrevious} <span id='pageCount'>${페이지번호}</span> ${btnNext}`;
  } catch (error) {
    console.log(error);
  }
};

포켓몬정보_가져오기(urlPokemon);

const 포켓몬_데이터 = async (data) => {
  lists__pokemons.innerHTML = "";
  try {
    for (let index of data) {
      const resp = await fetch(index.url);
      const result = await resp.json();

      // console.log(result);

      const pokemonImageSource = result.sprites.other.dream_world.front_default;
      const pokemonName = result.name;

      templateHtml = `
      <div class="pokemon__img">
        <img src=${pokemonImageSource} alt=${pokemonName} />
        <p>${pokemonName}</p>
      </div>
      `;

      lists__pokemons.innerHTML += templateHtml;
    }
  } catch (error) {
    console.log(error);
  }
};

buttons.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    if (event.target.classList.contains("btn-next")) {
      페이지번호++;
    } else if (event.target.classList.contains("btn-previous")) {
      페이지번호--;
    }

    let value = event.target.dataset.url;

    포켓몬정보_가져오기(value);
  }
});
