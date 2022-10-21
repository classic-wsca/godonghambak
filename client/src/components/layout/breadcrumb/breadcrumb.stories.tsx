import { ComponentMeta, ComponentStory } from '@storybook/react';

import Breadcrumb from './breadcrumb';
import RightBracketSVG from '~public/svgs/chevron-right-thick.svg';

export default {
  title: 'components/layout/breadcrumb',
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
    path: '/menu/[category]',
    asPath: '/menu',
    query: {
      category: 'hambak',
    },
  },
};

export const Store = Template.bind({});
Store.args = {
  seperator: <RightBracketSVG />,
};
Store.parameters = {
  nextRouter: {
    path: '/store',
    asPath: '/store',
  },
};
