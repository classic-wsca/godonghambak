import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';

import { NAVIGATION_ROUTES } from '~constants/navigation';

import BreadcrumbItem from './breadcrumb-item';
import Breadcrumbs from './breadcrumbs';

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

  const getLabel = useCallback((currentHref: string) => {
    const subRouteArray = NAVIGATION_ROUTES.map(({ subRoutes }) => subRoutes);
    const currentRouteIndex = subRouteArray.findIndex((routes) =>
      routes.find(({ href }) => href === currentHref),
    );

    return currentRouteIndex !== -1
      ? NAVIGATION_ROUTES[currentRouteIndex].text
      : '';
  }, []);

  const getSubLabel = useCallback((currentHref: string) => {
    const routes = NAVIGATION_ROUTES.map(({ subRoutes }) => subRoutes);
    const subRoutes = routes.reduce((acc, cur) => {
      return [...acc, ...cur];
    });

    let label = subRoutes.find(
      ({ href }) => href === decodeURIComponent(currentHref),
    )?.text;

    if (!label) {
      const currentRoutes = subRoutes.filter(
        ({ href }) => href === `/${currentHref.split('/')[1]}`,
      );

      label = currentRoutes.length
        ? currentRoutes[0].subRoutes?.find(
            ({ href }) => href === decodeURIComponent(currentHref),
          )?.text
        : (label = NAVIGATION_ROUTES.find(
            ({ href }) => href === decodeURIComponent(currentHref),
          )?.text);
    }

    return label || '고동함박';
  }, []);

  const createBreadcrumbs = (
    href: string,
    label: string,
    isCurrent: boolean,
  ) => {
    return {
      href,
      label,
      isCurrent,
    };
  };

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split('?')[0];
    const pathArray = pathWithoutQuery
      .split('/')
      .filter((path) => path !== '')
      .map((path) => decodeURIComponent(path));

    const getMainBreadcrumbs = () => {
      const href = `/${pathArray[0]}`;

      return createBreadcrumbs(href, getLabel(href), false);
    };

    const getSubBreadcrumbs = pathArray.map((_, index) => {
      const href = `/${pathArray.slice(0, index + 1).join('/')}`;
      const isCurrent = index === pathArray.length - 1;

      return createBreadcrumbs(href, getSubLabel(href), isCurrent);
    });

    const currentBreadcrumbs = getMainBreadcrumbs().label
      ? [getMainBreadcrumbs(), ...getSubBreadcrumbs]
      : getSubBreadcrumbs;

    setBreadcrumbs(currentBreadcrumbs);
  }, [router.asPath, getLabel, getSubLabel]);

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
