import Computer from '../game/Computer';

describe('Computer', () => {
  test('Generate a valid random coordinates', () => {
    expect(Array.isArray(Computer.randomCoordinates())).toBe(true);
  });

  test('Random coordinates should be less than 7 and greater than 0', () => {
    const [x, y] = Computer.randomCoordinates();
    expect(x >= 0 && x <= 7).toBe(true);
    expect(y >= 0 && y <= 7).toBe(true);
  });

  test('Deploy all ships @ random valid coordinates', () => {
    Computer.deployAllShips();
    Computer.gameboard.getUndeployedShips().forEach((ship) => {
      expect(ship).toBe(null);
    });
  });
});
