import Ship from "./Ship.js";

export default class Gameboard {
  #attacks;
  #size;
  #ships;
  #undeployedShips;
  #destroyedBlocks;
  constructor(size = 8) {
    this.#size = size;
    this.field = this.#generateMap();
    this.#ships = this.#generateShips();
    this.#undeployedShips = [...this.#ships];
    this.#attacks = { hit: 0, miss: 0 };
    this.#destroyedBlocks = [];
  }

  recieveAttack([y, x]) {
    this.#isBlockDestroyed([y, x]);

    if (this.field[y][x] instanceof Ship) {
      this.#addHits();
      this.field[y][x].hit(); // hit a ship
      if (this.field[y][x].isSunk())
        this.#ships.splice(this.field[y][x].id, 1, null);
      this.field[y][x] = 1;
    } else {
      this.#addMisses();
      this.field[y][x] = -1;
    }
    this.#addToDestroyedBlocks([y, x]);
  }

  getStat() {
    return {
      hit: this.#attacks.hit,
      miss: this.#attacks.miss,
    };
  }

  deployShip(id, [y, x]) {
    const ship = this.#undeployedShips[id];

    this.#checkForErrors(ship, [y, x]);

    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === "h") {
        this.field[y][x + i] = ship;
      } else {
        this.field[y + i][x] = ship;
      }
    }
    this.#undeployedShips[id] = null;
    // replace the value of index id with null to keep on correctly indexing the item using it's id, since the ship's id is the index its index in the array
  }

  getShips(id) {
    if (id === undefined) {
      return this.#ships;
    } else {
      return this.#ships[id];
    }
  }

  getUndeployedShips(id) {
    if (id === undefined) {
      return this.#undeployedShips;
    } else {
      return this.#undeployedShips[id];
    }
  }

  toggleShipOrientation(id) {
    this.#undeployedShips.forEach((ship) => {
      if (ship) {
        if (ship.id === id) {
          ship.toggleOrientation();
        }
      }
    });
  }

  isAllShipSunk() {
    let sunkCount = 0;
    this.#ships.forEach((s) => (s === null ? sunkCount++ : 0));
    return sunkCount === this.#ships.length;
  }

  allShipsDeployed() {
    let deployedCount = 0;
    this.#undeployedShips.forEach((ship) => {
      if (ship === null) deployedCount++;
    });

    return deployedCount === this.#undeployedShips.length;
  }

  // ------ Private
  #checkForErrors(ship, [y, x]) {
    const beyondBorderError = "Cannot deploy beyond the border";
    const alreadyOccupiedError =
      "A Ship has already been deploy on that coordinates";

    if (ship.orientation === "h") {
      if (x + ship.length - 1 > this.#size - 1) {
        throw new Error(beyondBorderError);
      }
    } else {
      if (y + ship.length - 1 > this.#size - 1) {
        throw new Error(beyondBorderError);
      }
    }
    if (this.#hasShipDeployed(ship, [y, x])) {
      throw new Error(alreadyOccupiedError);
    }
  }

  #hasShipDeployed(ship, [y, x]) {
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === "h") {
        if (this.field[y][x + i] !== 0) return true;
      } else {
        if (this.field[y + i][x] !== 0) return true;
      }
    }
    return false;
  }

  #generateMap() {
    const grid = [];
    let row = [];
    for (let i = 0; i < this.#size * this.#size; i++) {
      row.push(0);

      if (row.length === this.#size) {
        grid.push(row);
        row = [];
      }
    }

    return grid;
  }

  #generateShips() {
    return [
      new Ship(2, 0),
      new Ship(2, 1),
      new Ship(3, 2),
      new Ship(3, 3),
      new Ship(4, 4),
      new Ship(5, 5),
    ];
  }

  #addHits() {
    this.#attacks.hit += 1;
  }

  #addMisses() {
    this.#attacks.miss += 1;
  }

  #addToDestroyedBlocks([y, x]) {
    this.#destroyedBlocks.push(`${y}${x}`);
  }

  #isBlockDestroyed([y, x]) {
    if (this.#destroyedBlocks.includes(`${y}${x}`)) {
      throw new Error("this block is already been destroyed");
    }
  }
}
