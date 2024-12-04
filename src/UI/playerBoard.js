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
      const colEl = document.createElement("div");
      colEl.dataset.y = rIndex;
      colEl.dataset.x = cIndex;

      if (col instanceof Ship) {
        colEl.textContent = `[${col.length}]`;
      } else if (col === 0) {
        colEl.textContent = "[ ]";
      } else if (col === 1) {
        colEl.textContent = "X";
      } else {
        colEl.textContent = "O";
      }
      rowEl.append(colEl);

      if (user === BattleShip.computer.name) {
        colEl.addEventListener("click", () => {
          if (BattleShip.gameOver()) {
            alert("The game is already over");
            return;
          }
          try {
            BattleShip.attack(BattleShip.player.name, [
              +colEl.dataset.y,
              +colEl.dataset.x,
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
