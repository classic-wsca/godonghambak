import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, Heading, Text } from '~components/common';
import { INITIAL_NOTICE, NoticeInfo, NOTICES } from '~constants/notice';
import EyeSVG from '~public/svgs/eye.svg';
import { pixelToRem } from '~utils/style-utils';

const NoticeDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState<NoticeInfo>(INITIAL_NOTICE);

  const handleClick = () => {
    router.push('/notice');
  };

  useEffect(() => {
    const currentNotice = NOTICES.find(
      ({ id: noticeId }) => Number(id) === noticeId,
    );

    setNotice(currentNotice || INITIAL_NOTICE);
  }, [id]);

  return (
    <Notice>
      <NoticeHeader>
        <Text color="green" fontWeight={500} m={0}>
          공지사항
        </Text>
        <Heading as="h2">{notice.title}</Heading>
        <div>
          <Text as="span">{notice.date}</Text>
          <NoticeHits>
            <EyeSVG />
            <Text as="span">{notice.hits}</Text>
          </NoticeHits>
        </div>
      </NoticeHeader>
      <Divider />
      <NoticeBody>{notice.content}</NoticeBody>
      <Divider />
      <NoticeFooter>
        <Button as="a" type="button" onClick={handleClick}>
          목록으로
        </Button>
      </NoticeFooter>
    </Notice>
  );
};

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${pixelToRem(1040)};
  margin: ${pixelToRem(200)} auto;
`;

const NoticeHeader = styled.div`
  h2 {
    margin-top: ${pixelToRem(16)};
    margin-bottom: ${pixelToRem(40)};
  }

  & > div {
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.gray_500};
  }

  margin-bottom: ${pixelToRem(35)};
`;

const NoticeHits = styled.div`
  display: flex;
  align-items: center;
  gap: ${pixelToRem(8)};

  svg {
    margin-top: ${pixelToRem(2)};
  }
`;

const NoticeBody = styled.div`
  padding: ${pixelToRem(50)} 0;
  white-space: pre-line;
`;

const NoticeFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${pixelToRem(70)};
`;

const Divider = styled.hr`
  width: 100%;
  height: 2px;
  margin: 0;
  border: none;
  background-color: ${({ theme }) => theme.colors.gray};
`;

export default NoticeDetail;
