import React from 'react';

import { useHistory } from 'react-router-dom';

import { AccountLandingGeneratedProps } from './Landing.props';
import AccountLandingView from './Landing.view';
const AccountLanding = (): JSX.Element => {
  const generatedProps: AccountLandingGeneratedProps = {
    // generated props here
  };
  return <AccountLandingView {...generatedProps} />;
};

export default AccountLanding;
