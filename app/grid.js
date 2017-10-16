'use strict';

class Point {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    // type could be: snake, food, rocket ...
    this.type = type;
  }
}

class Snake {
  constructor(name) {
    this.name = name;
    this.body = [];
  }

  addPointHead(point) {
    this.body.unshift(point);
  }

  addPointTail(point) {
    this.body.push(point);
  }

  removePointTail() {
    return this.body.pop();
  }

  // check if input direction is valid depends on snake position
  checkDirection(direction) {
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

module.exports = {

  Snake,
  Point

};
