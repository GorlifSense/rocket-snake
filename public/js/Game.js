import _ from 'lodash';
import Grid from './Grid';

/*
  Available hooks :
    GAME_BEFORE_START
    GAME_AFTER_START
    GAME_BEFORE_PAUSED
    GAME_AFTER_PAUSED
    GAME_BEFORE_RESUMED
    GAME_AFTER_RESUMED
    GAME_BEFORE_END
    GAME_AFTER_END

    TICK_START
    TICK_END
*/
const TICK_START = 1;

export default class Game {
  constructor({id, grid, speed, ticks, objects}) {

    this.id = id;
    this.flow = {
      speed,
      ticks,
      currentTick: TICK_START,
      identifier: null,
      status: 'pending'
    };
    this.grid = new Grid({grid, objects});
    this.hooks = {};
    this.identifiers = this.grid.identifiers;
  }
  setHook(hookName, func) {
    if (_.isFunction(func)) {
      this.hooks[hookName] = func;
    }
    throw new Error(`Can't set ${typeof func} as a hook`);
  }
  removeHook(hookName) {
    _.unset(this.hooks, hookName);
  }
  runHook(hookName) {
    const hook = this.hooks[hookName];

    if (_.isFunction(hook)) {
      // calling hook from behalf of game
      hook.bind(this)();
      return true;
    }
    return false;
  }
  start() {
    const second = 1000;
    const flow = this.flow;
    const {speed} = flow;
    // there's a reason that gameSpeed should be a natural number, but better safe then sorry
    const ticksPerSecond = Math.ceil(second / speed);

    this.runHook('GAME_BEFORE_START');
    flow.status = 'started';
    flow.identifier = setInterval(this.runTick, ticksPerSecond);
    this.runHook('GAME_AFTER_START');
    return this;
  }
  pause() {
    const flow = this.flow;

    this.runHook('GAME_BEFORE_PAUSED');
    flow.status = 'paused';
    clearInterval(flow.identifier);
    this.runHook('GAME_AFTER_PAUSED');
    return this;
  }
  resume() {
    const flow = this.flow;
    const {gameSpeed} = flow;

    this.runHook('GAME_BEFORE_RESUMED');
    flow.status = 'started';
    flow.identifier = setInterval(this.runTick, gameSpeed);
    this.runHook('GAME_AFTER_RESUMED');
    return this;
  }
  end() {
    const {identifier} = this.flow;

    this.runHook('GAME_BEFORE_END');
    this.gameStatus = 'ended';
    clearInterval(identifier);
    this.runHook('GAME_AFTER_END');
  }
  runTick() {
    const flow = this.flow;
    const {ticks, currentTick} = flow;
    const currentAction = ticks[currentTick];
    const {identifiers} = this.grid;
    const ONE = 1;
    const totalTicks = ticks.length - ONE;

    this.runHook('TICK_START');
    _.forEach(identifiers, (identifier) => {
      const action = identifier.actions[currentAction];

      if (_.isFunction(action)) {
        action.bind(this)();
      }
    });

    if (currentTick === totalTicks) {
      flow.currentTick = TICK_START;
    }
    flow.currentTick += 1;
    this.runHook('TICK_END');
  }
}
