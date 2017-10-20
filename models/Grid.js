'use strict';

class Grid {

  constructor(height, width) {

    this.height = height;
    this.width = width;

    this.snakes = [];
    this.food = [];

  }

  placeRandomPoint(type) {

    let x = 0;
    let y = 0;

    do {

      x = Math.ceil(Math.random() * this.grid.width);
      y = Math.ceil(Math.random() * this.grid.height);

    } while (this.grid.findPoint(new Point(x, y)));

    this.food.push(new Point(x, y, type));

  }

  isFood(point) {

    const isSame = false;

    this.food.some(foodPoint => {

      if (foodPint.isSameCoodinates(point)) {
        isSame = true;
        return true;
      }

      return false

    });

    return isSame;

  }

  removeSnake(id) {
    this.grid.snakes = this.grid.snakes.filter(snake => snake.id !== id);
  }

}


module.exports = Grid;
