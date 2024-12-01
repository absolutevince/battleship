import Gameboard from "../game/Gameboard";

let gb = null;

describe("Gameboard", () => {
  beforeAll(() => {
    gb = new Gameboard();
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
});

describe("Gameboard ships", () => {
  beforeAll(() => {
    gb = new Gameboard();
    gb.deployShip(0, [2, 3]); // default ship's orientation is horizontal
    gb.toggleShipOrientation(1); // toggle ships orietation from horizontal to vertical
    gb.deployShip(1, [5, 3]); // deploy ship[1] vertically
  });

  test("Place the head of the ship correctly", () => {
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

describe("Recieve Attack", () => {
  beforeEach(() => {
    gb = new Gameboard();
    gb.deployShip(0, [2, 3]);
  });

  test("Correctly attack a field block", () => {
    gb.recieveAttack([7, 7]);
    expect(gb.field[7][7]).toBe(1);
  });

  test("record missed attacks", () => {
    gb.recieveAttack([0, 0]);
    expect(gb.getStat().miss).toEqual(1);
  });

  test("record hit attacks", () => {
    gb.recieveAttack([2, 3]);
    expect(gb.getStat().hit).toEqual(1);
  });
});

describe("Sunk all ships", () => {
  beforeAll(() => {
    gb = new Gameboard();
    for (let i = 0; i < gb.ships.length; i++) {
      gb.deployShip(i, [i, 0]); // deploy ships depending on it's length, 1st ship is @ [0,0], [0,1]
    }
    [0, 1].forEach((x) => {
      gb.recieveAttack([0, x]);
      gb.recieveAttack([1, x]);
    }); // attacks @ [0,0] & [0,1] , should sunk the 1st and 2nd ships of length 2;
    [0, 1, 2].forEach((x) => gb.recieveAttack([2, x]));
    [0, 1, 2].forEach((x) => gb.recieveAttack([3, x]));
    [0, 1, 2, 3].forEach((x) => gb.recieveAttack([4, x]));
    [0, 1, 2, 3, 4].forEach((x) => gb.recieveAttack([5, x]));
  });

  test("All ship Sunk", () => {
    expect(gb.isAllShipSunk()).toBe(true);
  });
});
