import Gameboard from "../game/Gameboard";

let gb = null;

describe("Gameboard", () => {
  beforeEach(() => {
    gb = new Gameboard(8);
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
