class Battle {

  constructor(player, opposing) {
    this.player = player
    this.opposing = opposing
    this.renderBattleDisplay();
    this.renderBattle()
  }

  renderBattleDisplay() {
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

    const menu = document.getElementById('menu')
    menu.innerHTML = `
    <form class="battleForm" action="index.html" method="post">
    <label>Moves:</label>
    <select id="moveMenu"></select>
    <input type='submit' id="moveSubmit"></input>
    </form>
    `
    //to be added later:
    //<label>Pokemon:</label>
    // <select id="pokeMenu"></select>



  }

  renderBattle() {

    document.getElementById('player-pic').innerHTML =
    `<image id="player-pic" src="${this.player.back_default}">`

    document.getElementById('opposing-pic').innerHTML =
    `<image id="opposing-pic" src="${this.opposing.front_default}">`

    document.getElementById('player-name').innerHTML =
    `<div id="player-name">${this.player.name.toUpperCase()}</div>`

    document.getElementById('opposing-name').innerHTML =
    `<div id="opposing-name">${this.opposing.name.toUpperCase()}</div>`

    const playerStats = document.getElementById('player-stats')
    const playerStatList = document.createElement('ul')

    for(let i = 0; i < 6; i++){
      playerStatList.innerHTML += `<li> ${this.player.all_stats[i].stat_name}: ${this.player.all_stats[i].base_stat} </li>`
    }
    playerStats.appendChild(playerStatList)


    const opposingStats = document.getElementById('opposing-stats')
    const opposingStatList = document.createElement('ul')

    for(let i = 0; i < 6; i++){
      opposingStatList.innerHTML += `<li> ${this.opposing.all_stats[i].stat_name}: ${this.opposing.all_stats[i].base_stat} </li>`
    }
    opposingStats.appendChild(opposingStatList)

    let moveMenu = document.getElementById('moveMenu')
    for(let i = 0; i < this.player.all_moves.length; i++){
      moveMenu.innerHTML += `<option value="${this.player.all_moves[i].move_id}">${this.player.all_moves[i].move}</option>`
    }

    menu.addEventListener("submit", function(e){
      e.preventDefault()
      const moveId = parseInt(e.target[0].value)
      const move = this.player.all_moves.find(x => x.move_id === moveId)
      console.log(move.flavor_text)
    }.bind(this))




  }

}
