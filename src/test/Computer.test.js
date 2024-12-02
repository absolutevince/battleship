import Computer from "../game/Computer";

describe("Computer", () => {
  test("Choose Target should return an array", () => {
    expect(Array.isArray(Computer.chooseTarget())).toBe(true);
  });
  test("Choose Target to be less than 7 and greater than 0", () => {
    const [x, y] = Computer.chooseTarget();
    expect(x >= 0 && x <= 7).toBe(true);
    expect(y >= 0 && y <= 7).toBe(true);
  });
});
