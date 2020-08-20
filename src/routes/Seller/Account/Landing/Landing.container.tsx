import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Store } from 'types/store/Store';

import { AccountLandingGeneratedProps } from './Landing.props';
import AccountLandingView from './Landing.view';
const AccountLanding = (): JSX.Element => {
  const companies = useSelector(
    (state: Store) => state.getUser.data?.data.user.companies
  );

  const generatedProps: AccountLandingGeneratedProps = {
    // generated props here
  };
  return <AccountLandingView {...generatedProps} />;
};

export default AccountLanding;
