import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FEATURE_CARDS } from '~constants/card';

import FeatureCard from './feature-card';

export default {
  title: 'components/card/feature-card',
  component: FeatureCard,
} as ComponentMeta<typeof FeatureCard>;

const Template: ComponentStory<typeof FeatureCard> = ({ ...args }) => {
  return <FeatureCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...FEATURE_CARDS[0],
};

export const Reverse = Template.bind({});
Reverse.args = {
  ...FEATURE_CARDS[1],
  direction: 'right',
};
