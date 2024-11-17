import { render, screen, fireEvent } from '@testing-library/react';
import { TextEmailMask } from './index';

describe('TextEmailMask', () => {
  const testEmail = 'test.user@example.com';

  it('renders masked email by default', () => {
    render(<TextEmailMask email={testEmail} />);

    // Should show t***r@example.com
    expect(screen.getByText('t***r@example.com')).toBeTruthy();
    expect(screen.queryByText(testEmail)).not.toBeTruthy();
  });

  it('toggles between masked and unmasked email when clicking the eye icon', () => {
    render(<TextEmailMask email={testEmail} />);

    // Initially masked
    expect(screen.getByText('t***r@example.com')).toBeTruthy();

    // Click to show
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    // Should show full email
    expect(screen.getByText(testEmail)).toBeTruthy();

    // Click to hide
    fireEvent.click(toggleButton);

    // Should be masked again
    expect(screen.getByText('t***r@example.com')).toBeTruthy();
    expect(screen.queryByText(testEmail)).not.toBeTruthy();
  });

  it('correctly masks emails of different lengths', () => {
    const shortEmail = 'ab@example.com';
    const { rerender } = render(<TextEmailMask email={shortEmail} />);

    // Should show a*b@example.com
    expect(screen.getByText('a*b@example.com')).toBeTruthy();

    const longEmail = 'verylongemail@example.com';
    rerender(<TextEmailMask email={longEmail} />);

    // Should show v*********l@example.com
    expect(screen.getByText('v*********l@example.com')).toBeTruthy();
  });
});
