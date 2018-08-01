const VECTOR_TO_DIRECTION = {
  '0-1': 'u',
  '01': 'd',
  '10': 'r',
  '-10': 'l'
};
const DIRECTION_TO_VECTOR = {
  'u': {
    x: 0,
    y: -1
  },
  'd': {
    x: 0,
    y: 1
  },
  'r': {
    x: 1,
    y: 0
  },
  'l': {
    x: -1,
    y: 0
  }
};

export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus({x, y} = {}) {
    return new Vector(this.x + x, this.y + y);
  }
  isEqualTo({x, y} = {}) {
    return this.x === x && this.y === y;
  }
  static getDirection({x, y} = {}) {
    const key = String(x) + String(y);

    return VECTOR_TO_DIRECTION[key];
  }
  static fromDirection(direction) {
    const vector = DIRECTION_TO_VECTOR[direction];

    return vector ? new Vector(vector.x, vector.y) : null;
  }
}
