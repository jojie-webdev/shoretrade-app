import React, { useState, useEffect, useMemo, useReducer } from 'react';

import { SELLING_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  editSelectedListingActions,
  endListingActions,
  getListingsBySalesChannelActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { 
  SellingGeneratedProps, SearchFilterProps, 
  TabPageFilterProps, CounterProps
} from './Selling.props';
import SellingView from './Selling.view';

import { createUpdateReducer } from 'utils/Hooks';

import { SALES_CHANNELS } from 'consts/salesChannels';

const Selling = (): JSX.Element => {
  // MARK:- Hooks / Selectors
  const history = useHistory();
  const dispatch = useDispatch();

  const listingsData = useSelector((state: Store) => 
    state.getListingsBySalesChannel.data?.data
  );
  const userData = useSelector((state: Store) => 
    state.getUser.data?.data.user
  );

  // MARK:- State
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("allListing")
  const [isPending, setIsPending] = useState(true)
  const [tabCounts, setTabCounts] = useState<CounterProps>({
    allListing: 0,
    directSale: 0,
    aquafuture: 0,
    preAuction: 0
  })

  // MARK:- Reducers
  const [tabPageFilters, updateTabPageFilters] = useReducer(
    createUpdateReducer<TabPageFilterProps>(),
    {
      allListing: 1,
      directSale: 1,
      aquafuture: 1,
      preAuction: 1
    }
  );

  const [searchFilters, updateSearchFilters] = useReducer(
    createUpdateReducer<SearchFilterProps>(),
    {
      allListing: "",
      directSale: "",
      aquafuture: "",
      preAuction: ""
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
      dispatch(getListingsBySalesChannelActions.request({
        employeeId: userData?.companies[0].employeeId || '',
        term: searchFilters[activeTab as keyof TabPageFilterProps],
        salesChannel: SALES_CHANNELS.find(channel => 
          channel.value === activeTab
        )?.constant || SALES_CHANNELS[0].constant,
        limit: 10,
        page: tabPageFilters[activeTab as keyof TabPageFilterProps]
      }));
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      dispatch(getListingsBySalesChannelActions.request({
        employeeId: userData?.companies[0].employeeId || '',
        term: searchFilters[activeTab as keyof TabPageFilterProps],
        salesChannel: SALES_CHANNELS.find(channel => 
          channel.value === activeTab
        )?.constant || SALES_CHANNELS[0].constant,
        limit: 10,
        page: tabPageFilters[activeTab as keyof TabPageFilterProps]
      }));
    }
  }, [activeTab, searchFilters, tabPageFilters])

  useEffect(() => {
    if (listingsData && userData) {
      setTabCounts({
        allListing: Number(listingsData.counter.all_listing || 0),
        directSale: Number(listingsData.counter.direct_listing || 0),
        aquafuture: Number(listingsData.counter.aquafuture || 0),
        preAuction: Number(listingsData.counter.pre_auction || 0)
      })
      setIsPending(false)
    }
  }, [listingsData])

  const generatedProps: SellingGeneratedProps = {
    // generated props here
    listings: listingsData?.listings || [],
    counter: tabCounts,
    pending: isPending,
    showModal,
    search: searchFilters[activeTab as keyof TabPageFilterProps],
    page: tabPageFilters[activeTab as keyof TabPageFilterProps],
    activeTab,
    goToListingDetails,
    onChangeSearch: (value) => {
      updateSearchFilters({ [activeTab]: value })
      setIsPending(true)
    },
    resetSearch: () => {
      updateSearchFilters({ [activeTab]: '' })
      setIsPending(true)
    },
    onChangeTab: (tab) => { 
      setActiveTab(tab) 
      setIsPending(true)
    },
    onChangePage: (page) => { 
      updateTabPageFilters({ [activeTab]: page })
      setIsPending(true)
    } 
  };

  return <SellingView {...generatedProps} />;
};

export default Selling;
