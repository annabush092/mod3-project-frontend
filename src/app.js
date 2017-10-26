class App {

  constructor() {
    this.api = new Api(this)
  }

  renderSignUp() {
    document.getElementById('game-screen').innerHTML =
    `<form id="sign-up-form">
      <label>Name: </label>
      <input type="text" id="sign-up-name">
      <input type="submit">
    </form>`
  }

  getOrCreateUser() {
    this.renderSignUp()
    document.getElementById('sign-up-form').addEventListener('submit', ev => {
      ev.preventDefault()
      const name = document.getElementById('sign-up-name').value
      this.api.getPokemonForUser(name)
    })
  }

  renderPokeForm(name, pokeArr) {
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

    const pokeForm = document.getElementById('new-poke-form')
    pokeForm.addEventListener("submit", e => {
      e.preventDefault();
      const pokeValue = e.target[0].value
      this.api.postNewUser({name: name, pokemon_id: parseInt(pokeValue)})
    })
  }

}
