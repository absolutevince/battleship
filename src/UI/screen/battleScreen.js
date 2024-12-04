import BattleShip from "../../game/Battleship.js";
import Screen from "../Screen.js";
import playerBoard from "../playerBoard.js";

export default function battleScreen() {
  const screen = new Screen("battle");
  const board = document.createElement("div");
  board.className = "board";

  board.append(
    playerBoard(BattleShip.computer.name, BattleShip.computer.gameboard.field),
  );

  function updateField() {
    board.innerHTML = "";
    board.append(
      playerBoard(BattleShip.player.name, BattleShip.player.gameboard.field),
      playerBoard(
        BattleShip.computer.name,
        BattleShip.computer.gameboard.field,
      ),
    );
  }

  screen.append(board);
  screen.setUpdateFunction(updateField);
  screen.update();
  return screen;
}
