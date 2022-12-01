import type { ComponentMeta, ComponentStory } from '@storybook/react';

import MenuCarousel from './menu-carousel';

export default {
  title: 'components/carousel/menu-carousel',
  component: MenuCarousel,
} as ComponentMeta<typeof MenuCarousel>;

const Template: ComponentStory<typeof MenuCarousel> = () => {
  return <MenuCarousel />;
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
