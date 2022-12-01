import userEvent from '@testing-library/user-event';

import { Checkbox } from '~components/common';
import { useToggle } from '~hooks/index';

import { render, screen } from '../../test-utils';

const TestComponent = () => {
  const [isChecked, handleChange] = useToggle(false);

  return (
    <Checkbox id="test-checkbox" checked={isChecked} onChange={handleChange}>
      Checkbox test
    </Checkbox>
  );
};

const setup = () => {
  const utils = render(<TestComponent />);
  const checkboxes = screen.getAllByRole('checkbox');
  const realCheckbox = screen.getByRole('checkbox', { name: /checkbox test/i });
  const fakeCheckbox = screen.getByRole('checkbox', { name: '' });
  const label = screen.getByText(/checkbox test/i);

  return { checkboxes, realCheckbox, fakeCheckbox, label, ...utils };
};

describe('Checkbox component', () => {
  it('should be rendered correctly', () => {
    const { realCheckbox, fakeCheckbox, label } = setup();

    expect(realCheckbox).toBeInTheDocument();
    expect(fakeCheckbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('should has initial value', () => {
    const { realCheckbox, fakeCheckbox } = setup();

    expect(realCheckbox).not.toBeChecked();
    expect(fakeCheckbox).not.toBeChecked();
  });

  it('should update check state when click checkbox', async () => {
    const { realCheckbox, fakeCheckbox } = setup();

    await userEvent.click(fakeCheckbox);

    expect(realCheckbox).toBeChecked();
    expect(fakeCheckbox).toBeChecked();
  });

  it('should update check state when click label', async () => {
    const { realCheckbox, fakeCheckbox, label } = setup();

    await userEvent.click(label);

    expect(realCheckbox).toBeChecked();
    expect(fakeCheckbox).toBeChecked();
  });
});
