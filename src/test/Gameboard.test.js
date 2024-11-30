import Gameboard from "../game/Gameboard";

let gb = null;

describe("Gameboard", () => {
  beforeAll(() => {
    gb = new Gameboard(8);
    gb.recieveAttack([3, 3]);
  });

  test("have rows equal to the size", () => {
    expect(gb.field.length).toBe(8);
  });

  test("each rows with cols each", () => {
    gb.field.forEach((row) => {
      expect(row.length).toBe(8);
    });
  });

  test("recieve attack", () => {
    expect(gb.field[3][3]).toBe(1);
  });
});

describe("Gameboard ships", () => {
  beforeAll(() => {
    gb = new Gameboard(8);
    gb.deployShip(0, [2, 3]); // default ship's orientation is horizontal
    gb.toggleShipOrientation(1); // toggle ships orietation from horizontal to vertical
    gb.deployShip(1, [5, 3]); // deploy ship[1] vertically
  });

  test("Place ships at the correct coordinates", () => {
    expect(gb.field[2][3]).toBeInstanceOf(Object);
  });

  test("Occupied the adjacent blocks based on ships orientaion // horizontal", () => {
    // two sets of coordinates since ships[0] is just a length of 2
    [
      [2, 3],
      [2, 4],
    ].forEach(([x, y]) => {
      expect(gb.field[x][y]).toEqual(gb.ships[0]);
    });
  });

  test("Occupied the adjacent blocks based on ships orientaion // vertical", () => {
    [
      [5, 3],
      [4, 3],
    ].forEach(([x, y]) => {
      expect(gb.field[x][y]).toEqual(gb.ships[1]);
    });
  });

  test("Prevent ships from deploying beyond the border", () => {
    expect(() => {
      gb.deployShip(4, [4, 5]);
    }).toThrow(new Error("Cannot deploy beyond the border"));
  });
});
