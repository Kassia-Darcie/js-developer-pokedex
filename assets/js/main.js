const pokemonsList = document.getElementById('pokemonsList');
const loadMore = document.getElementById('loadMore');

const maxRecords = 151
const limit = 10
let offset = 0


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        const newHtml = pokemons.map((pokemon) => 
            `
            <li class="pokemon ${pokemon.main_type}">
                <span class="pokemon__id">#${pokemon.id}</span>
                <span class="pokemon__name">${pokemon.name}</span>
                <div class="pokemon__detail">
                    <ol class="pokemon__types">
                        ${pokemon.types.map((type) => `<li class="pokemon__type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.image}" alt="${pokemon.name}">
                </div>
            </li>
            `
        ).join('')
    
       pokemonsList.innerHTML += newHtml
    })

}

loadPokemonItens(offset, limit)

loadMore.addEventListener("click", () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMore.parentElement.removeChild(loadMore)
    } else {
        loadPokemonItens(offset, limit)
    }

    
})



    


