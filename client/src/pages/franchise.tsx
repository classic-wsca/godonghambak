import Image from 'next/image';
import { ReactElement } from 'react';
import styled from 'styled-components';

import { FranchiseCard } from '~components/card';
import { Heading, Text } from '~components/common';
import { BreadcrumbLayout } from '~components/layout';
import { FRANCHISE_CARDS, CONTACT_CARDS } from '~constants/card';
import { pixelToRem } from '~utils/style-utils';

const Franchise = () => {
  return (
    <Section>
      <Title as="h2">
        <Text as="span" color="green">
          고동함박
        </Text>{' '}
        가맹점 개설 절차
      </Title>
      <Phrase>
        <Text size="3xl">
          <Text as="b" color="green" size="5xl">
            성공
          </Text>
          이라는 것에 집착하면 성공 할 수 없습니다.
          <br />
          <Text as="b" color="yellow" size="5xl">
            과정
          </Text>
          에서 얻는 성취감이 곧{' '}
          <Text as="b" color="green" size="5xl">
            성공
          </Text>
          이라고 생각합니다. <br />
          많은 분들과 성취감을{' '}
          <Text as="b" color="yellow" size="5xl">
            공유
          </Text>
          하겠습니다.
        </Text>
        <Text size="xl">- CEO 노경봉 -</Text>
      </Phrase>
      <FranchiseCardList>
        {FRANCHISE_CARDS.map(({ id, title, content, image }) => (
          <FranchiseCard
            key={id}
            id={id}
            title={title}
            content={content}
            image={image}
          />
        ))}
      </FranchiseCardList>
      <Title as="h2">
        <Text as="span" color="green">
          고동함박
        </Text>{' '}
        가맹 문의
      </Title>
      <ContactCardList>
        {CONTACT_CARDS.map(({ title, content, image }) => (
          <ContactCard key={title}>
            <ContactCardImage>
              <Image src={image} alt={title} layout="fill" />
            </ContactCardImage>
            <ContactCardContent>
              <Heading as="h4" m={0} size="3xl" fontWeight={500}>
                {title}
              </Heading>
              <Text>{content}</Text>
            </ContactCardContent>
          </ContactCard>
        ))}
      </ContactCardList>
    </Section>
  );
};

Franchise.getLayout = function getLayout(page: ReactElement) {
  return <BreadcrumbLayout>{page}</BreadcrumbLayout>;
};

const Section = styled.section`
  width: 100%;
  max-width: ${pixelToRem(1440)};
  margin: 0 auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};

  @media ${({ theme }) => theme.breakPoints.medium} {
    margin-top: ${pixelToRem(80)};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    padding: 0 ${pixelToRem(16)};
  }
`;

const Title = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSizes['7xl']};

  @media ${({ theme }) => theme.breakPoints.small} {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const Phrase = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-top: ${pixelToRem(55)};
  word-break: keep-all;
  line-height: 1.5;

  @media ${({ theme }) => theme.breakPoints.large} {
    width: 70%;
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    width: 100%;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    p {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }

    b {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }
`;

const FranchiseCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${pixelToRem(60)};
  margin-top: ${pixelToRem(70)};
  margin-bottom: ${pixelToRem(95)};
`;

const ContactCardList = styled.div`
  display: flex;
  justify-content: center;
  gap: ${pixelToRem(40)};
  margin-top: ${pixelToRem(80)};

  @media ${({ theme }) => theme.breakPoints.small} {
    margin-top: ${pixelToRem(40)};
  }
`;

const ContactCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pixelToRem(20)};
`;

const ContactCardImage = styled.div`
  position: relative;
  width: ${pixelToRem(40)};
  height: ${pixelToRem(40)};

  img {
    object-fit: contain;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    width: ${pixelToRem(28)};
    height: ${pixelToRem(28)};
  }
`;

const ContactCardContent = styled.div`
  display: flex;
  flex-direction: column;

  p {
    white-space: pre-line;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    h4 {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.md};
    }
  }
`;

export default Franchise;
