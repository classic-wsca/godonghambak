import React, { Children, PropsWithChildren } from 'react';

import styled from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

interface BreadcrumbProps extends PropsWithChildren {
  seperator: React.ReactNode;
}

const Breadcrumbs = ({ seperator, children }: BreadcrumbProps) => {
  const childrenArray = Children.toArray(children);

  const childrenWithSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        // 사이트의 이동 경로는 순서가 정해져 있다.
        // 리스트의 순서가 동일하게 유지되는 경우 인덱스를 키 값으로 사용해도 지장이 없다
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {child}
          <Seperator>{seperator}</Seperator>
        </React.Fragment>
      );
    }

    return child;
  });

  return (
    <BreadcrumbWrapper aria-label="breadcrumbs">
      <BreadcrumbList>{childrenWithSeperator}</BreadcrumbList>
    </BreadcrumbWrapper>
  );
};

const BreadcrumbWrapper = styled.nav`
  margin: ${pixelToRem(128)} 0;

  @media ${({ theme }) => theme.breakPoints.large} {
    margin: ${pixelToRem(32)} 0;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    margin: ${pixelToRem(8)} 0;
  }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${pixelToRem(16)};

  @media ${({ theme }) => theme.breakPoints.large} {
    justify-content: end;
    padding-right: ${pixelToRem(32)};
  }
`;

const Seperator = styled.span`
  display: flex;
  align-items: center;
`;

export default Breadcrumbs;
