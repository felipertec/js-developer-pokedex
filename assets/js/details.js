const namePokemon = document.getElementById('namePokemon')
const numberPokemon = document.getElementById('idPokemon')
const detailType1 = document.getElementById('detailType1')
const detailType2 = document.getElementById('detailType2')
const pokemonPhoto = document.getElementById('pokemonPhoto')
const backgroundPokemon = document.getElementById('backgroundPokemon')
const typesPokemon = document.getElementById('typesPokemon')
const pokemonApi = {}
const queryString = window.location.search // Pega paramentro da url
const urlParams = new URLSearchParams(queryString); // agora posso analistar os resultados que estao na variavel da url
const idPokemon = urlParams.get('pokemon'); // pega o resultado que esta na url




pokemonApi.choosedPokemon = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => pokemon)
}


// função para carregar os dados principais do pokemon
function load(){
    pokemonApi.choosedPokemon().then((pokemon) => {
        namePokemon.innerHTML = pokemon.name;
        numberPokemon.innerHTML = pokemon.id;
        backgroundPokemon.className += `\n ${pokemon.types[0].type.name}` 
        pokemonPhoto.src = pokemon.sprites.other.home.front_default;
        pokemonPhoto.alt = pokemon.name;
        pokemon.types.map((type) => typesPokemon.innerHTML += `<span class="type ${type.type.name}">${type.type.name}</span>`)
    })
}

load()


// função que carrega sobre o pokemon
function loadAbout(){
    pokemonApi.choosedPokemon().then((pokemon) => {
        detailType1.innerHTML = `Height: <span id="pokemonDetailHeight">${pokemon.height}</span>`;
        detailType2.innerHTML = `Weight: <span id="pokemonDetailHeight">${pokemon.weight}</span>`
        pokemonDetailAbility.innerHTML = `Ability:`
        pokemon.abilities.map((ability) => pokemonDetailAbility.innerHTML += ` <span><b>${ability.ability.name}</span><b> `).join('')
            })
    }


    // função que carrega os status do pokemon
    function loadStats(){
        pokemonApi.choosedPokemon().then((pokemon) => {
            detailType1.innerHTML = `HP: <span id="pokemonDetailHeight">${pokemon.stats[0].base_stat}</span>`;
            detailType2.innerHTML = `Attack: <span id="pokemonDetailHeight">${pokemon.stats[1].base_stat}</span>`
            pokemonDetailAbility.innerHTML = `Defense: ${pokemon.stats[2].base_stat}`
        })
    }