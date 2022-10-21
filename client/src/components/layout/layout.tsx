import type { PropsWithChildren } from 'react';

import { Navbar } from './navbar';
import { Footer } from './footer';
import { Breadcrumb } from './breadcrumb';
import RightBracketSVG from '~public/svgs/chevron-right-thick.svg';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <Breadcrumb seperator={<RightBracketSVG />} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
