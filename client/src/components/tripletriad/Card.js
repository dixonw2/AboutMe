export default class Card {
  constructor(name, left, up, right, down, element, level) {
    this.name = name;
    this.left = left;
    this.up = up;
    this.right = right;
    this.down = down;
    this.element = element;
    this.level = level;
    this.spritePath =
      "../images/tripletriad/cards/" + this.name.replace(" ", "").replace(",", "");
  }
}
