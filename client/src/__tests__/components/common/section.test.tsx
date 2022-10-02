// import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test-utils';

import { Section } from '~components/common';

describe('Section component', () => {
  it('should be rendered correctly', () => {
    render(<Section>Hello</Section>);

    const section = screen.getByText(/hello/i);
    expect(section).toBeInTheDocument();
  });
});
