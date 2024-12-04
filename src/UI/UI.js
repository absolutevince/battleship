import battleScreen from "./screen/battleScreen";
import deployScreen from "./screen/deployScreen";
import homeScreen from "./screen/homeScreen";

export default class UI {
  static #currentScreen = "home";
  static #container = document.querySelector(".wrapper");
  static #screens = {
    home: homeScreen(),
    deploy: deployScreen(),
    battle: battleScreen(),
  };

  static init() {
    this.#displayScreen();
  }

  static update() {
    this.#displayScreen();
  }

  static getScreen(name) {
    return this.#screens[name];
  }

  static changeScreen(screen) {
    this.#currentScreen = screen;
    this.#displayScreen();
  }

  static #displayScreen() {
    this.#container.innerHTML = "";
    this.#screens[this.#currentScreen].update();
    this.#container.append(this.#screens[this.#currentScreen].element());
  }
}
