import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type * as CSS from 'csstype';
import type { GlobalColors } from '~types/common';
import type {
  FontSizes,
  FontWeight,
  MarginValue,
  PaddingValue,
} from '~types/style';

import React from 'react';

import { fontSizes } from '~styles/theme';

import Text, { TextElement } from './text';

export default {
  title: 'components/common/text',
  component: Text,
} as ComponentMeta<typeof Text>;

export const Default: ComponentStory<typeof Text> = ({ as = 'p', ...args }) => {
  return (
    <Text as={as} {...args}>
      Text element {as}
    </Text>
  );
};

export const CustomElements: ComponentStory<typeof Text> = ({ ...args }) => {
  const textElements: TextElement[] = [
    'p',
    'b',
    'i',
    'u',
    's',
    'em',
    'small',
    'strong',
    'del',
    'ins',
    'cite',
    'mark',
    'sub',
    'sup',
    'span',
  ];

  return (
    <>
      {textElements.map((element) => (
        <React.Fragment key={element}>
          <Text as={element} {...args}>
            Text element <b>{element}</b>
          </Text>
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

export const CustomAligns: ComponentStory<typeof Text> = ({ ...args }) => {
  const aligns: CSS.Property.TextAlign[] = [
    'start',
    'end',
    'left',
    'right',
    'center',
    'justify',
    'inherit',
    'initial',
    'unset',
  ];

  return (
    <>
      {aligns.map((align) => (
        <Text key={align} align={align} {...args}>
          Text align <b>{align}</b>
        </Text>
      ))}
    </>
  );
};

export const CustomCasings: ComponentStory<typeof Text> = ({ ...args }) => {
  const casings: CSS.Property.TextTransform[] = [
    'capitalize',
    'uppercase',
    'lowercase',
    'none',
  ];

  return (
    <>
      {casings.map((casing) => (
        <Text key={casing} casing={casing} {...args}>
          Text casing <b>{casing}</b>
        </Text>
      ))}
    </>
  );
};

export const CustomDecorations: ComponentStory<typeof Text> = ({ ...args }) => {
  const decorations: CSS.Property.TextDecorationLine[] = [
    'underline solid',
    'overline double',
    'underline overline dotted',
    'underline dashed red',
    'underline wavy green',
    'line-through solid',
  ];

  return (
    <>
      {decorations.map((decoration) => (
        <Text key={decoration} decoration={decoration} {...args}>
          Text decoration <b>{decoration}</b>
        </Text>
      ))}
    </>
  );
};

export const CustomSizes: ComponentStory<typeof Text> = ({ ...args }) => {
  const sizes = Object.keys(fontSizes) as FontSizes[];

  return (
    <>
      {sizes.map((size) => (
        <Text key={size} size={size} {...args}>
          Text size <b>{size}</b>
        </Text>
      ))}
    </>
  );
};

export const CustomFontWeights: ComponentStory<typeof Text> = ({ ...args }) => {
  const fontWeights: FontWeight[] = [
    'lighter',
    'normal',
    'bold',
    'bolder',
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
  ];

  return (
    <>
      {fontWeights.map((fontWeight) => (
        <Text key={fontWeight} fontWeight={fontWeight} {...args}>
          Text font weight <b>{fontWeight}</b>
        </Text>
      ))}
    </>
  );
};

export const CustomColors: ComponentStory<typeof Text> = ({ ...args }) => {
  const colors: GlobalColors[] = [
    'red',
    'yellow',
    'orange',
    'green',
    'blue',
    'pink',
    'gray',
    'dark',
  ];

  return (
    <>
      {colors.map((color) => (
        <Text key={color} color={color} {...args}>
          Text color {color}
        </Text>
      ))}
    </>
  );
};

export const CustomNumberOfLines: ComponentStory<typeof Text> = ({
  ...args
}) => {
  const numberOfLines: number[] = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {numberOfLines.map((numberOfLine) => (
        <div key={numberOfLine.toString()}>
          <Text fontWeight="bold">Text number of lines {numberOfLine}</Text>
          <Text numberOfLines={numberOfLine} {...args}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor non
            blanditiis fugiat harum provident aliquam laboriosam reprehenderit
            autem repellat? Autem error voluptatum quaerat labore veritatis,
            provident fuga quasi quibusdam impedit! Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Doloribus id cupiditate aliquid
            quibusdam quaerat accusamus maiores incidunt facilis eaque molestias
            debitis quis, doloremque eligendi dicta soluta, aut ratione
            exercitationem? Labore? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aut commodi esse recusandae adipisci minima ipsam
            deserunt odio? Quo, ratione! Illo impedit quisquam, voluptates
            laboriosam vel laborum molestias sequi eaque nam!
          </Text>
        </div>
      ))}
    </>
  );
};

export const CustomMargins: ComponentStory<typeof Text> = ({ ...args }) => {
  const marginValues: MarginValue[] = [
    50,
    150,
    200,
    250,
    300,
    350,
    400,
    '10%',
    'auto',
    'inherit',
    'initial',
    'unset',
  ];

  return (
    <>
      <Text m={marginValues[0]} {...args}>
        Text with margin <b>{marginValues[0]}px</b>
      </Text>
      <Text mt={marginValues[1]} {...args}>
        Text with margin top <b>{marginValues[1]}px</b>
      </Text>
      <Text mb={marginValues[2]} {...args}>
        Text with margin bottom <b>{marginValues[2]}px</b>
      </Text>
      <Text ml={marginValues[3]} {...args}>
        Text with margin left <b>{marginValues[3]}px</b>
      </Text>
      <Text mr={marginValues[4]} {...args}>
        Text with margin right <b>{marginValues[4]}px</b>
      </Text>
      <Text mx={marginValues[5]} {...args}>
        Text with margin horizontal <b>{marginValues[5]}px</b>
      </Text>
      <Text my={marginValues[6]} {...args}>
        Text with margin vertical <b>{marginValues[6]}px</b>
      </Text>
      <Text m={marginValues[7]} {...args}>
        Text with margin horizontal <b>{marginValues[7]}</b>
      </Text>
      <Text m={marginValues[8]} {...args}>
        Text with margin <b>{marginValues[8]}</b>
      </Text>
      <Text m={marginValues[9]} {...args}>
        Text with margin <b>{marginValues[9]}</b>
      </Text>
      <Text m={marginValues[10]} {...args}>
        Text with margin <b>{marginValues[10]}</b>
      </Text>
      <Text m={marginValues[11]} {...args}>
        Text with margin <b>{marginValues[11]}</b>
      </Text>
    </>
  );
};

export const CustomPaddings: ComponentStory<typeof Text> = ({ ...args }) => {
  const paddingValues: PaddingValue[] = [
    50,
    150,
    200,
    250,
    300,
    350,
    400,
    '10%',
    'inherit',
    'initial',
    'unset',
  ];

  return (
    <>
      <Text m={0} p={paddingValues[0]} {...args}>
        Text with padding <b>{paddingValues[0]}px</b>
      </Text>
      <Text m={0} pt={paddingValues[1]} {...args}>
        Text with padding top <b>{paddingValues[1]}px</b>
      </Text>
      <Text m={0} pb={paddingValues[2]} {...args}>
        Text with padding bottom <b>{paddingValues[2]}px</b>
      </Text>
      <Text m={0} pl={paddingValues[3]} {...args}>
        Text with padding left <b>{paddingValues[3]}px</b>
      </Text>
      <Text m={0} pr={paddingValues[4]} {...args}>
        Text with padding right <b>{paddingValues[4]}px</b>
      </Text>
      <Text m={0} px={paddingValues[5]} {...args}>
        Text with padding horizontal <b>{paddingValues[5]}px</b>
      </Text>
      <Text m={0} py={paddingValues[6]} {...args}>
        Text with padding vertical <b>{paddingValues[6]}px</b>
      </Text>
      <Text m={0} p={paddingValues[7]} {...args}>
        Text with padding horizontal <b>{paddingValues[7]}</b>
      </Text>
      <Text m={0} p={paddingValues[8]} {...args}>
        Text with padding <b>{paddingValues[8]}</b>
      </Text>
      <Text m={0} p={paddingValues[9]} {...args}>
        Text with padding <b>{paddingValues[9]}</b>
      </Text>
      <Text m={0} p={paddingValues[10]} {...args}>
        Text with padding <b>{paddingValues[10]}</b>
      </Text>
    </>
  );
};

export const CustomLineHeight: ComponentStory<typeof Text> = ({ ...args }) => {
  const lineHeights: CSS.Property.LineHeight[] = [
    'normal',
    2.5,
    '3em',
    '150%',
    '32px',
  ];

  return (
    <>
      {lineHeights.map((lineHeight) => (
        <Text key={lineHeight} lineHeight={lineHeight} {...args}>
          Text lineHeight <b>{lineHeight}</b>
        </Text>
      ))}
    </>
  );
};
