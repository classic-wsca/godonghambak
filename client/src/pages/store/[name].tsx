import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { BreadcrumbLayout } from '~components/layout';
import { Map } from '~components/map';
import { INITIAL_STORE, STORE_LIST, DAYS } from '~constants/store';
import BusSVG from '~public/svgs/bus.svg';
import ClockSVG from '~public/svgs/clock.svg';
import KisokSVG from '~public/svgs/kiosk.svg';
import MarkerSVG from '~public/svgs/marker.svg';
import PhoneSVG from '~public/svgs/phone.svg';
import WifiSVG from '~public/svgs/wifi.svg';
import { pixelToRem } from '~utils/style-utils';

const StoreDetail = () => {
  const router = useRouter();
  const { name } = router.query;

  const [store, setStore] = useState(INITIAL_STORE);

  useEffect(() => {
    const currentStore = STORE_LIST.find(
      ({ name: storeName }) => name === storeName,
    );

    setStore(currentStore || INITIAL_STORE);
  }, [name]);

  return (
    <Wrapper>
      <Section>
        <StoreHeading as="h2">{name}</StoreHeading>
        <StoreContent>
          <StoreImage>
            <Image src={store.image} layout="fill" />
          </StoreImage>
          <StoreInfo>
            <li>
              <InfoTitle>
                <MarkerSVG />
                <Text fontWeight="bold">주소</Text>
              </InfoTitle>
              <Text>{store.address}</Text>
            </li>
            <li>
              <InfoTitle>
                <ClockSVG />
                <Text fontWeight="bold">영업시간</Text>
              </InfoTitle>
              <BusinessHour>
                <ul>
                  {DAYS.map((day) => (
                    <DayTime key={day}>
                      <Text>{day}</Text>
                      <Text>{store.businesshours}</Text>
                    </DayTime>
                  ))}
                </ul>
                <div>
                  <Text color="red" fontWeight="bold">
                    브레이크 타임(평일)
                  </Text>
                  <Text>{store.breaktime}</Text>
                  <Text color="red" fontWeight="bold">
                    라스트 오더
                  </Text>
                  <Text>{store.lastorder}</Text>
                </div>
              </BusinessHour>
            </li>
            <li>
              <InfoTitle>
                <PhoneSVG />
                <Text fontWeight="bold">전화번호</Text>
              </InfoTitle>
              <Text>{store.contact}</Text>
            </li>
            <li>
              <InfoTitle>
                <BusSVG />
                <Text fontWeight="bold">주차</Text>
              </InfoTitle>
              <Text>{store.parking ? '가능' : '불가'}</Text>
            </li>
            <li>
              <InfoTitle>
                <WifiSVG />
                <Text fontWeight="bold">와이파이</Text>
              </InfoTitle>
              <Text>{store.wifi ? '있음' : '불가'}</Text>
            </li>
            <li>
              <InfoTitle>
                <KisokSVG />
                <Text fontWeight="bold">키오스크</Text>
              </InfoTitle>
              <Text>{store.kiosk ? '있음' : '불가'}</Text>
            </li>
          </StoreInfo>
        </StoreContent>
        <Map
          latitude={store.location.latitude}
          longitude={store.location.longitude}
        />
      </Section>
    </Wrapper>
  );
};

StoreDetail.getLayout = function getLayout(page: ReactElement) {
  return <BreadcrumbLayout>{page}</BreadcrumbLayout>;
};

const Wrapper = styled.div`
  position: relative;
  max-width: ${pixelToRem(1440)};
  margin: 0 auto;
  padding: 0 ${pixelToRem(120)};
  color: ${({ theme }) => theme.colors.dark};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    padding: 0 ${pixelToRem(60)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    padding: 0 ${pixelToRem(16)};
  }
`;

const Section = styled.section`
  margin: ${pixelToRem(120)} 0;
  word-break: keep-all;

  @media ${({ theme }) => theme.breakPoints.medium} {
    margin: ${pixelToRem(80)} 0;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    margin: ${pixelToRem(40)} 0;
  }
`;

const StoreHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};

  @media ${({ theme }) => theme.breakPoints.large} {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const StoreContent = styled.div`
  display: flex;
  gap: ${pixelToRem(32)};
  margin-bottom: ${pixelToRem(32)};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    flex-direction: column;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    gap: ${[pixelToRem(16)]};
    margin-bottom: ${pixelToRem(16)};
  }
`;

const StoreImage = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 40%;

  img {
    border-radius: ${pixelToRem(10)};
    object-fit: cover;
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    display: flex;
    width: 100%;
    height: 60vw;

    img {
      object-fit: cover;
    }
  }
`;

const StoreInfo = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr auto;
  row-gap: ${pixelToRem(32)};
  width: 60%;
  margin: 0;

  & > li:first-of-type {
    grid-column: 1 / 3;
  }

  & > li:nth-of-type(2) {
    grid-column: 3 / 5;
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    width: 100%;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    display: flex;
    flex-direction: column;
    gap: ${pixelToRem(16)};
  }
`;

const BusinessHour = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    margin-bottom: ${pixelToRem(8)};
  }

  & > div {
    width: 50%;
  }

  & > div:nth-of-type(2) > p:nth-of-type(2) {
    margin-bottom: ${pixelToRem(40)};
  }
`;

const DayTime = styled.li`
  display: flex;
  gap: ${pixelToRem(16)};

  p {
    margin-bottom: 0;
  }
`;

const InfoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${pixelToRem(8)};
`;

export default StoreDetail;
