'use strict';

class Snake {

  constructor(id) {
    this.id = id;
    this.body = [];
    this.direction = '';
  }

  addPointHead(point) {
    return this.body.unshift(point);
  }

  addPointTail(point) {
    return this.body.push(point);
  }

  removePointTail() {
    return this.body.pop();
  }

  // check if input direction is valid depends on snake position
  isValidDirection(direction) {
    const HEAD = 0;
    const PREHEAD = 1;
    const STEP = 1;

    switch (direction) {
    case 'up':
      return !(this.body[HEAD].y === STEP - this.body[PREHEAD].y);
    case 'down':
      return !(this.body[HEAD].y === STEP + this.body[PREHEAD].y);
    case 'left':
      return !(this.body[HEAD].x === STEP + this.body[PREHEAD].x);
    case 'right':
      return !(this.body[HEAD].x === STEP - this.body[PREHEAD].x);
    default:
      return false;
    }
  }
}

module.exports = Snake;
