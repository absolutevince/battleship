import "./style.css";
import BattleShip from "./game/Battleship.js";
import Player from "./game/Player.js";

// INIT ----------------------------
// Create a player
//const playerOne = new Player(prompt("Input your name: ")); // get player's name
const playerOne = new Player("Player One");
BattleShip.setPlayer(playerOne);
const playerBoard = document.querySelector(".player_board");
const computerBoard = document.querySelector(".computer_board");

displayShipSelect(BattleShip.player.ships);
displayGameboard(playerBoard, BattleShip.player.gameboard.field);
displayGameboard(computerBoard, BattleShip.computer.gameboard.field);
// ----------------------------

// deploy ships
const deployButton = document.querySelector(".deploy_button");
const yInput = document.querySelector("#coorY");
const xInput = document.querySelector("#coorX");

deployButton.addEventListener("click", () => {
  const [y, x] = [+yInput.value, +xInput.value];
  const shipId = shipsSelect.value;
  try {
    BattleShip.player.gameboard.deployShip(shipId, [y, x]);
  } catch (error) {
    console.log(error);
    return;
  }

  displayGameboard(BattleShip.player.gameboard.field);
});

// modules
function displayGameboard(container, playerGameBoardfield) {
  container.innerHTML = "";
  playerGameBoardfield.forEach((row, rIndex) => {
    const rowEl = document.createElement("div");
    rowEl.className = "row";
    rowEl.dataset.y = rIndex;
    row.forEach((col, cIndex) => {
      console.log(col);
      const colEl = document.createElement("div");
      colEl.dataset.x = cIndex;
      colEl.dataset.id = -1;
      colEl.textContent = col !== 0 ? col.length : "[ ]";
      rowEl.append(colEl);
    });
    container.append(rowEl);
  });
}

function displayShipSelect(options) {
  const shipsSelect = document.querySelector("#ship_select");
  options.forEach((ship) => {
    const opt = document.createElement("option");
    opt.value = ship.id;
    opt.textContent = ship.length;
    shipsSelect.append(opt);
  });
}
