import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { GlobalColors } from '~types/common';
import type { FontSizes } from '~types/font';
import type { MarginValue, PaddingValue } from '~types/margin-padding';

import Heading, { HeadingLevel } from './heading';
import { fontSizes } from '~styles/theme';

export default {
  title: 'components/common/heading',
  component: Heading,
} as ComponentMeta<typeof Heading>;

export const Default: ComponentStory<typeof Heading> = ({
  as = 'h1',
  ...args
}) => {
  return (
    <Heading as={as} {...args}>
      Heading level {as}
    </Heading>
  );
};

export const HeadingLevels: ComponentStory<typeof Heading> = ({ ...args }) => {
  const headingLevels: HeadingLevel[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  return (
    <>
      {headingLevels.map((level) => (
        <Heading key={level} as={level} {...args}>
          Heading level {level}
        </Heading>
      ))}
    </>
  );
};

export const CustomSizes: ComponentStory<typeof Heading> = ({ ...args }) => {
  const sizes = Object.keys(fontSizes) as FontSizes[];

  return (
    <>
      {sizes.map((size) => (
        <Heading key={size} size={size} {...args}>
          Heading size {size}
        </Heading>
      ))}
    </>
  );
};

export const CustomColor: ComponentStory<typeof Heading> = ({
  as,
  ...args
}) => {
  const colors: GlobalColors[] = [
    'red',
    'yellow',
    'orange',
    'green',
    'blue',
    'pink',
    'gray',
  ];

  return (
    <>
      {colors.map((color) => (
        <Heading key={color} as="h4" color={color} {...args}>
          Heading color {color}
        </Heading>
      ))}
    </>
  );
};

export const CustomFontWeight: ComponentStory<typeof Heading> = ({
  fontWeight,
  ...args
}) => {
  const fontWeights = [
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
      {fontWeights.map((weight) => (
        <Heading key={weight} fontWeight={weight} {...args}>
          Heading font weight {weight}
        </Heading>
      ))}
    </>
  );
};

export const CustomNumberOfLines: ComponentStory<typeof Heading> = ({
  as,
  fontWeight,
  ...args
}) => {
  const numberOfLines: number[] = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {numberOfLines.map((numberOfLine) => (
        <div key={numberOfLine.toString()}>
          <Heading as="h5">Heading number of lines {numberOfLine}</Heading>
          <Heading
            as="h6"
            numberOfLines={numberOfLine}
            fontWeight={400}
            {...args}
          >
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
          </Heading>
        </div>
      ))}
    </>
  );
};

export const CustomMargin: ComponentStory<typeof Heading> = ({
  as = 'h5',
  fontWeight,
  ...args
}) => {
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
      <Heading as={as} m={marginValues[0]} {...args}>
        Heading with margin {marginValues[0]}
      </Heading>
      <Heading as={as} mt={marginValues[1]} {...args}>
        Heading with margin top {marginValues[1]}
      </Heading>
      <Heading as={as} mb={marginValues[2]} {...args}>
        Heading with margin bottom {marginValues[2]}
      </Heading>
      <Heading as={as} ml={marginValues[3]} {...args}>
        Heading with margin left {marginValues[3]}
      </Heading>
      <Heading as={as} mr={marginValues[4]} {...args}>
        Heading with margin right {marginValues[4]}
      </Heading>
      <Heading as={as} mx={marginValues[5]} {...args}>
        Heading with margin horizontal {marginValues[5]}
      </Heading>
      <Heading as={as} my={marginValues[6]} {...args}>
        Heading with margin vertical {marginValues[6]}
      </Heading>
      <Heading as={as} m={marginValues[7]} {...args}>
        Heading with margin horizontal {marginValues[7]}
      </Heading>
      <Heading as={as} m={marginValues[8]} {...args}>
        Heading with margin {marginValues[8]}
      </Heading>
      <Heading as={as} m={marginValues[9]} {...args}>
        Heading with margin {marginValues[9]}
      </Heading>
      <Heading as={as} m={marginValues[10]} {...args}>
        Heading with margin {marginValues[10]}
      </Heading>
      <Heading as={as} m={marginValues[11]} {...args}>
        Heading with margin {marginValues[11]}
      </Heading>
    </>
  );
};

export const CustomPadding: ComponentStory<typeof Heading> = ({
  as = 'h5',
  m,
  fontWeight,
  ...args
}) => {
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
      <Heading as={as} m={0} p={paddingValues[0]} {...args}>
        Heading with padding {paddingValues[0]}
      </Heading>
      <Heading as={as} m={0} pt={paddingValues[1]} {...args}>
        Heading with padding top {paddingValues[1]}
      </Heading>
      <Heading as={as} m={0} pb={paddingValues[2]} {...args}>
        Heading with padding bottom {paddingValues[2]}
      </Heading>
      <Heading as={as} m={0} pl={paddingValues[3]} {...args}>
        Heading with padding left {paddingValues[3]}
      </Heading>
      <Heading as={as} m={0} pr={paddingValues[4]} {...args}>
        Heading with padding right {paddingValues[4]}
      </Heading>
      <Heading as={as} m={0} px={paddingValues[5]} {...args}>
        Heading with padding horizontal {paddingValues[5]}
      </Heading>
      <Heading as={as} m={0} py={paddingValues[6]} {...args}>
        Heading with padding vertical {paddingValues[6]}
      </Heading>
      <Heading as={as} m={0} p={paddingValues[7]} {...args}>
        Heading with padding horizontal {paddingValues[7]}
      </Heading>
      <Heading as={as} m={0} p={paddingValues[8]} {...args}>
        Heading with padding {paddingValues[8]}
      </Heading>
      <Heading as={as} m={0} p={paddingValues[9]} {...args}>
        Heading with padding {paddingValues[9]}
      </Heading>
      <Heading as={as} m={0} p={paddingValues[10]} {...args}>
        Heading with padding {paddingValues[10]}
      </Heading>
      <Heading as={as} m={0} p={paddingValues[11]} {...args}>
        Heading with padding {paddingValues[11]}
      </Heading>
    </>
  );
};
