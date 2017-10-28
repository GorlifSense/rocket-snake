'use strict';

const assert = require('chai').assert;

const Point = require('../../models/Point.js');
const Snake = require('../../models/Snake.js');
const Grid = require('../../models/Grid.js');


describe('Grid model', () => {

  it('should create object with specific height and width', () => {
    const grid = new Grid(33, 22);

    assert.strictEqual(grid.height, 33);
    assert.strictEqual(grid.width, 22);
  });

  it('should add random point to grid', () => {
    const grid = new Grid(6, 7);
    const oldFoodCount = grid.food.length;

    grid.placeFoodRandom();

    assert.strictEqual(grid.food.length, oldFoodCount + 1);
  });

  it('should check if point on grid with input coordinates is food', () => {
    const grid = new Grid(3, 3);

    grid.food = [
      new Point(1, 2, 'food'),
      new Point(1, 1, 'food')
    ];

    assert.isTrue(grid.isFood(new Point(1, 2)));
    assert.isFalse(grid.isFood(new Point(3, 3)));
    assert.isFalse(grid.isFood(new Point(3, 2)));
  });

  it('should remove snake by id', () => {
    const grid = new Grid(5, 5);

    grid.snakes = [
      new Snake(1),
      new Snake(444),
      new Snake('some id'),
      new Snake(55)
    ];

    grid.removeSnake(444);
    grid.removeSnake(55);

    assert.deepEqual(grid.snakes, [new Snake(1), new Snake('some id')]);
  });


});
