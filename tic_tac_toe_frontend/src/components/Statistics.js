import React from 'react';
import '../App.css';

// PUBLIC_INTERFACE
/**
 * Renders game statistics: wins, draws for both players.
 * 
 * Props:
 * - stats: { X: win count, O: win count, draws: draw count }
 * - mode: 'single' or 'multi'
 */
function Statistics({ stats, mode }) {
  return (
    <div className="ttt-stats">
      <h3>Statistics{mode === 'single' ? ' (You vs Computer)' : ' (Player X vs O)'}</h3>
      <div className="ttt-stats-row">
        <span className="ttt-x">X: {stats.X}</span>
        <span className="ttt-draw">Draws: {stats.draws}</span>
        <span className="ttt-o">O: {stats.O}</span>
      </div>
    </div>
  );
}

export default Statistics;
