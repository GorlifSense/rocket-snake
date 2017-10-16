import Grid from './grid';


const grid = {
  objects: [
    {
      type: 'snake',
      id: 'test-snake1',
      path: [
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 1
        },
        {
          x: 0,
          y: 2
        },
        {
          x: 0,
          y: 3
        },
        {
          x: 0,
          y: 4
        },
        {
          x: 1,
          y: 4
        },
        {
          x: 2,
          y: 4
        }
      ]
    }
  ],
  grid: {
    width: 40,
    height: 40
  }
};
<<<<<<< HEAD
const testRun = new Grid(grid);

const snake = testRun.identifiers['test-snake1'];
snake.move({x: 3, y: 4});
