import BattleShip from "../../game/Battleship.js";
import Screen from "../Screen.js";
import playerBoard from "../playerBoard.js";

export default function battleScreen() {
  const screen = new Screen("battle");
  const playerScore = document.createElement("p");
  const computerScore = document.createElement("p");
  const playerDiv = document.createElement("div");
  const computerDiv = document.createElement("div");

  // class
  playerDiv.className = "player";
  computerDiv.className = "computer";

  // content
  updateStatDisplay(BattleShip.player.name);
  updateStatDisplay(BattleShip.computer.name);

  function update() {
    playerDiv.innerHTML = "";
    computerDiv.innerHTML = "";
    updateStatDisplay(BattleShip.player.name);
    updateStatDisplay(BattleShip.computer.name);
    playerDiv.append(
      computerScore,
      playerBoard(BattleShip.player.name, BattleShip.player.gameboard.field),
    );
    computerDiv.append(
      playerScore,
      playerBoard(
        BattleShip.computer.name,
        BattleShip.computer.gameboard.field,
      ),
    );

    screen.append(playerDiv, computerDiv);
  }

  function updateStatDisplay(userName) {
    if (userName === BattleShip.player.name) {
      const { hit, miss } = BattleShip.computer.gameboard.getStat();
      playerScore.textContent = `Hit/Miss: ${hit} / ${miss}`;
    } else if (userName === BattleShip.computer.name) {
      const { hit, miss } = BattleShip.player.gameboard.getStat();
      computerScore.textContent = `Hit/Miss: ${hit} / ${miss}`;
    }
  }

  screen.setUpdateFunction(update);
  screen.update();
  return screen;
}
