import { render, screen } from '../../test-utils';

import { FamilySection } from '~components/section';

describe('Family section component test', () => {
  it('should be rendered correctly', () => {
    render(<FamilySection />);

    const section = screen.getByLabelText(/familySection/i);

    expect(section).toBeInTheDocument();
  });
});
