import React from 'react';
import '../App.css';

// PUBLIC_INTERFACE
/**
 * Renders the tic tac toe board and handles cell clicks.
 * 
 * Props:
 * - board: array of 9 elements (X, O, or null)
 * - onCellClick: function(index) called when a cell is clicked
 * - isBoardLocked: disables board interaction if true
 * - winningCells: array of indices (for highlighting win)
 */
function TicTacToeBoard({ board, onCellClick, isBoardLocked, winningCells = [] }) {
  // Helper to determine highlight for winning cells
  const isWinningCell = (index) => winningCells.includes(index);

  return (
    <div className="ttt-board">
      {board.map((cell, idx) => (
        <button
          key={idx}
          className={`ttt-cell${isWinningCell(idx) ? ' ttt-cell-win' : ''}`}
          onClick={() => onCellClick(idx)}
          disabled={!!cell || isBoardLocked}
          aria-label={`cell-${idx}`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}

export default TicTacToeBoard;
