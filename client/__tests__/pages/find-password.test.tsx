import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import FindPassword from '~pages/find-password';

import { render, screen, createMockRouter, act } from '../test-utils';

const portalSetup = () => {
  const portalContainer = document.createElement('div');
  portalContainer.setAttribute('id', 'modal');
  document.body.appendChild(portalContainer);
};

const removePortalSetup = () => {
  // eslint-disable-next-line testing-library/no-node-access
  document.querySelectorAll('#modal').forEach((el) => el.remove());
};

const setup = () => {
  const user = userEvent.setup({
    advanceTimers: () => jest.runOnlyPendingTimers(),
    delay: null,
  });
  const router = createMockRouter({});
  const utils = render(
    <RouterContext.Provider value={router}>
      <FindPassword />
    </RouterContext.Provider>,
  );

  portalSetup();

  return { user, router, ...utils };
};

const setupWithVerifyingEmail = async () => {
  const { user, router, ...utils } = setup();
  const emailInput = screen.getByLabelText('이메일');
  const emailVerificationButton = screen.getByRole('button', {
    name: /이메일 인증/i,
  });
  const submitButton = screen.getByRole('button', { name: /비밀번호 찾기/i });

  // when
  await user.type(emailInput, 'example@gmail.com');
  await user.click(emailVerificationButton);
  await user.click(screen.getByRole('button', { name: /close/i }));
  await user.type(
    screen.getByPlaceholderText('인증 번호 6자리를 입력해 주세요.'),
    '123456',
  );
  await user.click(submitButton);

  return { user, router, ...utils };
};

