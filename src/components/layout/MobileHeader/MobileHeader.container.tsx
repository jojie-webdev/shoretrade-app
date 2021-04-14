import React from 'react';

import {
  BUYER_ACCOUNT_ROUTES,
  BUYER_ROUTES,
  MAIN_ROUTES,
  SELLER_ROUTES,
} from 'consts';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { MobileHeaderPublicProps } from './MobileHeader.props';
import MobileHeaderView from './MobileHeader.view';

const MobileHeader = (props: MobileHeaderPublicProps): JSX.Element => {
  const history = useHistory();
  const { pathname } = useLocation();

  const includes = (route: string) => pathname.includes(route);

  const showBack = () => {
    if (
      includes(SELLER_ROUTES.FORGOT_PASSWORD) ||
      includes(BUYER_ROUTES.FORGOT_PASSWORD)
    )
      return true;

    return false;
  };

  const getTitle = () => {
    if (includes(MAIN_ROUTES.FORGOT_PASSWORD)) return 'Forgot Password?';

    return '';
  };

  const onBack = () => {
    if (props.onBackOverride) props.onBackOverride();
    else history.goBack();
  };

  const generatedProps = {
    showBack,
    onBack,
    getTitle,
    ...props,
  };
  return <MobileHeaderView {...generatedProps} />;
};

export default MobileHeader;
