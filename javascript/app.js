console.log(`poke`);
// document.addEventListener('DOMContentLoaded', function() {
  const pokemonlist = document.getElementsByClassName("cards")[0];

  const allthepokemons = [
    'bulbosour',
    'sourpatch',
    'ivyleage',
    'bannasore',
    'pikachu'
  ]

  fetch(`https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/pokemon/`)
    .then(response => response.json())
    .then( (data) => {
        console.log(data.results);
        pokes = data.results;
        for (let poke in pokes) {
          // console.log(pokes[poke].name);
          createPokemonCard(pokes[poke].name, pokes[poke].url)
        };
  });

  // setTimeout(() => {  
    function createPokemonCard(x, y) {
      console.log(x);
      console.log(y);
      let pokeName = x;
      let pokeUrl = y;
      return `
          <div class="card">
            <div class="image">
              <img src="/images/avatar2/large/matthew.png">
            </div>
            <div class="content">
              <div class="header">${pokeName}!</div>
              <div class="meta">
                <a>Friends</a>
              </div>
              <div class="description">
                ${pokeName} is an interior designer living in New York.
                <a href="${pokeUrl}">More Info</a>
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
                ${pokeUrl}
              </span>
              <span>
                <i class="user icon"></i>
                  ${pokeUrl}
              </span>
            </div>
          </div>
          `
    }
  // }, 1000)
// });
// pokemonlist.innerHTML = allthepokemons.map(createPokemonCard).join("")
// https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/mewtwo.png
// https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/mewtwo.png

pokemonlist.innerHTML = allthepokemons.map(createPokemonCard).join("")