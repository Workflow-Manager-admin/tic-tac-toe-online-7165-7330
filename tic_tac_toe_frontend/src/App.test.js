import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tic tac toe title and board', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(11); // 9 cells + controls + theme
});
