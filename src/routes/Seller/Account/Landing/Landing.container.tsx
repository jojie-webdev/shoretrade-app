import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';

import { AccountLandingGeneratedProps } from './Landing.props';
import AccountLandingView from './Landing.view';
const AccountLanding = (): JSX.Element => {
  // Mark:- State
  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  const pending = useSelector((state: Store) => state.getUser.pending);
  const companies: UserCompany[] = useSelector(
    (state: Store) => state.getUser.data?.data.user.companies || []
  );

  // Mark:- Effects
  useEffect(() => {
    if (!pending) {
      const c = companies || [];

      setCurrentCompany(c[0]);
    }
  }, [pending]);

  // Mark:- Render
  const generatedProps: AccountLandingGeneratedProps = {
    // generated props here
    currentCompany,
    companies,
  };
  return <AccountLandingView {...generatedProps} />;
};

export default AccountLanding;
