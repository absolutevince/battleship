export default class Screen {
  #container;
  #name;
  #updateFunction;
  constructor(name) {
    this.#name = name;
    this.#container = document.createElement("section");
    this.#updateFunction = null;
  }

  #init() {
    this.#container.className = `${this.#name}_screen`;
  }

  element() {
    this.#init();
    return this.#container;
  }

  setUpdateFunction(fn) {
    this.#updateFunction = fn;
  }

  update() {
    if (!this.#updateFunction) return;
    this.#updateFunction();
  }

  append(...elements) {
    this.#container.append(...elements);
  }
}
