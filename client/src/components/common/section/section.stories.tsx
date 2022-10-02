import { ComponentMeta, ComponentStory } from '@storybook/react';

import Section from './section';

export default {
  title: 'components/common/section',
  component: Section,
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = ({ children, ...args }) => {
  return <Section {...args}>{children}</Section>;
};

export const Default = Template.bind({});
Default.args = {
  children: <div style={{ height: '960px' }}>Hello</div>,
};

export const DefaultRed = Template.bind({});
DefaultRed.args = {
  backgroundColor: 'red',
  children: <div style={{ height: '960px' }}>Hello</div>,
};

export const DefaultGreen = Template.bind({});
DefaultGreen.args = {
  backgroundColor: 'green',
  children: <div style={{ height: '960px' }}>Hello</div>,
};

export const Mobile = Template.bind({});
Mobile.args = {
  children: <div style={{ height: '568px' }}>Hello</div>,
};
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
