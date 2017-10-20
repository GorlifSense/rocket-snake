'use strict';

const assert = require('chai').assert;

const Point = require('../../models/Point.js');
const Snake = require('../../models/Snake.js');


describe('Snake model', () => {

  it('should create object with 3 params', () => {
    assert.deepEqual(new Snake(123), {id: 123, body: [], direction: ''});
  });

  it('should add point to snakes head', () => {
    const snake = new Snake(123);

    // push dummy data ot snake body
    snake.body = ['some', 'dummy', 'data'];

    snake.addPointHead(new Point(1, 2, 'snake'));

    assert.deepEqual(snake.body[0], {x: 1, y: 2, type: 'snake'});
  });

  it('should remove point from snakes tail', () => {
    const snake = new Snake(123);

    // push dummy data ot snake body
    snake.body = ['some', 'dummy', new Point(1, 2, 'snake')];

    snake.removePointTail();

    assert.notDeepEqual(snake.body[snake.body.length - 1], {x: 1, y: 2, type: 'snake'});
  });

  it('should validate snake direction', () => {
    const snake = new Snake(123);

    snake.body = [
      new Point(1, 3, 'snake'),
      new Point(1, 2, 'snake'),
      new Point(1, 1, 'snake')
    ];

    assert.isTrue(snake.isValidDirection('up'));
    assert.isTrue(snake.isValidDirection('left'));
    assert.isTrue(snake.isValidDirection('right'));
    assert.isFalse(snake.isValidDirection('down'));
  });


});
