import React, { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

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

  const generatedProps = {
    // generated props here
    credit: defaultCompany ? defaultCompany.credit : '',
  };
  return <LandingView {...generatedProps} />;
};

export default Landing;
