'use strict';

const Point = require('./Point.js');

class Grid {

  constructor(height, width) {

    this.height = height;
    this.width = width;

    this.snakes = [];
    this.food = [];

  }

  placeFoodRandom() {
    let x = 0;
    let y = 0;
    const isPointOnGreed = (point) => point.isSameCoordinates(new Point(x, y));

    do {
      x = Math.ceil(Math.random() * this.width);
      y = Math.ceil(Math.random() * this.height);

    } while (this.food.some(isPointOnGreed));

    this.food.push(new Point(x, y, 'food'));
  }

  isFood(point) {
    return this.food.some((foodPoint) => {
      if (foodPoint.isSameCoordinates(point)) {
        return true;
      }

      return false;
    });
  }

  removeSnake(id) {
    this.snakes = this.snakes.filter((snake) => snake.id !== id);
  }

}


module.exports = Grid;
