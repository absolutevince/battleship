import BattleShip from "../../game/Battleship.js";
import UI from "../UI.js";

export default function deployOnClick(target) {
  target.addEventListener("click", () => {
    BattleShip.deployPlayerShip([target.dataset.y, target.dataset.x]);
    UI.getScreen("deploy").update();
    if (BattleShip.player.gameboard.allShipsDeployed()) {
      console.log("all ships deployed");
      const inputsEl = document.querySelector(".inputs");
      inputsEl.style.opacity = "0";
      inputsEl.style.visibility = "hidden";
    }
  });
}
