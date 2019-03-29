export default class Cell {
  constructor(args) {
    this.id = Cell.id++;
    this.value = args.value || 0;
    this.row = args.row >= 0 ? args.row : -1;
    this.col = args.col >= 0 ? args.col : -1;
    this.oldRow = args.oldRow >= 0 ? args.oldRow : null;
    this.oldCol = args.oldCol >= 0 ? args.oldCol : null;
    this.newTile = args.newTile || true;
    this.merged = args.merged || false;
  }
}
Cell.id = 0;
