import React, { useEffect, useState } from 'react';

import { BUYER_ROUTES } from 'consts';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  deleteMarketRequestActions,
  getActiveOffersActions,
  getAllMarketRequestActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { MarketRequestsLandingGeneratedProps, Result } from './Landing.props';
import { getMarketRequestLandingData } from './Landing.transform';
import MarketRequestsLandingView from './Landing.view';

const MarketRequestsLanding = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [itemToDelete, setItemToDelete] = useState<{ value: null | string }>({
    value: null,
  });

  const deleteMarketRequest = useSelector(
    (store: Store) => store.deleteMarketRequest
  );

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');

  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );

  const loading = useSelector(
    (store: Store) => store.getAllMarketRequest.pending
  );

  const onClickItem = (row: Result) => {
    if (row.offers > 0) {
      history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(row.id));
    }
  };

  const onDelete = (id: string) => {
    if (id) {
      dispatch(
        deleteMarketRequestActions.request({
          id,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getAllMarketRequestActions.request({}));
  }, []);

  useEffect(() => {
    if (deleteMarketRequest.pending) {
      setItemToDelete({ value: null });
    } else {
      dispatch(getAllMarketRequestActions.request({}));
    }
  }, [deleteMarketRequest]);

  const generatedProps: MarketRequestsLandingGeneratedProps = {
    currentPath: location.pathname,
    marketRequests: getMarketRequestLandingData(
      buyerRequests.data?.data?.marketRequests.filter(
        (mR) => mR.status !== 'DELETED' && mR.status !== 'CLOSED'
      )
    ), // TODO STATE
    onClickItem,
    isPendingAccount,
    onDelete,
    pendingDeleteMarketRequest: deleteMarketRequest.pending || false,
    itemToDelete,
    setItemToDelete,
    loading: loading || false,
  };

  return <MarketRequestsLandingView {...generatedProps} />;
};

export default MarketRequestsLanding;
