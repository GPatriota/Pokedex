
const searchButton = document.getElementById('searchButton');
const pokemonSearchInput = document.getElementById('pokemonSearch');


function searchPokemonByName(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    
    
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then((pokeDetail) => {
            const pokemon = convertPokeApiDetailToPokemon(pokeDetail);
            displayPokemon(pokemon); 
        })
        .catch((error) => {
            alert(error.message);
        });
}


function displayPokemon(pokemon) {
    const pokemonList = document.getElementById('pokemonList');
    
    
    pokemonList.innerHTML = '';
    
    
    const pokemonHTML = convertPokemonToLi(pokemon);
    
    
    pokemonList.innerHTML = pokemonHTML;
}


searchButton.addEventListener('click', () => {
    const pokemonName = pokemonSearchInput.value.trim();
    if (pokemonName) {
        searchPokemonByName(pokemonName);
    } else {
        alert('Por favor, insira o nome de um Pokémon.');
    }
});
