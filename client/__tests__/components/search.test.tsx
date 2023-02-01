import userEvent from '@testing-library/user-event';
import React from 'react';

import { Search } from '~components/search';

import { render } from '../test-utils';

interface SetupProps {
  id: string;
  value: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler;
  onSubmit: React.FormEventHandler;
}

const setup = ({ id, value, placeholder, onChange, onSubmit }: SetupProps) => {
  const user = userEvent.setup();
  const utils = render(
    <Search
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onSubmit={onSubmit}
    />,
  );

  return { user, ...utils };
};

describe('Search 컴포넌트 테스트', () => {
  it('구성 요소를 렌더링 할 수 있어야 합니다.', () => {
    // given
    const { getByRole, getByLabelText } = setup({
      id: 'test',
      value: '',
      placeholder: '',
      onChange: jest.fn(),
      onSubmit: jest.fn(),
    });
    const form = getByRole('search');
    const input = getByLabelText('Search');
    const button = getByRole('button');

    // when
    // then
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('검색어를 입력할 수 있어야 합니다.', async () => {
    // given
    const handleChange = jest.fn((e: React.ChangeEvent<HTMLInputElement>) => {
      props.value += e.target.value;
    });
    const props = {
      id: 'test',
      value: '',
      placeholder: '',
      onChange: handleChange,
      onSubmit: jest.fn(),
    };
    const { user, getByLabelText } = setup(props);
    const input = getByLabelText('Search');

    // when
    await user.type(input, 'test');

    // then
    expect(props.onChange).toHaveBeenCalled();
    expect(props.value).toBe('test');
  });

  it('엔터 키를 누르면 폼이 제출되어야 합니다.', async () => {
    // given
    const props = {
      id: 'test',
      value: '',
      placeholder: '',
      onChange: jest.fn(),
      onSubmit: jest.fn((e) => e.preventDefault()),
    };
    const { user, getByLabelText } = setup(props);
    const input = getByLabelText('Search');

    // when
    await user.type(input, '{enter}');

    // then
    expect(props.onSubmit).toHaveBeenCalled();
  });

  it('버튼을 누르면 폼이 제출되어야 합니다.', async () => {
    // given
    const props = {
      id: 'test',
      value: '',
      placeholder: '',
      onChange: jest.fn(),
      onSubmit: jest.fn((e) => e.preventDefault()),
    };
    const { user, getByRole } = setup(props);
    const button = getByRole('button');

    // when
    await user.click(button);

    // then
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
