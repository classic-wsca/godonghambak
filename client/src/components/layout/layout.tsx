import type { PropsWithChildren } from 'react';

import { useRouter } from 'next/router';

import RightBracketSVG from '~public/svgs/chevron-right-thick.svg';

import { Breadcrumb } from '../common/breadcrumb';
import { Footer } from '../footer';
import { Navbar } from '../navbar';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      {router.pathname !== '/' && (
        <Breadcrumb seperator={<RightBracketSVG />} />
      )}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
