class App {

  constructor() {
    this.api = new Api(this)
  }

  renderSignUp() {
    document.getElementById('game-screen').innerHTML =
    `<img src="images/Logo.png" id="logo">
    <form id="sign-up-form">
      <p>
      Hello there! Welcome to the </br>
      world of Pokemon!</br>
      First, what is your name?</p>
      <label>Name: </label>
      <input type="text" id="sign-up-name">
      <input type="submit"> </input>
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
    const gameScreen = document.getElementById('game-screen')
    gameScreen.innerHTML = `
    <form id="new-poke-form" class="newPokeForm">
    <p>Choose your Pokemon!</p>
    <select id="pokeMenu"></select>
    <input type='submit' id="pokeSubmit"></input>
    </form>
    <div id="poke-image-div"></div>`

    const pokeMenu = document.getElementById('pokeMenu')
    for(let i = 0; i < pokeArr.length; i++){
      pokeMenu.innerHTML += `<option value="${pokeArr[i].id}">${pokeArr[i].name}</option>`
      if(i===0) {
        document.getElementById('poke-image-div').innerHTML = `<img id="poke-form-pic" src="${pokeArr[i].front_default}">`
      }
    }
    pokeMenu.addEventListener("change", e => {
      const pokeID = parseInt(e.target.value)
      let pokemon = pokeArr.find(p => (p.id === pokeID))
      const imageHTML = `<img id="poke-form-pic" src="${pokemon.front_default}">`
      document.getElementById('poke-image-div').innerHTML = imageHTML
    })

    const pokeForm = document.getElementById('new-poke-form')
    pokeForm.addEventListener("submit", e => {
      e.preventDefault();
      const pokeValue = e.target[0].value
      this.api.postNewUser({name: name, pokemon_id: parseInt(pokeValue)})
    })
  }

}
