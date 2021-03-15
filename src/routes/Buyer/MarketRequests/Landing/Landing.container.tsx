import React, { useEffect } from 'react';

import { BUYER_ROUTES } from 'consts';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getActiveOffersActions,
  getAllMarketRequestActions,
} from 'store/actions';
import getAllMarketRequest from 'store/reducers/getAllMarketRequest';
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
  const dispatch = useDispatch();

  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );

  const onClickItem = (row: any) => {
    dispatch(
      getActiveOffersActions.request({
        queryParams: {
          marketRequestId: row.id,
        },
      })
    );
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(row.id), {
      type: row.type,
      image: row.image,
      status: row.status,
      offers: row.offers,
      expiry: row.expiry,
      weight: row.weight,
      id: row.id,
      measurementUnit: row.measurementUnit,
    });
  };

  useEffect(() => {
    dispatch(getAllMarketRequestActions.request({}));
  }, []);

  const generatedProps: MarketRequestsLandingGeneratedProps = {
    currentPath: location.pathname,
    marketRequests: getMarketRequestLandingData(
      buyerRequests.data?.data?.marketRequests.filter((mR) => mR.status !== 'DELETED' && mR.status !== 'CLOSED')
    ), // TODO STATE
    onClickItem,
  };

  return <MarketRequestsLandingView {...generatedProps} />;
};

export default MarketRequestsLanding;
