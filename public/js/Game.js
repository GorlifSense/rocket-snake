import _ from 'lodash';
import Grid from './Grid';
import Player from './Player';

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
const INITIAL_TPS = 1;
const SECOND = 1000;

export default class Game {
  constructor({id, grid, speed, ticks, tps = INITIAL_TPS, objects, players}) {
    this.id = id;
    this.players = {};
    this.hooks = {};
    this.flow = {
      speed,
      ticks,
      tps,
      currentTick: TICK_START,
      intervalId: null,
      status: 'pending'
    };
    this.grid = new Grid({grid, objects});
    this.identifiers = this.grid.identifiers;
    _.forEach(players, (player) => {
      this.addPlayer(player);
    });
  }
  setHook(hookName, func) {
    if (_.isFunction(func)) {
      this.hooks[hookName] = func;
      return;
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
    const flow = this.flow;
    const {tps} = flow;
    // there's a reason that gameSpeed should be a natural number, but better safe then sorry
    const gameSpeed = Math.ceil(SECOND / tps);

    this.runHook('GAME_BEFORE_START');
    flow.status = 'started';
    flow.intervalId = setInterval(this.runTick.bind(this), gameSpeed);
    this.runHook('GAME_AFTER_START');
    return this;
  }
  pause() {
    const flow = this.flow;

    this.runHook('GAME_BEFORE_PAUSED');
    flow.status = 'paused';
    clearInterval(flow.intervalId);
    this.runHook('GAME_AFTER_PAUSED');
    return this;
  }
  resume() {
    const flow = this.flow;
    const {tps} = flow;
    const gameSpeed = Math.ceil(SECOND / tps);

    this.runHook('GAME_BEFORE_RESUMED');
    flow.status = 'started';
    flow.intervalId = setInterval(this.runTick.bind(this), gameSpeed);
    this.runHook('GAME_AFTER_RESUMED');
    return this;
  }
  end() {
    const {intervalId} = this.flow;

    this.runHook('GAME_BEFORE_END');
    this.gameStatus = 'ended';
    clearInterval(intervalId);
    this.runHook('GAME_AFTER_END');
  }
  runTick() {
    const {flow, grid} = this;
    const {ticks, currentTick, tps} = flow;
    const actionType = ticks[currentTick];
    const {identifiers} = this.grid;

    this.runHook('TICK_START');
    _.forEach(identifiers, (identifier) => {
      if (identifier && _.isFunction(identifier.action)) {
        identifier.action(actionType);
      }
    });
    if (currentTick >= tps) {
      flow.currentTick = TICK_START;
    } else {
      flow.currentTick += 1;
    }
    _.forEach(identifiers, (identifier) => {

      if (identifier && identifier.toRemove) {
        grid.removeObject(identifier.id);
      }
    });
    this.runHook('TICK_END');
  }
  addPlayer({id, nickname, property}) {
    this.players[id] = new Player({id, nickname, property}, this);
    return this.players[id];
  }
  getPlayer(id) {
    return this.players[id];
  }
  removePlayer(id) {
    _.unset(this.players, id);
  }
}
