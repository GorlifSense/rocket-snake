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
    this.type = 'snake';
    this.grid = grid;
    this.id = id;
    this.path = path;
    this.color = color || 'red';
    this.length = path.length;
    this.direction = direction || 'd';
    this.growParts = 0;
    this.speed = 1;

    this.draw();
  }
  draw() {
    const {scale, canvas} = this.grid;

    this.canvasObject = new Group(this.id);
    _.forEach(this.path, (coords) => {
      const snakePart = new Rect({
        x: coords.x * scale,
        y: coords.y * scale,
        width: scale,
        height: scale,
        fill: this.color
      });

      this.canvasObject.add(snakePart);
    });
    canvas.addObject('snakes', this.canvasObject);
  }
  drawParts() {
    const {scale, canvas} = this.grid;
    const tail = this.growParts ? this.path.pop() : null;
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
        x: tail.x * scale,
        y: tail.y * scale,
        width: scale,
        height: scale,
        fill: this.color
      });

      this.canvasObject.add(tailPart);
      this.growParts -= 1;
      this.path.push(tail);
    }
    canvas.draw();
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
      const point = this.path.pop();

      grid.setPoint(point);
    }
    this.path.unshift(cell);
    grid.setPoint(cell, this);
    this.drawParts();
  }
  grow(size) {
    // new parts will grow when snake will move
    this.growParts += size;
  }
  action(type) {
    if (type === 'move') {
      const vector = Vector.fromDirection(this.direction);
      const head = _.head(this.path);
      const cell = vector.plus(head);
      const {grid} = this;
      const onTheGrid = grid.pointIsOnTheGrid(cell);

      if (onTheGrid) {
        const point = grid.getPoint(cell);

        if (_.isUndefined(point)) {
          return this.moveTo(cell);
        }
        return point.collide(this, cell) ? this.destroy() : this.moveTo(cell);
      }
      return this.destroy();
    }
    return null;
  }

  collide(object, point) {
    // this method is used when objects collide, this more of a passive
    if (object.type === 'snake') {
      const snakeHead = _.last(this.path);
      const headPoint = new Vector(snakeHead);

      if (headPoint.isEqualTo(point)) {
        this.destroy();
        this.toRemove = true;
      }
      this.destroy();
      this.toRemove = true;
      return true;
    }
    return false;
  }
  destroy() {
    const {canvasObject, grid} = this;

    canvasObject.destroyChildren();
    canvasObject.destroy();
    grid.canvas.draw();
  }
}
