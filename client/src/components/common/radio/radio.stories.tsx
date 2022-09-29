import { ComponentStory, ComponentMeta } from '@storybook/react';

import Radio from './radio';
import RadioGroup from './radio-group';

export default {
  title: 'components/common/radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = ({ ...args }) => {
  return <Radio {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'radio',
  label: '가능',
};

const GroupTemplate: ComponentStory<typeof RadioGroup> = ({ ...args }) => {
  return <RadioGroup {...args} />;
};

export const Group = GroupTemplate.bind({});
Group.args = {
  options: [
    {
      name: '주차',
      label: '가능',
    },
    {
      name: '주차',
      label: '불가능',
    },
  ],
  children: '주차',
};
