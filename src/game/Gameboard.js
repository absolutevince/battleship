import Ship from "./Ship.js";

export default class Gameboard {
  constructor(size = 8) {
    this.size = size;
    this.field = this.#generateMap();
    this.ships = this.#generateShips();
  }

  recieveAttack([y, x]) {
    this.field[y][x] = 1;
  }

  deployShip(id, [y, x]) {
    const ship = this.ships[id];
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === "h") {
        if (x + ship.length > this.size - 1) {
          throw new Error("Cannot deploy beyond the border");
        }
        this.field[y][x + i] = ship;
      } else {
        if (y - ship.length < 0) {
          throw new Error("Cannot deploy beyond the border");
        }
        this.field[y - i][x] = ship;
      }
    }
  }

  toggleShipOrientation(id) {
    this.ships.forEach((ship) => {
      if (ship.id === id) {
        ship.toggleOrientation();
      }
    });
  }

  // ------ Privates
  #generateMap() {
    const grid = [];
    let row = [];
    for (let i = 0; i < this.size * this.size; i++) {
      row.push(0);

      if (row.length === this.size) {
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
}
