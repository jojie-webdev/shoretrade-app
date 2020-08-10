import React from 'react';

import { useHistory } from 'react-router-dom';

import { AccountLandingGeneratedProps } from './Landing.props';
import AccountLandingView from './Landing.view';
const AccountLanding = (): JSX.Element => {
  const history = useHistory();

  function goto(route: string) {
    history.push(route);
  }

  const generatedProps: AccountLandingGeneratedProps = {
    // generated props here
    goto,
  };
  return <AccountLandingView {...generatedProps} />;
};

export default AccountLanding;
