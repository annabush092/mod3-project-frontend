window.onload = function(){

  fetch('')
  .then(res => res.json())
  .then(json => function(json){
    console.log(json)
  })

  // battle = new Battle
  // battle.renderBattleDisplay()
  // battle.renderBattle()
}
