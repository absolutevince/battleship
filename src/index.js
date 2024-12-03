import "./style.css";
import BattleShip from "./game/Battleship.js";
import Player from "./game/Player.js";
import deployInput from "./UI/deployInput.js";
import displayGameboard from "./UI/displayGameboard.js";

//INIT
const playerOne = new Player("Player");
BattleShip.setPlayer(playerOne);
deployInput(); // display deploy input
displayGameboard("player", BattleShip.player.gameboard.field);
displayGameboard("computer", BattleShip.computer.gameboard.field);
