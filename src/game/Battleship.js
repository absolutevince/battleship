import Computer from "./Computer.js";
import Player from "./Player.js";

export default class BattleShip {
  static player = new Player("Player");
  static computer = Computer;
  static #winner = null;
  static battling = false;

  static start() {
    this.#deployComputerShips();
  }

  static setPlayer(player) {
    this.player = player;
  }

  static attack(attackerName, [y, x]) {
    if (attackerName === this.player.name) {
      this.computer.gameboard.recieveAttack([y, x]);
    } else if (attackerName === this.computer.name) {
      this.player.gameboard.recieveAttack([y, x]);
    }

    if (this.gameOver()) {
      alert(`Winner: ${this.#winner}`);
    }
  }

  static deployPlayerShip([y, x]) {
    try {
      this.player.gameboard.deployShip([+y, +x]);
    } catch (error) {
      alert(error);
    }
  }

  static gameOver() {
    if (this.player.gameboard.isAllShipSunk()) {
      this.#winner = this.computer.name;
      return true;
    } else if (this.computer.gameboard.isAllShipSunk()) {
      this.#winner = this.player.name;
      return true;
    }

    return false;
  }

  static #deployComputerShips() {
    this.computer.deployAllShips();
  }
}
