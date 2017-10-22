'use strict';

const Grid = require('./Grid.js');
const Snake = require('./Snake.js');
const Point = require('./Point.js');

const GRID_HEIGHT = 50;
const GRID_WIDTH = 50;
const SNAKE_LENGTH = 3;

class Game {

  constructor() {

    this.grid = new Grid(GRID_WIDTH, GRID_HEIGHT);

    this.state = {
      started: false,
      ended: false
    };

    this.diffs = {
      id: [],
      plusPt: [],
      minusPt: []
    };

  }

  addSnake(id) {
    this.grid.snakes.push(new Snake(id));
  }

  placeSnakes() {
    // fill snakes with emty points
    // to define length
    const STEP = 1;

    this.grid.snakes.forEach((snake) => {
      for (let i = 0; i < SNAKE_LENGTH; i += STEP) {
        snake.addPointTail(new Point(null, null, 'snake'));
      }
    });

    // add points to snakes (aka place on grid)
    const WIDTH_NORMALIZER = 1;
    const HEIGHT_NORMILIZER = 2;

    const snakeWidthConstPos = Math.floor(this.grid.width / (SNAKE_LENGTH + WIDTH_NORMALIZER));
    const snakeHeightConstPos = Math.floor(this.grid.height / HEIGHT_NORMILIZER);

    this.grid.snakes.forEach((snake, num) => {
      // define the snake width position
      const snakeWidthPos = snakeWidthConstPos * (num + STEP);

      for (let i = 0; i < snake.body.length; i += STEP) {
        snake.body[i].x = snakeWidthPos;
        snake.body[i].y = snakeHeightConstPos - i;
      }
    });
  }

  placeFoodRandom() {
    this.grid.placeFoodRandom('food');
  }

  start() {
    this.state.started = true;
  }

  end() {
    this.state.ended = true;
  }


  writeAction(id, direction) {
    // find snake by id
    this.grid.snakes.some((snake) => {
      // find snake that bound to player
      if (snake.id !== id) {
        return false;
      }
      // check if direction not changed
      if (snake.direction === direction) {
        return true;
      }
      if (!snake.isValidDirection(direction)) {
        return true;
      }
      snake.direction = direction;
      return true;
    });
  }

  makeSnakesMove() {
    const STEP = 1;
    const START_COORDINATE = 1;
    const HEAD = 0;

    this.grid.snakes.forEach((snake) => {
      const newHeadPoint = new Point(
        snake.body[HEAD].x,
        snake.body[HEAD].y,
        snake.body[HEAD].type
      );

      switch (snake.direction) {
      case 'up':
        if (snake.body[HEAD].y === this.grid.height) {
          newHeadPoint.y = START_COORDINATE;
        } else {
          newHeadPoint.y += STEP;
        }
        break;
      case 'down':
        if (snake.body[HEAD].y === START_COORDINATE) {
          newHeadPoint.y = this.grid.height;
        } else {
          newHeadPoint.y -= STEP;
        }
        break;
      case 'left':
        if (snake.body[HEAD].x === START_COORDINATE) {
          newHeadPoint.x = this.grid.width;
        } else {
          newHeadPoint.x -= STEP;
        }
        break;
      case 'right':
        if (snake.body[HEAD].x === this.grid.width) {
          newHeadPoint.x = START_COORDINATE;
        } else {
          newHeadPoint.x += STEP;
        }
        break;
      default:
        break;
      }

      // make changes add write them to diff object
      snake.addPointHead(newHeadPoint);
      this.diffs.plusPt.push(new Point(
        newHeadPoint.x,
        newHeadPoint.y,
        newHeadPoint.type
      ));
      // check if head is the same coordinates as food
      if (!this.grid.isFood(newHeadPoint)) {
        this.diffs.minusPt.push(snake.removePointTail());
      }

    });

  }

  eatFood() {
    const HEAD = 0;

    // for each food check if it was eaten by snake
    // remove all eaten food
    this.grid.food = this.grid.food.filter((foodPoint) =>
      !this.grid.snakes.some((snake) => {
        if (foodPoint.isSameCoordinates(snake.body[HEAD])) {
          this.diffs.minusPt.push(foodPoint);
          return true;
        }

        return false;
      })
    );

  }

  findCrashedSnakesId() {
    const HEAD = 0;

    this.grid.snakes.forEach((snakeToCheck) => {
      this.grid.snakes.some((otherSnake) => {
        // skip itself
        if (snakeToCheck.id === otherSnake.id) {
          return false;
        }

        // iterete on every point of other snake
        // if the points is the same, write id to be removed
        return otherSnake.body.some((otherSnakePoint) => {
          if (otherSnakePoint.isSameCoordinates(snakeToCheck.body[HEAD])) {
            this.diffs.id.push(snakeToCheck.id);
            return true;
          }

          return false;
        });
      });
    });
  }

  removeCrashedSnakes() {
    this.diffs.id.forEach((id) => this.grid.removeSnake(id));
  }


}


module.exports = Game;
