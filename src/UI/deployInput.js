import BattleShip from "../game/Battleship.js";
import shipUi from "../UI/utils/shipUi.js";

export default function deployInput() {
  const container = document.createElement("div");
  const currentShip = document.createElement("div");
  const xInput = document.createElement("input");
  const yInput = document.createElement("input");
  const rotateButton = document.createElement("button");

  [xInput, yInput].forEach((input) => {
    input.max = 7;
    input.min = 0;
    input.type = "number";
  });

  // Classes
  container.className = "inputs";
  currentShip.className = "current_ship";
  rotateButton.className = "rotate_button";

  // Contents
  updateCurrentShip();
  rotateButton.textContent = updateOrientationDisplay();

  // APPENDS
  container.append(currentShip, rotateButton);

  rotateButton.addEventListener("click", () => {
    BattleShip.player.gameboard.toggleShipOrientation();
    rotateButton.textContent = updateOrientationDisplay();
  });

  // -------

  function updateCurrentShip() {
    currentShip.innerHTML = "";
    const ship = BattleShip.player.gameboard.getUndeployedShip();
    if (ship) currentShip.append(shipUi(ship));
    return;
  }

  function updateOrientationDisplay() {
    const ship = BattleShip.player.gameboard.getUndeployedShip();
    if (ship) return ship.orientation === "h" ? "Horizontal" : "Vertical";
    return null;
  }

  return container;
}
