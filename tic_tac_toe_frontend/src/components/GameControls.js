import React from 'react';
import '../App.css';

// PUBLIC_INTERFACE
/**
 * Renders controls for resetting the game and switching modes.
 * 
 * Props:
 * - onReset: function called to reset/restart the game
 * - mode: current mode ('single' or 'multi')
 * - onModeSwitch: function(newMode) to switch the mode
 * - isGameActive: boolean (if a game is in progress)
 */
function GameControls({ onReset, mode, onModeSwitch, isGameActive }) {
  return (
    <div className="ttt-controls">
      <button className="btn" onClick={onReset}>
        {isGameActive ? 'Reset Game' : 'Start New Game'}
      </button>
      <button
        className={`btn btn-outline${mode === 'single' ? '' : ' btn-active'}`}
        onClick={() => onModeSwitch(mode === 'single' ? 'multi' : 'single')}
      >
        Mode: {mode === 'single' ? 'Single Player' : 'Two Player'}
      </button>
    </div>
  );
}

export default GameControls;
