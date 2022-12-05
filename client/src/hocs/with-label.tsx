import type { PropsWithChildren, ComponentType } from 'react';

import styled from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

interface WithLabelProps extends PropsWithChildren {
  id: string;
}

const withLabel = <T,>(WrappedComponent: ComponentType<T>) => {
  const WrapperComponent = ({ id, children, ...rest }: WithLabelProps & T) => (
    <>
      <Label htmlFor={id}>{children}</Label>
      <WrappedComponent id={id} {...(rest as T)} />
    </>
  );

  return WrapperComponent;
};

const Label = styled.label`
  display: block;
  padding-left: ${pixelToRem(2)};
  font-size: ${pixelToRem(14)};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`;

export default withLabel;
