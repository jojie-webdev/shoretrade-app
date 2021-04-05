import React, { useEffect } from 'react';

import { BUYER_ROUTES } from 'consts';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getActiveOffersActions,
  getAllMarketRequestActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { MarketRequestsLandingGeneratedProps } from './Landing.props';
import { getMarketRequestLandingData } from './Landing.transform';
import MarketRequestsLandingView from './Landing.view';

const MarketRequestsLanding = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');

  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );

  const onClickItem = (row: any) => {
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(row.id));
  };

  useEffect(() => {
    dispatch(getAllMarketRequestActions.request({}));
  }, []);

  const generatedProps: MarketRequestsLandingGeneratedProps = {
    currentPath: location.pathname,
    marketRequests: getMarketRequestLandingData(
      buyerRequests.data?.data?.marketRequests.filter(
        (mR) => mR.status !== 'DELETED' && mR.status !== 'CLOSED'
      )
    ), // TODO STATE
    onClickItem,
    isPendingAccount,
  };

  return <MarketRequestsLandingView {...generatedProps} />;
};

export default MarketRequestsLanding;
