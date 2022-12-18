import { ComponentMeta, ComponentStory } from '@storybook/react';

import FindPasswordForm from './find-password-form';

export default {
  title: 'components/forms/find-password-form',
  component: FindPasswordForm,
} as ComponentMeta<typeof FindPasswordForm>;

const Template: ComponentStory<typeof FindPasswordForm> = ({
  onSubmit,
  toggleModal,
}) => {
  return <FindPasswordForm onSubmit={onSubmit} toggleModal={toggleModal} />;
};

export const Desktop = Template.bind({});

export const Tablet = Template.bind({});
Tablet.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
};

export const LargeMobile = Template.bind({});
LargeMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};

export const SmallMobile = Template.bind({});
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
