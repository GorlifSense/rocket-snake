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
    // we need to add any canvas object to certain layer, so we need to store links to all of them
    this.layers = {};
    this.addLayer('background');
    this.layers.background.setZIndex(0);
    this.drawGrid();
  }
  drawGrid() {
    const increment = 1;
    const {width, height, scale} = this.grid;
    const groupGrid = new Group();
    const background = this.layers.background;

    // bunch of rectangles on background grid layer
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
    background.add(groupGrid);
    this.draw();
  }
  addObject(layerName, object) {
    // if there's no layer we should create it
    const layer = this.layers[layerName] || this.addLayer(layerName);

    layer.add(object);
    this.draw();
  }
  addLayer(id) {
    // layer by itself does not require id parameter but we may use later in DOM
    const layer = new Layer({id});

    this.layers[id] = layer;
    this.stage.add(layer);
    layer.setZIndex(1);
    return layer;
  }
  draw() {
    return this.stage.draw();
  }
}
