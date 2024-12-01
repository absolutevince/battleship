export default class Ship {
  constructor(len, id) {
    this.length = len;
    this.id = id;
    this.hitCount = 0;
    this.orientation = "h"; // = horizontal, v = vertical
  }

  hit() {
    this.hitCount += 1;
  }

  isSunk() {
    return this.hitCount === this.length;
  }

  toggleOrientation() {
    this.orientation = this.orientation === "h" ? "v" : "h";
  }
}
