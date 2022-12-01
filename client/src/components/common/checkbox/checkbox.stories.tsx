import { ComponentMeta, ComponentStory } from '@storybook/react';

import { useToggle } from '~hooks/index';

import Checkbox from './checkbox';

export default {
  titlt: 'components/common/checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = ({ children, ...args }) => {
  const [isChecked, handleChange] = useToggle(false);

  return (
    <Checkbox {...args} checked={isChecked} onChange={handleChange}>
      {children}
    </Checkbox>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: '본인은 14세 이상이며, 이용약관에 동의합니다.',
};
