import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page'; // component here

describe('Page', () => {
  it('renders `Tech Stack` on screen', () => {
    render(<Home />);

    const element = screen.getByRole('heading', { name: /Tech Stack/i });

    expect(element).toBeInTheDocument();
  });
});
