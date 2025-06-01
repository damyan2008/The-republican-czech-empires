export function renderBoard(board, container) {
  container.innerHTML = ''; // Clear previous render

  for (let rank = 8; rank >= 1; rank--) {
    for (let file = 0; file < 8; file++) {
      const square = document.createElement('div');
      square.classList.add('square');
      const isDark = (file + rank) % 2 === 1;
      square.classList.add(isDark ? 'dark' : 'light');

      const squareName = 'abcdefgh'[file] + rank;
      square.dataset.square = squareName;

      const piece = board.get(squareName);
      if (piece) {
        const img = document.createElement('img');
        img.classList.add('piece');
        img.src = `../assets/${piece.color}_${piece.type}.png`; // Customize path if needed
        img.alt = `${piece.color} ${piece.type}`;
        img.draggable = false;
        square.appendChild(img);
      }

      container.appendChild(square);
    }
  }
}
