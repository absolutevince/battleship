import BattleShip from "../game/Battleship.js";
import UI from "./UI";
import shipUi from "../UI/utils/shipUi.js";
import arrDownIcon from "../asset/icon/arrow_down.svg";
import arrRightIcon from "../asset/icon/arrow_right.svg";

export default function deployInput() {
  const container = document.createElement("div");
  const shipSelect = document.createElement("select");
  const currentShip = document.createElement("div");
  const xInput = document.createElement("input");
  const yInput = document.createElement("input");
  const button = document.createElement("button");
  const rotateButton = document.createElement("button");
  const coorDiv = document.createElement("div");
  const leftDiv = document.createElement("div");
  const rightDiv = document.createElement("div");
  const arrowDown = document.createElement("img");
  const arrowRight = document.createElement("img");

  [xInput, yInput].forEach((input) => {
    input.max = 7;
    input.min = 0;
    input.type = "number";
  });

  // Classes
  container.className = "inputs";
  shipSelect.className = "ship_select";
  currentShip.className = "current_ship";
  leftDiv.className = "left";
  rightDiv.className = "right";
  coorDiv.className = "coor";
  rotateButton.className = "rotate_button";
  arrowDown.className = "arrow_down";
  arrowRight.className = "arrow_right";

  // Contents
  fillShipsSelect();
  updateCurrentShip();
  button.textContent = "Deploy";
  if (shipSelect.childNodes[0]) shipSelect.childNodes[0].selected;
  rotateButton.textContent = updateOrientationDisplay();
  arrowRight.src = arrRightIcon;
  arrowDown.src = arrDownIcon;

  // APPENDS
  container.append(leftDiv, rightDiv);
  leftDiv.append(currentShip, coorDiv);
  coorDiv.append(arrowDown, yInput, arrowRight, xInput);
  rightDiv.append(rotateButton, button);

  button.addEventListener("click", () => {
    BattleShip.deployPlayerShip(shipSelect.value, [yInput.value, xInput.value]);
    UI.getScreen("deploy").update();
    if (BattleShip.player.gameboard.allShipsDeployed()) {
      console.log("all ships deployed");
    }
  });

  rotateButton.addEventListener("click", () => {
    BattleShip.player.gameboard.toggleShipOrientation(+shipSelect.value);
    rotateButton.textContent = updateOrientationDisplay();
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

  function updateCurrentShip() {
    currentShip.innerHTML = "";
    for (
      let i = 0;
      i < BattleShip.player.gameboard.getUndeployedShips().length;
      i++
    ) {
      const ship = BattleShip.player.gameboard.getUndeployedShips()[i];

      if (ship !== null) {
        console.log(ship.length);
        currentShip.append(shipUi(ship.length));
        return;
      }
    }
  }

  function updateOrientationDisplay() {
    const ship = BattleShip.player.gameboard.getUndeployedShips(
      shipSelect.value,
    );
    if (ship) return ship.orientation === "h" ? "Horizontal" : "Vertical";
  }

  return container;
}
