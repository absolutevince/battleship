import Gameboard from "./Gameboard";

export default class Computer {
  static name = "Computer";
  static gameboard = new Gameboard();

  static chooseTarget() {
    const y = Math.floor(Math.random() * 8);
    const x = Math.floor(Math.random() * 8);

    return [y, x];
  }
}
