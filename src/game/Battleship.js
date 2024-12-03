import displayGameboard from "../UI/displayGameboard.js";
import Computer from "./Computer.js";
import Player from "./Player.js";
import deployInput from "../UI/deployInput.js";

export default class BattleShip {
  static player = new Player("Player");
  static computer = Computer;
  static #winner = null;

  static start() {
    deployInput(); // display deploy input
    displayGameboard(this.player.name, this.player.gameboard.field);
    this.#deployComputerShips();
  }

  static setPlayer(player) {
    this.player = player;
  }

  static attack(attackerName, [y, x]) {
    if (attackerName === player.name) {
      this.computer.gameboard.recieveAttack([y, x]);
    } else {
      this.player.gameboard.recieveAttack(computer.chooseTarget());
    }

    if (this.#gameOver()) {
      alert(`Winner: ${this.#winner}`);
    }
  }

  static deployPlayerShip(id, [y, x]) {
    try {
      this.player.gameboard.deployShip(+id, [+y, +x]);
    } catch (error) {
      alert(error);
    }
  }

  static #gameOver() {
    if (player.gameboard.isAllShipSunk()) {
      this.#winner = computer.name;
      return true;
    } else if (computer.gameboard.isAllShipSunk()) {
      this.#winner = player.name;
      return true;
    }

    return false;
  }

  static #deployComputerShips() {
    this.computer.deployAllShips();
    displayGameboard(this.computer.name, this.computer.gameboard.field);
  }
}
