import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MainCarousel from './main-carousel';

export default {
  title: 'components/carousel/main-carousel',
  component: MainCarousel,
} as ComponentMeta<typeof MainCarousel>;

const Template: ComponentStory<typeof MainCarousel> = () => {
  return <MainCarousel />;
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
