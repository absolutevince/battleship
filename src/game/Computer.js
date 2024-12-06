import Gameboard from "./Gameboard";

export default class Computer {
  static name = "Computer";
  static gameboard = new Gameboard();
  static #attackedBlocks = [];

  static randomCoordinates() {
    const y = Math.floor(Math.random() * 8);
    const x = Math.floor(Math.random() * 8);

    return [y, x];
  }

  static attackPattern() {
    let [y, x] = this.randomCoordinates();

    while (this.#blockAlreadyAttacked([y, x])) {
      [y, x] = this.randomCoordinates();
    }

    this.#addToAttackedBlocks([y, x]);
    return [y, x];
  }

  static deployAllShips() {
    while (this.gameboard.getUndeployedShips().length) {
      const rotate = Math.floor(Math.random() * 2);
      const [y, x] = this.randomCoordinates();

      if (rotate) this.gameboard.toggleShipOrientation();
      try {
        this.gameboard.deployShip([y, x]);
      } catch (error) {
        continue;
      }
    }
  }

  static #addToAttackedBlocks([y, x]) {
    this.#attackedBlocks.push(`${y}${x}`);
  }

  static #blockAlreadyAttacked([y, x]) {
    return this.#attackedBlocks.includes(`${y}${x}`);
  }
}
