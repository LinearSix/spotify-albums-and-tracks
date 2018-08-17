console.log(`poke`);

let urlParams = new URLSearchParams(window.location.search);
let searchData = (urlParams.get(`search`) || `bulbasaur`);
// console.log(searchData);
let selectList = document.getElementById(`selectName`);

fetch(`https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/pokemon/`)
  .then(response => response.json())
  .then( (data) => {
    for (let selectName of data.results) {
      // console.log(selectName);
      let selectBoxName = selectName.name;
      let selectOption = document.createElement(`option`);
      selectOption.textContent = (`${selectBoxName}`);
      selectOption.value = (`${selectBoxName}`);
      if (selectBoxName === searchData) {
        selectOption.selected = (true);
      };
      selectList.appendChild(selectOption);
      // console.log(selectBoxName);
    };
});

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
  let mainCardName = document.getElementById(`mainCardName`);
  // let mainCardH1 = document.createElement(`h1`);
  mainCardName.textContent = (`${pokeName}`);
  // mainCardName.appendChild(mainCardH1);
  
  // SET MAIN POKEMON IMAGE
  let mainCardDiv = document.getElementById(`mainCardImg`);
  let mainCardImg = document.createElement(`img`);
  mainCardImg.src = (`${pokeImg}`);
  mainCardDiv.appendChild(mainCardImg);

  // ADD TYPE BUTTONS
  for (type in pokeTypes) {
  let typeButton = document.createElement(`button`);
  typeButton.textContent = (`${pokeTypes[type].type.name}`);
  typeButton.id = (`${pokeTypes[type].type.name}`);
  let typesDiv = document.getElementById(`types`);
  typesDiv.appendChild(typeButton);

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
    
    // SET POKEMON NAME
    let appCardName = document.getElementById(`appended`);
    let appCardH1 = document.createElement(`h1`);
    appCardH1.textContent = (`${pokeName}`);
    appCardName.appendChild(appCardH1);
    
    // SET MAIN POKEMON IMAGE
    let appCardDiv = document.getElementById(`appended`);
    // let typeButton = document.createElement(`button`);
    // typeButton.name = `search`;
    // typeButton.value = `${pokeName}`;
    // typeButton
    // `<button  type="submit" name="search" value=" style="background: ${pokeImg}"/>`
    // let appCardImg = document.createElement(`img`);
    // appCardImg.src = (`${pokeImg}`);
    appCardDiv.innerHTML = `<input type="image" src="${pokeImg}" name="search" value="${pokeName}" width="60" height="60">`;
    
  });
};
// python -m SimpleHTTPServer
