import userEvent from '@testing-library/user-event';

import { Map } from '~components/map';

import { render } from '../test-utils';

interface SetupProps {
  latitude: number;
  longitude: number;
}

const setup = ({ latitude, longitude }: SetupProps) => {
  const user = userEvent.setup();
  const utils = render(<Map latitude={latitude} longitude={longitude} />);

  return { user, ...utils };
};

describe('맵 컴포넌트 테스트', () => {
  it('맵 렌더링 테스트', () => {
    const { container } = setup({ latitude: 0, longitude: 0 });

    expect(container).toBeInTheDocument();
  });
});
