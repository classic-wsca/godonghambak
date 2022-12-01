import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CHARACTER_CAROUSEL_ITEMS } from '~constants/carousel';

import CharacterCarousel from './character-carousel';

export default {
  title: 'components/carousel/character-carousel',
  component: CharacterCarousel,
} as ComponentMeta<typeof CharacterCarousel>;

const Template: ComponentStory<typeof CharacterCarousel> = () => {
  return (
    <CharacterCarousel
      images={CHARACTER_CAROUSEL_ITEMS}
      imageSize={{ width: 140, height: 138 }}
      margin={50}
      color="dark"
    />
  );
};

export const Default = Template.bind({});
