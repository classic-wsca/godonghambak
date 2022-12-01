import Home from '~pages/index';

import { render } from '../test-utils';

const setup = () => {
  const utils = render(<Home />);

  return { ...utils };
};

describe('메인 페이지 테스트', () => {
  it('should render main section component', () => {
    // given
    const { getByRole } = setup();
    const mainSection = getByRole('region', { name: /main-section/i });

    // when
    // then
    expect(mainSection).toBeInTheDocument();
  });

  it('should render family section component', () => {
    // given
    const { getByLabelText } = setup();
    const familySection = getByLabelText(/familySection/i);

    // when
    // then
    expect(familySection).toBeInTheDocument();
  });

  it('should render menu section component', () => {
    // given
    const { getByRole } = setup();
    const menuSection = getByRole('region', { name: /고동함박 메뉴 소개/i });

    // when
    // then
    expect(menuSection).toBeInTheDocument();
  });

  it('should render competitivity section component', () => {
    // given
    const { getByRole } = setup();
    const competitivitySection = getByRole('region', { name: /경쟁력/i });

    // when
    // then
    expect(competitivitySection).toBeInTheDocument();
  });

  it('should render franchise section component', () => {
    // given
    const { getByLabelText } = setup();
    const franchiseSection = getByLabelText(/franchiseSection/i);

    // when
    // then
    expect(franchiseSection).toBeInTheDocument();
  });
});
