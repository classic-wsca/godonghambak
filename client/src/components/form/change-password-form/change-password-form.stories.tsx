import { ComponentMeta, ComponentStory } from '@storybook/react';

import ChangePasswordForm from './change-password-form';

export default {
  title: 'components/forms/change-password-form',
  component: ChangePasswordForm,
} as ComponentMeta<typeof ChangePasswordForm>;

const Template: ComponentStory<typeof ChangePasswordForm> = ({ onSubmit }) => {
  return <ChangePasswordForm onSubmit={onSubmit} />;
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
