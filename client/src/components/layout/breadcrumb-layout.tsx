import type { PropsWithChildren } from 'react';

import RightBracketSVG from '~public/svgs/chevron-right-thick.svg';

import { Breadcrumb } from '../common/breadcrumb';

const BreadcrumbLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Breadcrumb seperator={<RightBracketSVG />} />
      {children}
    </>
  );
};

export default BreadcrumbLayout;
