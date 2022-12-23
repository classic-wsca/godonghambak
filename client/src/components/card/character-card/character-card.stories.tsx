import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CHARACTER_CARDS } from '~constants/card';

import CharacterCard from './character-card';

export default {
  title: 'components/card/character-card',
  component: CharacterCard,
} as ComponentMeta<typeof CharacterCard>;

const Template: ComponentStory<typeof CharacterCard> = ({ ...args }) => {
  return <CharacterCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...CHARACTER_CARDS[1],
};
