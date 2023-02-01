import type { ComponentStory, ComponentMeta } from '@storybook/react';

import React, { useState } from 'react';

import Pagination from './pagination';

export default {
  title: 'components/pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = ({ ...args }) => {
  const [page, setPage] = useState(1);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText } = e.currentTarget as HTMLButtonElement;

    setPage(Number(innerText));
  };

  return <Pagination {...args} page={page} onClick={handleClick} />;
};

export const Default = Template.bind({});
Default.args = {
  total: 28,
  limit: 10,
};

export const WhenLimitIs5 = Template.bind({});
WhenLimitIs5.args = {
  total: 28,
  limit: 5,
};
