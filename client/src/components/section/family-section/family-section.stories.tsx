import { ComponentMeta, ComponentStory } from '@storybook/react';

import FamilySection from './family-section';

export default {
  title: 'components/section/family-section',
  component: FamilySection,
} as ComponentMeta<typeof FamilySection>;

const Template: ComponentStory<typeof FamilySection> = () => {
  return <FamilySection />;
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
