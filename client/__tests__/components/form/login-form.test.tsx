import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { LoginForm } from '~components/form';

import { render, screen, createMockRouter } from '../../test-utils';

const setup = () => {
  const user = userEvent.setup();
  const router = createMockRouter({});
  const handleSubmit = jest.fn();
  const utils = render(
    <RouterContext.Provider value={router}>
      <LoginForm onSubmit={handleSubmit} />
    </RouterContext.Provider>,
  );
  const form = screen.getByRole('form', { name: /login/i });
  const emailInput = screen.getByLabelText('이메일');
  const passwordInput = screen.getByLabelText('비밀번호');
  const submitButton = screen.getByRole('button', { name: /login-submit/i });

  return {
    user,
    router,
    form,
    emailInput,
    passwordInput,
    submitButton,
    handleSubmit,
    ...utils,
  };
};

describe('LoginForm 컴포넌트 테스트', () => {
  it.each(['이메일을 입력해 주세요.', '비밀번호를 입력해 주세요.'])(
    '이메일이나 비밀번호 입력 없이 전송 버튼을 눌렀을 경우 입력 요청에 대한 문구를 화면에 렌더링해야 한다.',
    async (message) => {
      // given
      const { user, submitButton, getByText } = setup();

      // when
      await user.click(submitButton);

      // then
      expect(getByText(message)).toBeInTheDocument();
    },
  );

  it.each(['이메일을 입력해 주세요.', '비밀번호를 입력해 주세요.'])(
    '이메일이나 비밀번호 입력 없이 엔터를 눌렀을 경우 입력 요청에 대한 문구를 화면에 렌더링해야 한다.',
    async (message) => {
      // given
      const { user, emailInput, submitButton, getByText } = setup();

      // when
      await user.click(emailInput);
      await user.click(submitButton);

      // then
      expect(getByText(message)).toBeInTheDocument();
    },
  );

  it('이메일 입력 없이 전송 버튼을 눌러 입력 요청에 대한 문구가 보일 때 이메일 input을 클릭하면 해당 문구가 사라져야 한다.', async () => {
    // given
    const { user, emailInput, submitButton, getByText } = setup();

    // when
    await user.click(submitButton);
    const message = getByText('이메일을 입력해 주세요.');
    await user.click(emailInput);

    // then
    expect(message).not.toBeInTheDocument();
  });

  it('비밀번호 입력 없이 전송 버튼을 눌러 입력 요청에 대한 문구가 보일 때 비밀번호 input을 클릭하면 해당 문구가 사라져야 한다.', async () => {
    // given
    const { user, passwordInput, submitButton, getByText } = setup();

    // when
    await user.click(submitButton);
    const message = getByText('비밀번호를 입력해 주세요.');
    await user.click(passwordInput);

    // then
    expect(message).not.toBeInTheDocument();
  });

  it.each([
    '유효하지 않은 이메일 형식입니다.',
    '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
  ])(
    '올바르지 않은 형식의 이메일이나 비밀 번호를 입력 후 전송 버튼을 눌렀을 경우 올바른 형식의 입력을 요청하는 문구를 화면에 렌더링해야 한다.',
    async (message) => {
      // given
      const { user, emailInput, passwordInput, submitButton, getByText } =
        setup();

      // when
      await user.type(emailInput, 'example');
      await user.type(passwordInput, 'example');
      await user.click(submitButton);

      // then
      expect(getByText(message)).toBeInTheDocument();
    },
  );

  it.each([
    '유효하지 않은 이메일 형식입니다.',
    '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
  ])(
    '올바르지 않은 형식의 이메일이나 비밀 번호를 입력 후 엔터를 눌렀을 경우 올바른 형식의 입력을 요청하는 문구를 화면에 렌더링해야 한다.',
    async (message) => {
      // given
      const { user, emailInput, passwordInput, getByText } = setup();

      // when
      await user.type(emailInput, 'example');
      await user.type(passwordInput, 'example');
      await user.keyboard(`{Enter}`);

      // then
      expect(getByText(message)).toBeInTheDocument();
    },
  );

  it.each([
    '유효하지 않은 이메일 형식입니다.',
    '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
  ])(
    '올바르지 않은 형식의 이메일이나 비밀 번호를 입력 후 외부를 클릭했을 경우 올바른 형식의 입력을 요청하는 문구를 화면에 렌더링해야 한다.',
    async (message) => {
      // given
      const { user, form, emailInput, passwordInput, getByText } = setup();

      // when
      await user.type(emailInput, 'example');
      await user.type(passwordInput, 'example');
      await user.click(form);

      // then
      expect(getByText(message)).toBeInTheDocument();
    },
  );

  it('올바르지 않은 형식의 이메일을 입력 후 올바른 형식의 입력을 요청하는 문구를 화면에 보일 때, 이메일 input을 클릭하면 해당 문구가 사라져야 한다.', async () => {
    // given
    const { user, form, emailInput, queryByText } = setup();

    // when
    await user.type(emailInput, 'example');
    await user.click(form);
    await user.click(emailInput);

    // then
    expect(
      queryByText('유효하지 않은 이메일 형식입니다.'),
    ).not.toBeInTheDocument();
  });

  it('올바르지 않은 형식의 비밀번호를 입력 후 올바른 형식의 입력을 요청하는 문구를 화면에 보일 때, 비밀번호 input을 클릭하면 해당 문구가 사라져야 한다.', async () => {
    // given
    const { user, form, passwordInput, queryByText } = setup();

    // when
    await user.type(passwordInput, 'example');
    await user.click(form);
    await user.click(passwordInput);

    // then
    expect(
      queryByText('비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.'),
    ).not.toBeInTheDocument();
  });

  it('올바르지 않은 형식의 이메일을 입력 후 올바른 형식의 입력을 요청하는 문구를 화면에 보일 때, 이메일 input을 클릭해 해당 문구가 사라졌다가 다시 외부를 클릭하면 해당 문구가 보여야 한다.', async () => {
    // given
    const { user, form, emailInput, getByText } = setup();

    // when
    await user.type(emailInput, 'example');
    await user.click(form);
    await user.click(emailInput);
    await user.click(form);

    // then
    expect(getByText('유효하지 않은 이메일 형식입니다.')).toBeInTheDocument();
  });

  it('올바르지 않은 형식의 비밀번호를 입력 후 올바른 형식의 입력을 요청하는 문구를 화면에 보일 때, 비밀번호 input을 클릭해 해당 문구가 사라졌다가 다시 외부를 클릭하면 해당 문구가 보여야 한다.', async () => {
    // given
    const { user, form, passwordInput, getByText } = setup();

    // when
    await user.type(passwordInput, 'example');
    await user.click(form);
    await user.click(passwordInput);
    await user.click(form);

    // then
    expect(
      getByText('비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.'),
    ).toBeInTheDocument();
  });

  it('올바른 형식의 이메일과 비밀번호를 입력받았을 경우 폼에 입력된 데이터를 전송할 수 있어야 한다.', async () => {
    // given
    const { user, emailInput, passwordInput, submitButton, handleSubmit } =
      setup();

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.type(passwordInput, 'example1234!');
    await user.click(submitButton);

    // then
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['example@gmail', 'example1234!'],
    ['example@gmail.com', 'example'],
  ])(
    '올바르지 않은 형식의 이메일이나 비밀번호를 입력받았을 경우 폼에 입력된 데이터를 전송할 수 없어야 한다.',
    async (email, password) => {
      // given
      const { user, emailInput, passwordInput, submitButton, handleSubmit } =
        setup();

      // when
      await user.type(emailInput, email);
      await user.type(passwordInput, password);
      await user.click(submitButton);

      // then
      expect(handleSubmit).toHaveBeenCalledTimes(0);
    },
  );

  it.each(['이메일 찾기', '비밀번호 찾기', '회원가입'])(
    '로그인 관련 페이지의 링크를 화면에 렌더링해야 한다.',
    (name) => {
      // given
      const { getByRole } = setup();
      const pageLink = getByRole('link', { name });

      // when
      // then
      expect(pageLink).toBeInTheDocument();
    },
  );

  it.each([
    ['이메일 찾기', 'find-email'],
    ['비밀번호 찾기', 'find-password'],
    ['회원가입', 'join'],
  ])(
    '로그인 관련 페이지의 링크를 클릭하면 해당 페이지로 이동해야 한다.',
    async (name, link) => {
      // given
      const { user, router, getByRole } = setup();
      const pageLink = getByRole('link', { name });

      // when
      await user.click(pageLink);

      // then
      expect(router.push).toHaveBeenCalledWith(`/${link}`, `/${link}`, {});
    },
  );
});
