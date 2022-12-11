import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { JoinForm } from '~components/form';
import { UserInformation } from '~types/auth';

import { render, screen, createMockRouter, act } from '../../test-utils';

const portalSetup = () => {
  const portalContainer = document.createElement('div');
  portalContainer.setAttribute('id', 'modal');
  document.body.appendChild(portalContainer);
};

const removePortalSetup = () => {
  // eslint-disable-next-line testing-library/no-node-access
  document.querySelectorAll('#modal').forEach((el) => el.remove());
};

const setup = (
  handleSubmit: jest.Mock<void, [values: UserInformation]> = jest.fn(),
) => {
  const user = userEvent.setup({
    advanceTimers: () => jest.runOnlyPendingTimers(),
    delay: null,
  });
  const router = createMockRouter({});
  const utils = render(
    <RouterContext.Provider value={router}>
      <JoinForm onSubmit={handleSubmit} />
    </RouterContext.Provider>,
  );
  const form = screen.getByRole('form', { name: /join/i });

  const emailInput = screen.getByLabelText('이메일');
  const passwordInput = screen.getByLabelText('비밀번호');
  const passwordConfirmInput =
    screen.getByPlaceholderText(/비밀번호를 한번 더 입력해 주세요./i);
  const nameInput = screen.getByLabelText('이름');
  const phoneNumberInput = screen.getByLabelText('휴대폰 번호');
  const birthInput = screen.getByLabelText('생년월일 6자리');
  const checkbox = screen.getByRole('checkbox', { name: /agreeTerm/i });

  const emailVerificationButton = screen.getByRole('button', {
    name: /이메일 인증/i,
  });
  const submitButton = screen.getByRole('button', { name: /join-submit/i });

  portalSetup();

  return {
    user,
    router,
    form,
    emailInput,
    passwordInput,
    passwordConfirmInput,
    nameInput,
    phoneNumberInput,
    birthInput,
    checkbox,
    emailVerificationButton,
    submitButton,
    ...utils,
  };
};

