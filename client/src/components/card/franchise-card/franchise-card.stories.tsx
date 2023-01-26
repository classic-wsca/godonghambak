import { ComponentMeta, ComponentStory } from '@storybook/react';

import FranchiseCard from './franchise-card';

export default {
  title: 'components/card/franchise-card',
  component: FranchiseCard,
} as ComponentMeta<typeof FranchiseCard>;

const Template: ComponentStory<typeof FranchiseCard> = ({ ...args }) => {
  return <FranchiseCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  id: '01',
  title: '가맹점 창업 문의',
  content: '본사 홈페이지, 전화\n (1533-0788) 신청 및 접수',
  image: '/svgs/phone.svg',
};
