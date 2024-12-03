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
  const rotateButton = document.createElement("button");
  const orientationText = document.createElement("p");

  [xInput, yInput].forEach((input) => {
    input.max = MAX;
    input.min = MIN;
    input.type = "number";
  });

  shipSelect.className = "ship_select";
  button.textContent = "Deploy";
  rotateButton.textContent = "rotate";

  fillShipsSelect();
  updateCurrentOrientation();

  button.addEventListener("click", () => {
    BattleShip.deployPlayerShip(shipSelect.value, [yInput.value, xInput.value]);
    displayGameboard(BattleShip.player.name, BattleShip.player.gameboard.field);
    fillShipsSelect();
    updateCurrentOrientation();
  });

  rotateButton.addEventListener("click", () => {
    BattleShip.player.gameboard.toggleShipOrientation(+shipSelect.value);
    updateCurrentOrientation();
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

  function updateCurrentOrientation() {
    const ship = BattleShip.player.gameboard.getUndeployedShips(shipSelect.value);
    if (ship) orientationText.textContent = ship.orientation === "h" ? "Horizontal" : "Vertical";
  }

  container.append(shipSelect, rotateButton, yInput, xInput, button, orientationText);
}
