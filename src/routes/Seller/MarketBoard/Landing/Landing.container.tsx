import React, { useEffect, useState } from 'react';

import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import moment from 'moment';
import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getLocation,
  getSize,
  getSpecs,
  getType,
  requestToModalFilter,
} from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import {
  getActiveOffersActions,
  getAllMarketRequestActions,
  getAllMarketRequestFiltersActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { Store } from 'types/store/Store';

import { TabOptions } from './Landing.props';
import MarketBoardLandingView from './Landing.view';

const MarketBoardLanding = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const userPending =
    user !== undefined &&
    !(user.companies || []).some((a) =>
      a.addresses.some((b) => b.approved === 'APPROVED')
    );

  const location: { state?: { currentTab?: string } } = useLocation();
  const locationTab = location.state?.currentTab || 'Buyer Requests';

  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );
  const activeOffers = useSelector((store: Store) => store.getActiveOffers);
  const activeOffersData = (activeOffers.data?.data.marketOffers || []).filter(
    (d) => moment().diff(moment(d.marketRequest.createdAt), 'days') < 7
  );
  const buyerRequestsFilters = useSelector(
    (store: Store) => store.getAllMarketRequestFilters.data?.data
  );

  const filteredSpecs =
    (buyerRequests.data?.data.marketRequests || [])
      .filter((d) => !isEmpty(d.specifications))
      .filter((d) => moment().diff(moment(d.createdAt), 'days') < 7) || [];

  const { filters, checkboxFilters } = requestToModalFilter(
    buyerRequestsFilters
  );

  const [currentTab, setCurrentTab] = useState<TabOptions>(
    locationTab as TabOptions
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [initial, setInitial] = useState(true);

  //filters
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const onChangeCurrentTab = (newTab: TabOptions) => setCurrentTab(newTab);

  useEffect(() => {
    if (currentTab === 'Buyer Requests') {
      dispatch(getAllMarketRequestActions.request({}));
    } else {
      dispatch(getActiveOffersActions.request({}));
    }

    setInitial(false);
    setSearchTerm('');
    setIsFilterModalOpen(false);
  }, [currentTab]);

  useEffect(() => {
    if (companyId) {
      dispatch(getAllMarketRequestFiltersActions.request({ companyId }));
    }
  }, [companyId]);

  useEffect(() => {
    if (initial) return;

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerId = setTimeout(() => {
      dispatch(
        getAllMarketRequestActions.request({
          queryParams: {
            term: searchTerm.length > 2 ? searchTerm : '',
          },
        })
      );
    }, 800);

    setTimer(timerId);
  }, [searchTerm]);

  const onClickOffer = (data: GetAllMarketRequestResponseItem) => {
    history.push(SELLER_MARKET_BOARD_ROUTES.OFFER, {
      buyerRequest: data,
    });
  };

  const onClickActiveOffer = (data: GetActiveOffersRequestResponseItem) => {
    history.push(SELLER_MARKET_BOARD_ROUTES.NEGOTIATE, {
      activeOffer: data,
    });
  };

  const onClickFilterButton = () => {
    setIsFilterModalOpen((prevState) => !prevState);
  };

  const onApply = () => {
    setIsFilterModalOpen(false);

    const sizesFilter = getSize(selectedFilters, buyerRequestsFilters!);
    const actualSizesFilter = sizesFilter
      ? sizesFilter?.filter((v) => v !== 'Ungraded')
      : undefined;
    const isUngraded = (sizesFilter || []).includes('Ungraded');

    dispatch(
      getAllMarketRequestActions.request({
        queryParams: {
          address: getLocation(selectedFilters, buyerRequestsFilters!),
          sizes: isUngraded ? undefined : actualSizesFilter,
          typeId: getType(selectedFilters, buyerRequestsFilters!),
          specifications: getSpecs(selectedFilters, buyerRequestsFilters!),
          ungraded: isUngraded ? true : undefined,
        },
      })
    );
  };

  const onReset = () => {
    setSelectedFilters([]);
    setSelectedSize(null);
  };

  const generatedProps = {
    buyerRequests: filteredSpecs,
    activeOffers: activeOffersData,
    isLoading: buyerRequests.pending || activeOffers.pending || false,
    currentTab,
    onChangeCurrentTab,
    searchTerm,
    setSearchTerm,
    onClickOffer,
    onClickActiveOffer,
    onClickFilterButton,

    filterModalProps: {
      isOpen: isFilterModalOpen,
      filters,
      checkboxFilters,
      selectedFilters,
      setSelectedFilters,
      selectedSize,
      setSelectedSize,
      onApply,
      onReset,
      onClickClose: () => setIsFilterModalOpen(false),
    },
    userPending,
  };
  return <MarketBoardLandingView {...generatedProps} />;
};

export default MarketBoardLanding;
