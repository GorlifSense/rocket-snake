import '../css/style.scss';
import Game from './Game';
import Controller from './Controller';

const inputElement = document.getElementById('controller-input');

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
  objects: snakes,
  ticks: {
    10: 'move'
  }
};


for (let x = 0; x < width; x += step) {
  const ONE = 1;
  const snake = {
    type: 'snake',
    color: colors[Math.floor(Math.random() * colors.length)],
    id: String(Math.random() * Math.random()),
    path: []
  };

  for (let y = x; y < height; y += ONE) {
    const path = {x, y};

    snake.path.push(path);
  }
  snakes.push(snake);
}

const test = () => {
  const game = new Game(params);
  const controller = new Controller(inputElement);

  // game.start();
};

document.addEventListener('DOMContentLoaded', test);


