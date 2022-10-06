import { ComponentMeta, ComponentStory } from '@storybook/react';

import Breadcrumb from './breadcrumb';
import RightBracketSVG from '~public/svgs/chevron-right-thick.svg';

export default {
  title: 'components/breadcrumb',
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = ({ ...args }) => {
  return <Breadcrumb {...args} />;
};

export const Home = Template.bind({});
Home.args = {
  seperator: <RightBracketSVG />,
};
Home.parameters = {
  path: '/',
  asPath: '/',
  query: {},
};

export const Menu = Template.bind({});
Menu.args = {
  seperator: <RightBracketSVG />,
};
Menu.parameters = {
  nextRouter: {
    path: '/메뉴/[id]',
    asPath: '/메뉴/함박 메뉴',
    query: {
      id: '함박 메뉴',
    },
  },
};

export const Store = Template.bind({});
Store.args = {
  seperator: <RightBracketSVG />,
};
Store.parameters = {
  nextRouter: {
    path: '/매장 관리',
    asPath: '/매장 관리',
  },
};
