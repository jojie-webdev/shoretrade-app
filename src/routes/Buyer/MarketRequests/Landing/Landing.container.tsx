import React, { useEffect, useState } from 'react';

import SpinnerLogo from 'components/base/SpinnerLogo';
import {
  BUYER_ACCOUNT_ROUTES,
  BUYER_MARKET_REQUEST_ROUTES,
} from 'consts/routes';
import moment from 'moment';
import { ScreenClassRender } from 'react-grid-system';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  deleteMarketRequestActions,
  getAllMarketRequestActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import useTimeout from 'utils/Hooks/useTimeout';
import { useTheme } from 'utils/SFMTheme';

import LandingDefaultView from './Landing.default.view';
import { MarketRequestsLandingGeneratedProps, Result } from './Landing.props';
import LandingSFMView from './Landing.sfm.view';
import { getMarketRequestLandingData } from './Landing.transform';
import MarketRequestsLandingView from './Landing.view';
import LoadingView from 'components/module/Loading';

const MarketRequestsLanding = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [itemToDelete, setItemToDelete] = useState<{ value: null | string }>({
    value: null,
  });
  const [waitAll, setWaitAll] = useState(true);

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

  const activePlans = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data.activePlans
  );

  const isActivePlanLoading = useSelector(
    (store: Store) => store.getCompanyPlan.pending
  );

  const reverseMarketPlace =
    (activePlans &&
      activePlans?.filter(
        (i) =>
          i.plan.features.filter((pf) => pf.name === 'Market Requests').length >
          0
      )?.length > 0) ||
    false;

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

  const handleSeePlansClick = () => {
    history.push(BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN);
  };

  const { clear } = useTimeout(() => {
    setWaitAll(false);
    clear();
  }, 2000);

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
    reverseMarketPlace,
  };

  const sfmViewProps = {
    handleSeePlansClick,
  };

  const defaultViewProps = {
    handleSeePlansClick,
  };

  if (waitAll || isActivePlanLoading === null || isActivePlanLoading) {
    return <LoadingView />;
  } else {
    if (theme.isSFM && !reverseMarketPlace) {
      return <LandingSFMView {...sfmViewProps} />;
    }

    if (!reverseMarketPlace) {
      return <LandingDefaultView {...defaultViewProps} />;
    }

    return <MarketRequestsLandingView {...generatedProps} />;
  }
};

export default MarketRequestsLanding;
