import type { GlobalColors } from '~types/common';

import Image from 'next/image';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './button';

import CloseSVG from '~public/svgs/close.svg';
import ChevronLeftSVG from '~public/svgs/chevron-left.svg';

export default {
  title: 'common/button',
  component: Button,
  decorators: [
    (Story) => (
      <div
        style={{
          margin: '3rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Button>;

const BUTTON_COLORS: GlobalColors[] = [
  'red',
  'orange',
  'yellow',
  'green',
  'light',
  'gray',
];

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => (
  <>
    {BUTTON_COLORS.map((color) => (
      <Button key={null} color={color} {...args}>
        {children}
      </Button>
    ))}
  </>
);

export const FillButtonXS = Template.bind({});
FillButtonXS.args = {
  children: 'Button',
  size: 'x-small',
};

export const FillButtonSM = Template.bind({});
FillButtonSM.args = {
  children: 'Button',
  size: 'small',
};

export const FillButtonMD = Template.bind({});
FillButtonMD.args = {
  children: 'Button',
  size: 'medium',
};

export const FillButtonLG = Template.bind({});
FillButtonLG.args = {
  children: 'Button',
  size: 'large',
};

export const FillButtonXL = Template.bind({});
FillButtonXL.args = {
  children: 'Button',
  size: 'x-large',
};

export const OutlineButton = Template.bind({});
OutlineButton.args = {
  children: 'Button',
  variant: 'outline',
};

export const GhostButton = Template.bind({});
GhostButton.args = {
  children: 'Button',
  variant: 'ghost',
};

export const FullWidthButton = Template.bind({});
FullWidthButton.args = {
  children: 'Button',
  fullWidth: true,
};

export const IconButtonSM = Template.bind({});
IconButtonSM.args = {
  children: <CloseSVG />,
  size: 'small',
  variant: 'icon',
};

export const IconButtonMD = Template.bind({});
IconButtonMD.args = {
  children: <ChevronLeftSVG />,
  size: 'medium',
  variant: 'icon',
};

export const IconButtonLG = Template.bind({});
IconButtonLG.args = {
  children: <Image src="/images/menu-all.png" width={40} height={40} />,
  size: 'large',
  variant: 'icon',
};
