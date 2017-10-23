import '../css/style.scss';
import Grid from './Grid';

const width = 50;
const height = 50;
const snakes = [];
const step = 5;
const colors = ['red', 'brown', 'teal', 'purple', 'orange', 'green'];
const params = {
  grid: {
    width,
    height
  },
  objects: snakes
};

for (let x = 0; x < width; x += step) {
  const snake = {
    type: 'snake',
    color: colors[Math.floor(Math.random() * colors.length)],
    id: String(Math.random() * Math.random()),
    path: []
  };
  for (let y = x; y < height; y += 1) {
    const path = {x, y};

    snake.path.push(path);
  }
  snakes.push(snake);
}

const test = () => {
  const grid = new Grid(params);
};

document.addEventListener('DOMContentLoaded', test);


