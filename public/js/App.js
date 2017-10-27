import '../css/style.scss';
import _ from 'lodash';
import Game from './Game';
import Controller from './Controller';

const inputElement = document.getElementById('controller-input');

const width = 40;
const height = 40;
const me = 'player1';

const params = {
  grid: {
    width,
    height
  },
  objects: [{
    path: [
      {
        x: 5,
        y: 5
      },
      {
        x: 5,
        y: 6
      },
      {
        x: 5,
        y: 7
      },
      {
        x: 5,
        y: 8
      },
      {
        x: 5,
        y: 9
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
  ticks: _.fill(new Array(12), 'move'),
  tps: 12
};


const test = () => {
  const game = new Game(params);
  const controller = new Controller(inputElement);
  const player = game.getPlayer(me);
  const snake = player.getProperty();

  // controller configuration
  // I don't have a clue for now should I do this in a separate file or in app
  controller.addAction('up', () => snake.changeDirection('u'));
  controller.addAction('down', () => snake.changeDirection('d'));
  controller.addAction('left', () => snake.changeDirection('l'));
  controller.addAction('right', () => snake.changeDirection('r'));

  game.start();
};

document.addEventListener('DOMContentLoaded', test);


