import React from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { MarketRequestDetailProps } from './RequestDetails.prop';
import MarketRequestDetailView from './RequestDetails.view';

const MarketRequestDetail = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();

  const generatedProps: MarketRequestDetailProps = {
    currentPath: location.pathname,
    data: {
      id: '001',
      name: 'Pale Octopus',
      offersTotal: 12,
      timeRemaining: '3 days 24hours 17mins',
      thumbnail: 'http://placekitten.com/64/64',
      offers: [],
    },
  };

  return <MarketRequestDetailView {...generatedProps} />;
};

export default MarketRequestDetail;
