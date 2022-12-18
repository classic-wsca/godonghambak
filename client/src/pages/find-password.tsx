import { useState } from 'react';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { ChangePasswordForm, FindPasswordForm } from '~components/form/index';
import { Modal, ConfirmationModal } from '~components/modal';
import { useToggle } from '~hooks/index';
import { JoinInformation } from '~types/form';
import { pixelToRem } from '~utils/style-utils';

const FindPassword = () => {
  const [isVerificated, setIsVerificated] = useState(false);
  const [isModalOpen, toggleModal] = useToggle();

  const handleSubmit = (values: Partial<JoinInformation>) => {
    // TODO
    // 값 처리
    setIsVerificated(true);
  };

  const handlePasswordChangeSubmit = (values: Partial<JoinInformation>) => {
    toggleModal();
  };

  const handlePasswordChangeConfirm = () => {
    // TODO
    // 비밀번호 변경 요청
    // 로그인
    console.log('login');
  };

  return (
    <Section>
      <Title>{isVerificated ? '비밀번호 변경' : '비밀번호 찾기'}</Title>
      <Phrase>
        {isVerificated
          ? '새로운 비밀번호를 입력해 주세요.'
          : '이메일 인증을 통해 비밀번호를 찾아 주세요.'}
      </Phrase>
      {isVerificated ? (
        <ChangePasswordForm onSubmit={handlePasswordChangeSubmit} />
      ) : (
        <FindPasswordForm onSubmit={handleSubmit} toggleModal={toggleModal} />
      )}
      <Modal
        title={isVerificated ? '비밀번호 변경' : '이메일 인증'}
        isOpen={isModalOpen}
        onClose={toggleModal}
      >
        <ConfirmationModal
          message={
            isVerificated
              ? '비밀번호를 변경하시겠습니까?'
              : '인증번호가 발송되었습니다.'
          }
          onConfirm={isVerificated ? handlePasswordChangeConfirm : toggleModal}
          onCancel={isVerificated ? toggleModal : undefined}
        />
      </Modal>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: ${pixelToRem(80)};
  color: ${({ theme }) => theme.colors.dark};

  @media ${({ theme }) => theme.breakPoints.small} {
    padding: ${pixelToRem(40)} 5%;
  }
`;

const Title = styled(Heading)`
  margin: ${pixelToRem(20)} 0;
  font-size: ${({ theme }) => theme.fontSizes['6xl']};

  @media ${({ theme }) => theme.breakPoints.small} {
    margin: ${pixelToRem(16)} 0;
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const Phrase = styled(Text)`
  color: ${({ theme }) => theme.colors.dark};
  text-align: center;
  line-height: 1.5;
  white-space: pre-wrap;

  @media ${({ theme }) => theme.breakPoints.small} {
    margin: 0;
    padding: 0 ${pixelToRem(16)};
    word-break: keep-all;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export default FindPassword;
