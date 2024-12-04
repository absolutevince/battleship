import Screen from "../Screen.js";
import UI from "../UI.js";

export default function homeScreen() {
  const screen = new Screen("home");
  const header = document.createElement("header");
  const title = document.createElement("h1");
  const startButton = document.createElement("button");

  title.textContent = "Battleship Game";
  startButton.textContent = "Start";

  startButton.addEventListener("click", () => {
    console.log("Screen Changed: Deploy Screen");
    UI.changeScreen("deploy");
  });

  header.append(title);

  screen.append(header, startButton);

  return screen;
}
