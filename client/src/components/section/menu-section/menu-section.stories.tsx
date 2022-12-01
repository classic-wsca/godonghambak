import { ComponentMeta, ComponentStory } from '@storybook/react';

import MenuSection from './menu-section';

export default {
  title: 'components/section/menu-section',
  component: MenuSection,
} as ComponentMeta<typeof MenuSection>;

const Template: ComponentStory<typeof MenuSection> = () => {
  return <MenuSection />;
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
