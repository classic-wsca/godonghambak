import { ComponentMeta, ComponentStory } from '@storybook/react';

import Navbar from './navbar';

export default {
  title: 'components/layout/navbar',
  components: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => {
  return <Navbar />;
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
