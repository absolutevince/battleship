import Ship from "../game/Ship";
import shipUi from "./utils/shipUi.js";
import hoverBlock from "./utils/hoverBlock.js";
import deployOnClick from "./utils/deployOnClick.js";

export default function deployBoard(user, playerField, currentShip) {
  const container = document.createElement("div");
  const ship = shipUi(currentShip);
  const blocks = container.childNodes;
  ship.style.position = "fixed";
  container.className = `${user.toLowerCase()}_gameboard`;
  container.innerHTML = "";
  playerField.forEach((row, rIndex) => {
    const rowEl = document.createElement("div");
    rowEl.className = "row";
    row.forEach((col, cIndex) => {
      const block = document.createElement("div");
      block.dataset.y = rIndex;
      block.dataset.x = cIndex;
      block.className = "block";
      if (col instanceof Ship) {
        block.className = "block deploy_hover ship";
      }

      hoverBlock(block, blocks, currentShip);
      deployOnClick(block);

      rowEl.append(block);
    });
    container.append(rowEl);
  });

  return container;
}
