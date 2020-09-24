import React, { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

import { LandingGeneratedProps } from './Landing.props';
import LandingView from './Landing.view';

const Landing = (): JSX.Element => {
  const dispatch = useDispatch();

  const getUser = useSelector((state: Store) => state.getUser.data);
  const defaultCompany = useMemo(() => {
    if (!getUser) return null;
    return getUser.data.user.companies.length
      ? getUser.data.user.companies[0]
      : null;
  }, [getUser]);

  const generatedProps: LandingGeneratedProps = {
    // generated props here
    credit: defaultCompany ? defaultCompany.credit : '',
    company: defaultCompany ? defaultCompany : {},
  };
  return <LandingView {...generatedProps} />;
};

export default Landing;
