import BattleShip from "../../game/Battleship.js";
import UI from "../UI.js";
import Screen from "../Screen.js";
import deployInput from "../deployInput.js";
import deployBoard from "../deployBoard.js";

export default function deployScreen() {
  const screen = new Screen("deploy");
  const header = document.createElement("header");
  const body = document.createElement("div");
  const title = document.createElement("h1");
  const board = document.createElement("div");
  const button = document.createElement("button");
  title.textContent = "Deploy your Ships";
  button.textContent = "Start Battle";

  header.className = "header";
  body.className = "body";
  board.className = "board";

  button.addEventListener("click", () => {
    if (!BattleShip.player.gameboard.allShipsDeployed()) {
      alert("deploy all remaining ships");
      return;
    }
    console.log("Screen Changed: Battle Screen");
    UI.changeScreen("battle");
  });

  function updateBoard() {
    board.innerHTML = "";
    const gameboard = BattleShip.player.gameboard;
    board.append(
      deployInput(),
      deployBoard(
        BattleShip.player.name,
        gameboard.field,
        gameboard.getUndeployedShip(),
      ),
    );
  }

  screen.setUpdateFunction(updateBoard);
  screen.update();

  header.append(title);
  body.append(board, button);

  screen.append(header, body);

  return screen;
}
