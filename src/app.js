class App {

  constructor(api) {
    this.api = api
    // this.user
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
    //render sign-up page
    this.renderSignUp()
    document.getElementById('sign-up-form').addEventListener('submit', ev => {
      ev.preventDefault()
      const name = document.getElementById('sign-up-name').value
      this.user = new User(name, this.api)
      this.api.getPokemonForUser(this.user)
    })
  }

  // addPokemonToUser() {
  //   //form input with username and pokemon_id
  //   this.user.getNewPokemon()
  //   //userHash = {name: "string", pokemon_id: int}
  //   // this.api.postNewUser(userHash)
  // }

  newBattle() {
    const battle = Battle.new
    let randomNums = [];
    for(let i = 0; i < 2; i++){
      randomNums.push(Math.floor(Math.random() * 150))
    }
    this.api.getPokemonData(randomNums, battle)
  }
}
