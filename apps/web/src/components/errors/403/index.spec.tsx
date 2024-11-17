import { render } from '@testing-library/react';

import { Error403 } from '.';

describe('Error403', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Error403 />);
    expect(baseElement).toBeTruthy();
  });
});
