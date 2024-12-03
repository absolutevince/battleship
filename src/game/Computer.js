import Gameboard from './Gameboard';

export default class Computer {
  static name = 'Computer';
  static gameboard = new Gameboard();

  static randomCoordinates() {
    const y = Math.floor(Math.random() * 8);
    const x = Math.floor(Math.random() * 8);

    return [y, x];
  }

  static deployAllShips() {
    const ids = this.gameboard.getShips().map((s) => s.id);
    while (ids.length > 0) {
      const current = ids[0];
      try {
        this.gameboard.deployShip(current, this.randomCoordinates());
      } catch (error) {
        continue;
      }
      ids.shift();
    }
  }
}
