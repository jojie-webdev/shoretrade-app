import React, { useEffect, useState } from 'react';

import SpinnerLogo from 'components/base/SpinnerLogo';
import LoadingView from 'components/module/Loading';
import {
  BUYER_ACCOUNT_ROUTES,
  BUYER_MARKET_REQUEST_ROUTES,
  BUYER_NEGOTIATION_ROUTES,
  BUYER_ROUTES,
} from 'consts/routes';
import moment from 'moment';
import queryString from 'query-string';
import { ScreenClassRender } from 'react-grid-system';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getActivePlan } from 'routes/Buyer/Account/SubscriptionPlan/SubscriptionPlan.transform';
import {
  deleteMarketRequestActions,
  getAllMarketRequestActions,
  getAllNegotiationsActions,
  getNegotiationCreditActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { NegoAndRMQueryParams } from 'types/NegoAndRMQueryParams';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';
import { CompanyPlanName } from 'types/store/GetCompanyPlanState';
import { Store } from 'types/store/Store';
import useDebounce from 'utils/Hooks/useDebounce';
import useTimeout from 'utils/Hooks/useTimeout';
import { useTheme } from 'utils/SFMTheme';

import LandingDefaultView from './Landing.default.view';
import {
  MarketRequestsLandingGeneratedProps,
  Result,
  TABS,
} from './Landing.props';
import LandingSFMView from './Landing.sfm.view';
import {
  getMarketRequestLandingData,
  getNegoRequestLandingData,
} from './Landing.transform';
import MarketRequestsLandingView from './Landing.view';

const MarketRequestsLanding = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const negoAndRMQueryParams = queryString.parse(
    location.search
  ) as NegoAndRMQueryParams;

  const [itemToDelete, setItemToDelete] = useState<{ value: null | string }>({
    value: null,
  });
  const [waitAll, setWaitAll] = useState(true);
  const [selectedTab, setSelectedTab] = useState(TABS.NEGOTIATIONS);
  const [searchKeyword, setSearchKeyword] = useState('');

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

  const negotiations = useSelector(
    (store: Store) => store.getAllNegotiations.data?.data.negotiations
  );

  const handleTabSelect = (selectedTab: TABS) => {
    if (selectedTab === TABS.NEGOTIATIONS) {
      dispatch(getAllNegotiationsActions.request({}));
    } else {
      dispatch(getAllMarketRequestActions.request({}));
    }

    setSelectedTab(selectedTab);
    history.push(`${BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS}`);
  };

  const reverseMarketPlace =
    (activePlans &&
      activePlans?.filter(
        (i) =>
          i.plan.features.filter((pf) => pf.name === 'Market Requests').length >
          0
      )?.length > 0) ||
    false;

  const defaultCompany = GetDefaultCompany();

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );
  const negotiationCredit = useSelector(
    (store: Store) => store.getNegotiationCredit.data?.data
  );
  const currentReverseMarketDetails = getActivePlan(
    companyPlan,
    CompanyPlanName.REVERSE_MARKET
  );
  const currentPlanDetails = getActivePlan(companyPlan);
  const subscriptionType = companyPlan?.activePlans
    ? companyPlan?.activePlans.find((ac) =>
        [CompanyPlanName.BASE, CompanyPlanName.PRO].includes(ac.plan.name)
      )?.plan.name || null
    : null;

  const isSubscribedToNegoRequest =
    currentReverseMarketDetails ||
    currentPlanDetails?.plan?.name === CompanyPlanName.PRO
      ? companyPlan && !companyPlan.flags?.hasCancelledReversedMarketplace
      : subscriptionType !== null && false;

  const canNegotiate = isSubscribedToNegoRequest || false;

  const onClickItem = (row: Result) => {
    if (row.offers && row.offers > 0) {
      history.push(BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS(row.id));
    }
  };

  const onClickNegoItem = (
    row: GetAllNegoRequestResponseItem & {
      expiry: any;
    }
  ) => {
    history.push(
      BUYER_NEGOTIATION_ROUTES.NEGOTIATION_DETAILS(
        row.listing_id,
        row.negotiation_request_id
      )
    );
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

  const handleSearchChange = (text: string) => {
    setSearchKeyword(text);

    history.push(`?tab=${selectedTab}&searchTerm=${text}`);
  };

  const handleSeePlansClick = () => {
    history.push(BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN);
  };

  const { clear } = useTimeout(() => {
    setWaitAll(false);
    clear();
  }, 2000);

  useDebounce(
    () => {
      if (searchKeyword.length > 2 || searchKeyword.length === 0) {
        dispatch(getAllNegotiationsActions.request({ term: searchKeyword }));
      }
    },
    1000,
    [searchKeyword]
  );

  useEffect(() => {
    if (deleteMarketRequest.pending) {
      setItemToDelete({ value: null });
    } else {
      dispatch(getAllMarketRequestActions.request({}));
    }
    // eslint-disable-next-line
  }, [deleteMarketRequest]);

  useEffect(() => {
    dispatch(getNegotiationCreditActions.request({}));
    setSelectedTab(
      negoAndRMQueryParams.tab === TABS.MARKET_REQUEST
        ? TABS.MARKET_REQUEST
        : TABS.NEGOTIATIONS
    );

    if (negoAndRMQueryParams.tab === TABS.MARKET_REQUEST) {
      dispatch(getAllMarketRequestActions.request({}));
    } else {
      dispatch(getAllNegotiationsActions.request({}));
    }
  }, []);

  const generatedProps: MarketRequestsLandingGeneratedProps = {
    currentPath: location.pathname,
    marketRequests: getMarketRequestLandingData(
      buyerRequests.data?.data?.marketRequests.filter(
        (mR) => mR.status !== 'DELETED' && mR.status !== 'CLOSED'
      )
    ), // TODO STATE
    negotiations: getNegoRequestLandingData(
      negotiations?.filter(
        (nego) => nego.status !== 'DELETED' && nego.status !== 'CLOSED'
      )
    ),
    onClickItem,
    isPendingAccount,
    onDelete,
    pendingDeleteMarketRequest: deleteMarketRequest.pending || false,
    itemToDelete,
    setItemToDelete,
    loading: loading || false,
    activeOffersData,
    reverseMarketPlace,
    canNegotiate,
    handleTabSelect,
    selectedTab,
    handleSearchChange,
    onClickNegoItem,
    negotiationCredit,
    searchKeyword,
  };

  const sfmViewProps = {
    handleSeePlansClick,
    planPrice: activePlans ? activePlans[0]?.plan?.price : '0.00',
    canNegotiate,
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
