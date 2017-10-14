import _ from 'lodash';
import Konva from 'konva';

class Snake {
  constructor(data, grid) {
    const {path, id} = data;
    const {scale, layers} = grid;
    const double = 2;

    this.id = id;
    this.canvasObject = new Konva.Line({
      points: _.reduce(path, (acc, v, i) => {
        const {x, y} = v;
        let correctionToX = Math.floor(scale / double);
        let correctionToY = Math.floor(scale / double);

        if (acc.length) {
          const xElementsBefore = 1;
          const yElementsBefore = 2;
          const previousX = acc[i * double - xElementsBefore];
          const previousY = acc[i * double - yElementsBefore];

          if (previousX !== x) {
            correctionToX = Math.floor(scale / double);
          }
          if (previousY !== y) {
            correctionToY = Math.floor(scale / double);
          }
        }
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

const instanceTypes = {
  'snake': Snake
};

class Grid {
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

const grid = {
  objects: [
    {
      type: 'snake',
      id: 'test-snake1',
      path: [
        {
          x: 6,
          y: 3
        },
        {
          x: 6,
          y: 4
        },
        {
          x: 6,
          y: 5
        },
        {
          x: 6,
          y: 6
        },
        {
          x: 7,
          y: 6
        },
        {
          x: 10,
          y: 6
        }
      ]
    },
    {
      type: 'snake',
      id: 'stest-snake2',
      path: [
        {
          x: 20,
          y: 20
        },
        {
          x: 21,
          y: 20
        },
        {
          x: 22,
          y: 20
        },
        {
          x: 22,
          y: 21
        },
        {
          x: 22,
          y: 22
        },
        {
          x: 22,
          y: 23
        },
        {
          x: 22,
          y: 24
        }
      ]
    }
  ],
  grid: {
    width: 40,
    height: 40
  }
};

const testRun = new Grid(grid);

