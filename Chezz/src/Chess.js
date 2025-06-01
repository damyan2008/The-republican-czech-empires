import { Board } from './Engine/Board.js';
import { renderBoard } from './UI/BoardRenderer.js';
import { initSelection } from './Input/Selection.js';


const board = new Board();
board.setupStartPosition();  // use custom logic before FEN parsing

const boardElement = document.getElementById('chessboard');
renderBoard(board, boardElement);

initSelection(board, boardElement, () => renderBoard(board, boardElement));
