class Battle {

  constructor(user, app) {
    this.user = user
    this.app = app
    this.renderBattleDisplay();
    this.findPlayers();
  }

  renderBattleDisplay() {
    document.getElementById('game-screen').innerHTML = "<div id='battle-background'></div>"

    document.getElementById('battle-background').innerHTML = `
    <div id='left-display' class='pokemon-display'></div>
    <div id='right-display' class='pokemon-display'></div>
    <div id='menu'></div>
    <div id="game-modal" class="modal">
      <div id="modal-content" class="modal-content">
      </div>
    </div>`

    document.getElementById('left-display').innerHTML = `
    <div id='player-name' class='poke-name'></div>
    <div id='player-stats' class='poke-stats'></div>
    <div id='player-pic' class='poke-pic'></div>`

    document.getElementById('right-display').innerHTML = `
    <div id='opposing-pic' class='poke-pic'></div>
    <div id='opposing-name' class='poke-name'></div>
    <div id='opposing-stats' class='poke-stats'></div>`

    document.getElementById('menu').innerHTML = `
    <form class="battleForm" action="index.html" method="post">
      <label>Moves:</label>
      <select id="moveMenu"></select>
      <input type='submit' id="moveSubmit"></input>
    </form>
    `
  }

  findPlayers() {
    const pokeId = this.user.pokemon[0].pokemon_id
    this.api = new Api
    this.api.getPlayerPokemon(this, pokeId)
  }

  startGame(player, opposing) {
    this.player = new Pokemon(player)
    this.opposing = new Pokemon(opposing)
    this.renderBattle()
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
      playerStatList.innerHTML += `<li id="${this.player.name}-${this.player.all_stats[i].stat_name}"> ${this.player.all_stats[i].stat_name}: ${this.player.all_stats[i].base_stat} </li>`
    }
    playerStats.appendChild(playerStatList)

    const opposingStats = document.getElementById('opposing-stats')
    const opposingStatList = document.createElement('ul')
    for(let i = 0; i < 6; i++){
      opposingStatList.innerHTML += `<li id="${this.opposing.name}-${this.opposing.all_stats[i].stat_name}"> ${this.opposing.all_stats[i].stat_name}: ${this.opposing.all_stats[i].base_stat} </li>`
    }
    opposingStats.appendChild(opposingStatList)

