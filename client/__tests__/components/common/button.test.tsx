import type { ButtonVariants } from '~components/common/button/button-base';

import userEvent from '@testing-library/user-event';

import { Button } from '~components/common';
import { GlobalColors, GlobalSizes } from '~types/common';

import { render, screen } from '../../test-utils';

describe('Button component', () => {
  it('should render button', () => {
    const handleClick = jest.fn();

    render(
      <Button type="button" onClick={handleClick}>
        Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: /button/i });
    expect(button).toBeInTheDocument();
  });

  it('should be disabled', () => {
    const handleClick = jest.fn();

    render(
      <Button type="button" disabled onClick={handleClick}>
        Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: /button/i });
    expect(button).toBeDisabled();
  });

  it('should call the onClick when button is clicked', async () => {
    const handleClick = jest.fn();

    render(
      <Button type="button" onClick={handleClick}>
        Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: /button/i });

    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render variant buttons', () => {
    const variants: ButtonVariants[] = ['fill', 'outline', 'ghost', 'icon'];
    const handleClick = jest.fn();

    variants.forEach((variant) => {
      render(
        <Button type="button" variant={variant} onClick={handleClick}>
          {variant}
        </Button>,
      );

      const button = screen.getByRole('button', { name: variant });
      expect(button).toBeInTheDocument();
    });
  });

  it('should render buttons of various size', () => {
    const sizes: GlobalSizes[] = [
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
    ];
    const handleClick = jest.fn();

    sizes.forEach((size) => {
      render(
        <Button type="button" size={size} onClick={handleClick}>
          {size}
        </Button>,
      );

      const button = screen.getByRole('button', { name: size });
      expect(button).toBeInTheDocument();
    });
  });

  it('should render icon buttons of various size', () => {
    const sizes: GlobalSizes[] = ['small', 'medium', 'large'];
    const handleClick = jest.fn();

    sizes.forEach((size) => {
      render(
        <Button type="button" variant="icon" size={size} onClick={handleClick}>
          {size}
        </Button>,
      );

      const button = screen.getByRole('button', { name: size });
      expect(button).toBeInTheDocument();
    });
  });

  it('should render buttons of various color', () => {
    const colors: GlobalColors[] = [
      'red',
      'orange',
      'yellow',
      'green',
      'light',
      'gray',
      'dark',
    ];
    const handleClick = jest.fn();

    colors.forEach((color) => {
      render(
        <Button type="button" color={color} onClick={handleClick}>
          {color}
        </Button>,
      );

      const button = screen.getByRole('button', { name: color });
      expect(button).toBeInTheDocument();
    });
  });

  it('should render full width button', () => {
    const handleClick = jest.fn();

    render(
      <Button type="button" onClick={handleClick} fullWidth>
        Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: /button/i });
    expect(button).toBeInTheDocument();
  });
});
