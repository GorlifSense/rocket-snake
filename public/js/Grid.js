import _ from 'lodash';
import Canvas from './Canvas';
import Snake from './Snake';

const INSTANCE_TYPES = {
  'snake': Snake
};

export default class Grid {
  constructor(props) {
    const {grid, objects} = props;
    const {width, height} = grid;
    const windowHeight = window.innerHeight;

    this.width = width;
    this.height = height;
    this.space = new Array(width * height);
    this.scale = Math.floor(windowHeight / height);
    this.identifiers = {};
    this.canvas = new Canvas(this);
    _.forEach(objects, (object) => {
      this.addObject(object);
    });
  }
  setPoint({x, y} = {}, value) {
    this.space[x + this.with * y] = value;
  }
  getPoint({x, y} = {}) {
    return this.space[x + this.width * y];
  }
  pointIsEmpty({x, y} = {}) {
    return !this.getPoint(x, y);
  }

  addObject(object) {
    const {id, type, path} = object;
    const allSpaceIsFree = _.every(path, (coords) => this.pointIsEmpty(coords));

    if (allSpaceIsFree) {
      // this ensures that everything added to canvas also will be valid class so we can use it both ways
      const Constructor = INSTANCE_TYPES[type];

      if (Constructor) {
        const instance = new Constructor(object, this);

        _.forEach(path, (coords) => {
          this.setPoint(coords);
        });
        //
        this.identifiers[id] = instance;
        return instance;
      }
    }
    throw new Error('place is already occupied by another object');
  }
}
