import type { PropsWithChildren } from 'react';

import { useEffect, useCallback } from 'react';
import FocusLock from 'react-focus-lock';
import styled from 'styled-components';

import { Button } from '~components/common';
import { Portal } from '~hocs/index';
import CloseSVG from '~public/svgs/close.svg';
import { pixelToRem } from '~utils/style-utils';

interface ModalProps extends PropsWithChildren {
  title: string;
  isOpen: boolean;
  onClose: (e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <FocusLock>
        <Container
          role="dialog"
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby={title}
        >
          <Header>
            <Title>{title}</Title>
            <Button
              type="button"
              variant="icon"
              aria-label="close"
              data-dismiss="modal"
              onClick={onClose}
            >
              <CloseSVG />
            </Button>
          </Header>
          <Content>{children}</Content>
        </Container>
      </FocusLock>
      <Backdrop data-testid="backdrop" onClick={onClose} />
    </Portal>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => `${theme.colors.dark}60`};
  z-index: 999;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: ${pixelToRem(320)};
  padding: ${pixelToRem(16)};
  border-radius: ${pixelToRem(10)};
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h4`
  margin: ${pixelToRem(2)} 0 0 ${pixelToRem(6)};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${pixelToRem(48)};
  max-height: ${pixelToRem(360)};
  margin-top: ${pixelToRem(40)};
`;

export default Modal;
