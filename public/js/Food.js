import {Rect} from 'konva';

const LIFE_LEFT_DECREMENT = 1;
const LIFE_LEFT_END = 0;
const SNAKE_GROWTH_COEFFICIENT = 20;

export default class Food {
  constructor({id, path}, grid) {
    this.type = 'food';
    this.id = id;
    this.path = path;
    this.grid = grid;
    this.lifeleft = 120;

    this.draw();
  }
  draw() {
    const {grid, path} = this;
    const {scale, canvas} = grid;
    const [coords] = path;
    const rect = new Rect({
      x: coords.x * scale,
      y: coords.y * scale,
      width: scale,
      height: scale,
      fill: 'black'
    });

    this.canvasObject = rect;
    canvas.addObject('food', rect);
  }
  action() {
    this.lifeleft -= LIFE_LEFT_DECREMENT;
    if (this.lifeleft === LIFE_LEFT_END) {
      this.destroy();
    }
    return null;
  }
  collide(object) {
    if (object.type === 'snake') {
      const growthLength = Math.ceil(this.lifeleft / SNAKE_GROWTH_COEFFICIENT);

      object.grow(growthLength);
    }
    this.destroy();
    return false;
  }
  destroy() {
    const {canvasObject, grid, id} = this;

    canvasObject.destroy();
    grid.removeObject(id);
  }
}

