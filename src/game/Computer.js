import Gameboard from "./Gameboard";

export default class Computer {
  static name = "Computer";
  static gameboard = new Gameboard();

  static randomCoordinates() {
    const y = Math.floor(Math.random() * 8);
    const x = Math.floor(Math.random() * 8);

    return [y, x];
  }

  static deployAllShips() {
    const ids = this.gameboard.getUndeployedShips().map((s) => s.id);
    let current = ids[0];

    while (ids.length) {
      const rotate = Math.floor(Math.random() * 2);
      const [y, x] = this.randomCoordinates();

      if (rotate) this.gameboard.toggleShipOrientation(current);
      try {
        this.gameboard.deployShip(current, [y, x]);
      } catch (error) {
        current = ids[0];
        continue;
      }

      current = ids.shift();
    }
  }
}
