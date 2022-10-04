import userEvent from '@testing-library/user-event';
import { render, screen } from '../test-utils';

import { Modal, ConfimationModal } from '~components/modal';

import { useToggle } from '~hooks/index';

interface TestProps {
  withCancel?: boolean;
}

const TestComponent = ({ withCancel }: TestProps) => {
  const [isOpen, toggle] = useToggle();

  return (
    <>
      <Modal title="modal test" isOpen={isOpen} onClose={toggle}>
        <ConfimationModal
          message="This is modal test"
          onCancel={withCancel ? toggle : undefined}
          onConfirm={toggle}
        />
      </Modal>
      <button type="button" onClick={toggle} aria-label="show modal" />
    </>
  );
};

const portalSetup = () => {
  const portalContainer = document.createElement('div');
  portalContainer.setAttribute('id', 'modal');
  document.body.appendChild(portalContainer);
};

const removePortalSetup = () => {
  // eslint-disable-next-line testing-library/no-node-access
  document.querySelectorAll('#modal').forEach((el) => el.remove());
};

const setup = ({ withCancel }: TestProps) => {
  portalSetup();
  const utils = render(<TestComponent withCancel={withCancel} />);
  const openButton = screen.getByRole('button', { name: /show modal/i });

  return { openButton, ...utils };
};

describe('Modal Component', () => {
  afterEach(() => {
    removePortalSetup();
  });

  it('should be render correctly', async () => {
    const { openButton } = setup({});

    expect(openButton).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should be shown when the button is clicked', async () => {
    const { openButton } = setup({});

    expect(openButton).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(openButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    expect(screen.getByText('modal test')).toBeInTheDocument();
    expect(screen.getByText('This is modal test')).toBeInTheDocument();
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
  });

  it('should be shown with confirmation buttons', async () => {
    const { openButton } = setup({ withCancel: true });

    await userEvent.click(openButton);

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /confirm/i }),
    ).toBeInTheDocument();
  });

  it('should be closed when you click close button', async () => {
    const { openButton, getByRole } = setup({ withCancel: true });

    await userEvent.click(openButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeButton = getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should be closed when you click outside', async () => {
    const { openButton, getByTestId } = setup({ withCancel: true });

    await userEvent.click(openButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const backdrop = getByTestId('backdrop');

    await userEvent.click(backdrop);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should be closed when you press escape key', async () => {
    const { openButton } = setup({ withCancel: true });

    await userEvent.click(openButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await userEvent.keyboard(`{Escape}`);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should move the foucs to next tabbable element inside the modal when you press tab key', async () => {
    const { openButton } = setup({ withCancel: true });

    await userEvent.click(openButton);

    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByRole('button', { name: /cancel/i })).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByRole('button', { name: /confirm/i })).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus();
  });

  it('should move the foucs to prev tabbable element inside the modal when you press shift+tab key', async () => {
    const { openButton } = setup({ withCancel: true });

    await userEvent.click(openButton);

    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus();

    await userEvent.keyboard('{Shift>}{Tab/}{/Shift}');
    expect(screen.getByRole('button', { name: /confirm/i })).toHaveFocus();

    await userEvent.keyboard('{Shift>}{Tab/}{/Shift}');
    expect(screen.getByRole('button', { name: /cancel/i })).toHaveFocus();

    await userEvent.keyboard('{Shift>}{Tab/}{/Shift}');
    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus();
  });
});
