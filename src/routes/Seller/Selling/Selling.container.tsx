import React, { useState, useEffect, useReducer } from 'react';

import { SELLING_ROUTES } from 'consts';
import { SALES_CHANNELS } from 'consts/salesChannels';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  createListingActions,
  getListingByIdActions,
  getListingsBySalesChannelActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';

import {
  SellingGeneratedProps,
  SearchFilterProps,
  TabPageFilterProps,
  CounterProps,
} from './Selling.props';
import SellingView from './Selling.view';
import { listingToListingProps } from './ListingDetails/ListingDetails.transform';

const Selling = (): JSX.Element => {
  // MARK:- Hooks / Selectors
  const history = useHistory();
  const dispatch = useDispatch();

  const listingsData = useSelector(
    (state: Store) => state.getListingsBySalesChannel.data?.data
  );
  const listingsLoading =
    useSelector((state: Store) => state.getListingsBySalesChannel.pending) ||
    false;
  const userData = useSelector((state: Store) => state.getUser.data?.data.user);

  const listingId = useSelector(
    (state: Store) => state.createListing.data?.data.id
  );

  const listingDetailPreview = useSelector(
    (state: Store) => state.getListingById.data?.data
  ) as any;

  const isSuccessListing = useSelector(
    (state: Store) => (state.createListing.data?.status || 0) === 200
  );

  // MARK:- State
  // eslint-disable-next-line
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('allListing');
  const [tabCounts, setTabCounts] = useState<CounterProps>({
    allListing: 0,
    directSale: 0,
    aquafuture: 0,
    preAuction: 0,
  });

  // MARK:- Reducers
  const [tabPageFilters, updateTabPageFilters] = useReducer(
    createUpdateReducer<TabPageFilterProps>(),
    {
      allListing: 1,
      directSale: 1,
      aquafuture: 1,
      preAuction: 1,
    }
  );

  const [searchFilters, updateSearchFilters] = useReducer(
    createUpdateReducer<SearchFilterProps>(),
    {
      allListing: '',
      directSale: '',
      aquafuture: '',
      preAuction: '',
    }
  );

  // MARK:- Method
  const goToListingDetails = (id: string) => {
    history.push(SELLING_ROUTES.LISTING_DETAILS.replace(':listingId', id));
  };

  // MARK:- Effects
  useEffect(() => {
    // On Mount
    if (userData) {
      dispatch(
        getListingsBySalesChannelActions.request({
          employeeId: userData?.companies[0].employeeId || '',
          term: searchFilters[activeTab as keyof TabPageFilterProps],
          salesChannel:
            SALES_CHANNELS.find((channel) => channel.value === activeTab)
              ?.constant || SALES_CHANNELS[0].constant,
          limit: 10,
          page: tabPageFilters[activeTab as keyof TabPageFilterProps],
        })
      );
    }
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    if (userData) {
      dispatch(
        getListingsBySalesChannelActions.request({
          employeeId: userData?.companies[0].employeeId || '',
          term: searchFilters[activeTab as keyof TabPageFilterProps],
          salesChannel:
            SALES_CHANNELS.find((channel) => channel.value === activeTab)
              ?.constant || SALES_CHANNELS[0].constant,
          limit: 10,
          page: tabPageFilters[activeTab as keyof TabPageFilterProps],
        })
      );
      dispatch(getListingByIdActions.request({ listingId }));
    }
    // eslint-disable-next-line
  }, [activeTab, searchFilters, tabPageFilters]);

  useEffect(() => {
    if (listingsData && userData) {
      setTabCounts({
        allListing: Number(listingsData.counter.all_listing || 0),
        directSale: Number(listingsData.counter.direct_listing || 0),
        aquafuture: Number(listingsData.counter.aquafuture || 0),
        preAuction: Number(listingsData.counter.pre_auction || 0),
      });
    }
    // eslint-disable-next-line
  }, [listingsData]);

  useEffect(() => {
    setShowAlert(true);
    const timerSet = setTimeout(() => {
      setShowAlert(false);
      clearTimeout(timerSet);
    }, 6000);
    return () => {
      dispatch(createListingActions.clear());
    };
  }, [isSuccessListing]);

  const generatedProps: SellingGeneratedProps = {
    // generated props here
    listings: listingsData?.listings || [],
    listingDetailPreview,
    counter: tabCounts,
    showModal,
    search: searchFilters[activeTab as keyof TabPageFilterProps],
    page: tabPageFilters[activeTab as keyof TabPageFilterProps],
    activeTab,
    showAlertSuccess: showAlert && isSuccessListing,
    listingsLoading,
    goToListingDetails,
    onChangeSearch: (value) => {
      updateSearchFilters({ [activeTab]: value });
    },
    onChangeTab: (tab) => {
      setActiveTab(tab);
    },
    onChangePage: (page) => {
      updateTabPageFilters({ [activeTab]: page });
    },
  };

  return <SellingView {...generatedProps} />;
};

export default Selling;
