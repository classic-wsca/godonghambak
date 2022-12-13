import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import type { NextRouter } from 'next/router';

import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { FindEmailForm } from '~components/form';

import { createMockRouter, render, screen } from '../../test-utils';

interface SetupResult {
  user: UserEvent;
  router: NextRouter;
  form: HTMLElement;
  nameInput: HTMLElement;
  birthInput: HTMLElement;
  phoneInput: HTMLElement;
  submitButton: HTMLElement;
}

const setup = (onSubmit: jest.Mock = jest.fn()): SetupResult => {
  const user = userEvent.setup();
  const router = createMockRouter({});
  const utils = render(
    <RouterContext.Provider value={router}>
      <FindEmailForm onSubmit={onSubmit} />
    </RouterContext.Provider>,
  );
  const form = screen.getByRole('form', { name: /find-email/i });
  const nameInput = screen.getByLabelText('이름');
  const birthInput = screen.getByLabelText('생년월일');
  const phoneInput = screen.getByLabelText('휴대폰 번호');
  const submitButton = screen.getByRole('button', { name: /이메일 찾기/i });

  return {
    user,
    router,
    form,
    nameInput,
    birthInput,
    phoneInput,
    submitButton,
    ...utils,
  };
};

describe('이메일 찾기 폼 테스트', () => {
  it.each([
    ['nameInput', ''],
    ['birthInput', ''],
    ['phoneInput', ''],
  ])('각 인풋의 초기값은 빈 문자열이어야 한다.', async (key, value) => {
    // given
    const { [key as keyof SetupResult]: input } = setup();

    // when
    // then
    expect((input as HTMLInputElement).value).toBe(value);
  });

  it.each([
    ['nameInput', '홍길동'],
    ['birthInput', '000101'],
    ['phoneInput', '010-1234-5678'],
  ])('각 인풋의 값을 변경할 수 있어야 한다.', async (key, value) => {
    // given
    const { user, [key as keyof SetupResult]: input } = setup();

    // when
    await user.type(input as HTMLInputElement, value);

    // then
    expect((input as HTMLInputElement).value).toBe(value);
  });

  it.each([
    ['nameInput', '홍', '올바른 이름이 아닙니다.'],
    ['birthInput', '00010', '올바른 생년월일 6자리를 입력해 주세요.'],
    ['phoneInput', '010-1234-5', '올바른 휴대폰 번호 형식이 아닙니다.'],
  ])(
    '각 인풋의 형식에 맞지 않는 값을 입력 후 포커스가 사라지면 에러 메시지가 화면에 보여야 한다.',
    async (key, value, message) => {
      // given
      const { user, form, [key as keyof SetupResult]: input } = setup();

      // when
      await user.type(input as HTMLInputElement, value);
      await user.click(form);

      // then
      expect(screen.getByText(message)).toBeInTheDocument();
    },
  );

  it.each([
    ['nameInput', '홍', '올바른 이름이 아닙니다.'],
    ['birthInput', '00010', '올바른 생년월일 6자리를 입력해 주세요.'],
    ['phoneInput', '010-1234-5', '올바른 휴대폰 번호 형식이 아닙니다.'],
  ])(
    '각 인풋의 형식에 맞지 않는 값을 입력 후 포커스가 사라져 에러 메시지가 화면에 보일 때, 다시 인풋을 클릭하면 에러 메시지가 사라져야 한다.',
    async (key, value, message) => {
      // given
      const { user, form, [key as keyof SetupResult]: input } = setup();

      // when
      await user.type(input as HTMLInputElement, value);
      await user.click(form);

      // when
      await user.click(input as HTMLInputElement);

      // then
      expect(screen.queryByText(message)).not.toBeInTheDocument();
    },
  );

  it.each([
    ['nameInput', '홍', '올바른 이름이 아닙니다.'],
    ['birthInput', '00010', '올바른 생년월일 6자리를 입력해 주세요.'],
    ['phoneInput', '010-1234-5', '올바른 휴대폰 번호 형식이 아닙니다.'],
  ])(
    '각 인풋의 형식에 맞지 않는 값을 입력 후 포커스가 사라져 에러 메시지가 화면에 보일 때, 다시 인풋을 클릭하면 에러 메시지가 사라진 후 다시 포커스가 사라지면 에러메시지가 보여야 한다.',
    async (key, value, message) => {
      // given
      const { user, form, [key as keyof SetupResult]: input } = setup();

      // when
      await user.type(input as HTMLInputElement, value);
      await user.click(form);

      // when
      await user.click(input as HTMLInputElement);
      await user.click(form);

      // then
      expect(screen.getByText(message)).toBeInTheDocument();
    },
  );

  it.each([
    ['nameInput', '홍', '올바른 이름이 아닙니다.'],
    ['birthInput', '00010', '올바른 생년월일 6자리를 입력해 주세요.'],
    ['phoneInput', '010-1234-5', '올바른 휴대폰 번호 형식이 아닙니다.'],
  ])(
    '각 인풋의 형식에 맞지 않는 값을 입력 후 포커스가 사라져 에러 메시지가 보일 때, 값을 지우고 포커스가 사라지면 에러 메시지가 사라져야 한다.',
    async (key, value, message) => {
      // given
      const { user, form, [key as keyof SetupResult]: input } = setup();

      // when
      await user.type(input as HTMLInputElement, value);
      await user.click(form);

      // when
      await user.clear(input as HTMLInputElement);
      await user.click(form);

      // then
      expect(screen.queryByText(message)).not.toBeInTheDocument();
    },
  );

  it('각 인풋에 입력값 없이 제출 버튼을 누르면 입력을 요구하는 메시지가 보여야 한다.', async () => {
    // given
    const messages = [
      '이름을 입력해 주세요.',
      '생년월일을 입력해 주세요.',
      '휴대폰 번호를 입력해 주세요.',
    ];
    const { user, submitButton } = setup();

    // when
    await user.click(submitButton);

    // then
    messages.forEach((message) => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  it('각 인풋에 올바른 형식의 입력 없이 제출 버튼을 누르면 에러 메시지가 보여야 한다.', async () => {
    // given
    const messages = [
      '올바른 이름이 아닙니다.',
      '올바른 생년월일 6자리를 입력해 주세요.',
      '올바른 휴대폰 번호 형식이 아닙니다.',
    ];
    const { user, nameInput, birthInput, phoneInput, submitButton } = setup();

    // when
    await user.type(nameInput, '홍');
    await user.type(birthInput, '123456');
    await user.type(phoneInput, '48920349');

    // when
    await user.click(submitButton);

    // then
    messages.forEach((message) => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  it('각 인풋에 올바른 형식의 입력 후 제출 버튼을 클릭하면 폼이 제출되어야 한다.', async () => {
    // given
    const handleSubmit = jest.fn();
    const { user, nameInput, birthInput, phoneInput, submitButton } =
      setup(handleSubmit);

    // when
    await user.type(nameInput, '홍길동');
    await user.type(birthInput, '000101');
    await user.type(phoneInput, '01012345678');

    // when
    await user.click(submitButton);

    // then
    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith({
      birth: '000101',
      name: '홍길동',
      phoneNumber: '010-1234-5678',
    });
  });
});
