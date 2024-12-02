import Ship from "../game/Ship";

let ship = null;

describe("Ship's destruction", () => {
  beforeEach(() => {
    ship = new Ship(2);
  });

  test("Ship sinking", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
