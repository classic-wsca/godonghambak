import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { FindPasswordForm } from '~components/form';

import { createMockRouter, render, screen, act } from '../../test-utils';

const setup = (onSubmit = jest.fn(), toggleModal = jest.fn()) => {
  const user = userEvent.setup({
    advanceTimers: () => jest.runOnlyPendingTimers(),
    delay: null,
  });
  const router = createMockRouter({});
  const utils = render(
    <RouterContext.Provider value={router}>
      <FindPasswordForm onSubmit={onSubmit} toggleModal={toggleModal} />
    </RouterContext.Provider>,
  );
  const form = screen.getByRole('form', { name: /find-password/i });
  const emailInput = screen.getByLabelText('이메일');
  const emailVerificationButton = screen.getByRole('button', {
    name: /이메일 인증/i,
  });

  return {
    user,
    router,
    form,
    emailInput,
    emailVerificationButton,
    ...utils,
  };
};

describe('비밀번호 찾기 폼 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('이메일 인풋의 초기값은 빈 문자열이어야 한다.', () => {
    // given
    const { emailInput } = setup();

    // when
    // then
    expect((emailInput as HTMLInputElement).value).toBe('');
  });

  it('이메일 입력없이 비밀번호 찾기 버튼을 누르면 이메일을 요구하는 문자열이 화면에 보여야 한다', async () => {
    // given
    const { user } = setup();
    const submitButton = screen.getByRole('button', { name: /비밀번호 찾기/i });

    // when
    await user.click(submitButton);

    // then
    expect(screen.getByText('이메일을 입력해 주세요.')).toBeInTheDocument();
  });

  it('이메일 인풋의 값을 변경할 수 있어야 한다.', async () => {
    // given
    const { user, emailInput } = setup();

    // when
    await user.type(emailInput, 'example@gamil.com');

    // then
    expect((emailInput as HTMLInputElement).value).toBe('example@gamil.com');
  });

  it.each(['example', '이메일', '@exmaple.co'])(
    '이메일 인풋의 값이 올바른 형식의 이메일 아니라면 포커스가 사라질 대, 에러 메시지가 화면에 보여야 한다.',
    async (value) => {
      // given
      const { user, form, emailInput } = setup();

      // when
      await user.type(emailInput, value);
      await user.click(form);

      // then
      expect(
        screen.getByText('올바른 이메일 형식이 아닙니다.'),
      ).toBeInTheDocument();
    },
  );

  it('올바르지 않은 형식으로 이메일을 입력 후 이메일 인증 버튼을 클릭 시 에러 메시지가 보여야 한다.', async () => {
    // given
    const { user, emailInput, emailVerificationButton } = setup();

    // when
    await user.type(emailInput, 'example');
    await user.click(emailVerificationButton);

    // then
    expect(
      screen.getByText('올바른 이메일 형식이 아닙니다.'),
    ).toBeInTheDocument();
  });

  it('올바르지 않은 이메일 형식으로 에러 메시지가 화면에 보일 때 다시 인풋에 포커스되면 에러 메시지가 사라져야 한다.', async () => {
    // given
    const { user, form, emailInput } = setup();

    // when
    await user.type(emailInput, 'example');
    await user.click(form);
    await user.click(emailInput);

    // then
    expect(
      screen.queryByText('올바른 이메일 형식이 아닙니다.'),
    ).not.toBeInTheDocument();
  });

  it('올바른 이메일 입력 후 이메일 인증 버튼 클릭 시 이메일 인증 코드를 입력할 수 있는 인풋이 보여야 한다.', async () => {
    // given
    const { user, emailInput, emailVerificationButton } = setup();

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    const emailVerificationCodeInput =
      screen.getByPlaceholderText(/인증 번호 6자리를 입력해 주세요./i);

    // then
    expect(emailVerificationCodeInput).toBeInTheDocument();
  });

  it('이메일 인증 코드 인풋의 값을 변경할 수 있어야 한다.', async () => {
    // given
    const { user, emailInput, emailVerificationButton } = setup();

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    // given
    const emailVerificationCodeInput =
      screen.getByPlaceholderText(/인증 번호 6자리를 입력해 주세요./i);

    // when
    await user.type(emailVerificationCodeInput, '1234');

    // then
    expect((emailVerificationCodeInput as HTMLInputElement).value).toBe('1234');
  });

  it('올바른 인증 값을 입력하면 인증 완료 메시지가 보여야 한다.', async () => {
    // given
    const { user, form, emailInput, emailVerificationButton } = setup();

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    // given
    const emailVerificationCodeInput =
      screen.getByPlaceholderText(/인증 번호 6자리를 입력해 주세요./i);

    // when
    await user.type(emailVerificationCodeInput, '123456');
    await user.click(form);

    // then
    expect(screen.getByText('인증완료')).toBeInTheDocument();
  });

  it('이메일 인증 버튼을 누르면 타이머가 보여야 한다.', async () => {
    // given
    const { user, emailInput, emailVerificationButton } = setup();

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    // then
    expect(screen.getByRole('timer')).toBeInTheDocument();
  });

  it('타이머의 기본 시작 값은 3분이어야 한다.', async () => {
    // given
    const { user, emailInput, emailVerificationButton } = setup();

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    // then
    expect(screen.getByText('03분 00초')).toBeInTheDocument();
  });

  it('시간이 지날 수록 타이머의 시간이 감소해야 한다.', async () => {
    // given
    const { user, emailInput, emailVerificationButton } = setup();

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    // then
    expect(screen.getByText('03분 00초')).toBeInTheDocument();

    // when
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // then
    expect(screen.getByText('02분 55초')).toBeInTheDocument();
  });

  it('인증 시간이 만료되면 에러 메시지가 보여야 한다.', async () => {
    // given
    const { user, emailInput, emailVerificationButton } = setup();

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    // then
    expect(screen.getByText('03분 00초')).toBeInTheDocument();

    // when
    act(() => {
      jest.advanceTimersByTime(180000);
    });

    // then
    expect(
      screen.getByText('인증 코드가 만료되었습니다. 다시 인증 해주세요.'),
    ).toBeInTheDocument();
  });

  it('이메일 인증 후에는 비밀번호 찾기 버튼을 클릭할 수 있어야 한다.', async () => {
    // given
    const handleSubmit = jest.fn();
    const { user, form, emailInput, emailVerificationButton } =
      setup(handleSubmit);

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    const emailVerificationCodeInput =
      screen.getByPlaceholderText(/인증 번호 6자리를 입력해 주세요./i);

    // when
    await user.type(emailVerificationCodeInput, '123456');
    await user.click(form);

    const submitButton = screen.getByRole('button', { name: /비밀번호 찾기/i });

    // when
    await user.click(submitButton);

    // then
    expect(handleSubmit).toHaveBeenCalled();
  });
});
