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
    marketRequests: [
      {
        id: '001',
        name: 'Pale Octopus',
        offersTotal: 12,
        timeRemaining: '3 days 24hours 17mins',
        thumbnail: 'http://placekitten.com/64/64',
      },
      {
        id: '002',
        name: 'Abacore',
        offersTotal: 0,
        timeRemaining: '3 days 24hours 17mins',
        thumbnail: 'http://placekitten.com/64/64',
      },
      {
        id: '003',
        name: 'Atlantic Salmon',
        offersTotal: 7,
        timeRemaining: '0',
        thumbnail: 'http://placekitten.com/64/64',
      },
      {
        id: '004',
        name: 'Ocean Trout',
        offersTotal: 3,
        timeRemaining: '0',
        thumbnail: 'http://placekitten.com/64/64',
      },
    ], // TODO STATE
  };

  return <MarketRequestsLandingView {...generatedProps} />;
};

export default MarketRequestsLanding;
