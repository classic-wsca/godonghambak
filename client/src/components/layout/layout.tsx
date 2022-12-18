import type { PropsWithChildren } from 'react';

import { Footer } from '../footer';
import { Navbar } from '../navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
