import { ComponentMeta, ComponentStory } from '@storybook/react';

import MainSection from './main-section';

export default {
  title: 'components/section/main-section',
  component: MainSection,
} as ComponentMeta<typeof MainSection>;

const Template: ComponentStory<typeof MainSection> = () => {
  return <MainSection />;
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
