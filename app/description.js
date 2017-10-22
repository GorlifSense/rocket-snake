// add player
Game.addSnake(id)

// start game
Game.placeSnakes()
Game.placeFood()
Game.start(error => {})

// player input
Game.wrieAction(playerData, error => {})

// make step
Game.makeSnakesMove();
Game.eatFood();

let ids = Game.findCrashedSnakes();
Game.removeCrashedSnakes(ids);

if (!Game.grid.food[0]) {
  Game.placeFood();
}

// end game
Game.end(error => {})
