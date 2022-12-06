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
  sectionPokedex.classList.remove('show')
  sectionDetailPage.classList.add('show')

  pokeApi.getPokemonDetailedInfo(pokemonId).then(pokemon => {
    const pokemonDetail = document
      .querySelector('.pokemon-detail')
      .cloneNode(true)
    const pokemonDetailImg = document
      .querySelector('.pokemon-detail__img')
      .cloneNode(true)

    sectionDetailPage.classList.add(pokemon.main_type)

    pokemonDetail.querySelector('.pokemon__name').innerHTML = pokemon.name
    pokemonDetail.querySelector('.pokemon__types').innerHTML = pokemon.types
      .map(type => `<li class="pokemon__type ${type}">${type}</li>`)
      .join('')
    pokemonDetail.querySelector('.pokemon__id').innerHTML = pokemon.id
    pokemonDetail.querySelector('.abilities td').innerHTML = pokemon.abilities.join(', ')
    pokemonDetail.querySelector('.height td').innerHTML = pokemon.height >= 10 ? `${((pokemon.height * 10) / 100).toFixed(2)}m` : `${pokemon.height * 10}cm`
    pokemonDetail.querySelector('.weight td').innerHTML = `${pokemon.weight / 10}Kg`
    pokemonDetailImg.querySelector('.pokemon-detail__img img').src =
      pokemon.image

    

    sectionDetailPage.append(pokemonDetail, pokemonDetailImg)

    const menuItem = pokemonDetail.querySelectorAll('.description__menu-item')
    const backBtn = document.getElementById('back')


    menuItem.forEach((item, index) => item.addEventListener("click", (e) => {
        pokemonDetail.querySelector('.description__menu-item.selected').classList.remove('selected')
        item.classList.add('selected')

        const descriptionArea = pokemonDetail.querySelector('.description__info__item')
        const itemWidth = descriptionArea.clientWidth
        let marginLeft = -(index * itemWidth) + "px"

        descriptionArea.style.marginLeft = marginLeft
        console.log(itemWidth);
    }))

    backBtn.addEventListener('click', () => {
      sectionDetailPage.classList.remove('show')
      sectionPokedex.classList.add('show')
      sectionDetailPage.classList.remove(pokemon.main_type)
      sectionDetailPage.innerHTML = ''
    })
  })
}

function backToPokedex() {
  sectionDetailPage.style.display = 'none'
  sectionPokedex.style.display = 'block'
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
