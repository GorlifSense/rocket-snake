'use strict';

const Grid = require('./Grid.js');
const Snake = require('./Snake.js');
const Point = require('./Point.js');

const GRID_HEIGHT = 50;
const GRID_WIDTH = 50;
const SNAKE_LENGTH = 3;

class Game {

  constructor(options) {

    this.grid = new Grid(GRID_WIDTH, GRID_HEIGHT);

    this.gameState = {
      started: false,
      ended: false,
    };

    this.diffs = {
      id: [],
      plusPt: [],
      minusPt: []
    };

  }

  start(cb) {

    if (this.gameState.started || this.gameState.ended) {
      return cb('game already started');
    }

    this.gameState.started = true;

    return cb(null);

  }

  end(cb) {

    if (this.gameState.ended) {
      return cb('game already ended');
    }

    this.gameState.ended = true;
  }

  placeSnakes() {

    // fill snakes with emty points
    // to define length
    this.grid.snakes.forEach(snake => {

      for (let i = 0; i < SNAKE_LENGTH; i += 1) {
        snake.addPointTail(null, null, 'snake');
      }

    });

    // add points to snakes (aka place on grid)
    const WIDTH_NORMALIZER = 1;
    const HEIGHT_NORMILIZER = 2;

    const snakeWidthConstPos = Math.floor(this.grid.width / (this.grid.snakes.length + WIDTH_NORMALIZER));
    const snakeHeightConstPos = Math.floor(this.grid.height / HEIGHT_NORMILIZER);

    this.snake.forEach((snake, num) => {

      // define the snake width position
      const snakeWidthPos = snakeWidthConstPos * num;
      for (let i = 0; i < snake.length; i += 1) {

        snake.body[i].x = snakeWidthPos;
        snake.body[i].y = snakeHeightConstPos - i;

      }

      // add snakes to the grid
      this.grid.objects.push(snake);

    });

  }

  // generate point and place it on grid
  placeFood() {
    this.grid.placeRandomPoint('food');
  }

  // playerData = { playerId, direction }
  writeAction(playerData, cb) {

    let error = null;

    // find snake by id
    this.grid.snakes.some(snake => {

      // find snake that bound to player
      if (snake.id !== playerData.id) {
        return false;
      }
      // check if direction not changed
      if (snake.direction === playerData.direction) {
        return true;
      }
      if (!snake.isValidDirection(playerData.direction)) {
        error = 'invalid input direction';
        return true;
      }
      snake.direction = playerData.direction
      return true;

    });

    return cb(error);

  }

  makeSnakesMove() {

    const STEP = 1;
    const START_COORDINATE = 1;
    const HEAD = 0;

    this.grid.snakes.forEach(snake => {

      const head = new Point(
        snake.body[HEAD].x,
        snake.body[HEAD].y,
        snake.body[HEAD].type
      );

      switch (snake.direction) {
      case 'up':
        if (snake.body[HEAD].y === this.grid.height) {
          head.y = START_COORDINATE;
        } else {
          head.y += STEP;
        }
        break;
      case 'down':
        if (snake.body[HEAD].y === START_COORDINATE) {
          head.y = this.grid.height;
        } else {
          head.y -= STEP;
        }
        break;
      case 'left':
        if (snake.body[HEAD].x === START_COORDINATE) {
          head.x = this.grid.width;
        } else {
          head.x += STEP;
        }
        break;
      case 'right':
        if (snake.body[HEAD].x === this.grid.width) {
          head.x = START_COORDINATE;
        } else {
          head.x += STEP;
        }
        break;
      default:
        break;
      }

      snake.addPointHead(head);
      // check if head is the same coordinates as food
      if (!grid.isFood(head)) {
        snake.removePointTail();
      }

    });

  }

  eatFood() {

    const HEAD = 0;

    // for each food check if it was eaten by snake
    // remove all eaten food
    this.grid.food = this.grid.food.filter(foodPoint => {

      let isFoodSameCoordinateAsHead = false
      this.grid.snakes.some(snake => {

        if (foodPoint.isSameCoordinates(snake.body[HEAD])) {
          isFoodSameCoordinateAsHead = true;
          return true
        }
        return false;

      });

      return isFoodSameCoordinateAsHead;

    });

  }

  findCrashedSnakesId() {

    let crashedSnakeIds = [];
    const HEAD = 0;

    this.grid.snakes.forEach(snakeToCheck => {

      this.grid.snakes.some(otherSnake => {

        // skip itself
        if (snakeToCheck.id = otherSnake.id) {
          return false;
        }

        // if the points is the same, write id to be removed
        return otherSnake.some(otherSnakePoint => {
          if (otherSnakePoint.isSameCoordinates(snakeToCheck[HEAD])) {
            crashedSnakeIds.push(snakeToCheck.id);
            return true;
          }
          return false;
        });

      });

    });

    return crashedSnakeIds;

  }

  removeCrashedSnakes(ids) {

    ids.forEach(id => {
      this.grid.removeSnake(id);
    });

  }

  addSnake(id) {
    this.grid.snakes.push(new Snake(id));
  }

}


module.exports = Game;

// // add player
// Game.addSnake(id)

// // start game
// Game.placeSnakes()
// Game.placeFood()
// Game.start(error => {})

// // player input
// Game.wrieAction(playerData, error => {})

// // make step
// Game.makeSnakesMove();
// Game.eatFood();

// let ids = Game.findCrashedSnakes();
// Game.removeCrashedSnakes(ids);

// if (!Game.grid.food[0]) {
//   Game.placeFood();
// }

// // end game
// Game.end(error => {})
