
const sectionPokedex = document.getElementById('pokedex')
const sectionDetailPage = document.getElementById('detail-page')
const pokemonsList = document.getElementById('pokemonsList');

const loadMore = document.getElementById('loadMore');


const maxRecords = 151
const limit = 10
let offset = 0


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
        `
        <li data-pokemonID="${pokemon.id}" class="pokemon ${pokemon.main_type}">
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

        const pokemonItens = document.querySelectorAll('.pokemon');
        pokemonItens.forEach((element) => element.addEventListener('click', (e) => {
            const pokemonId = e.target.closest('.pokemon').getAttribute('data-pokemonID');
            showPokemonDetailPage(pokemonId)
        }))

       
       
    })

}

function showPokemonDetailPage(pokemonId) {

    sectionPokedex.style.display = "none"
    sectionDetailPage.style.display = "flex"

    pokeApi.getPokemonDetailedInfo(pokemonId).then((pokemon) => {
        const detailPageHtml = `
        <div class="buttons"><button id="back">&#8592;</button></div>
        <div id="detail-content" class="header">
            
            <div class="pokemon-detail__title">
                <h1 class="pokemon__name">${pokemon.name}</h1>
                <ol class="pokemon__types">
                ${pokemon.types.map((type) => `<li class="pokemon__type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <div class="pokemon__id">${pokemon.id}</div>
        </div>

        

        <div class="pokemon-detail__description">
        <div class="pokemon-detail__img">
            <img src="${pokemon.image}" alt="${pokemon.name}">
        </div>
            <ul class="description__menu">
                <li class="description__menu-item selected">About</li>
                <li class="description__menu-item">Base Stats</li>
                <li class="description__menu-item">Evolution</li>
                <li class="description__menu-item">Moves</li>
            </ul>

            <div class="description__info">
                <table>
                    <tr>
                        <th>Species</th>
                        <td>Seed</td>
                    </tr>
                    <tr>
                        <th>Height</th>
                        <td>2'3,6(0.70cm)</td>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <td>15,2 lbs (6,9 kg)</td>
                    </tr>
                    <tr>
                        <th>Abilities</th>
                        <td>overgrow, chlorophyll</td>
                    </tr>
                </table>

                <h2>Breeding</h2>
                <table>
                    <tr>
                        <th>Gender</th>
                        <td>87.5%</td>
                        <td>12.5%</td>
                    </tr>
                    <tr>
                        <th>Egg Groups</th>
                        <td>Monster</td>
                    </tr>
                    <tr>
                        <th>Egg Cycle</th>
                        <td>Grass</td>
                    </tr>
                </table>
            </div>
        </div>
        `
        sectionDetailPage.classList.add(pokemon.main_type)
        sectionDetailPage.innerHTML = detailPageHtml;
        const backBtn = document.getElementById('back')

        backBtn.addEventListener("click", () => {
            sectionDetailPage.style.display = "none"
            sectionPokedex.style.display = "block"
            sectionDetailPage.classList.remove(pokemon.main_type)
        })
    })


}

function backToPokedex() {
   
    sectionDetailPage.style.display = "none"
    sectionPokedex.style.display = "block"
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







    


