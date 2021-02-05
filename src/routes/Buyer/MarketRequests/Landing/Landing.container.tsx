import React from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Store } from 'types/store/Store';

import { MarketRequestsLandingGeneratedProps } from './Landing.props';
import MarketRequestsLandingView from './Landing.view';

const MarketRequestsLanding = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();

  const generatedProps: MarketRequestsLandingGeneratedProps = {
    currentPath: location.pathname,
    marketRequests: [], // TODO STATE
  };

  return <MarketRequestsLandingView {...generatedProps} />;
};

export default MarketRequestsLanding;
