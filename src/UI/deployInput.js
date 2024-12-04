import BattleShip from "../game/Battleship";
import UI from "./UI";

export default function deployInput() {
  const container = document.createElement("div");
  const shipSelect = document.createElement("select");
  const xInput = document.createElement("input");
  const yInput = document.createElement("input");
  const button = document.createElement("button");
  const rotateButton = document.createElement("button");
  const orientationText = document.createElement("p");

  [xInput, yInput].forEach((input) => {
    input.max = 7;
    input.min = 0;
    input.type = "number";
  });

  container.className = "deploy_input";
  shipSelect.className = "ship_select";

  button.textContent = "Deploy";
  rotateButton.textContent = "rotate";

  fillShipsSelect();
  updateCurrentOrientation();

  button.addEventListener("click", () => {
    BattleShip.deployPlayerShip(shipSelect.value, [yInput.value, xInput.value]);
    UI.getScreen("deploy").update();
    fillShipsSelect();
    updateCurrentOrientation();
    if (BattleShip.player.gameboard.allShipsDeployed()) {
      console.log("all ships deployed");
      // change screen to battle screen
    }
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
    const ship = BattleShip.player.gameboard.getUndeployedShips(
      shipSelect.value,
    );
    if (ship)
      orientationText.textContent =
        ship.orientation === "h" ? "Horizontal" : "Vertical";
  }

  container.append(
    shipSelect,
    rotateButton,
    yInput,
    xInput,
    button,
    orientationText,
  );

  return container;
}
