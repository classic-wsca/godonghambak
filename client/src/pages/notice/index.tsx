import Link from 'next/link';
import React, { useState, ReactElement, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { BreadcrumbLayout } from '~components/layout';
import { Pagination } from '~components/pagination';
import { Search } from '~components/search';
import { NOTICES } from '~constants/notice';
import { pixelToRem } from '~utils/style-utils';

const Notice = () => {
  const [notices, setNotices] = useState(NOTICES.sort((a, b) => b.id - a.id));
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const offset = useMemo(() => (page - 1) * 10, [page]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setNotices(
        NOTICES.filter(({ title }) => title.includes(inputValue)).sort(
          (a, b) => b.id - a.id,
        ),
      );
    },
    [inputValue],
  );

  const handlePageClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { innerText } = e.currentTarget as HTMLButtonElement;

      setPage(Number(innerText));
    },
    [],
  );

  return (
    <Page>
      <Title as="h2">공지사항</Title>
      <Board>
        <BoardHeader>
          <Text fontWeight={500} m={0}>
            총{' '}
            <Text as="span" color="green">
              {notices.length}
            </Text>{' '}
            개
          </Text>
          <Search
            id="notice-search"
            value={inputValue}
            placeholder="검색어를 입력하세요."
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </BoardHeader>
        <BoardContent>
          <BoardContentItem>
            <Text as="span">번호</Text>
            <Text as="span">제목</Text>
            <Text as="span">작성일</Text>
            <Text as="span">조회</Text>
          </BoardContentItem>
          {notices
            .slice(offset, offset + 10)
            .map(({ id, title, date, hits }) => (
              <BoardContentItem key={id}>
                <Text as="span">{id}</Text>
                <Link href={`/notice/${id}`}>
                  <a href="replace" aria-label={title}>
                    <BoardContentItemTitle>{title}</BoardContentItemTitle>
                  </a>
                </Link>
                <Text as="span">{date}</Text>
                <Text as="span">{hits}</Text>
              </BoardContentItem>
            ))}
        </BoardContent>
        <BoardFooter>
          <Pagination
            total={notices.length}
            page={page}
            onClick={handlePageClick}
          />
        </BoardFooter>
      </Board>
    </Page>
  );
};

Notice.getLayout = function getLayout(page: ReactElement) {
  return <BreadcrumbLayout>{page}</BreadcrumbLayout>;
};

const Page = styled.div`
  color: ${({ theme }) => theme.colors.dark};
`;

const Title = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSizes['7xl']};
  text-align: center;

  @media ${({ theme }) => theme.breakPoints.small} {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const Board = styled.div`
  max-width: ${pixelToRem(1040)};
  margin: 0 auto;
  margin-top: ${pixelToRem(115)};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    padding: 0 5%;
  }
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.breakPoints.small} {
    font-size: ${({ theme }) => theme.fontSizes.sm};

    form {
      max-width: ${pixelToRem(200)};
    }
  }
`;

const BoardContent = styled.ul`
  margin-top: ${pixelToRem(16)};
  margin-bottom: ${pixelToRem(80)};
  border-top: 2px solid ${({ theme }) => theme.colors.dark};

  @media ${({ theme }) => theme.breakPoints.small} {
    margin-top: ${pixelToRem(8)};
    margin-bottom: ${pixelToRem(32)};
  }
`;

const BoardContentItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 6fr 4fr 1fr;
  justify-items: center;
  align-items: center;
  padding: ${pixelToRem(24)} ${pixelToRem(12)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  &:first-of-type {
    font-weight: 500;
  }

  &:not(:first-of-type) span {
    color: ${({ theme }) => theme.colors.gray_500};
  }

  a {
    width: 100%;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const BoardContentItemTitle = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  justify-self: left;
  margin: 0;
  padding-left: 5%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: underline;
  }
`;

const BoardFooter = styled.div``;

export default Notice;
