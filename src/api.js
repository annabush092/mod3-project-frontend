class Api {

  constructor() {}

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
