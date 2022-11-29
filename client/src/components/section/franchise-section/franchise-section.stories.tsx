import { ComponentMeta, ComponentStory } from '@storybook/react';

import FranchiseSection from './franchise-section';

export default {
  title: 'components/section/franchise-section',
  component: FranchiseSection,
} as ComponentMeta<typeof FranchiseSection>;

const Template: ComponentStory<typeof FranchiseSection> = () => {
  return <FranchiseSection />;
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
