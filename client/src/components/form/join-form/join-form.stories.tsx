import { ComponentMeta, ComponentStory } from '@storybook/react';

import { JoinForm } from '..';

export default {
  title: 'components/forms/join-form',
  component: JoinForm,
} as ComponentMeta<typeof JoinForm>;

const Template: ComponentStory<typeof JoinForm> = ({ onSubmit }) => {
  return <JoinForm onSubmit={onSubmit} />;
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
