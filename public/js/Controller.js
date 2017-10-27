import _ from 'lodash';

export default class Controller {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Controller should be binded to html element type object');
    }
    this.element = element;
    this.actions = {};
    this.bindings = {
      38: 'up',
      40: 'down',
      37: 'left',
      39: 'right',
      32: 'fire',
      13: 'use'
    };
    element.addEventListener('focusout', this.focus.bind(this));
    element.addEventListener('keyup', this.tryAction.bind(this));
    element.focus();
  }
  focus() {
    this.element.focus();
  }
  bindKey(key, action) {
    this.actions[key] = action;
  }
  addAction(actionName, callback) {
    if (_.isString(actionName) && _.isFunction(callback)) {
      this.actions[actionName] = callback;
    }
  }
  tryAction(event) {
    const {keyCode} = event;
    const action = this.bindings[keyCode];

    event.stopPropagation();
    if (action) {
      this.doAction(action);
    }
  }
  doAction(actionName) {
    const action = this.actions[actionName];

    if (_.isFunction(action)) {
      action.bind(this)();
    }
  }
}
