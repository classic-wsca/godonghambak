import type { NextPage } from 'next';

import {
  MainSection,
  FamilySection,
  MenuSection,
  CompetitivitySection,
  FranchiseSection,
} from '~components/section';

// TODO 로그인 상태 확인하는 기능 필요

const Home: NextPage = () => {
  return (
    <>
      <MainSection />
      <FamilySection />
      <MenuSection />
      <CompetitivitySection />
      <FranchiseSection />
    </>
  );
};

export default Home;
