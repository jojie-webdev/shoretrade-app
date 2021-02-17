import React from 'react';

import { BUYER_ROUTES } from 'consts';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Store } from 'types/store/Store';

import { MarketRequestsLandingGeneratedProps } from './Landing.props';
import { getMarketRequestLandingData } from './Landing.transform';
import MarketRequestsLandingView from './Landing.view';

const mockData = [
  {
    id: '001',
    type: 'Pale Octopus',
    offers: 12,
    createdAt: '2021-02-17T05:18:32.332Z',
    image: 'http://placekitten.com/64/64',
  },
  {
    id: '002',
    type: 'Abacore',
    offers: 0,
    timeRemaining: '2021-02-17T05:18:32.332Z',
    image: 'http://placekitten.com/64/64',
  },
  {
    id: '003',
    type: 'Atlantic Salmon',
    offers: 7,
    createdAt: '2021-02-17T05:18:32.332Z',
    image: 'http://placekitten.com/64/64',
  },
  {
    id: '004',
    type: 'Ocean Trout',
    offers: 3,
    createdAt: '2021-02-17T05:18:32.332Z',
    image: 'http://placekitten.com/64/64',
  },
];

const MarketRequestsLanding = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();
  const history = useHistory();

  const onClickItem = (row: any) => {
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS(row.id), {
      type: row.type,
      image: row.image,
      status: row.status,
      offersTotal: row.offers,
      expiry: row.expiry,
      id: row.id,
    });
  };

  const generatedProps: MarketRequestsLandingGeneratedProps = {
    currentPath: location.pathname,
    marketRequests: getMarketRequestLandingData(mockData), // TODO STATE
    onClickItem,
  };

  return <MarketRequestsLandingView {...generatedProps} />;
};

export default MarketRequestsLanding;
