import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { ChangePasswordForm } from '~components/form';

import { createMockRouter, render, screen } from '../../test-utils';

const setup = (onSubmit = jest.fn()) => {
  const user = userEvent.setup({
    advanceTimers: () => jest.runOnlyPendingTimers(),
    delay: null,
  });
  const router = createMockRouter({});
  const utils = render(
    <RouterContext.Provider value={router}>
      <ChangePasswordForm onSubmit={onSubmit} />
    </RouterContext.Provider>,
  );
  const form = screen.getByRole('form', { name: /change-password/i });
  const passwordInput = screen.getByLabelText('비밀번호');
  const passwordConfirmInput = screen.getByPlaceholderText(
    '비밀번호를 한번 더 입력해 주세요.',
  );
  const submitButton = screen.getByRole('button', {
    name: /비밀번호 변경/i,
  });

  return {
    user,
    router,
    form,
    passwordInput,
    passwordConfirmInput,
    submitButton,
    ...utils,
  };
};

describe('비밀번호 변경 폼 테스트', () => {
  it('비밀번호 인풋의 초기값은 빈 문자열이어야 한다.', () => {
    // given
    const { passwordInput } = setup();

    // when
    // then
    expect((passwordInput as HTMLInputElement).value).toBe('');
  });

  it('비밀번호 확인 인풋은 기본적으로 입력 불가 상태여야 한다.', () => {
    // given
    const { passwordConfirmInput } = setup();

    // when
    // then
    expect(passwordConfirmInput).toBeDisabled();
  });

  it('비밀번호 인풋의 값을 변경할 수 있어야 한다.', async () => {
    // given
    const { user, passwordInput } = setup();

    // when
    await user.type(passwordInput, 'example1234!');

    // then
    expect((passwordInput as HTMLInputElement).value).toBe('example1234!');
  });

  it('올바른 형식의 비밀번호를 입력하지 않으면 에러 메시지가 보여야 한다.', async () => {
    // given
    const { user, form, passwordInput } = setup();

    // when
    await user.type(passwordInput, 'example');
    await user.click(form);

    // then
    expect(
      screen.getByText(
        '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
      ),
    ).toBeInTheDocument();
  });

  it('올바른 비밀번호를 입력하면 비밀번호 확인 인풋이 입력할 수 있는 상태로 변경되어야 한다.', async () => {
    // given
    const { user, passwordInput, passwordConfirmInput } = setup();

    // when
    await user.type(passwordInput, 'example1234!');

    // then
    expect(passwordConfirmInput).toBeEnabled();
  });

  it('비밀번호 확인 인풋의 값을 변경할 수 있어야 한다.', async () => {
    // given
    const { user, passwordInput, passwordConfirmInput } = setup();

    // when
    await user.type(passwordInput, 'example1234!');

    // when
    await user.type(passwordConfirmInput, 'example1234!');

    expect((passwordConfirmInput as HTMLInputElement).value).toBe(
      'example1234!',
    );
  });

  it('비밀번호와 다른 비밀번호 확인 인풋 값을 입력 시 에러 메시지를 보여야 한다.', async () => {
    // given
    const { user, form, passwordInput, passwordConfirmInput } = setup();

    // when
    await user.type(passwordInput, 'example1234!');

    // when
    await user.type(passwordConfirmInput, 'example');
    await user.click(form);

    // then
    expect(screen.getByText('입력한 비밀번호와 다릅니다.')).toBeInTheDocument();
  });

  it('비밀번호와 동일한 비밀번호 확인 인풋 값을 입력 시 인증 완료 메시지를 보여야 한다.', async () => {
    // given
    const { user, form, passwordInput, passwordConfirmInput } = setup();

    // when
    await user.type(passwordInput, 'example1234!');

    // when
    await user.type(passwordConfirmInput, 'example1234!');
    await user.click(form);

    // then
    expect(screen.getByText('인증완료')).toBeInTheDocument();
  });

  it('비밀번호와 동일한 비밀번호 확인 인풋 값을 입력 시 폼을 제출할 수 있어야 한다.', async () => {
    // given
    const handleSubmit = jest.fn();
    const { user, passwordInput, passwordConfirmInput, submitButton } =
      setup(handleSubmit);

    // when
    await user.type(passwordInput, 'example1234!');

    // when
    await user.type(passwordConfirmInput, 'example1234!');
    await user.click(submitButton);

    // then
    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith({
      password: 'example1234!',
      passwordConfirm: 'example1234!',
    });
  });
});
