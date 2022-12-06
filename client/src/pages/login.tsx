import React from 'react';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { LoginForm } from '~components/form';
import { LOGIN_PHRASES } from '~constants/login';
import { pixelToRem } from '~utils/style-utils';

export interface LoginInformation {
  email: string;
  password: string;
  [key: string]: string;
}

const Login = () => {
  const handleSubmitForm = (values: LoginInformation) => {
    // TODO 로그인 기능 구현
    // 아이디 비밀번호를 찾을 수 없다면
    // 아이디와 비밀번호를 찾아 성공햇다면
  };

  return (
    <Section>
      <Title as="h2">{LOGIN_PHRASES.title}</Title>
      <Phrase>{LOGIN_PHRASES.phrase}</Phrase>
      <LoginForm onSubmit={handleSubmitForm} />
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

export default Login;
