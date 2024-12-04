import BattleShip from "../game/Battleship";
import Ship from "../game/Ship";
import UI from "./UI.js";

export default function playerBoard(user, playerField) {
  const container = document.createElement("div");
  container.className = `${user.toLowerCase()}_gameboard`;
  container.innerHTML = "";
  playerField.forEach((row, rIndex) => {
    const rowEl = document.createElement("div");
    rowEl.className = "row";
    row.forEach((col, cIndex) => {
      const block = document.createElement("div");
      block.dataset.y = rIndex;
      block.dataset.x = cIndex;

      if (col instanceof Ship) {
        if (user === BattleShip.player.name) {
          block.className = "block ship";
        } else if (user === BattleShip.computer.name) {
          block.className = "block"; // remove the ship class to make the computer's ships hidden
        }
      } else if (col === 0) {
        block.className = "block";
      } else if (col === 1) {
        block.className = "block destroyed hit";
      } else {
        block.className = "block destroyed miss";
      }
      rowEl.append(block);

      if (user === BattleShip.computer.name) {
        block.addEventListener("click", () => {
          if (BattleShip.gameOver()) {
            alert("The game is already over");
            return;
          }
          try {
            BattleShip.attack(BattleShip.player.name, [
              +block.dataset.y,
              +block.dataset.x,
            ]);
          } catch (error) {
            alert(error);
            return;
          }
          BattleShip.attack(
            BattleShip.computer.name,
            BattleShip.computer.attackPattern(),
          );
          UI.update();
        });
      }
    });
    container.append(rowEl);
  });

  return container;
}
