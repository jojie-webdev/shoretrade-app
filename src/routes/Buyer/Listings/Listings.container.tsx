import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useReducer,
} from 'react';

import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { SALES_CHANNELS_BUYER } from 'consts/salesChannels';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { getAllBuyerListingsActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { useComponentShouldUpdate } from 'utils/Hooks/useComponentShouldUpdate';
import { capitalize } from 'utils/String';

import { DEFAULT_TABLE_SETTINGS } from './Listings.constants';
import {
  SearchFilterProps,
  TabPageFilterProps,
  CounterProps,
  TabSortProps,
  ListingViewProps,
} from './Listings.props';
import ListingView from './Listings.view';

export default function ListingContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isTablet = useMediaQuery({
    query: BREAKPOINTS.genericTablet,
  });

  // MARK:- States
  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [unselectedIds, setUnselectedIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [isCsvPending, setIsCsvPending] = useState(false); // local state
  const [showTableSettings, setShowTableSettings] = useState(false);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [prevListingData, setPrevListingData] = useState<any[]>([]);
  const [isReadypaginateViaScroll, setIsReadypaginateViaScroll] = useState(
    true
  );
  const [tableSettings, setTableSettings] = useState<string[]>(
    DEFAULT_TABLE_SETTINGS
  );
  const [pageLimit, setPageLimit] = useState(10);
  const [isPending, setIsPending] = useState(true);
  const [activeTab, setActiveTab] = useState('allListing');
  const [tabCounts, setTabCounts] = useState<CounterProps>({
    allListing: 0,
    directSale: 0,
    aquafuture: 0,
    preAuction: 0,
    auction: 0,
  });

  // MARK:- Reducers
  const [tabPageFilters, updateTabPageFilters] = useReducer(
    createUpdateReducer<TabPageFilterProps>(),
    {
      allListing: 1,
      directSale: 1,
      aquafuture: 1,
      preAuction: 1,
      auction: 1,
    }
  );

  const [searchFilters, updateSearchFilters] = useReducer(
    createUpdateReducer<SearchFilterProps>(),
    {
      allListing: '',
      directSale: '',
      aquafuture: '',
      preAuction: '',
      auction: '',
    }
  );

  const [tabSortField, updateTabSortField] = useReducer(
    createUpdateReducer<TabSortProps>(),
    {
      allListing: '',
      directSale: '',
      aquafuture: '',
      preAuction: '',
      auction: '',
    }
  );

  const [tabSortOrder, updateTabSortOrder] = useReducer(
    createUpdateReducer<TabSortProps>(),
    {
      allListing: 'ASC',
      directSale: 'ASC',
      aquafuture: 'ASC',
      preAuction: 'ASC',
      auction: 'ASC',
    }
  );

  // mobile pagination

  const isDownloadingCsv = useSelector(
    (state: any) => state.getAllBuyerListings?.isDownloadingCsv
  );
  const listingRequest = useSelector(
    (state: Store) => state.getAllBuyerListings
  );
  const listingRequestData = useSelector(
    (state: Store) => state.getAllBuyerListings.data?.data
  );
  const baseListings = listingRequestData?.listings || [];
  const listings = baseListings.map((a: any) => ({
    ...a,
    catchRecurrence: a.catchRecurrence && capitalize(a.catchRecurrence),
  }));
  const totalPage = Math.ceil(tabCounts[activeTab as keyof CounterProps] / 10);
  const page = tabPageFilters[activeTab as keyof TabPageFilterProps];
  const search = searchFilters[activeTab as keyof SearchFilterProps];

  // MARK:- Callbacks

  useEffect(() => {
    const handleMobilePagination = debounce((event: any) => {
      // reached the bottom of page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (search) return;
        if (!isReadypaginateViaScroll) return;

        if (page < totalPage) {
          setPrevScrollTop(window.innerHeight + window.scrollY);
          setIsReadypaginateViaScroll(false);
          setPrevListingData((prevState) => [...prevState, ...baseListings]);
        }
      }
    }, 300);

    if (isMobile) {
      document.addEventListener('scroll', handleMobilePagination);
    }

    return () => {
      document.removeEventListener('scroll', handleMobilePagination);
    };
    // eslint-disable-next-line
  }, [isMobile, listingRequest, isReadypaginateViaScroll, search]);

  useComponentShouldUpdate(() => {
    if (!isPending && !isReadypaginateViaScroll) {
      window.scrollTo(0, prevScrollTop);
      setIsReadypaginateViaScroll(true);
    }
  }, [isPending, isReadypaginateViaScroll, prevScrollTop]);

  useEffect(() => {
    dispatch(
      getAllBuyerListingsActions.request({
        salesChannel:
          SALES_CHANNELS_BUYER.find((channel) => channel.value === activeTab)
            ?.constant || SALES_CHANNELS_BUYER[0].constant,
        sortField: tabSortField[activeTab as keyof TabSortProps],
        searchTerm: search,
        page,
        limit: isMobile ? 100 : 10,
        sortOrder: tabSortOrder[activeTab as keyof TabSortProps],
      })
    );
    // eslint-disable-next-line
  }, [activeTab, searchFilters, page, tabSortOrder]);

  useEffect(() => {
    setIsAllSelected(false);
    setSelectedIds([]);
    setUnselectedIds([]);
    // eslint-disable-next-line
  }, [activeTab]);

  useEffect(() => {
    if (showModal && !isDownloadingCsv && isCsvPending) {
      setShowModal(false);
      setIsCsvPending(false);
    }
  }, [isDownloadingCsv, showModal, isCsvPending]);

  useComponentShouldUpdate(() => {
    setSelectedIds([]);
    setUnselectedIds([]);
  }, [isAllSelected]);

  useEffect(() => {
    if (listingRequestData) {
      setTabCounts({
        allListing: Number(listingRequestData.counter.all_listing || 0),
        directSale: Number(listingRequestData.counter.direct_listing || 0),
        aquafuture: Number(listingRequestData.counter.aquafuture || 0),
        preAuction: Number(listingRequestData.counter.pre_auction || 0),
        auction: Number(listingRequestData.counter.auction || 0),
      });
      setIsPending(false);
    }
  }, [listingRequestData]);

  // MARK:- Methods

  const handleDownloadCSV = () => {
    dispatch(
      getAllBuyerListingsActions.requestCsv({
        salesChannel:
          SALES_CHANNELS_BUYER.find((channel) => channel.value === activeTab)
            ?.constant || SALES_CHANNELS_BUYER[0].constant,
        sortField: tabSortField[activeTab as keyof TabSortProps],
        searchTerm: search,
        csv: true,
        sortOrder: tabSortOrder[activeTab as keyof TabSortProps],
        ids: selectedIds,
        exceptId: unselectedIds,
        all: true,
      })
    );
  };

  const handleRemoveIdFromState = (
    id: string,
    setState: Dispatch<SetStateAction<string[]>>
  ) => setState((prevIds) => prevIds.filter((prevId) => prevId !== id));

  const handleAddIdToState = (
    id: string,
    setState: Dispatch<SetStateAction<string[]>>
  ) => setState((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const handleSelectRow = (id: string, state: boolean) => {
    // take effect on unselectedIds state
    if (isAllSelected) {
      // add
      if (!state) handleAddIdToState(id, setUnselectedIds);
      // remove
      else handleRemoveIdFromState(id, setUnselectedIds);
    }
    // take effect on selectedIds state
    else {
      // remove
      if (state) handleAddIdToState(id, setSelectedIds);
      // add
      else handleRemoveIdFromState(id, setSelectedIds);
    }
  };

  const goToProductDetails = (id: string) => {
    if (
      baseListings.find((listing) => listing.id === id)?.sales_channel !==
      'AUCTION'
    ) {
      history.push(BUYER_ROUTES.PRODUCT_DETAIL(id));
    }
  };

  const listingViewProps: ListingViewProps = {
    listings,
    handleDownloadCSV,
    isDownloadingCsv,
    isMobile,
    isTablet,
    showModal,
    setShowModal,
    selectedIds,
    setSelectedIds,
    isAllSelected,
    setIsAllSelected,
    tableSettings,
    setTableSettings,
    showTableSettings,
    setShowTableSettings,
    prevListingData,
    unselectedIds,
    setUnselectedIds,
    handleSelectRow,
    isPending,
    counter: tabCounts,
    totalCount: Number(listingRequestData?.count),
    totalPage,
    search,
    onChangeSearch: (value) => {
      updateSearchFilters({ [activeTab]: value });
      setIsPending(true);
    },
    activeTab,
    onChangeTab: (tab) => {
      setActiveTab(tab);
      setIsPending(true);
    },
    page,
    onChangePage: (page) => {
      updateTabPageFilters({ [activeTab]: page });
      setIsPending(true);
    },
    pageLimit,
    onChangePageLimit: (limit) => setPageLimit(limit),
    sorting: {
      field: tabSortField[activeTab as keyof TabSortProps],
      order: tabSortOrder[activeTab as keyof TabSortProps],
    },
    onChangeSortField: (field) => {
      updateTabSortField({ [activeTab]: field });
      setIsPending(true);
    },
    onChangeSortOrder: (order) => {
      updateTabSortOrder({ [activeTab]: order });
      setIsPending(true);
    },
    goToProductDetails,
  };

  return <ListingView {...listingViewProps} />;
}
