import type { ComponentStory, ComponentMeta } from '@storybook/react';

import React, { useState } from 'react';

import Search from './search';

export default {
  title: 'components/search',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = ({ ...args }) => {
  const [value, setValue] = useState('');

  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <Search {...args} value={value} onChange={handleChnage} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'search',
  placeholder: '검색어를 입력하세요.',
  onSubmit: (e) => e.preventDefault(),
};
