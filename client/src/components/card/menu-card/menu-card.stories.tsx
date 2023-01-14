import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MENU_ITEMS } from '~constants/menu';

import MenuCard from './menu-card';

export default {
  title: 'components/card/menu-card',
  component: MenuCard,
  decorators: [
    (Story) => (
      <div style={{ width: '320px', height: '440px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof MenuCard>;

const Template: ComponentStory<typeof MenuCard> = ({ ...args }) => {
  return <MenuCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  image: MENU_ITEMS[0].image,
  name: MENU_ITEMS[0].name,
  description: MENU_ITEMS[0].description,
  price: MENU_ITEMS[0].price,
};
