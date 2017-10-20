'use strict';

class Point {

  constructor(x, y, type) {

    this.x = x;
    this.y = y;

    // type could be: snake, food, rocket ...
    this.type = type;

  }

  isSameCoordinates(point) {

    return this.x === point.x && this.y === point.y;

  }

}

module.exports = Point;
