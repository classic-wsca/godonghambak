// import userEvent from '@testing-library/user-event';
import { Section } from '~components/common';

import { render, screen } from '../../test-utils';

describe('Section component', () => {
  it('should be rendered correctly', () => {
    render(<Section>Hello</Section>);

    const section = screen.getByText(/hello/i);
    expect(section).toBeInTheDocument();
  });
});
