console.log(`poke`);

let urlParams = new URLSearchParams(window.location.search);
let searchData = urlParams.get(`search`);
// console.log(searchData);

fetch(`https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/pokemon/${searchData}/`)
  .then(response => response.json())
  .then( (data) => {
      // console.log(data);
      let pokes = data;
      // console.log(pokes.name);
      // console.log(pokes.sprites.front_default)
      createPokemonCard(pokes);
});

function createPokemonCard(x) {
  // console.log(x);
  let pokeName = x.name;
  let pokeImg = x.sprites.front_default;
  let pokeTypes = x.types;

  // SET MAIN POKEMON NAME
  let mainCardName = document.getElementById(`mainName`);
  let mainCardH1 = document.createElement(`h1`);
  mainCardH1.textContent = (`${pokeName}`);
  mainCardName.appendChild(mainCardH1);
  
  // SET MAIN POKEMON IMAGE
  let mainCardTd = document.getElementById(`mainImg`);
  let mainCardImg = document.createElement(`img`);
  mainCardImg.src = (`${pokeImg}`);
  mainCardTd.appendChild(mainCardImg);

  // ADD TYPE BUTTONS
  let typeButton;
  for (type in pokeTypes) {
  typeButton = document.createElement(`button`);
  typeButton.textContent = (`${pokeTypes[type].type.name}`);
  typeButton.id = (`${pokeTypes[type].type.name}`);
  let typesTd = document.getElementById(`types`);
  typesTd.appendChild(typeButton);

    // ADD EVENT LISTER TO EACH TYPE
    typeButton.addEventListener(`click`, (event) => {
      // NEW FETCH FOR TYPE INFO
      console.log(typeButton.id);
      fetch(`https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/type/${typeButton.id}/`)
        .then(response => response.json())
        .then( (data) => {
            // console.log(data);
            let pokes = data;
            for (let poke of pokes.pokemon) {
            //   typeTd = document.getElementById(`appended`);
            //   typeH2 = document.createElement(`h2`);
            //   typeH2.textContent = `${poke.pokemon.name}`
            //   typeTd.appendChild(typeH2);
            // console.log(poke.pokemon.name)
            let sendTypeName = poke.pokemon.name;
            createPokemonTypeCard(sendTypeName);
            };
      });
    });
  };
}

// CREATE TYPE CARD LIST

function createPokemonTypeCard(x) {

  let searchData = x;
  fetch(`https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/pokemon/${searchData}/`)
    .then(response => response.json())
    .then( (data) => {
    // console.log(data);
    // let pokes = data;
    
    let pokeName = data.name;
    let pokeImg = data.sprites.front_default;
    
    // SET MAIN POKEMON NAME
    let appCardName = document.getElementById(`appended`);
    let appCardH1 = document.createElement(`h1`);
    appCardH1.textContent = (`${pokeName}`);
    appCardName.appendChild(appCardH1);
    
    // SET MAIN POKEMON IMAGE
    let appCardTd = document.getElementById(`appended`);
    let appCardImg = document.createElement(`img`);
    appCardImg.src = (`${pokeImg}`);
    appCardTd.appendChild(appCardImg);
    
  });
};
// python -m SimpleHTTPServer
