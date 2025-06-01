import { Board } from './Board.js';

export function generateLegalMoves(board, fromSquare) {

    function outOfBounds(r, f) {
        return (r < 0 || r > 7 || f < 0 || f > 7);
    }


  const piece = board.get(fromSquare);
  if (!piece) return [];

  const moves = [];
  const [rank, file] = Board.coordToIndex(fromSquare);
  const direction = piece.color === 'white' ? -1 : 1;

  if (piece.type === 'pawn') {
    const forward = Board.indexToCoord(rank + direction, file);
    if (board.get(forward) === null) moves.push(forward);

    if (
      (piece.color === 'white' && rank === 6) ||
      (piece.color === 'black' && rank === 1)
    ) {
      const doubleForward = Board.indexToCoord(rank + 2 * direction, file);
      if (
        board.get(forward) === null &&
        board.get(doubleForward) === null
      ) {
        moves.push(doubleForward);
      }
    }

    for (let df of [-1, 1]) {
      const targetFile = file + df;
      if (outOfBounds(rank, targetFile)) continue;
      const target = Board.indexToCoord(rank + direction, targetFile);
      const targetPiece = board.get(target);
      if (targetPiece && targetPiece.color !== piece.color) {
        moves.push(target);
      }
    }
  }

  if (piece.type === 'knight') {
    const deltas = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1],
    ];
    for (const [dr, df] of deltas) {
      const r = rank + dr;
      const f = file + df;
      if (outOfBounds(r,f)) continue;
      const target = Board.indexToCoord(r, f);
      const targetPiece = board.get(target);
      if (!targetPiece || targetPiece.color !== piece.color) {
        moves.push(target);
      }
    }
  }

    if(piece.type === 'bishop') {
    const directions = [[-1,-1], [-1,1], [1,-1], [1,1]];
    for(const [dr, df] of directions) {
        let mag = 0;
        while(true) {
            mag += 1;
            const r = rank + (mag * dr);
            const f = file + (mag * df); 
            if(outOfBounds(r,f)) break;
            const target = Board.indexToCoord(r, f);
            const targetPiece = board.get(target);
            if(!targetPiece) moves.push(target);
            else if(targetPiece.color != piece.color) {moves.push(target); break;}
        }
        console.log(moves);
    }
  }
    if(piece.type === 'rook') {
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];
    for(const [dr, df] of directions) {
        let mag = 0;
        while(true) {
            mag += 1;
            const r = rank + (mag * dr);
            const f = file + (mag * df); 
            if(outOfBounds(r,f)) break;
            const target = Board.indexToCoord(r, f);
            const targetPiece = board.get(target);
            if(!targetPiece) moves.push(target);
            else if(targetPiece.color != piece.color) {moves.push(target); break;}
        }
        console.log(moves);
    }
  }
    if(piece.type === 'queen') {
    const directions = [[0,1], [0,-1], [1,0], [-1,0], [-1,-1], [-1,1], [1,-1], [1,1]];
    for(const [dr, df] of directions) {
        let mag = 0;
        while(true) {
            mag += 1;
            const r = rank + (mag * dr);
            const f = file + (mag * df); 
            if(outOfBounds(r,f)) break;
            const target = Board.indexToCoord(r, f);
            const targetPiece = board.get(target);
            if(!targetPiece) moves.push(target);
            else if(targetPiece.color != piece.color) {moves.push(target); break;}
        }
        console.log(moves);
    }
  }
    if(piece.type === 'king') {
    const directions = [[0,1], [0,-1], [1,0], [-1,0], [-1,-1], [-1,1], [1,-1], [1,1]];
    for(const [dr, df] of directions) {
        const r = rank + dr;
        const f = file + df; 
        if(outOfBounds(r,f)) continue;
        const target = Board.indexToCoord(r, f);
        const targetPiece = board.get(target);
        if(!targetPiece) moves.push(target);
        else if(targetPiece.color != piece.color) moves.push(target);
    }
    console.log(moves);
  }

  return moves;
}
