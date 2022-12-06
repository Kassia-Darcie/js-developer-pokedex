
const pokeApi = {}

pokeApi.convertPokeApiDetailToPokemon = (pokemonsDetail) => {
    const pokemon = new Pokemon()
    pokemon.id = pokemonsDetail.id
    pokemon.name = pokemonsDetail.name
    const types = pokemonsDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types
    pokemon.types = types
    pokemon.main_type = type
    pokemon.image = pokemonsDetail.sprites.other["official-artwork"].front_default
    pokemon.abilities = pokemonsDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.height = pokemonsDetail.height
    pokemon.weight = pokemonsDetail.weight
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(pokeApi.convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` 
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetail) => pokemonsDetail)
        .catch((err) => console.error(err))
}

pokeApi.getPokemonDetailedInfo = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return fetch(url)
        .then((response) => response.json())
        .then(pokeApi.convertPokeApiDetailToPokemon)
        .catch((err) => console.error(err))
}

