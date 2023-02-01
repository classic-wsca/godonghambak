import userEvent from '@testing-library/user-event';
import React from 'react';

import { Pagination } from '~components/pagination';

import { render } from '../test-utils';

interface SetupProps {
  total: number;
  page: number;
  limit?: number;
  onClick: React.MouseEventHandler;
}

const setup = ({ total, page, limit, onClick }: SetupProps) => {
  const user = userEvent.setup();
  const utils = render(
    <Pagination total={total} page={page} limit={limit} onClick={onClick} />,
  );

  return { user, ...utils };
};

describe('페이지네이션 컴포넌트 테스트', () => {
  it('총 페이지와 현재 페이지, 보여줄 아이템 개수, 클릭 핸들러를 입력받아 렌더링되어야 합니다.', () => {
    // given
    const { getByRole } = setup({
      total: 30,
      page: 1,
      limit: 10,
      onClick: jest.fn(),
    });

    // when
    // then
    expect(getByRole('navigation', { name: 'pagination' })).toBeInTheDocument();
  });

  it('보여줄 아이템 개수를 입력하지 않으면 기본적으로 10개씩 보여줘야 합니다.', () => {
    // given
    const { getAllByRole } = setup({
      total: 30,
      page: 1,
      onClick: jest.fn(),
    });

    // when
    // then
    expect(getAllByRole('button', { name: /page-button/i }).length).toEqual(3);
  });

  it('보여줄 아이템 개수를 입력하지 않으면 기본적으로 5개씩 보여줘야 합니다.', () => {
    // given
    const { getAllByRole } = setup({
      total: 30,
      page: 1,
      limit: 5,
      onClick: jest.fn(),
    });

    // when
    // then
    expect(getAllByRole('button', { name: /page-button/i }).length).toEqual(6);
  });

  it('현재 페이지를 나타낼 수 있어야 합니다.', () => {
    // given
    const { getByRole } = setup({
      total: 30,
      page: 1,
      onClick: jest.fn(),
    });

    // when
    // then
    const currentButton = getByRole('button', { current: true });

    expect(getByRole('button', { name: 'page-button-1' })).toEqual(
      currentButton,
    );
  });

  it('현재 페이지가 변경되면 가리키는 현재 페이지가 변경되어야 합니다.', () => {
    // given
    const { getByRole } = setup({
      total: 30,
      page: 2,
      onClick: jest.fn(),
    });
    const currentButton = getByRole('button', { current: true });

    // when
    // then
    expect(getByRole('button', { name: 'page-button-2' })).toEqual(
      currentButton,
    );
  });

  it('페이지 번호를 클릭하면 onClick 함수가 호출되어야 합니다.', async () => {
    // given
    const handleClick = jest.fn();
    const { user, getAllByRole } = setup({
      total: 30,
      page: 1,
      onClick: handleClick,
    });
    const pageButton = getAllByRole('button', { current: false })[0];

    // when
    await user.click(pageButton);

    // then
    expect(handleClick).toHaveBeenCalled();
  });
});
