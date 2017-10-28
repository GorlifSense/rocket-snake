
export default class Player {
  constructor({id, nickname, property}, game) {
    this.id = id;
    this.nickname = nickname;
    this.property = property;
    this.game = game;
  }
  getProperty() {
    const {identifiers} = this.game;

    return identifiers[this.property];
  }
}
