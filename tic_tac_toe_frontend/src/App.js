import React, { useState, useEffect } from 'react';
import './App.css';
import TicTacToeBoard from './components/TicTacToeBoard';
import GameControls from './components/GameControls';
import Statistics from './components/Statistics';

// Utility function for win/draw calculations
function checkWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const line of lines) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return board.every(cell => cell) ? { winner: null, draw: true } : null;
}

// Computes the computer move (simple: first available cell)
function getComputerMove(board) {
  const emptyIndices = board.map((cell, idx) => cell ? null : idx).filter(idx => idx !== null);
  if (emptyIndices.length === 0) return null;
  // A more sophisticated AI could go here!
  return emptyIndices[Math.floor(Math.random()*emptyIndices.length)];
}

// PUBLIC_INTERFACE
/**
 * Main application for the Tic Tac Toe game.
 */
function App() {
  // --- Theme and UI
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  // --- Game State
  const emptyBoard = Array(9).fill(null);
  const initialStats = { X: 0, O: 0, draws: 0 };

  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('');
  const [mode, setMode] = useState('single'); // 'single' or 'multi'
  const [isGameActive, setIsGameActive] = useState(true);
  const [stats, setStats] = useState(initialStats);
  const [winningLine, setWinningLine] = useState([]);

  // PUBLIC_INTERFACE
  // Resets the board for a new game (stats persists)
  const resetGame = () => {
    setBoard(emptyBoard);
    setXIsNext(true);
    setStatus('');
    setIsGameActive(true);
    setWinningLine([]);
  };

  const switchMode = (newMode) => {
    if (mode !== newMode) {
      setMode(newMode);
      resetGame();
      setStats(initialStats);
    }
  };

  // PUBLIC_INTERFACE
  // Handles moves for a cell; updates state accordingly
  const handleCellClick = (idx) => {
    if (!isGameActive || board[idx]) return;

    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);

    const check = checkWinner(nextBoard);
    if (check) {
      if (check.winner) {
        // Someone wins
        setStatus(`Winner: ${check.winner}`);
        setIsGameActive(false);
        setWinningLine(check.line);
        setStats(s => ({ ...s, [check.winner]: s[check.winner] + 1 }));
      } else if (check.draw) {
        setStatus('Draw!');
        setIsGameActive(false);
        setStats(s => ({ ...s, draws: s.draws + 1 }));
      }
    } else {
      setXIsNext(!xIsNext);
    }
  };

  // Effect for computer opponent in single-player mode
  useEffect(() => {
    // If single player mode, O is the computer, and game is not over, AI plays
    if (mode === 'single' && !xIsNext && isGameActive) {
      const timeout = setTimeout(() => {
        const move = getComputerMove(board);
        if (move !== null) handleCellClick(move);
      }, 600); // Slight delay for UX

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line
  }, [board, xIsNext, isGameActive, mode]);

  // Effect: update status message per turn
  useEffect(() => {
    if (!isGameActive) return;
    setStatus(
      mode === 'single'
        ? (xIsNext ? 'Your move (X)' : 'Computer (O)...')
        : (xIsNext ? 'Player X\'s turn' : 'Player O\'s turn')
    );
    // eslint-disable-next-line
  }, [xIsNext, isGameActive, mode]);

  // UI
  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <div className="tic-tac-toe-container">
        <div>
          <h1 className="tic-tac-toe-title">Tic Tac Toe</h1>
          <div className="tic-tac-toe-subtitle">
            Play {mode === 'single' ? 'against the computer' : 'with a friend'}.
          </div>
          <div className="ttt-status">{status}</div>
        </div>
        <TicTacToeBoard
          board={board}
          onCellClick={handleCellClick}
          isBoardLocked={!isGameActive || (mode === 'single' && !xIsNext)}
          winningCells={winningLine}
        />
        <GameControls
          onReset={resetGame}
          mode={mode}
          onModeSwitch={val => switchMode(mode === 'single' ? 'multi' : 'single')}
          isGameActive={isGameActive}
        />
        <Statistics stats={stats} mode={mode} />
      </div>
    </div>
  );
}

export default App;
