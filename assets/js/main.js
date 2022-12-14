const sectionPokedex = document.getElementById('pokedex')
const sectionDetailPage = document.getElementById('detail-page')
const pokemonsList = document.getElementById('pokemonsList')

const loadMore = document.getElementById('loadMore')

const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        pokemon =>
          `
        <li data-pokemonID="${pokemon.id}" class="pokemon ${pokemon.main_type}">
        <span class="pokemon__id">#${pokemon.id}</span>
        <span class="pokemon__name">${pokemon.name}</span>
        <div class="pokemon__detail">
        <ol class="pokemon__types">
        ${pokemon.types
          .map(type => `<li class="pokemon__type ${type}">${type}</li>`)
          .join('')}
        </ol>
        <img src="${pokemon.image}" alt="${pokemon.name}">
        </div>
        </li>
        `
      )
      .join('')

    pokemonsList.innerHTML += newHtml

    const pokemonItens = document.querySelectorAll('.pokemon')
    pokemonItens.forEach(element =>
      element.addEventListener('click', e => {
        const pokemonId = e.target
          .closest('.pokemon')
          .getAttribute('data-pokemonID')
        showPokemonDetailPage(pokemonId)
      })
    )
  })
}

function showPokemonDetailPage(pokemonId) {
  sectionDetailPage.querySelector('.detail-content').innerHTML = '';

  sectionPokedex.classList.remove('show')
  sectionDetailPage.classList.add('show')

  pokeApi.getPokemonDetailedInfo(pokemonId).then(pokemon => {
    const pokemonDetail = document
      .querySelector('.pokemon-detail')
      .cloneNode(true)
    
    sectionDetailPage.classList.add(pokemon.main_type)

    pokemonDetail.querySelector('.detail-header h1').innerHTML = pokemon.name;
    pokemonDetail.querySelector('.detail-header span').innerHTML = `# ${pokemon.id}`;
    pokemonDetail.querySelector('.detail-pokemon-img img').src = pokemon.image;
    pokemonDetail.querySelector('.detail-card .pokemon__types').innerHTML =
			pokemon.types
				.map(type => `<li class="pokemon__type ${type}">${type}</li>`).join('');
    pokemonDetail.querySelector('.weight .caracteristic-info span').innerHTML = pokemon.weight;
    pokemonDetail.querySelector('.height .caracteristic-info span').innerHTML =
			pokemon.height;
    pokemonDetail.querySelector('.abilities').innerHTML = `${pokemon.abilities.join('<br>')}`

    pokemonDetail.querySelectorAll('.stat-name, .card-item h2').forEach(element => {
      element.style.color = pokemon.main_typeColor;
    });
    pokemonDetail.querySelectorAll('.stat-value').forEach((statValue, index) => {
      const value = pokemon.stats[index].base_stat;
      statValue.innerHTML = value
    });
    pokemonDetail
			.querySelectorAll('.stat-bar')
			.forEach((bar, index) => {
				const value = pokemon.stats[index].base_stat;
				const width = `${(value * 100 / 255).toFixed(1)}%`

        // bar.style.backgroundColor = pokemon.main_typeColor
        bar.style.setProperty('--afterWidth', width)
        bar.style.setProperty('--afterBackground', pokemon.main_typeColor);
        
			});

    

    sectionDetailPage.querySelector('.detail-content').appendChild(pokemonDetail)

    pokemonDetail.querySelector('.detail-header img').addEventListener('click', backToPokedex);

    function backToPokedex() {
			sectionDetailPage.classList.remove('show');
			sectionPokedex.classList.add('show');
			sectionDetailPage.classList.remove(pokemon.main_type);
     
		}

    
  })
}



loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () => {
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
