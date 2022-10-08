import { ComponentMeta, ComponentStory } from '@storybook/react';

import Footer from './footer';

export default {
  title: 'components/layout/footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => {
  return <Footer />;
};

export const Default = Template.bind({});
