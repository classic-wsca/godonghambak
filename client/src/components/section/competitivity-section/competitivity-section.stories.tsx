import { ComponentMeta, ComponentStory } from '@storybook/react';

import CompetitivitySection from './competitivity-section';

export default {
  title: 'components/section/competitivity-section',
  component: CompetitivitySection,
} as ComponentMeta<typeof CompetitivitySection>;

export const Default: ComponentStory<typeof CompetitivitySection> = () => {
  return <CompetitivitySection />;
};
