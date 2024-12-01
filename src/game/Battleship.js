import Computer from "./Computer.js";

export default class BattleShip {
  static player = null;

  static setPlayer(player) {
    this.player = player;
  }

  static attack(attackerName, [y, x]) {
    if (attackerName === player.name) {
      Computer.gameboard.recieveAttack([y, x]);
    } else {
      player.gameboard.recieveAttack(Computer.chooseTarget());
    }
  }
}
