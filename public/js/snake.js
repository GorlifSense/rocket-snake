import _ from 'lodash';
import Konva from 'konva';

export default class Snake {
  constructor(data, grid) {
    const {color, id, path} = data;
    const {scale, layers} = grid;

    this.grid = grid;
    this.id = id;
    this.path = path;
    this.color = color || 'red';
    this.length = path.length;
    this.speed = 1;
    this.parts = [];
    this.growParts = 0;
    this.layer = new Konva.Layer();
    _.forEach(path, (coords) => {
      const snakePart = new Konva.Rect({
        x: coords.x * scale,
        y: coords.y * scale,
        width: scale,
        height: scale,
        fill: color
      });

      this.parts.push(snakePart);
      this.layer.add(snakePart);
    });
    layers[id] = this.layer;
    grid.identifiers[id] = this.canvasObject;
  }
  drawParts() {
    // TODO works but looks awefull
    // const {scale, stage} = this.grid;
    // const animation = new Konva.Animation((form) => {
    //   const {frameRate} = form;
    //   const second = 1000;
    //   const totalFramesForAnimation = Math.floor(second * this.speed / frameRate);
    //   const step = Math.ceil(scale / totalFramesForAnimation);
    //   _.forEach(this.path, (coords, index) => {
    //     const part = this.parts[index];
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
    const {scale, stage} = this.grid;
    const tail = this.growParts ? this.path.shift() : null;

    _.forEach(this.path, (coords, index) => {
      const part = this.parts[index];
      const {x, y} = coords;

      part.setAttrs({
        x: x * scale,
        y: y * scale
      });
    });
    if (tail) {
      const tailPart = new Konva.Rect({
        x: tail.x,
        y: tail.y,
        width: scale,
        height: scale,
        color: this.color
      });

      this.parts.push(tailPart);
      this.layer.add(tailPart);
      this.growParts -= 1;
    }
    stage.draw();
  }
  move(cell) {
    // tail is going to be a new part
    if (!this.growParts) {
      this.path.shift();
    }
    this.path.push(cell);
    this.drawParts();
  }
  grow(size) {
    // new parts will grow when snake will move
    this.growParts += size;
  }
}
