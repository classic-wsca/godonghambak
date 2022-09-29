import type { PropsWithChildren, ComponentType } from 'react';

import styled from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

const withField = <T extends PropsWithChildren>(
  WrappedComponent: ComponentType<T>,
) => {
  const WrapperComponent = ({ children, ...rest }: PropsWithChildren<T>) => (
    <FieldSet>
      <Legend>{children}</Legend>
      <WrappedComponent {...(rest as T)} />
    </FieldSet>
  );

  return WrapperComponent;
};

const FieldSet = styled.fieldset`
  margin-bottom: ${pixelToRem(30)};
  border: none;
`;

const Legend = styled.legend`
  margin-bottom: ${pixelToRem(16)};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.dark};
`;

export default withField;
