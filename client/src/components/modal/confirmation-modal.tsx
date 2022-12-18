import styled from 'styled-components';

import { Button } from '~components/common';
import { pixelToRem } from '~utils/style-utils';

interface ConfirmationModalProps {
  message: string;
  onCancel?: React.MouseEventHandler;
  onConfirm?: React.MouseEventHandler;
}

const ConfirmationModal = ({
  message,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) => {
  return (
    <>
      <Message>{message}</Message>
      <ConfirmationButtons>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            color="gray"
            size="x-small"
            fullWidth
            aria-label="cancel"
            onClick={onCancel}
          >
            취소
          </Button>
        )}
        {onConfirm && (
          <Button
            type="button"
            size="x-small"
            fullWidth
            aria-label="confirm"
            onClick={onConfirm}
          >
            확인
          </Button>
        )}
      </ConfirmationButtons>
    </>
  );
};

const Message = styled.p`
  margin: 0;
  padding: 0 ${pixelToRem(20)};
  text-align: center;
`;

const ConfirmationButtons = styled.footer`
  display: flex;
  column-gap: ${pixelToRem(16)};
`;

export default ConfirmationModal;
