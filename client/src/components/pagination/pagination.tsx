import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

interface PaginationProps {
  total: number;
  page: number;
  limit?: number;
  onClick: React.MouseEventHandler;
}

const Pagination = ({ total, page, limit = 10, onClick }: PaginationProps) => {
  const pageNumbers = useMemo(() => {
    return Array(Math.ceil(total / limit))
      .fill(null)
      .map((_, index) => index + 1);
  }, [total, limit]);

  return (
    <Nav aria-label="pagination">
      {pageNumbers.map((number, index) => (
        <Button
          key={number}
          onClick={onClick}
          aria-current={page === number}
          aria-label={`page-button-${index + 1}`}
        >
          {number}
        </Button>
      ))}
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${pixelToRem(8)};
  margin: ${pixelToRem(16)};
`;

const Button = styled.button<{ 'aria-current': boolean }>`
  padding: ${pixelToRem(4)};

  &:hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  ${(props) =>
    props['aria-current'] &&
    css`
      color: ${({ theme }) => theme.colors.green};
      font-weight: 500;
      border-bottom: 1px solid ${({ theme }) => theme.colors.green};
    `}
`;

export default Pagination;
