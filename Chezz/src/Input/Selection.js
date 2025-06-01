let selectedSquare = null;
import { generateLegalMoves } from '../Engine/MoveGen.js';

export function initSelection(board, container, onMoveCallback) {
  container.addEventListener('click', (e) => {
    const squareEl = e.target.closest('.square');
    if (!squareEl) return;

    const squareName = squareEl.dataset.square;
    const piece = board.get(squareName);
    
    if (!selectedSquare) {
      if (piece && piece.color === board.currentTurn) {
        
        selectedSquare = squareName;
        squareEl.classList.add('highlight');
      }
    } 
    else {
        const legalMoves = generateLegalMoves(board, selectedSquare);
        if(legalMoves.includes(squareName)) {
            if (board.makeMove(selectedSquare, squareName)) {
                onMoveCallback(); // triggers re-render
            }
        }
        document
            .querySelectorAll('.square.highlight')
            .forEach((el) => el.classList.remove('highlight'));
        selectedSquare = null;
        }
  });
}
