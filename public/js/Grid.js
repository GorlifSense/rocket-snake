import _ from 'lodash';
import Canvas from './Canvas';
import Food from './Food';
import Snake from './Snake';

const COORDS_MIN_POINT = 0;
const INSTANCE_TYPES = {
  'snake': Snake,
  'food': Food
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
    this.space[x + this.width * y] = value;
  }
  getPoint({x, y} = {}) {
    return this.space[x + this.width * y];
  }
  pointIsEmpty({x, y} = {}) {
    return !this.getPoint({x, y});
  }
  pointIsOnTheGrid({x, y} = {}) {
    return x >= COORDS_MIN_POINT && x < this.width && y >= COORDS_MIN_POINT && y < this.height;
  }
  addObject(object) {
    const {id, type, path} = object;
    const allSpaceIsFree = _.every(path, (coords) => this.pointIsEmpty(coords) && this.pointIsOnTheGrid);

    if (allSpaceIsFree) {
      // this ensures that everything added to canvas also will be valid class so we can use it both ways
      const Constructor = INSTANCE_TYPES[type];

      if (Constructor) {
        const instance = new Constructor(object, this);

        _.forEach(path, (coords) => {
          this.setPoint(coords, instance);
        });
        this.identifiers[id] = instance;
        return instance;
      }
      throw new Error(`Cannot find instance of type : ${type}`);
    }
    throw new Error('Place is already occupied by another object');
  }
  removeObject(id) {
    const object = this.identifiers[id];

    if (_.isObject(object)) {
      const {path} = object;

      _.forEach(path, (coords) => {
        this.setPoint(coords);
      });
      _.unset(this.identifiers, id);
    }
  }
}
