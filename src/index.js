window.onload = function(){

  const api = new Api


  let randomNums = [];

  for(let i = 0; i < 2; i++){
  randomNums.push(Math.floor(Math.random() * 150))
  }

  api.getPokemonData(randomNums)




  // randomNum = Math.floor(Math.random() * 150)
  // api.getPokemonData(randomNum, battle.renderBattle)



}
