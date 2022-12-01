import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { FranchiseSection } from '~components/section';

import { render, createMockRouter } from '../../test-utils';

const setup = () => {
  const user = userEvent.setup();
  const router = createMockRouter({});
  const utils = render(
    <RouterContext.Provider value={router}>
      <FranchiseSection />
    </RouterContext.Provider>,
  );

  return { user, router, ...utils };
};

describe('Franchise section 컴포넌트 테스트', () => {
  it('should be rendered correctly', () => {
    // given
    const { getByLabelText } = setup();
    const section = getByLabelText(/franchiseSection/i);

    // when
    // then
    expect(section).toBeInTheDocument();
  });

  it('should render link button', () => {
    // given
    const { getByRole } = setup();
    const button = getByRole('link', { name: /franchise-link/i });

    // when
    // then
    expect(button).toBeInTheDocument();
  });

  it('should move the page to franchise page if click the link button', async () => {
    // given
    const { user, router, getByRole } = setup();
    const button = getByRole('link', { name: /franchise-link/i });

    // when
    await user.click(button);

    // then
    expect(router.push).toHaveBeenCalledWith('/franchise', '/franchise', {});
  });

  it('should render character images', () => {
    // given
    const { getAllByAltText } = setup();
    const images = getAllByAltText(/고동이|고순이|혜자씨/i);

    // when
    // then
    images.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });
});
