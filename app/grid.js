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
    switch (direction) {
    case 'up':
      return !(this.body[0].y === 1 - this.body[1].y);
    case 'down':
      return !(this.body[0].y === 1 + this.body[1].y);
    case 'left':
      return !(this.body[0].x === 1 + this.body[1].x);
    case 'right':
      return !(this.body[0].x === 1 - this.body[1].x);
    default:
      return false;
    }
  }
}

module.exports = {

  Snake,
  Point

};
