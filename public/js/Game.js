// import _ from 'lodash';
import Grid from './Grid';

export default class Game {
  constructor({id, configuration}) {
    const {grid} = configuration;

    this.id = id;
    this.gameStepeed = configuration.ticks;
    this.grid = new Grid(grid);
  }
}
