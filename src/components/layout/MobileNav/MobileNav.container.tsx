import React from 'react';

import { MobileNavPublicProps } from 'components/layout/MobileNav/MobileNav.props';
import MobileNavView from 'components/layout/MobileNav/MobileNav.view';
import { BUYER_ROUTES, MAIN_ROUTES, SELLER_ROUTES } from 'consts';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

const MobileNav = (props: MobileNavPublicProps): JSX.Element => {
  const history = useHistory();
  const { pathname } = useLocation();

  const includes = (route: string) => pathname.includes(route);

  const showBack = () => {
    if (props.onBackOverride) return true;
    if (
      includes(SELLER_ROUTES.FORGOT_PASSWORD) ||
      includes(BUYER_ROUTES.FORGOT_PASSWORD) ||
      includes(SELLER_ROUTES.VERIFY2FA) ||
      includes(BUYER_ROUTES.VERIFY2FA)
    )
      return true;

    return false;
  };

  const getTitle = () => {
    if (props.titleOverride) return props.titleOverride;
    if (includes(MAIN_ROUTES.FORGOT_PASSWORD)) return 'Forgot Password?';
    if (includes(SELLER_ROUTES.VERIFY2FA) || includes(BUYER_ROUTES.VERIFY2FA))
      return '2-Step Verification';
    if (includes(SELLER_ROUTES.REGISTER) || includes(BUYER_ROUTES.REGISTER))
      return 'Register';

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
  return <MobileNavView {...generatedProps} />;
};

export default MobileNav;
