import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FindEmailForm } from '..';

export default {
  title: 'components/forms/find-email-form',
  component: FindEmailForm,
} as ComponentMeta<typeof FindEmailForm>;

const Template: ComponentStory<typeof FindEmailForm> = ({ onSubmit }) => {
  return <FindEmailForm onSubmit={onSubmit} />;
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
