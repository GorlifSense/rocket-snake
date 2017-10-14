import _ from 'lodash';
import Konva from 'konva';

class Snake {
  constructor(data, grid) {
    const {path, id} = data;
    const {scale, layers} = grid;
    this.id = id;
    this.canvasObject= new Konva.Line({
      points: _.reduce(path, (acc, v, i) => {
        const {x,y} = v;
        const correctionToX = acc.length
          ? acc[i*2-2] !== x
            ? Math.floor(scale/2)
            : 0
          : Math.floor(scale/2);
        const correctionToY = acc.length
          ? acc[i*2-1] !== y
            ? Math.floor(scale/2)
            : 0
          : Math.floor(scale/2);
        acc.push(x * scale - correctionToX);
        acc.push(y * scale - correctionToY);
        return acc;
      }, []),
      stroke: 'red',
      strokeWidth: scale,
      lineCap: 'sqare',
      lineJoin: 'miter'
    });
    grid.identifiers[id] = this.canvasObject;
    layers.objects.add(this.canvasObject);
  }
  move(points) {
    this.canvasObject.points(points);
  }
}

class Grid {
  constructor(props) {
    const {grid, objects} = props;
    const {width, height} = grid;
    // const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // TODO need to scale window
    // const scale = windowWidth > windowHeight
    //   ? Math.floor( windowHeight/ height)
    //   : Math.floor(windowWidth / width);
    _.assign(this, grid);
    const scale = Math.floor(windowHeight/ height);
    this.scale = scale;
    this.identifiers = {};
    this.stage = new Konva.Stage({
      container: 'canvas-container',
      width: width * scale,
      height: height * scale
    });
    // TODO create separate layers for every type of object
    this.layers = {
      background : new Konva.Layer(),
      objects : new Konva.Layer()
    };
    for(let i=0;i<(width*height);i++) {
      const fullY = Math.floor(i/height);
      const fullX = i - (fullY * height);
      const rect = new Konva.Rect({
        x :fullX * scale,
        y :fullY * scale,
        width : scale,
        height : scale,
        strokeWidth : 1,
        stroke : 'rgba(0,0,0,0.05)'
      });
      this.layers.background.add(rect);
    }
    _.forEach(objects, object => this.place(object));
    _.forEach(this.layers, layer => {
      this.stage.add(layer);
    });
    this.stage.draw();
  }
  place(object) {
    const {id, type} = object;
    const instance = instanceTypes[type];
    if(instance) {
      return this.identifiers[id] = new instance(object, this);
    }
    console.error('No such type of object');
  }
}
const instanceTypes = {
  'snake' : Snake
};
const grid = {
  objects : [
    {
      type : 'snake',
      id : 'test-snake1',
      path : [
        {
          x : 6,
          y : 3
        },
        {
          x : 6,
          y : 4
        },
        {
          x : 6,
          y : 5
        },
        {
          x : 6,
          y : 6
        },
        {
          x : 7,
          y : 6
        },
        {
          x : 10,
          y : 6
        }
      ]
    },
    {
      type : 'snake',
      id : 'stest-snake2',
      path : [
        {
          x : 20,
          y : 20
        },
        {
          x : 21,
          y : 20
        },
        {
          x : 22,
          y : 20
        },
        {
          x : 22,
          y : 21
        },
        {
          x : 22,
          y : 22
        },
        {
          x : 22,
          y : 23
        },
        {
          x : 22,
          y : 24
        }
      ],
    }
  ],
  grid : {
    width : 40,
    height : 40
  },
};
console.log(new Grid(grid));


