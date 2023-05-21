const container = document.getElementById('pokemon-container');

fetch('https://pokeapi.co/api/v2/pokemon')
  .then(response => response.json())
  .then(data => {
    data.results.forEach(pokemon => {
      fetch(pokemon.url)
        .then(response => response.json())
        .then(pokemonData => {
          createPokemonCard(pokemonData);
        })
        .catch(error => {
          console.log('Error fetching data:', error);
        });
    });
  })
  .catch(error => {
    console.log('Error fetching data:', error);
  });

function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('pokemon-card');

  const name = document.createElement('p');
  name.classList.add('pokemon-name');
  name.textContent = pokemon.name;

  const image = document.createElement('img');
  image.classList.add('pokemon-image');
  image.src = pokemon.sprites.front_default;
  image.alt = pokemon.name;

  const types = document.createElement('div');
  types.classList.add('pokemon-types');
  pokemon.types.forEach(type => {
    const typeElement = document.createElement('span');
    typeElement.classList.add('pokemon-type');
    typeElement.classList.add(`pokemon-type-${type.type.name}`);
    typeElement.textContent = type.type.name;
    types.appendChild(typeElement);
  });

  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(types);
  container.appendChild(card);
}



