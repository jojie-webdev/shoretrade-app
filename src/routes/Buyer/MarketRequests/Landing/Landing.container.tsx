import React, { useEffect, useState } from 'react';

import { BUYER_MARKET_REQUEST_ROUTES } from 'consts/routes';
import moment from 'moment';
import { ScreenClassRender } from 'react-grid-system';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  deleteMarketRequestActions,
  getAllMarketRequestActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/SFMTheme';

import LandingDefaultView from './Landing.default.view';
import { MarketRequestsLandingGeneratedProps, Result } from './Landing.props';
import LandingSFMView from './Landing.sfm.view';
import { getMarketRequestLandingData } from './Landing.transform';
import MarketRequestsLandingView from './Landing.view';

const MarketRequestsLanding = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();

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

  const activeOffers = useSelector((store: Store) => store.getActiveOffers);
  const activeOffersData = (activeOffers.data?.data.marketOffers || []).filter(
    (d) => moment().diff(moment(d.marketRequest.createdAt), 'days') < 7
  );

  const activePlan = useSelector(
    (store: Store) => store.getActivePlan.data?.data
  );

  const activePlanLoading = useSelector(
    (store: Store) => store.getActivePlan.pending
  );

  const onClickItem = (row: Result) => {
    if (row.offers > 0) {
      history.push(BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS(row.id));
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (deleteMarketRequest.pending) {
      setItemToDelete({ value: null });
    } else {
      dispatch(getAllMarketRequestActions.request({}));
    }
    // eslint-disable-next-line
  }, [deleteMarketRequest]);

  const generatedProps: MarketRequestsLandingGeneratedProps = {
    features: activePlan?.features || [],
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
    activeOffersData,
  };

  const reverseMarketPlace = activePlan?.features.find(
    (feature) => feature.alias === 'REVERSED_MARKETPLACE'
  );

  if (theme.isSFM) {
    return <LandingSFMView />;
  }

  if (!reverseMarketPlace && !activePlanLoading && activePlan?.id) {
    return <LandingDefaultView />;
  }

  return <MarketRequestsLandingView {...generatedProps} />;
};

export default MarketRequestsLanding;
