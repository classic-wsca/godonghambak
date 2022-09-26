import type {
  ReactNode,
  ComponentPropsWithoutRef,
  MouseEventHandler,
} from 'react';
import type { ButtonStyle } from './button-base';

import React, { forwardRef } from 'react';

import { FillButton, OutlineButton, GhostButton } from './button-basic';
import IconButton from './button-icon';

import { useRipple } from '~hooks/index';

type CustomButtonAttirbutes = Omit<ComponentPropsWithoutRef<'button'>, 'color'>;
type CustomButtonType = 'button' | 'submit'; // 사용자 경험을 위해 'reset' 타입은 사용하지 않습니다!

interface ButtonProps extends CustomButtonAttirbutes, ButtonStyle {
  type: CustomButtonType;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const BUTTON_VARIANTS = {
  fill: FillButton,
  outline: OutlineButton,
  ghost: GhostButton,
  icon: IconButton,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, variant, children, onClick, ...rest }, forwardedRef) => {
    const [addRipple, ripples] = useRipple();
    const MutableButton = BUTTON_VARIANTS[variant || 'fill'];

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>): void => {
      addRipple(e);
    };

    return (
      <MutableButton
        ref={forwardedRef}
        type={type}
        variant={variant}
        onClick={onClick}
        onMouseDown={handleMouseDown}
        {...rest}
      >
        {children}
        {ripples}
      </MutableButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
