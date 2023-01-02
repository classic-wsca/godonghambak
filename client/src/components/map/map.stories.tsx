import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Map from './map';

export default {
  title: 'components/map',
  component: Map,
} as ComponentMeta<typeof Map>;

const Template: ComponentStory<typeof Map> = ({ ...args }) => {
  return <Map {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  latitude: 37.5,
  longitude: 127,
};
