import _ from 'lodash';
import Konva from 'konva';
import Snake from './snake';

const instanceTypes = {
  'snake': Snake
};

export default class Grid {
  constructor(props) {
    const {grid, objects} = props;
    const {width, height} = grid;
    // const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // const scale = windowWidth > windowHeight
    //   ? Math.floor( windowHeight/ height)
    //   : Math.floor(windowWidth / width);
    _.assign(this, grid);
    const scale = Math.floor(windowHeight / height);
    const one = 1;

    this.scale = scale;
    this.identifiers = {};
    this.stage = new Konva.Stage({
      container: 'canvas-container',
      width: width * scale,
      height: height * scale
    });
    this.layers = {
      background: new Konva.Layer(),
      objects: new Konva.Layer()
    };
    for (let i = 0; i < width * height; i += one) {
      const fullY = Math.floor(i / height);
      const fullX = i - fullY * height;
      const rect = new Konva.Rect({
        x: fullX * scale,
        y: fullY * scale,
        width: scale,
        height: scale,
        strokeWidth: 1,
        stroke: 'rgba(0,0,0,0.05)'
      });

      this.layers.background.add(rect);
    }
    _.forEach(objects, (object) => this.place(object));
    _.forEach(this.layers, (layer) => {
      this.stage.add(layer);
    });
    this.stage.draw();
  }

  place(object) {
    const {id, type} = object;
    const Instance = instanceTypes[type];

    if (Instance) {
      this.identifiers[id] = new Instance(object, this);
    }

  }
}
