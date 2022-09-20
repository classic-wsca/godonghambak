import { render, screen } from '~utils/test-utils';

import Home from '~pages/index';

describe('test', () => {
  it('test', () => {
    render(<Home />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
