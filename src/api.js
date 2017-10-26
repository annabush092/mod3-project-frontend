class Api {

  constructor() {}

  postNewUser(userHash) {
    fetch(`http://localhost:3000/api/v1/users`, {
      method: "post",
      body: JSON.stringify({
        name: `${userHash.name}`,
        pokemon_id: `${userHash.pokemon_id}`
      })
    })
    .then(res => res.json())
  }

  getPokemonForUser(user) {
    const pokeIdArr = [1, 4, 7]
    const returnArr = []
    for(const ele of pokeIdArr){
      fetch(`http://localhost:3000/api/v1/pokemons/${ele}`)
      .then(res => res.json())
      .then(json => {
        returnArr.push(json)
        if(returnArr.length === 3){
          user.renderPokeForm(returnArr)
        }
      })
    }
  }

  getPokemonData(arr) {
    const jsonArr = []
    for(const ele of arr){
      fetch(`http://localhost:3000/api/v1/pokemons/${ele}`)
      .then(res => res.json())
      .then(json => {
        jsonArr.push(json)
        if(jsonArr.length === 2){
          new Battle(jsonArr[0], jsonArr[1])
        }
      })
    }
  }

}
