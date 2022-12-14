import type { PropsWithChildren } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

interface BreadcrumbItemProps extends PropsWithChildren {
  href: string;
  isCurrent?: boolean;
}

const BreadcrumbItem = ({
  href,
  isCurrent,
  children,
  ...rest
}: BreadcrumbItemProps) => {
  return (
    <li {...rest}>
      <Link href={href} passHref>
        <LinkItem
          href="replace"
          isCurrent={isCurrent}
          aria-current={isCurrent ? 'page' : 'false'}
        >
          {children}
        </LinkItem>
      </Link>
    </li>
  );
};

const LinkItem = styled.a<{ isCurrent?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme, isCurrent }) =>
    isCurrent ? theme.colors.green : theme.colors.gray_700};

  @media ${({ theme }) => theme.breakPoints.large} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export default BreadcrumbItem;
