import {Layer, Rect, Stage, Group} from 'konva';

export default class Canvas {
  constructor(grid) {
    const {width, height, scale} = grid;

    this.grid = grid;
    this.stage = new Stage({
      container: 'canvas-container',
      width: width * scale,
      height: height * scale
    });
    this.layers = {};
    this.addLayer('background');
    this.drawGrid();
  }
  drawGrid() {
    const increment = 1;
    const {width, height, scale} = this.grid;
    const groupGrid = new Group();

    for (let i = 0; i < width * height; i += increment) {
      const fullYPoints = Math.floor(i / height);
      const fullXPoints = i - fullYPoints * height;
      const rect = new Rect({
        x: fullXPoints * scale,
        y: fullYPoints * scale,
        width: scale,
        height: scale,
        strokeWidth: 1,
        stroke: 'rgba(0,0,0,.1)'
      });

      groupGrid.add(rect);
    }
    this.layers.background.add(groupGrid);
    this.draw();
  }
  addObject(layerName, object) {
    const layer = this.layers[layerName] || this.addLayer(layerName);

    layer.add(object);
    this.draw();
  }
  addLayer(id) {
    const layer = new Layer();

    this.layers[id] = layer;
    this.stage.add(layer);
    return layer;
  }
  draw() {
    return this.stage.draw();
  }
}
;
