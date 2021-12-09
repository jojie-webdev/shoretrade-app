import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { BREAKPOINTS } from 'consts/breakpoints';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getAllBuyerListingsActions } from 'store/actions';
import { SortOrder } from 'types/store/GetAllBuyerListingsState';
import { Store } from 'types/store/Store';
import { useComponentShouldUpdate } from 'utils/Hooks/useComponentShouldUpdate';
import { capitalize } from 'utils/String';

import {
  DIRECT_SALE,
  DEFAULT_PAGE_LIMIT,
  DEFAULT_TABLE_SETTINGS,
} from './Listings.constants';
import ListingView from './Listings.view';

export default function ListingContainer() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isTablet = useMediaQuery({
    query: BREAKPOINTS.genericTablet,
  });

  const [activeTab, setActiveTab] = useState<number>(DIRECT_SALE);
  const [sortField, setSortField] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('ASC');
  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [unselectedIds, setUnselectedIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [isCsvPending, setIsCsvPending] = useState(false); // local state
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [showTableSettings, setShowTableSettings] = useState(false);
  const [tableSettings, setTableSettings] = useState<string[]>(
    DEFAULT_TABLE_SETTINGS
  );

  // mobile pagination
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [isReadypaginateViaScroll, setIsReadypaginateViaScroll] = useState(
    true
  );
  const [prevListingData, setPrevListingData] = useState<any[]>([]);

  const isLoading = useSelector(
    (state: Store) => state.getAllBuyerListings?.pending
  );
  const isDownloadingCsv = useSelector(
    (state: any) => state.getAllBuyerListings?.isDownloadingCsv
  );
  const listingRequest = useSelector(
    (state: Store) => state.getAllBuyerListings || {}
  );

  const listingRequestData: any = listingRequest?.data?.data || {};
  const listingRequestDataCount = listingRequestData?.count;
  const baseListings = listingRequestData?.listings || [];
  const listings = baseListings.map((a: any) => ({
    ...a,
    catchRecurrence: a.catchRecurrence && capitalize(a.catchRecurrence),
  }));
  const maxPage = Math.ceil(listingRequestDataCount / limit);

  useEffect(() => {
    const handleMobilePagination = debounce((event: any) => {
      // reached the bottom of page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (searchTerm) return;
        if (!isReadypaginateViaScroll) return;

        if (page < maxPage) {
          setPage((prev) => prev + 1);
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
  }, [isMobile, listingRequest, isReadypaginateViaScroll, searchTerm]);

  useComponentShouldUpdate(() => {
    if (!isLoading && !isReadypaginateViaScroll) {
      window.scrollTo(0, prevScrollTop);
      setIsReadypaginateViaScroll(true);
    }
  }, [isLoading, isReadypaginateViaScroll, prevScrollTop]);

  useEffect(() => {
    dispatch(
      getAllBuyerListingsActions.request({
        sortField,
        searchTerm,
        page,
        limit,
        sortOrder,
      })
    );
    // eslint-disable-next-line
  }, [sortField, searchTerm, page, sortOrder, limit]);

  useEffect(() => {
    if (showModal && !isDownloadingCsv && isCsvPending) {
      setShowModal(false);
      setIsCsvPending(false);
    }
  }, [isDownloadingCsv, showModal, isCsvPending]);

  // handle search in mobile
  useComponentShouldUpdate(() => {
    if (isMobile) {
      if (searchTerm.length) {
        setLimit(100); // displays the first 100 search result
      } else setLimit(10);
    }

    setPage(1);
  }, [searchTerm, isMobile]);

  useComponentShouldUpdate(() => {
    setSelectedIds([]);
    setUnselectedIds([]);
  }, [isAllSelected]);

  const handleSelectTab = (id: number) => {
    setActiveTab(id);
  };

  const handleDownloadCSV = () => {
    dispatch(
      getAllBuyerListingsActions.requestCsv({
        sortField,
        searchTerm,
        csv: true,
        sortOrder,
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

  const ListingViewProps = {
    activeTab,
    handleSelectTab,
    sortField,
    setSortField,
    listings,
    setSearchTerm,
    isLoading,
    searchTerm,
    handleDownloadCSV,
    isDownloadingCsv,
    page,
    setPage,
    maxPage,
    isMobile,
    isTablet,
    setSortOrder,
    showModal,
    setShowModal,
    selectedIds,
    setSelectedIds,
    isAllSelected,
    setIsAllSelected,
    totalCount: listingRequestDataCount,
    limit,
    setLimit,
    tableSettings,
    setTableSettings,
    showTableSettings,
    setShowTableSettings,
    prevListingData,
    unselectedIds,
    setUnselectedIds,
    handleSelectRow,
  };

  return <ListingView {...ListingViewProps} />;
}
