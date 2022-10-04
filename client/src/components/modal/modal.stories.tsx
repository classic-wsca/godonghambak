import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from './modal';
import ConfirmationModal from './confirmation-modal';

import { Button } from '~components/common';

import { useToggle } from '~hooks/index';

export default {
  title: 'components/modal',
  component: Modal,
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', width: '100vw' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = ({
  isOpen,
  onClose,
  ...args
}) => {
  const [isShown, toggleModal] = useToggle();

  return (
    <>
      <Modal isOpen={isShown} onClose={toggleModal} {...args}>
        <ConfirmationModal
          message="인증번호가 발송되었습니다."
          onConfirm={toggleModal}
        />
      </Modal>
      <Button
        type="button"
        size="x-small"
        onClick={toggleModal}
        style={{ marginTop: '400px' }}
      >
        이메일 인증
      </Button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: '이메일 인증',
};

const ConfirmTemplate: ComponentStory<typeof Modal> = ({
  isOpen,
  onClose,
  children,
  ...args
}) => {
  const [isShown, toggleModal] = useToggle();

  return (
    <>
      <Modal isOpen={isShown} onClose={toggleModal} {...args}>
        <ConfirmationModal
          message="비밀번호를 변경하시겠습니까?"
          onCancel={toggleModal}
          onConfirm={toggleModal}
        />
      </Modal>
      <Button
        type="button"
        size="x-small"
        onClick={toggleModal}
        style={{ marginTop: '400px' }}
      >
        비밀번호 변경
      </Button>
    </>
  );
};

export const ConfirmDefault = ConfirmTemplate.bind({});
ConfirmDefault.args = {
  title: '아이디/비밀번호',
};
