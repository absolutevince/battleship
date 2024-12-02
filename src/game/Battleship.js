import Computer from "./Computer.js";

export default class BattleShip {
  static player = null;
  static computer = Computer;
  static #winner = null;
  static #turn = 0; // player, 1 = computer

  static setPlayer(player) {
    this.player = player;
  }

  static attack(attackerName, [y, x]) {
    if (attackerName === player.name) {
      computer.gameboard.recieveAttack([y, x]);
      this.#turn = 1;
    } else {
      player.gameboard.recieveAttack(computer.chooseTarget());

      this.#turn = 0;
    }

    if (this.#gameOver()) {
      // broadcast winner
    }
  }

  static #gameOver() {
    if (player.gameboard.isAllShipSunk()) {
      this.#winner = player.name;
      return true;
    } else if (computer.gameboard.isAllShipSunk()) {
      this.#winner = computer.name;
      return true;
    }

    return false;
  }
}
