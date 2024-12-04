import BattleShip from "../game/Battleship";

export default function displayScore(user) {
  const container =
    user.name === BattleShip.player.name
      ? document.querySelector(".player_scoreboard")
      : document.querySelector(".computer_scoreboard");
  container.innerHTML = "";

  const name = document.createElement("p");
  const scoreboard = document.createElement("div");
  const hitLabel = document.createElement("span");
  const hitScore = document.createElement("span");
  const missLabel = document.createElement("span");
  const missScore = document.createElement("span");

  name.textContent = user.name;
  hitLabel.textContent = "Hits:";
  missLabel.textContent = "Misses:";
  hitScore.textContent =
    user.name === BattleShip.player.name
      ? BattleShip.computer.gameboard.getStat().hit
      : BattleShip.player.gameboard.getStat().hit;
  missScore.textContent =
    user.name === BattleShip.player.name
      ? BattleShip.computer.gameboard.getStat().miss
      : BattleShip.player.gameboard.getStat().miss;

  scoreboard.append(hitLabel, hitScore, missLabel, missScore);
  container.append(name, scoreboard);
}
