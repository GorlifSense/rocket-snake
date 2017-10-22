'use strict';

const assert = require('chai').assert;

const Point = require('../../models/Point.js');
const Snake = require('../../models/Snake.js');
const Grid = require('../../models/Grid.js');
const Game = require('../../models/Game.js');


describe('Game model', () => {
  it('should create Game object', () => {
    const game = new Game();
    const mochGame = {
      grid: new Grid(50, 50),
      state: {
        started: false,
        ended: false
      },
      diffs: {
        id: [],
        plusPt: [],
        minusPt: []
      }
    };

    assert.deepEqual(game, mochGame);
  });

  it('should start the game (set status started - true)', () => {
    const game = new Game();

    game.state.started = false;
    game.start();

    assert.isTrue(game.state.started);
  });

  it('should end the game (set status ended - true', () => {
    const game = new Game();

    game.state.ended = false;
    game.end();

    assert.isTrue(game.state.ended);
  });

  it('should create new snake', () => {
    const game = new Game();

    game.grid.snakes = [];
    game.addSnake(123);

    assert.deepEqual(game.grid.snakes, [new Snake(123)]);
  });

  it('should place snakes on grid', () => {
    const game = new Game();

    game.grid.snakes = [
      new Snake(1),
      new Snake(2),
      new Snake(3)
    ];

    game.placeSnakes();

    assert.deepEqual(game.grid.snakes, [
      {
        id: 1,
        body: [
          {x: 12, y: 25, type: 'snake'},
          {x: 12, y: 24, type: 'snake'},
          {x: 12, y: 23, type: 'snake'}
        ],
        direction: ''
      },
      {
        id: 2,
        body: [
          {x: 24, y: 25, type: 'snake'},
          {x: 24, y: 24, type: 'snake'},
          {x: 24, y: 23, type: 'snake'}
        ],
        direction: ''
      },
      {
        id: 3,
        body: [
          {x: 36, y: 25, type: 'snake'},
          {x: 36, y: 24, type: 'snake'},
          {x: 36, y: 23, type: 'snake'}
        ],
        direction: ''
      }
    ]);
  });

  it('should add random point to grid', () => {
    const game = new Game();
    const oldFoodCount = game.grid.food.length;

    game.placeFoodRandom();

    assert.strictEqual(game.grid.food.length, oldFoodCount + 1);
  });

  it('should write valid users input as action', () => {
    const game = new Game();
    const snake1 = new Snake(1);
    const snake2 = new Snake(2);

    snake1.body = [
      {x: 2, y: 2},
      {x: 2, y: 1}
    ];
    snake1.direction = 'up';

    snake2.body = [
      {x: 21, y: 21},
      {x: 21, y: 20}
    ];
    snake2.direction = 'left';

    game.grid.snakes = [
      snake1,
      snake2
    ];

    game.writeAction(1, 'right');
    game.writeAction(2, 'down');

    assert.strictEqual(game.grid.snakes[0].direction, 'right');
    assert.strictEqual(game.grid.snakes[1].direction, 'left');
  });

  it('should change snakes coordinates', () => {
    const game = new Game();
    const snake1 = new Snake(1);
    const snake2 = new Snake(2);

    snake1.body = [
      {x: 2, y: 2, type: 'snake'},
      {x: 2, y: 1, type: 'snake'}
    ];
    snake1.direction = 'up';

    snake2.body = [
      {x: 21, y: 21, type: 'snake'},
      {x: 21, y: 20, type: 'snake'}
    ];
    snake2.direction = 'left';

    game.grid.snakes = [
      snake1,
      snake2
    ];

    game.makeSnakesMove();

    assert.deepEqual(game.grid.snakes, [
      {
        id: 1,
        body: [
          {x: 2, y: 3, type: 'snake'},
          {x: 2, y: 2, type: 'snake'}
        ],
        direction: 'up'
      },
      {
        id: 2,
        body: [
          {x: 20, y: 21, type: 'snake'},
          {x: 21, y: 21, type: 'snake'}
        ],
        direction: 'left'
      }
    ]);

    assert.deepEqual(game.diffs, {
      id: [],
      plusPt: [
        {x: 2, y: 3, type: 'snake'},
        {x: 20, y: 21, type: 'snake'}
      ],
      minusPt: [
        {x: 2, y: 1, type: 'snake'},
        {x: 21, y: 20, type: 'snake'}
      ]
    });
  });

  it('should remove food if snake is in the same point', () => {
    const game = new Game();
    const snake1 = new Snake(1);
    const snake2 = new Snake(2);

    snake1.body = [
      {x: 2, y: 2, type: 'snake'},
      {x: 2, y: 1, type: 'snake'}
    ];
    snake1.direction = 'up';

    snake2.body = [
      {x: 21, y: 21, type: 'snake'},
      {x: 21, y: 20, type: 'snake'}
    ];
    snake2.direction = 'left';

    game.grid.snakes = [
      snake1,
      snake2
    ];

    game.grid.food = [
      new Point(2, 2, 'food'),
      new Point(4, 23, 'food')
    ];

    game.eatFood();

    assert.deepEqual(game.grid.food, [new Point(4, 23, 'food')]);
    assert.deepEqual(game.diffs, {
      id: [],
      plusPt: [],
      minusPt: [new Point(2, 2, 'food')]
    });
  });

  it('should find snakes that crashed and remove them', () => {
    const game = new Game();
    const snake1 = new Snake(1);
    const snake2 = new Snake(2);
    const snake3 = new Snake(3);

    snake1.body = [
      new Point(2, 2, 'snake'),
      new Point(2, 1, 'snake')
    ];
    snake1.direction = 'up';

    snake2.body = [
      new Point(21, 21, 'snake'),
      new Point(21, 20, 'snake')
    ];
    snake2.direction = 'left';

    snake3.body = [
      new Point(21, 20, 'snake'),
      new Point(20, 20, 'snake')
    ];
    snake3.direction = 'down';

    game.grid.snakes = [
      snake1,
      snake2,
      snake3
    ];

    game.findCrashedSnakesId();

    assert.deepEqual(game.diffs.id, [3]);
  });

  it('should remove snakes that have crashed', () => {
    const game = new Game();
    const snake1 = new Snake(1);
    const snake2 = new Snake(2);
    const snake3 = new Snake(3);

    snake1.body = [
      new Point(2, 2, 'snake'),
      new Point(2, 1, 'snake')
    ];
    snake1.direction = 'up';

    snake2.body = [
      new Point(21, 21, 'snake'),
      new Point(21, 20, 'snake')
    ];
    snake2.direction = 'left';

    snake3.body = [
      new Point(21, 20, 'snake'),
      new Point(20, 20, 'snake')
    ];
    snake3.direction = 'down';

    game.grid.snakes = [
      snake1,
      snake2,
      snake3
    ];

    game.diffs.id = [1, 3];

    game.removeCrashedSnakes();

    assert.deepEqual(game.grid.snakes, [snake2]);
  });

});
