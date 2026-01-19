import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {describe, it, expect} from 'vitest';

describe('App UI', () => {
  it('renders input and output areas', () => {
    render(<App />);
    expect(screen.getByLabelText('Input JSON')).toBeInTheDocument();
    expect(screen.getByLabelText('Sorted JSON output')).toBeInTheDocument();
  });

  it('updates output when typing valid JSON', async () => {
    render(<App />);
    const input = screen.getByLabelText('Input JSON') as HTMLTextAreaElement;
    await userEvent.clear(input);
    fireEvent.change(input, {target: {value: '{"b":2,"a":1}'}});
    await waitFor(() => expect(screen.getByLabelText('Sorted JSON output')).toHaveTextContent('"a": 1'));
  });

  it('shows error on invalid JSON', async () => {
    render(<App />);
    const input = screen.getByLabelText('Input JSON') as HTMLTextAreaElement;
    await userEvent.clear(input);
    fireEvent.change(input, {target: {value: '{invalid}'}});
    await waitFor(() => expect(screen.getByLabelText('Sorted JSON output')).toHaveTextContent('Error:'));
  });
});
