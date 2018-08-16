// bulbasaur
const pokemonlist = document.getElementsByClassName("cards")[0];
const searchInput = document.getElementById("searchName");
const searchButton = document.getElementById("search");
const proxy = "https://cors-anywhere.herokuapp.com/"

searchButton.addEventListener('click', (ev)=>{

  // get pokemon name from input
  const pokemonName = searchInput.value.toLowerCase();
  // fetch the pokemon based on name
  fetch(`${proxy}http://pokeapi.co/api/v2/pokemon/${pokemonName}`) // returns promise
      .then(response => response.json()) // returns another promise!
      .then(data => {
        console.log(data);
        pokemonlist.innerHTML += createPokemonCard(data)
        // when a type is clicked
        const typesElements = document.getElementsByClassName('types')
        for (const typesElement of typesElements) {
          typesElement.addEventListener('click', (ev)=>{
            pokemonlist.innerHTML = ""
            // fetch all pokemon NAMES from that type
            const typeUrl = ev.target.dataset.url
            fetch(`${proxy}${typeUrl}`)
              .then( res => res.json())
              // fetch all the pokemon details from the list of pokemon NAMES
              .then(data => {
                const theData = data.pokemon.slice(0,5)
                return theData.map(moreData => fetch(`${proxy}${moreData.pokemon.url}`))
              })
              .then(promises => Promise.all(promises))
              .then(responses => responses.map(response => response.json()))
              .then(morePromises => Promise.all(morePromises))
              .then(pokemons => pokemons.map(createPokemonCard).join("") )
              .then(pokeHTML => {
                pokemonlist.innerHTML += pokeHTML;
              })
          })
        }
      })

})


function createPokemonCard(pokemonObj) {
  return `
      <div class="card">
        <div class="image">
          <img src="${pokemonObj.sprites.front_default}">
        </div>
        <div class="content">
          <div class="header">${pokemonObj.name} | ${pokemonObj.id}</div>
          <div class="meta">
            ${addTypes(pokemonObj.types)}
          </div>
        </div>
        <div class="extra content">
          <span class="right floated">
            Base Exp: ${pokemonObj.base_experience}
          </span>
          <span>
            <i class="user icon"></i>
            ${pokemonObj.weight} lbs
          </span>
        </div>
      </div>
      `
}

function addTypes(pokemonTypes) {
  return pokemonTypes.map(slot => `<a class="types" href="#" data-url=${slot.type.url}>${slot.type.name}</a>`).join("")
}