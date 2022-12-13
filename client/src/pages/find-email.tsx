import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { FindEmailForm } from '~components/form/index';
import { pixelToRem } from '~utils/style-utils';

const FindEmail = () => {
  const handleSubmit = () => {};

  return (
    <Section>
      <Title>이메일 찾기</Title>
      <Phrase>이름, 생년월일, 휴대폰 번호를 입력해 주세요.</Phrase>
      <FindEmailForm onSubmit={handleSubmit} />
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

export default FindEmail;
