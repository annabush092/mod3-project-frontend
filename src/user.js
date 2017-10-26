class User {

  constructor(json, app) {
    this.name = json.name
    this.pokemon = json.myPokemon
    this.app = app
  }

}
