import type { PropsWithChildren } from 'react';

import RightBracketSVG from '~public/svgs/chevron-right-thick.svg';

import { Breadcrumb } from './breadcrumb';
import { Footer } from './footer';
import { Navbar } from './navbar';

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
