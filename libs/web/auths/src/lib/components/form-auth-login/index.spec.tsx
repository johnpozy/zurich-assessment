import { render } from '@testing-library/react';

import FormAuthLogin from '.';

describe('FormAuthLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAuthLogin />);
    expect(baseElement).toBeTruthy();
  });
});
