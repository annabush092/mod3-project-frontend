class Api {

  constructor(app) {
    this.app = app
  }

  getPokemonForUser(name) {
    const pokeIdArr = [1, 4, 7]
    const returnArr = []
    for(const ele of pokeIdArr){
      fetch(`http://localhost:3000/api/v1/pokemons/${ele}`)
      .then(res => res.json())
      .then(json => {
        returnArr.push(json)
        if(returnArr.length === 3){
          this.app.renderPokeForm(name, returnArr)
        }
      })
    }
  }

  postNewUser(userHash) {
    fetch(`http://localhost:3000/api/v1/users`, {
      method: "post",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body: JSON.stringify({
        name: `${userHash.name}`,
        pokemon_id: `${userHash.pokemon_id}`
      })
    })
    .then(res => res.json())
    .then(json => {
      const user = new User(json, this.app)
      new Battle(user, this.app)
    })
  }

  getPlayerPokemon(battle, poke_id) {
      fetch(`http://localhost:3000/api/v1/pokemons/${poke_id}`)
      .then(res => res.json())
      .then(json => {
        this.getOpposingPokemon(battle, json)
      })
  }

  getOpposingPokemon(battle, playerJson) {
    const randomNum = Math.floor(Math.random() * 150)
      fetch(`http://localhost:3000/api/v1/pokemons/${randomNum}`)
      .then(res => res.json())
      .then(json => {
        battle.startGame(playerJson, json)
      })
  }



}
