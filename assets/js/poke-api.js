function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

function getPokemonDetail(pokemon) {
    return fetch(pokemon.url)
        .then(function(response) {
            return response.json();
        })
        .then(function(pokeDetail) {
            return convertPokeApiDetailToPokemon(pokeDetail);
        });
}

function getPokemons(offset = 0, limit = 10) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonBody) {
            return jsonBody.results;
        })
        .then(function(pokemons) {
            return pokemons.map(getPokemonDetail);
        })
        .then(function(detailRequests) {
            return Promise.all(detailRequests);
        })
        .then(function(pokemonDetails) {
            return pokemonDetails;
        });
}
