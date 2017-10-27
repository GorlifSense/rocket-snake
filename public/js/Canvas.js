import {Layer, Rect, Stage} from 'konva';

const BACK_LAYER_INDEX = 1;
const PAUSE_LAYER_INDEX = 0;
const FRONT_LAYERS_INDEX = 2;

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
    this.addLayer('pause');
    this.layers.background.setZIndex(BACK_LAYER_INDEX);
    this.layers.pause.setZIndex(PAUSE_LAYER_INDEX);
    this.drawGrid();
  }
  drawGrid() {
    const {width, height, scale} = this.grid;
    const background = this.layers.background;
    const loadImage = new Promise((res) => {
      const image = new Image();

      image.src = 'http://tse4.mm.bing.net/th?id=OIP.CjSb4GIpSUfuXuA5CqJ1dgEsC8&w=300&h=188&pid=1.1';
      image.onload = res(image);
    });

    return loadImage.then((image) => {
      const Rectangle = new Rect({
        x: 0,
        y: 0,
        width: width * scale,
        height: height * scale,
        strokeWidth: 0,
        fillPatternImage: image,
        fillPatternScale: {
          x: 1,
          y: 1
        },
        opacity: 0.3
      });

      background.add(Rectangle);
      this.draw();
    });
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
    layer.setZIndex(FRONT_LAYERS_INDEX);
    return layer;
  }
  draw() {
    return this.stage.draw();
  }
}