    let moveMenu = document.getElementById('moveMenu')
    for(let i = 0; i < this.player.all_moves.length; i++){
      moveMenu.innerHTML += `<option value="${this.player.all_moves[i].move_id}">${this.player.all_moves[i].move}</option>`
    }
    menu.addEventListener("submit", function(e){
      e.preventDefault()
      const move = this.player.all_moves.find(x => x.move_id === parseInt(e.target[0].value))
      this.playerTurn(move)
    }.bind(this))
  }

  playerTurn(move) {
    if (move.stat_change.length > 0) {
      for(const statHash of move.stat_change) {
        if(Object.values(statHash) > 0) {
          this.updateStat(statHash, this.player)
        }else {
          this.updateStat(statHash, this.opposing)
        }
      }
    } else {
        this.updateStat({"hp": -2}, this.opposing)
    }
    //move update stat to happen after the image flash

    const flashCallBack = x => ( this.flashPlayer() )
    var intv = setInterval(flashCallBack, 100);
    const endFlash = x => ( clearInterval(intv) )
    window.setTimeout(endFlash, 2000)
    //make timeout slightly shorter than modal timeout so you have time to
    //   reset image to default.
    let playerPic = document.getElementById('player-pic')
    if (playerPic.innerHTML.split("/").slice(-2)[0] === "shiny") {
      playerPic.innerHTML= `<image id="player-pic" src="${this.player.back_default}">`
    }

    const modalCallBack = x => (
      this.addModal(`${this.player.name.toUpperCase()} uses ${move.move}! ${move.flavor_text}`,
        x => {
          document.getElementById('game-modal').style.display = "none";
          document.getElementById('modal-content').innerHTML = "";
          let win = this.checkWinner();
          if(win) {
            return
          }else {
            this.opposingTurn();
          }
        }
      )
    )
    window.setTimeout(modalCallBack, 2000)
  }

  updateStat(statHash, poke) {
    let baseAttack = Math.floor(Math.random() * 10)
    const stat = poke.all_stats.find(x => x.stat_name === Object.keys(statHash)[0])
    stat.base_stat += (parseInt(Object.values(statHash)[0]) * baseAttack)
    document.getElementById(`${poke.name}-${Object.keys(statHash)[0]}`).innerHTML = `${stat.stat_name}: ${stat.base_stat}`
  }

  flashPlayer(){
    let playerPic = document.getElementById('player-pic')
    if(playerPic.innerHTML.split("/").slice(-2)[0] === "back"){
      playerPic.innerHTML= `<image id="player-pic" src="${this.player.back_shiny}">`
    } else if (playerPic.innerHTML.split("/").slice(-2)[0] === "shiny") {
      playerPic.innerHTML= `<image id="player-pic" src="${this.player.back_default}">`
    }
  }

  addModal(message, cb){
    document.getElementById('game-modal').style.display = "block"
    let i = 0
    function typeWriter() {
      if (i < message.length) {
        document.getElementById('modal-content').innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        document.getElementById('modal-content').innerHTML += `<button class="close" id="modalButton"></button>`
        document.getElementById('modalButton').addEventListener("click", cb)
      }
    }
    typeWriter()
  }

  checkWinner(){
    // console.log("Player: ", this.player.all_stats[5].base_stat, "Opposing: ", this.opposing.all_stats[5].base_stat)
    if(parseInt(this.player.all_stats[5].base_stat) <= 0){
      this.bigFinale(this.player)
      return true
    }else if (parseInt(this.opposing.all_stats[5].base_stat) <= 0) {
      this.bigFinale(this.opposing)
      return true
    }else {
      return false
    }
  }

  bigFinale(poke){
    this.addModal(`${poke.name.toUpperCase()} fainted!!!!!!`, function(){
      document.getElementById('game-modal').style.display = "none";
      this.app.getOrCreateUser();
    }.bind(this))
    //add some sort of pause to look at stats before exiting battle?
  }

  opposingTurn() {
    const opposingMoves = this.opposing.all_moves
    const move = opposingMoves[Math.floor(Math.random() * opposingMoves.length)]
    if (move.stat_change.length > 0) {
      for(const statHash of move.stat_change) {
        if(Object.values(statHash) > 0) {
          this.updateStat(statHash, this.opposing)
        }else {
          this.updateStat(statHash, this.player)
        }
      }
    } else {
        this.updateStat({"hp": -2}, this.player)
    }
    //can this if/else be its own method?

    const flashCallBack = x => ( this.flashOpposing() )
    var intv = setInterval(flashCallBack, 100);
    const endFlash = x => ( clearInterval(intv) )
    window.setTimeout(endFlash, 2000)
    //ensure final image is default
    let opposingPic = document.getElementById('opposing-pic')
    if (opposingPic.innerHTML.split("/").slice(-2)[0] === "shiny") {
      opposingPic.innerHTML= `<image id="player-pic" src="${this.opposing.front_default}">`
    }

    const modalCallBack = x => (
      this.addModal(`${this.opposing.name.toUpperCase()} uses ${move.move}! ${move.flavor_text}`,
        x => {
          document.getElementById('game-modal').style.display = "none";
          document.getElementById('modal-content').innerHTML = "";
          this.checkWinner();
        }
      )
    )
    window.setTimeout(modalCallBack, 2000)
  }

  flashOpposing(){
    let opposingPic = document.getElementById('opposing-pic')
    if(opposingPic.innerHTML.split("/").slice(-2)[0] === "pokemon"){
      opposingPic.innerHTML= `<image id="player-pic" src="${this.opposing.front_shiny}">`
    } else if (opposingPic.innerHTML.split("/").slice(-2)[0] === "shiny") {
      opposingPic.innerHTML= `<image id="player-pic" src="${this.opposing.front_default}">`
    }
  }
  //can this be the same method as flashPlayer?

}