describe('JoinForm 컴포넌트 테스트', () => {
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

  describe('이메일', () => {
    it('이메일 값을 입력할 수 있어야 한다.', async () => {
      // given
      const { user, emailInput } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');

      // then
      expect((emailInput as HTMLInputElement).value).toBe('example@gmail.com');
    });

    it('이메일을 입력하지 않고 이메일 인증 버튼을 클릭하면 화면에 에러 메시지가 보여야 한다.', async () => {
      // given
      const { user, emailVerificationButton } = setup();
      const errorMessage = '이메일을 입력해 주세요.';

      // when
      await user.click(emailVerificationButton);

      // then
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('올바른 형식의 이메일을 입력하지 않고 이메일 인증 버튼을 클릭하면 화면에 에러 메시지가 보여야 한다.', async () => {
      // given
      const { user, emailInput, emailVerificationButton } = setup();
      const errorMessage = '올바른 이메일 형식이 아닙니다.';

      // when
      await user.type(emailInput, 'example');
      await user.click(emailVerificationButton);

      // then
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('올바른 형식의 이메일을 입력하지 않고 이메일 인풋에서 포커스가 벗어나면 화면에 에러 메시지가 보여야 한다.', async () => {
      // given
      const { user, form, emailInput } = setup();
      const errorMessage = '올바른 이메일 형식이 아닙니다.';

      // when
      await user.type(emailInput, 'example');
      await user.click(form);

      // then
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('올바른 이메일을 입력하고 이메일 인증 버튼을 클릭하면 인증 번호가 발송되었다는 모달 창이 떠야 한다.', async () => {
      // given
      const { user, emailInput, emailVerificationButton } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);

      // then
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('올바른 이메일을 입력하고 이메일 인증 버튼을 클릭하면 인증 번호를 입력할 수 있는 인풋이 보여야 한다.', async () => {
      // given
      const { user, emailInput, emailVerificationButton } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);

      // then
      expect(
        screen.getByPlaceholderText(/인증 번호 6자리를 입력해 주세요./i),
      ).toBeInTheDocument();
    });

    it('이메일 인증 코드 인풋의 값을 업데이트 할 수 있어야 한다.', async () => {
      // given
      const { user, emailInput, emailVerificationButton } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);

      // when
      const modalCloseButton = screen.getByRole('button', { name: /close/i });
      await user.click(modalCloseButton);

      // when
      const emailVerificationCodeInput =
        screen.getByPlaceholderText(/인증 번호 6자리를 입력해 주세요./i);
      await user.type(emailVerificationCodeInput, '123456');

      // then
      expect((emailVerificationCodeInput as HTMLInputElement).value).toBe(
        '123456',
      );
    });

    it('이메일 인증 버튼 클릭 후 이메일 인풋이 수정되면 이메일 인증 코드 인풋은 입력할 수 없는 상태가 되어야 한다.', async () => {
      // given
      const { user, emailInput, emailVerificationButton } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);

      // when
      const modalCloseButton = screen.getByRole('button', { name: /close/i });
      await user.click(modalCloseButton);

      // when
      await user.type(emailInput, 'example');

      const emailVerificationCodeInput =
        screen.getByPlaceholderText(/인증 번호 6자리를 입력해 주세요./i);

      // then
      expect(emailVerificationCodeInput).toBeDisabled();
    });

    it('이메일 인증 버튼 클릭 시 타이머가 보여야 한다.', async () => {
      // given
      const { user, emailInput, emailVerificationButton } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);

      // then
      expect(screen.getByRole('timer')).toBeInTheDocument();
    });

    it('이메일 인증 버튼 클릭 시 생성되는 타이머의 초기 시간은 3분이다.', async () => {
      // given
      const { user, emailInput, emailVerificationButton } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);

      // then
      expect(screen.getByText('03분 00초')).toBeInTheDocument();
    });

    it('화면에 보이는 인증 시간이 시간에 따라 감소해야 한다.', async () => {
      // given
      const { user, emailInput, emailVerificationButton } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // then
      expect(screen.getByText('02분 59초')).toBeInTheDocument();

      // when
      act(() => {
        jest.advanceTimersByTime(59000);
      });

      expect(screen.getByText('02분 00초')).toBeInTheDocument();
    });

    it('인증 시간이 다 지나면 인증 코드가 만료되었다는 메시지가 보여야 한다.', async () => {
      // given
      const { user, emailInput, emailVerificationButton } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);

      act(() => {
        jest.advanceTimersByTime(180000);
      });

      // then
      expect(screen.getByText('00분 00초')).toBeInTheDocument();
      expect(
        screen.getByText('인증 코드가 만료되었습니다. 다시 인증 해주세요.'),
      ).toBeInTheDocument();
    });

    it('이메일 인증 버튼을 클릭하면 인증 시간이 리셋되어야 한다.', async () => {
      // given
      const { user, emailInput, emailVerificationButton } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);

      act(() => {
        jest.advanceTimersByTime(180000);
      });

      // then
      expect(screen.getByText('00분 00초')).toBeInTheDocument();

      // when
      await user.click(emailVerificationButton);

      // then
      expect(screen.getByText('03분 00초')).toBeInTheDocument();
    });
  });

  describe('비밀 번호', () => {
    it('비밀번호 값을 입력할 수 있어야 한다.', async () => {
      // given
      const { user, passwordInput } = setup();

      // when
      await user.type(passwordInput, 'example1234!');

      // then
      expect((passwordInput as HTMLInputElement).value).toBe('example1234!');
    });

    it('올바른 형식의 비밀번호를 입력하지 않고 비밀번호 인풋에서 포커스가 벗어나면 화면에 에러 메시지가 보여야 한다.', async () => {
      // given
      const { user, form, passwordInput } = setup();
      const errorMessage =
        '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.';

      // when
      await user.type(passwordInput, 'example');
      await user.click(form);

      // then
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('비밀번호 확인 인풋은 기본적으로 입력할 수 없는 상태여야 한다.', async () => {
      // given
      const { passwordConfirmInput } = setup();

      // when
      // then
      expect(passwordConfirmInput).toBeDisabled();
    });

    it('비밀번호 인풋에 올바른 형식이 입력되면 비밀번호 확인 인풋에 입력할 수 있는 상태여야 한다.', async () => {
      // given
      const { user, passwordInput, passwordConfirmInput } = setup();

      // when
      await user.type(passwordInput, 'example1234!');

      // then
      expect(passwordConfirmInput).toBeEnabled();
    });

    it('비밀번호 확인 인풋의 값을 업데이트 할 수 있어야 한다.', async () => {
      // given
      const { user, passwordInput, passwordConfirmInput } = setup();

      // when
      await user.type(passwordInput, 'example1234!');
      await user.type(passwordConfirmInput, 'example1234!');

      // then
      expect((passwordConfirmInput as HTMLInputElement).value).toBe(
        'example1234!',
      );
    });

    it('비밀번호 확인 인풋에 비밀번호와 다른 값을 입력하면 에러 메시지가 화면에 보여야 한다.', async () => {
      // given
      const { user, form, passwordInput, passwordConfirmInput } = setup();
      const errorMessage = '입력한 비밀번호와 다릅니다.';

      // when
      await user.type(passwordInput, 'example1234!');
      await user.type(passwordConfirmInput, 'example');
      await user.click(form);

      // then
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('비밀번호 확인 인풋에 비밀번호와 같은 값을 입력하면 인증 완료 메시지가 화면에 보여야 한다.', async () => {
      // given
      const { user, form, passwordInput, passwordConfirmInput } = setup();
      const message = '인증완료';

      // when
      await user.type(passwordInput, 'example1234!');
      await user.type(passwordConfirmInput, 'example1234!');
      await user.click(form);

      // then
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    it('비밀번호 확인 인풋에 값을 입력 후 비밀 번호 인풋을 클릭하면 비밀번호 확인 인풋의 값이 초기화 되어야 한다.', async () => {
      // given
      const { user, passwordInput, passwordConfirmInput } = setup();

      // when
      await user.type(passwordInput, 'example1234!');
      await user.type(passwordConfirmInput, 'example1234!');
      await user.click(passwordInput);

      // then
      expect((passwordConfirmInput as HTMLInputElement).value).toBe('');
    });
  });

  describe('이름', () => {
    it('이름 값을 입력할 수 있어야 한다.', async () => {
      // given
      const { user, nameInput } = setup();

      // when
      await user.type(nameInput, '홍길동');

      // then
      expect((nameInput as HTMLInputElement).value).toBe('홍길동');
    });

    it('올바른 형식의 이름을 입력하지 않고 이름 인풋에서 포커스가 벗어나면 화면에 에러 메시지가 보여야 한다.', async () => {
      // given
      const { user, form, nameInput } = setup();
      const errorMessage = '올바른 이름이 아닙니다.';

      // when
      await user.type(nameInput, '홍');
      await user.click(form);

      // then
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('휴대폰 번호', () => {
    it('휴대폰 번호 값을 입력할 수 있어야 한다.', async () => {
      // given
      const { user, phoneNumberInput } = setup();

      // when
      await user.type(phoneNumberInput, '010-1234-5678');

      // then
      expect((phoneNumberInput as HTMLInputElement).value).toBe(
        '010-1234-5678',
      );
    });

    it('- 없이 숫자만 입력해도 휴대폰 번호 형식으로 변경되어야 한다.', async () => {
      // given
      const { user, form, phoneNumberInput } = setup();

      // when
      await user.type(phoneNumberInput, '01012345678');
      await user.click(form);

      // then
      expect((phoneNumberInput as HTMLInputElement).value).toBe(
        '010-1234-5678',
      );
    });

    it('올바른 형식의 휴대폰 번호를 입력하지 않고 휴대폰 번호 인풋에서 포커스가 벗어나면 화면에 에러 메시지가 보여야 한다.', async () => {
      // given
      const { user, form, phoneNumberInput } = setup();
      const errorMessage = '올바른 휴대폰 번호 형식이 아닙니다.';

      // when
      await user.type(phoneNumberInput, '0101');
      await user.click(form);

      // then
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('생년월일', () => {
    it('생년월일 6자리 값을 입력할 수 있어야 한다.', async () => {
      // given
      const { user, birthInput } = setup();

      // when
      await user.type(birthInput, '000101');

      // then
      expect((birthInput as HTMLInputElement).value).toBe('000101');
    });

    it('올바른 형식의 생년월일을 입력하지 않고 생년월일 인풋에서 포커스가 벗어나면 화면에 에러 메시지가 보여야 한다.', async () => {
      // given
      const { user, form, birthInput } = setup();
      const errorMessage = '올바른 생년월일 6자리를 입력해 주세요.';

      // when
      await user.type(birthInput, '123');
      await user.click(form);

      // then
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('이용약관 동의', () => {
    it('이용약관 동의에 대한 체크박스를 체크할 수 있어야 한다.', async () => {
      // given
      const { user, checkbox } = setup();

      // when
      await user.click(checkbox);

      // then
      expect((checkbox as HTMLInputElement).checked).toBe(true);
    });
  });

  describe('회원 가입', () => {
    it('계정 생성 버튼은 기본적으로 클릭할 수 없는 상태여야 한다.', () => {
      // given
      const { submitButton } = setup();

      // when
      // then
      expect(submitButton).toBeDisabled();
    });

    it('모든 필드가 올바르게 입력되었으면 클릭 할 수 있는 상태가 되어야 한다.', async () => {
      // given
      const {
        user,
        emailInput,
        emailVerificationButton,
        passwordInput,
        passwordConfirmInput,
        nameInput,
        phoneNumberInput,
        birthInput,
        checkbox,
        submitButton,
      } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);

      // when
      const modalCloseButton = screen.getByRole('button', { name: /close/i });
      await user.click(modalCloseButton);

      // when
      const emailVerificationCodeInput =
        screen.getByPlaceholderText(/인증 번호 6자리를 입력해 주세요./i);
      await user.type(emailVerificationCodeInput, '123456');

      // when
      await user.type(passwordInput, 'example1234!');
      await user.type(passwordConfirmInput, 'example1234!');

      // when
      await user.type(nameInput, '홍길동');

      // when
      await user.type(phoneNumberInput, '01012345678');

      // when
      await user.type(birthInput, '000101');

      // when
      await user.click(checkbox);

      // then
      expect(submitButton).toBeEnabled();
    });

    it('모든 필드가 올바르게 된 상태에서 submit 버튼을 클릭하면 모달 창이 떠야 한다.', async () => {
      // given
      const {
        user,
        emailInput,
        emailVerificationButton,
        passwordInput,
        passwordConfirmInput,
        nameInput,
        phoneNumberInput,
        birthInput,
        checkbox,
        submitButton,
      } = setup();

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);
      await user.click(screen.getByRole('button', { name: /close/i }));
      await user.type(
        screen.getByPlaceholderText(/인증 번호 6자리를 입력해 주세요./i),
        '123456',
      );
      await user.type(passwordInput, 'example1234!');
      await user.type(passwordConfirmInput, 'example1234!');
      await user.type(nameInput, '홍길동');
      await user.type(phoneNumberInput, '01012345678');
      await user.type(birthInput, '000101');
      await user.click(checkbox);

      // when
      await user.click(submitButton);

      // then
      const submitModal = screen.getByRole('dialog');

      expect(submitModal).toBeInTheDocument();
    });

    it('submit 버튼 클릭 후 모달 창에서 확인 버튼을 클릭하면 폼이 submit되어야 한다.', async () => {
      // given
      const handleSubmit = jest.fn();
      const {
        user,
        emailInput,
        emailVerificationButton,
        passwordInput,
        passwordConfirmInput,
        nameInput,
        phoneNumberInput,
        birthInput,
        checkbox,
        submitButton,
      } = setup(handleSubmit);

      // when
      await user.type(emailInput, 'example@gmail.com');
      await user.click(emailVerificationButton);
      await user.click(screen.getByRole('button', { name: /close/i }));
      await user.type(
        screen.getByPlaceholderText(/인증 번호 6자리를 입력해 주세요./i),
        '123456',
      );
      await user.type(passwordInput, 'example1234!');
      await user.type(passwordConfirmInput, 'example1234!');
      await user.type(nameInput, '홍길동');
      await user.type(phoneNumberInput, '01012345678');
      await user.type(birthInput, '000101');
      await user.click(checkbox);

      // when
      await user.click(submitButton);

      // when
      const confirmButton = screen.getByRole('button', { name: /confirm/i });
      await user.click(confirmButton);

      // then
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
