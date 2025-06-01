export class Board {
  
  constructor() {
    // 8x8 array of pieces or null
    this.squares = Array.from({ length: 8 }, () => Array(8).fill(null));
    this.currentTurn = 'white';

  }
  // Converts square like 'e4' → [fileIndex, rankIndex]
  static coordToIndex(square) {
    const file = square.charCodeAt(0) - 97;      // 'a' → 0
    const rank = 8 - parseInt(square[1], 10);    // '8' → 0, '1' → 7
    return [rank, file];
  }

  // Converts index → square like [4, 4] → 'e4'
  static indexToCoord(rank, file) {
    return String.fromCharCode(97 + file) + (8 - rank);
  }

  get(square) {
    const [rank, file] = Board.coordToIndex(square);
    return this.squares[rank][file];
  }

  set(square, piece) {
    const [rank, file] = Board.coordToIndex(square);
    this.squares[rank][file] = piece;
  }

  setupStartPosition() {
    const make = (t, c) => ({ type: t, color: c, hasMoved: false });

    const backRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    const files = 'abcdefgh';

    // White pieces
    for (let i = 0; i < 8; i++) {
      this.set(`${files[i]}2`, make('pawn', 'white'));
      this.set(`${files[i]}1`, make(backRow[i], 'white'));
    }

    // Black pieces
    for (let i = 0; i < 8; i++) {
      this.set(`${files[i]}7`, make('pawn', 'black'));
      this.set(`${files[i]}8`, make(backRow[i], 'black'));
    }
  }

  makeMove(from, to) {
    const piece = this.get(from);
    if (!piece) return false;
    if(!piece.hasMoved) piece.hasMoved = true;

    this.set(to, piece);
    this.set(from, null);
    this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
    return true;
  }


}
