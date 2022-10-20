import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Carousel from './carousel';
import CarouselItem from './carousel-item';

export default {
  title: 'components/carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = ({ ...args }) => {
  return (
    <Carousel {...args}>
      <CarouselItem>Item 1</CarouselItem>
      <CarouselItem>Item 2</CarouselItem>
      <CarouselItem>Item 3</CarouselItem>
    </Carousel>
  );
};

export const Default = Template.bind({});

export const WithWith = Template.bind({});
WithWith.args = {
  width: 150,
};

export const NonDraggable = Template.bind({});
NonDraggable.args = {
  draggable: false,
};

export const NonAutoPlay = Template.bind({});
NonAutoPlay.args = {
  autoplay: false,
};

export const NonButton = Template.bind({});
NonButton.args = {
  button: false,
};

export const NonIndicator = Template.bind({});
NonIndicator.args = {
  indicator: false,
};

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
