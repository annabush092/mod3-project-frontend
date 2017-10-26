class User {

  constructor(name, api) {
    this.api = api
    this.name = name
    this.pokemon = []
  }

  addPokemon(pokemon_id) {
    this.pokemon.push(pokemon_id)
  }


  renderPokeForm(pokeArr) {
    document.getElementById('game-screen').innerHTML = `
    <form id="new-poke-form" class="newPokeForm">
    <label>Choose your Pokemon!</label>
    <select id="pokeMenu"></select>
    <input type='submit' id="pokeSubmit"></input>
    </form>
    `

    let pokeMenu = document.getElementById('pokeMenu')
    for(let i = 0; i < pokeArr.length; i++){
      pokeMenu.innerHTML += `<option value="${pokeArr[i].id}">${pokeArr[i].name}</option>`
    }
  }

}
