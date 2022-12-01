import { Heading } from '~components/common';
import { HeadingLevel } from '~components/common/heading/heading';
import { getRandomNumber } from '~utils/math-utils';

import { render, screen } from '../../test-utils';

const setup = (as: HeadingLevel = 'h1') => {
  const utils = render(<Heading as={as}>Heading Test</Heading>);
  const heading = screen.getByRole('heading', { level: Number(as.slice(-1)) });

  return { heading, ...utils };
};

describe('Heading component', () => {
  it('should be rendered correctly', () => {
    const { heading } = setup();

    expect(heading).toBeInTheDocument();
  });

  it('should has default level', () => {
    const { getByRole } = setup();

    const heading = getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it('should be render heading of another levels', () => {
    const levels: HeadingLevel[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const index = getRandomNumber(0, levels.length);
    const currentLevel = Number(levels[index].slice(-1));

    const { getByRole } = setup(levels[index]);

    const heading = getByRole('heading', { level: currentLevel });

    expect(heading).toBeInTheDocument();
  });
});