describe('비밀번호 찾기 페이지 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    removePortalSetup();
  });

  it('비밀번호 찾기 페이지의 제목과 부제목, 폼을 렌더링해야 한다.', () => {
    // given
    setup();

    const title = screen.getByRole('heading', { name: /비밀번호 찾기/i });
    const subTitle = screen.getByText(
      '이메일 인증을 통해 비밀번호를 찾아 주세요.',
    );
    const form = screen.getByRole('form', { name: /find-password/i });

    // when
    // then
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it('이메일을 입력없이 이메일 인증 버튼을 클릭하면 이메일 입력을 요구하는 메시지가 보여야 한다.', async () => {
    // given
    const { user } = setup();
    const emailVerificationButton = screen.getByRole('button', {
      name: /이메일 인증/i,
    });

    // when
    await user.click(emailVerificationButton);

    // then
    expect(screen.getByText('이메일을 입력해 주세요.')).toBeInTheDocument();
  });

  it('이메일을 입력없이 비밀번호 찾기 버튼을 클릭하면 이메일 입력을 요구하는 메시지가 보여야 한다.', async () => {
    // given
    const { user } = setup();
    const submitButton = screen.getByRole('button', {
      name: /비밀번호 찾기/i,
    });

    // when
    await user.click(submitButton);

    // then
    expect(screen.getByText('이메일을 입력해 주세요.')).toBeInTheDocument();
  });

  it('올바르지 않은 이메일 입력 후 이메일 인증 버튼을 클릭하면 올바른 이메일을 요구하는 메시지가 보여야 한다.', async () => {
    // given
    const { user } = setup();
    const emailInput = screen.getByLabelText('이메일');
    const emailVerificationButton = screen.getByRole('button', {
      name: /이메일 인증/i,
    });

    // when
    await user.type(emailInput, 'example');
    await user.click(emailVerificationButton);

    // then
    expect(
      screen.getByText('올바른 이메일 형식이 아닙니다.'),
    ).toBeInTheDocument();
  });

  it('올바르지 않은 이메일 입력 후 비밀번호 찾기 버튼을 클릭하면 올바른 이메일을 요구하는 메시지가 보여야 한다.', async () => {
    // given
    const { user } = setup();
    const emailInput = screen.getByLabelText('이메일');
    const submitButton = screen.getByRole('button', {
      name: /비밀번호 찾기/i,
    });

    // when
    await user.type(emailInput, 'example');
    await user.click(submitButton);

    // then
    expect(
      screen.getByText('올바른 이메일 형식이 아닙니다.'),
    ).toBeInTheDocument();
  });

  it('올바른 이메일 입력 후 이메일 인증 버튼을 클릭하면 모달 창이 보여야 한다.', async () => {
    // given
    const { user } = setup();
    const emailInput = screen.getByLabelText('이메일');
    const emailVerificationButton = screen.getByRole('button', {
      name: /이메일 인증/i,
    });

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    // then
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('올바른 이메일 입력 후 이메일 인증 버튼을 클릭하면 이메일 인증 코드를 입력할 수 있는 인풋이 보여야 한다.', async () => {
    // given
    const { user } = setup();
    const emailInput = screen.getByLabelText('이메일');
    const emailVerificationButton = screen.getByRole('button', {
      name: /이메일 인증/i,
    });

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    // then
    expect(
      screen.getByPlaceholderText('인증 번호 6자리를 입력해 주세요.'),
    ).toBeInTheDocument();
  });

  it('올바른 이메일 입력 후 이메일 인증 버튼을 클릭하면 남은 인증 시간을 나타내는 타이머가 보여야 한다.', async () => {
    // given
    const { user } = setup();
    const emailInput = screen.getByLabelText('이메일');
    const emailVerificationButton = screen.getByRole('button', {
      name: /이메일 인증/i,
    });

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    // then
    expect(screen.getByRole('timer')).toBeInTheDocument();
  });

  it('인증 시간을 나타내는 타이머가 동작해야 한다.', async () => {
    // given
    const { user } = setup();
    const emailInput = screen.getByLabelText('이메일');
    const emailVerificationButton = screen.getByRole('button', {
      name: /이메일 인증/i,
    });

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

  it('인증 시간이 만료되면 인증 시간이 만료되었다는 메시가 보여야 한다.', async () => {
    // given
    const { user } = setup();
    const emailInput = screen.getByLabelText('이메일');
    const emailVerificationButton = screen.getByRole('button', {
      name: /이메일 인증/i,
    });

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

  it('올바른 이메일 입력으로 이메일 인증 버튼 클릭 후 인증 코드 입력없이 비밀번호 찾기 버튼을 클릭하면 인증코드 입력을 요구하는 메시지가 보여야 한다.', async () => {
    // given
    const { user } = setup();
    const emailInput = screen.getByLabelText('이메일');
    const emailVerificationButton = screen.getByRole('button', {
      name: /이메일 인증/i,
    });
    const submitButton = screen.getByRole('button', { name: /비밀번호 찾기/i });

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);
    await user.click(submitButton);

    // then
    expect(screen.getByText('인증번호를 입력해 주세요.')).toBeInTheDocument();
  });

  it('올바른 이메일 입력으로 이메일 인증 버튼 클릭 후 잘못된 인증 코드 입력 후 비밀번호 찾기 버튼을 클릭하면 인증코드 에러 메시지가 보여야 한다.', async () => {
    // given
    const { user } = setup();
    const emailInput = screen.getByLabelText('이메일');
    const emailVerificationButton = screen.getByRole('button', {
      name: /이메일 인증/i,
    });
    const submitButton = screen.getByRole('button', { name: /비밀번호 찾기/i });

    // when
    await user.type(emailInput, 'example@gmail.com');
    await user.click(emailVerificationButton);

    const closeModalButton = screen.getByRole('button', { name: /close/i });
    const emailVerificationCodeInput = screen.getByPlaceholderText(
      '인증 번호 6자리를 입력해 주세요.',
    );

    // when
    await user.click(closeModalButton);
    await user.type(emailVerificationCodeInput, '123');
    await user.click(submitButton);

    // then
    expect(
      screen.getByText('전송받은 인증번호 6자리를 입력해 주세요.'),
    ).toBeInTheDocument();
  });

  it('올바른 인증 코드 입력 후 비밀번호 찾기 버튼을 클릭하면 비밀번호 변경 관련 요소들이 보여야 한다.', async () => {
    // given
    await setupWithVerifyingEmail();

    const title = screen.getByText('비밀번호 변경');
    const subTitle = screen.getByText('새로운 비밀번호를 입력해 주세요.');
    const form = screen.getByRole('form', { name: /change-password/i });

    // when
    // then
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it('비밀번호 입력 없이 비밀번호 재설정 버튼 클릭 시 비밀번호 입력을 요구하는 메시지가 보여야 한다.', async () => {
    // given
    const { user } = await setupWithVerifyingEmail();
    const submitButton = screen.getByRole('button', { name: /비밀번호 변경/i });

    // when
    // then
    await user.click(submitButton);

    // then
    expect(screen.getByText('비밀번호를 입력해 주세요.')).toBeInTheDocument();
  });

  it('비밀번호 인풋의 값을 변경할 수 있어야 한다.', async () => {
    // given
    const { user } = await setupWithVerifyingEmail();
    const passwordInput = screen.getByLabelText('비밀번호');

    // when
    // then
    expect((passwordInput as HTMLInputElement).value).toBe('');

    // when
    await user.type(passwordInput, 'example1234!');

    // then
    expect((passwordInput as HTMLInputElement).value).toBe('example1234!');
  });

  it('올바른 형식의 비밀번호를 입력하지 않았을 경우 재입력을 요구하는 메시지가 보여야 한다.', async () => {
    // given
    const { user } = await setupWithVerifyingEmail();
    const passwordInput = screen.getByLabelText('비밀번호');
    const submitButton = screen.getByRole('button', { name: /비밀번호 변경/i });

    // when
    await user.type(passwordInput, 'example');
    await user.click(submitButton);

    // then
    expect(
      screen.getByText(
        '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
      ),
    ).toBeInTheDocument();
  });

  it('비밀번호 확인 인풋은 기본적으로 입력 불가 상태이다.', async () => {
    // given
    await setupWithVerifyingEmail();
    const passwordConfirmInput = screen.getByPlaceholderText(
      '비밀번호를 한번 더 입력해 주세요.',
    );

    // when
    // then
    expect(passwordConfirmInput).toBeDisabled();
  });

  it('올바른 비밀번호가 입력되면 비밀번호 확인 인풋은 입력 가능 상태여야 한다.', async () => {
    // given
    const { user } = await setupWithVerifyingEmail();
    const passwordInput = screen.getByLabelText('비밀번호');
    const passwordConfirmInput = screen.getByPlaceholderText(
      '비밀번호를 한번 더 입력해 주세요.',
    );

    // when
    await user.type(passwordInput, 'example1234!');

    // then
    expect(passwordConfirmInput).toBeEnabled();
  });

  it('비밀번호 확인 없이 제출 버튼 클릭 시 비밀번호 확인을 요구하는 메시지가 보여야 한다.', async () => {
    // given
    const { user } = await setupWithVerifyingEmail();
    const passwordInput = screen.getByLabelText('비밀번호');
    const submitButton = screen.getByRole('button', { name: /비밀번호 변경/i });

    // when
    await user.type(passwordInput, 'example1234!');
    await user.click(submitButton);

    // then
    expect(screen.getByText('비밀번호 확인이 필요합니다.')).toBeInTheDocument();
  });

  it('비밀번호와 비밀번호 확인이 다르다면 에러 메시지가 보여야 한다.', async () => {
    // given
    const { user } = await setupWithVerifyingEmail();
    const passwordInput = screen.getByLabelText('비밀번호');
    const passwordConfirmInput = screen.getByPlaceholderText(
      '비밀번호를 한번 더 입력해 주세요.',
    );
    const submitButton = screen.getByRole('button', { name: /비밀번호 변경/i });

    // when
    await user.type(passwordInput, 'example1234!');
    await user.type(passwordConfirmInput, 'example');
    await user.click(submitButton);

    // then
    expect(screen.getByText('입력한 비밀번호와 다릅니다.')).toBeInTheDocument();
  });

  it('비밀번호와 비밀번호 확인이 같다면 인증 완료 메시지가 보여야 한다.', async () => {
    // given
    const { user } = await setupWithVerifyingEmail();
    const passwordInput = screen.getByLabelText('비밀번호');
    const passwordConfirmInput = screen.getByPlaceholderText(
      '비밀번호를 한번 더 입력해 주세요.',
    );

    // when
    await user.type(passwordInput, 'example1234!');
    await user.type(passwordConfirmInput, 'example1234!');
    await user.click(document.body);

    // then
    expect(screen.getByText('인증완료')).toBeInTheDocument();
  });

  it('비밀번호와 비밀번호 확인을 같게 입력 후 제출 버튼을 클릭하면 모달 창이 보여야 한다', async () => {
    // given
    const { user } = await setupWithVerifyingEmail();
    const passwordInput = screen.getByLabelText('비밀번호');
    const passwordConfirmInput = screen.getByPlaceholderText(
      '비밀번호를 한번 더 입력해 주세요.',
    );
    const submitButton = screen.getByRole('button', { name: /비밀번호 변경/i });

    // when
    await user.type(passwordInput, 'example1234!');
    await user.type(passwordConfirmInput, 'example1234!');
    await user.click(submitButton);

    // then
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
