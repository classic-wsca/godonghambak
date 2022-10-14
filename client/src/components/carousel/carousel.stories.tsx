import { ComponentMeta, ComponentStory } from '@storybook/react';

import Carousel, { CarouselItem } from './carousel';

export default {
  title: 'components/carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = () => {
  return (
    <Carousel width={window.innerWidth} margin={40}>
      <CarouselItem>Item 1</CarouselItem>
      <CarouselItem>Item 2</CarouselItem>
      <CarouselItem>Item 3</CarouselItem>
    </Carousel>
  );
};

export const Default = Template.bind({});
