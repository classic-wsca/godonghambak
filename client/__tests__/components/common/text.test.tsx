import type { TextElement } from '~components/common/text/text';

import { Text } from '~components/common';
import { getRandomNumber } from '~utils/math-utils';

import { render, screen } from '../../test-utils';

const setup = (as: TextElement = 'p') => {
  const utils = render(<Text as={as}>test</Text>);
  const text = screen.getByText(/test/i);

  return { text, ...utils };
};

describe('Text component', () => {
  it('should be rendered correctly', () => {
    const { text } = setup();

    expect(text).toBeInTheDocument();
  });

  it('should be rendered p tag as default', () => {
    const { text } = setup();

    expect(text.tagName.toLowerCase()).toBe('p');
  });

  it('should be render various text tags', () => {
    const tags: TextElement[] = [
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
    const index = getRandomNumber(0, tags.length);
    const currentTag = tags[index];
    const { text } = setup(currentTag);

    expect(text.tagName.toLowerCase()).toBe(currentTag);
  });
});
