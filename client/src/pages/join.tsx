import type { UserInformation } from '~types/auth';

import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { JoinForm } from '~components/form';
import { pixelToRem } from '~utils/style-utils';

const Join = () => {
  const router = useRouter();

  const handleSubmitForm = useCallback(
    (values: UserInformation) => {
      // TODO 회원가입 기능 구현

      // TODO 로그인 상태 만들기

      // 메인 페이지로 이동시키기
      router.push('/');
    },
    [router],
  );

  return (
    <Section>
      <Title>회원 가입</Title>
      <Phrase>고동함박과 함께하기</Phrase>
      <JoinForm onSubmit={handleSubmitForm} />
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

export default Join;
