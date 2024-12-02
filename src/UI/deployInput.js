import BattleShip from "../game/Battleship";
import displayGameboard from "./displayGameboard";

export default function deployInput() {
  const MAX = 7;
  const MIN = 0;
  const container = document.querySelector(".deploy_input");
  const shipSelect = document.createElement("select");
  const xInput = document.createElement("input");
  const yInput = document.createElement("input");
  const button = document.createElement("button");

  [xInput, yInput].forEach((input) => {
    input.max = MAX;
    input.min = MIN;
    input.type = "number";
  });

  shipSelect.className = "ship_select";
  button.textContent = "Deploy";

  fillShipsSelect();

  button.addEventListener("click", () => {
    BattleShip.player.gameboard.deployShip(shipSelect.value, [
      +yInput.value,
      +xInput.value,
    ]);
    displayGameboard("player", BattleShip.player.gameboard.field);
    fillShipsSelect();
  });

  // -------
  function fillShipsSelect() {
    shipSelect.innerHTML = "";
    BattleShip.player.gameboard.getUndeployedShips().forEach((ship) => {
      if (ship !== null) {
        const opt = document.createElement("option");
        opt.value = ship.id;
        opt.textContent = ship.length;
        shipSelect.append(opt);
      }
    });
  }

  container.append(shipSelect, yInput, xInput, button);
}
