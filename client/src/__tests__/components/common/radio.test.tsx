import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test-utils';

import { Radio, RadioGroup } from '~components/common';

import { useInput } from '~hooks/index';

const TestComponent = () => {
  const options = [
    {
      name: 'test radio',
      label: 'first',
    },
    {
      name: 'test radio',
      label: 'second',
    },
  ];

  const { handleChange } = useInput(options[0].label);

  return (
    <RadioGroup options={options} onChange={handleChange}>
      Select true or false
    </RadioGroup>
  );
};

const setup = () => {
  const utils = render(<TestComponent />);
  const fieldset = screen.getByRole('group');
  const legend = screen.getByText(/select true or false/i, {
    selector: 'legend',
  });
  const radios = screen.getAllByRole('radio');
  const firstRadio = screen.getByRole('radio', { name: 'first' });
  const secondRadio = screen.getByRole('radio', { name: 'second' });

  return { fieldset, legend, radios, firstRadio, secondRadio, ...utils };
};

describe('Radio component', () => {
  it('should be rendered correctly', () => {
    render(<Radio id="test-radio" label="test radio" />);

    const radio = screen.getByRole('radio', { name: 'test radio' });
    const label = screen.getByText(/test radio/i);

    expect(radio).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('should be rendered by group with field', () => {
    const { fieldset, legend, radios } = setup();

    expect(fieldset).toBeInTheDocument();
    expect(legend).toBeInTheDocument();
    expect(radios[0]).toBeInTheDocument();
    expect(radios[1]).toBeInTheDocument();
  });

  it('should be first radio button that was checked by default', () => {
    const { fieldset, firstRadio } = setup();

    expect(firstRadio).toBeChecked();
    expect(fieldset).toHaveFormValues({ 'test radio': 'first' });
  });

  it('should change checked value', async () => {
    const { fieldset, firstRadio, secondRadio } = setup();

    expect(firstRadio).toBeChecked();
    expect(fieldset).toHaveFormValues({ 'test radio': 'first' });

    await userEvent.click(secondRadio);

    expect(secondRadio).toBeChecked();
    expect(fieldset).toHaveFormValues({ 'test radio': 'second' });
  });
});
