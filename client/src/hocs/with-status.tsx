import type { ComponentType } from 'react';

import styled from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

export type WithStatusType = 'default' | 'error' | 'success';

interface WithStatusProps {
  status?: WithStatusType;
  message?: string;
}

const withStatus = <T,>(WrappedComponent: ComponentType<T>) => {
  const WrapperComponent = ({
    status = 'default',
    message = '',
    ...rest
  }: WithStatusProps & T) => (
    <>
      <WrappedComponent
        status={status}
        disabled={status === 'success'}
        {...(rest as T)}
      />
      {status !== 'default' && (
        <StatusMessage status={status}>
          {status === 'success' ? '인증완료' : message}
        </StatusMessage>
      )}
    </>
  );

  return WrapperComponent;
};

const StatusMessage = styled.p<{ status: WithStatusType }>`
  margin: 0;
  line-height: 0.75;
  font-size: ${pixelToRem(14)};
  color: ${({ theme, status }) =>
    status === 'error' ? theme.colors.red_warning : theme.colors.green_success};
`;

export default withStatus;
