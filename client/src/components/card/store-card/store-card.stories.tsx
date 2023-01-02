import { ComponentMeta, ComponentStory } from '@storybook/react';

import StoreCard from './store-card';

export default {
  title: 'components/card/store-card',
  component: StoreCard,
} as ComponentMeta<typeof StoreCard>;

const Template: ComponentStory<typeof StoreCard> = ({ ...args }) => {
  return <StoreCard {...args} />;
};

export const Desktop = Template.bind({});
Desktop.args = {
  region: '서울',
  name: '신도림점',
  address: '서울시 영등포구 경인로 72길 6 1층',
  image: '/images/store.png',
};

export const Mobile = Template.bind({});
Mobile.args = {
  region: '서울',
  name: '신도림점',
  address: '서울시 영등포구 경인로 72길 6 1층',
  image: '/images/store.png',
};
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
