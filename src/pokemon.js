class Pokemon{
  constructor(json){
    this.name = json.name
    this.id = json.id
    this.front_default = json.front_default
    this.back_default = json.back_default
    this.front_shiny = json.front_shiny
    this.back_shiny = json.back_shiny
    this.all_moves = json.all_moves
    this.all_stats = json.all_stats
  }
  
}
