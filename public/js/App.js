import '../css/style.scss';
import _ from 'lodash';
import Game from './Game';
import Controller from './Controller';

const inputElement = document.getElementById('controller-input');

const width = 50;
const height = 50;
const me = 'player1';
const P_KEY = 80;
const tps = 20;

const params = {
  grid: {
    width,
    height
  },
  objects: [{
    path: [
      {
        x: 5,
        y: 9
      },
      {
        x: 5,
        y: 8
      },
      {
        x: 5,
        y: 7
      },
      {
        x: 5,
        y: 6
      },
      {
        x: 5,
        y: 5
      }
    ],
    color: 'green',
    id: 'player1snake',
    type: 'snake'
  }],
  players: [{
    id: me,
    nickname: 'Player 1',
    property: 'player1snake'
  }],
  ticks: _.fill(new Array(tps), 'move'),
  tps
};


const test = () => {
  const game = new Game(params);
  const {grid} = game;
  const controller = new Controller(inputElement);
  const player = game.getPlayer(me);
  const snake = player.getProperty();

  // controller configuration
  // I don't have a clue for now should I do this in a separate file or in app
  controller.addAction('up', () => snake.changeDirection('u'));
  controller.addAction('down', () => snake.changeDirection('d'));
  controller.addAction('left', () => snake.changeDirection('l'));
  controller.addAction('right', () => snake.changeDirection('r'));
  controller.bindKey(P_KEY, 'pause');
  controller.addAction('pause', () => {
    if (game.flow.status === 'paused') {
      game.resume();
    } else {
      game.pause();
    }
  });

  // Add something for snake to grow
  const foodId = 'simpleFood';
  const addRandomFood = () => {
    const getRandomCoords = () => {
      const x = Math.floor(grid.width * Math.random());
      const y = Math.floor(grid.height * Math.random());

      return {x, y};
    };
    let coords = getRandomCoords();

    while (!grid.pointIsEmpty(coords)) {
      coords = getRandomCoords();
    }
    grid.addObject({
      type: 'food',
      id: foodId,
      path: [coords]
    });
  };

  game.setHook('TICK_END', () => {
    const food = grid.identifiers[foodId];

    if (_.isEmpty(food)) {
      addRandomFood();
    }
  });

  game.start();
};

document.addEventListener('DOMContentLoaded', test);


