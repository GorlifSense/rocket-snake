'use strict';

const assert = require('chai').assert;

const grid = require('../app/grid.js');

const Point = grid.Point;
const Snake = grid.Snake;

describe('grid', () => {

  describe('Point class', () => {

    it('should create object with 3 params', () => {
      assert.deepEqual(new Point(1, 4, 'food'), {x: 1, y: 4, type: 'food'});
    });

  });

  describe('Snake class', () => {

    it('should create an object with two params', () => {
      assert.deepEqual(new Snake('Glib'), {name: 'Glib', body: []});
    });

    it('should add element to the head of the snake', () => {
      const snake = new Snake('Andrew');
      snake.body = [1, 2, 3, 4];
      snake.addPointHead(new Point(1, 2, 'food'))
      assert.deepEqual(snake.body[0], new Point(1, 2, 'food'));
    });

    it('should add element to the tail of the snake', () => {
      const snake = new Snake('Tania');
      snake.body = [1, 2, 3, 4];
      snake.addPointTail(new Point(1, 2, 'food'))
      assert.deepEqual(snake.body[snake.body.length - 1], new Point(1, 2, 'food'));
    })

    it('should remove element from tail', () => {
      const snake = new Snake('Artem');
      snake.body = [1, 2, 3, 4];
      snake.removePointTail();
      assert.equal(snake.body.length, 3);
    });

    it('should say that direction is wright', () => {
      const snake = new Snake('Pizza');
      snake.addPointHead(new Point(1, 2, 'snake'));
      snake.addPointHead(new Point(1, 1, 'snake'));
      assert.isTrue(snake.checkDirection('up'))
    });

    it('should say that direction is wrong', () => {
      const snake = new Snake('Pizza');
      snake.addPointHead(new Point(2, 2, 'snake'));
      snake.addPointHead(new Point(3, 2, 'snake'));
      assert.isFalse(snake.checkDirection('left'))
    });

  });

});
