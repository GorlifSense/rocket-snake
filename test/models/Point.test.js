'use strict';

const assert = require('chai').assert;

const Point = require('../../models/Point.js');


describe('Point class', () => {

  it('should create object with 3 params', () => {
    assert.deepEqual(new Point(1, 4, 'food'), {x: 1, y: 4, type: 'food'});
  });

  it('should compare to points by coordinates', () => {
    const point1 = new Point(1, 3, 'snake');
    const point2 = new Point(1, 3, 'food');

    assert.isTrue(point1.isSameCoordinates(point2));
  });

});
