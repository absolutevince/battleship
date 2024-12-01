import Ship from "../game/Ship";

let ship = null;

describe("Ship's destruction", () => {
  beforeEach(() => {
    ship = new Ship(2);
  });

  test("Sunk one ship", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
