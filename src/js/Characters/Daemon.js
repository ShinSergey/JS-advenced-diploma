import Character from "../Character";

export default class Deamon extends Character {
  constructor(level, type = 'Deamon') {
    super(level, type);
      this.attack = 10;
      this.defence = 10;
  }
}
