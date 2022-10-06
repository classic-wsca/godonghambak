import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Breadcrumbs from './breadcrumbs';
import BreadcrumbItem from './breadcrumb-item';

interface BreadcrumbState {
  href: string;
  label: string;
  isCurrent: boolean;
}

interface BreadcrumbProps {
  seperator: React.ReactNode;
}

const Breadcrumb = ({ seperator }: BreadcrumbProps) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbState[]>();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split('?')[0];
    let pathArray = pathWithoutQuery.split('/');
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== '');

    const currentBreadcrumbs = pathArray.map((path, index) => {
      const href = `/${pathArray.slice(0, index + 1).join('/')}`;
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1,
      };
    });

    setBreadcrumbs(currentBreadcrumbs);
  }, [router.asPath]);

  return (
    <Breadcrumbs seperator={seperator}>
      <BreadcrumbItem href="/">홈</BreadcrumbItem>
      {breadcrumbs &&
        breadcrumbs.map(({ href, label, isCurrent }) => (
          <BreadcrumbItem key={href} href={href} isCurrent={isCurrent}>
            {label}
          </BreadcrumbItem>
        ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
