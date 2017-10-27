import _ from 'lodash';
import {Group, Rect} from 'konva';
import Vector from './Vector';

const INVERSE_DIRECTIONS = {
  'u': 'd',
  'd': 'u',
  'l': 'r',
  'r': 'l'
};

export default class Snake {
  constructor({color, id, path, direction}, grid) {
    const {scale} = grid;

    this.grid = grid;
    this.id = id;
    this.path = path;
    this.color = color || 'red';
    this.length = path.length;
    this.direction = direction || 'd';
    this.speed = 1;
    this.canvasObject = new Group();
    _.forEach(path, (coords) => {
      const snakePart = new Rect({
        x: coords.x * scale,
        y: coords.y * scale,
        width: scale,
        height: scale,
        fill: this.color
      });

      this.canvasObject.add(snakePart);
    });
    this.grid.canvas.addObject('snakes', this.canvasObject);
  }
  drawParts() {
    // TODO works but looks awefull
    // const {scale, stage} = this.grid;
    // const animation = new Konva.Animation((form) => {
    //   const {frameRate} = form;
    //   const second = 1000;
    //   const totalFramesForAnimation = Math.floor(second * this.speed / frameRate);
    //   const step = Math.ceil(scale / totalFramesForAnimation);
    //   const {children} = this.canvasObject;
    //
    //   _.forEach(this.path, (coords, index) => {
    //     const part = children[index];
    //     const {x: goalX, y: goalY} = coords;
    //     const {x: currentX, y: currentY} = part.attrs;
    //     const distanceX = goalX * scale - currentX;
    //     const distanceY = goalY * scale - currentY;
    //     if (!distanceX && !distanceY) {
    //       animation.stop();
    //     }
    //     if (distanceX) {
    //       part.setX(distanceX > 0 ? currentX + step : currentX - step);
    //     }
    //     if (distanceY) {
    //       part.setY(distanceY > 0 ? currentY + step : currentY - step);
    //     }
    //   });
    //   stage.draw();
    // });
    // animation.start();
    const {scale, canvas} = this.grid;
    const tail = this.growParts ? this.path.shift() : null;
    const {children} = this.canvasObject;

    _.forEach(this.path, (coords, index) => {
      const part = children[index];
      const {x, y} = coords;

      part.setAttrs({
        x: x * scale,
        y: y * scale
      });
    });
    if (tail) {
      const tailPart = new Rect({
        x: tail.x,
        y: tail.y,
        width: scale,
        height: scale,
        color: this.color
      });

      this.canvasObject.add(tailPart);
      this.growParts -= 1;
    }
    canvas.draw();
  }
  action(type) {
    if (type === 'move') {
      const vector = Vector.fromDirection(this.direction);
      const head = _.last(this.path);
      const cell = vector.plus(head);
      const {grid} = this;
      const isEmpty = grid.pointIsEmpty(cell);
      const onTheGrid = grid.pointIsOnTheGrid(cell);

      if (!isEmpty) {
        throw new Error(`Something is on the way ${JSON.stringify(cell)}`);
      }
      if (!onTheGrid) {
        throw new Error(`Point is out of grid ${JSON.stringify(cell)}`);
      }
      this.moveTo(cell);
    }
  }
  changeDirection(newDirection) {
    const inverse = INVERSE_DIRECTIONS[this.direction];
    const correctDirection = _.get(INVERSE_DIRECTIONS, newDirection);

    if (!correctDirection) {
      throw new Error(`Can't resolve direction ${newDirection}`);
    }
    if (newDirection === inverse) {
      throw new Error('Cannot move backwards');
    }
    this.direction = newDirection;
  }
  moveTo(cell) {
    const {grid} = this;

    // tail is going to be a new part
    if (!this.growParts) {
      const point = this.path.shift();

      grid.setPoint(point);
    }
    this.path.push(cell);
    grid.setPoint(cell, this);
    this.drawParts();
  }
  grow(size) {
    // new parts will grow when snake will move
    this.growParts += size;
  }
}
