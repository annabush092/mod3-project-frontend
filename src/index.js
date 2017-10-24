window.onload = function(){

  function renderBattleDisplay() {
    document.getElementById('game-screen').innerHTML = "<div id='battle-background'></div>"

    document.getElementById('battle-background').innerHTML = `
    <div id='left-display' class='pokemon-display'></div>
    <div id='right-display' class='pokemon-display'></div>
    <div id='menu'></div>`

    document.getElementById('left-display').innerHTML = `
    <div id='player-name' class='poke-name'></div>
    <div id='player-stats' class='poke-stats'></div>
    <div id='player-pic' class='poke-pic'></div>`

    document.getElementById('right-display').innerHTML = `
    <div id='opposing-pic' class='poke-pic'></div>
    <div id='opposing-name' class='poke-name'></div>
    <div id='opposing-stats' class='poke-stats'></div>`
  }

  function renderBattle(player, opposing) {
      document.getElementById('player-pic').innerHTML = `
      <image id='player-pic-index' src="images/pokemon-pic-example.png">`

      document.getElementById('opposing-pic').innerHTML = `
      <image id='opposing-pic-index' src="images/pokemon-pic-example.png">`

      document.getElementById('player-name').innerHTML = `
      <div id='player-name-index'>Pokemon Name</div>`

      document.getElementById('opposing-name').innerHTML = `
      <div id='opposing-name-index'>Opposing Pokemon</div>`

      document.getElementById('player-stats').innerHTML = `
      <ul id='player-stats-index'>
      <li>HP: </li>
      <li>Speed: </li>
      <li>Persistence: </li>
      </ul>`

      document.getElementById('opposing-stats').innerHTML = `
      <ul id='opposing-stats-index'>
      <li>HP: </li>
      <li>Anger: </li>
      <li>Melancholy: </li>
      </ul>`
  }





  renderBattleDisplay()
  renderBattle()
}
