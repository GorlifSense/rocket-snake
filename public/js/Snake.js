import _ from 'lodash';
import {Group, Rect} from 'konva';

export default class Snake {
  constructor({color, id, path}, grid) {
    const {scale} = grid;

    this.grid = grid;
    this.id = id;
    this.path = path;
    this.color = color || 'red';
    this.length = path.length;
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
