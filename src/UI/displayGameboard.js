import BattleShip from "../game/Battleship";

export default function displayGameboard(user, playerField) {
  const container =
    user === BattleShip.player.name ? document.querySelector(".player_board") : document.querySelector(".computer_board");
  container.innerHTML = "";
  playerField.forEach((row, rIndex) => {
    const rowEl = document.createElement("div");
    rowEl.className = "row";
    row.forEach((col, cIndex) => {
      const colEl = document.createElement("div");
      colEl.dataset.y = rIndex;
      colEl.dataset.x = cIndex;
      colEl.textContent = col !== 0 ? `[${col.length}]` : "[ ]";
      rowEl.append(colEl);
    });
    container.append(rowEl);
  });
}
