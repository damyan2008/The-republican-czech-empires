let selectedSquare = null;
let legalMoves = [];

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
        legalMoves = generateLegalMoves(board, selectedSquare);
        squareEl.classList.add('highlight');
        legalMoves.forEach((move) => {
            const targetEl = container.querySelector(`[data-square="${move}"]`);
            if(targetEl) targetEl.classList.add('highlight');
        })

      }
    } 
    else {
        if(legalMoves.includes(squareName)) {
            if (board.makeMove(selectedSquare, squareName)) {
                onMoveCallback(); // triggers re-render
            }
        }
        container
            .querySelectorAll('.square.highlight')
            .forEach((el) => el.classList.remove('highlight'));
        selectedSquare = null;
        legalMoves = [];
        }
  });
}
