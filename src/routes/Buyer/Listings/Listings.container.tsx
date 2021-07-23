import React, { useState, useEffect } from 'react';

import { capitalize } from 'utils/String'
import { BREAKPOINTS } from 'consts/breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getAllBuyerListingsActions } from 'store/actions';
import { SortOrder } from 'types/store/GetAllBuyerListingsState';
import { Store } from 'types/store/Store';

import { DIRECT_SALE, DEFAULT_PAGE_LIMIT } from './Listings.constants';
import ListingView from './Listings.view';

export default function ListingContainer() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const [activeTab, setActiveTab] = useState<number>(DIRECT_SALE);
  const [sortField, setSortField] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('ASC');
  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [isCsvPending, setIsCsvPending] = useState(false); // local state
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);

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
    catchRecurrence: a.catchRecurrence && capitalize(a.catchRecurrence)
  }))
  const maxPage = Math.ceil(listingRequestDataCount / limit);

  const handleSelectTab = (id: number) => {
    setActiveTab(id);
  };

  const handleDownloadCSV = () => {
    if (showModal) {
      setIsCsvPending(true);
      dispatch(getAllBuyerListingsActions.requestCsv({ sortField, searchTerm, sortOrder, all: true, csv: true }));
    } else {
      if (!selectedIds.length) setShowModal(true);
      else dispatch(getAllBuyerListingsActions.requestCsv({ sortField, searchTerm, csv: true, sortOrder, ids: selectedIds, all: true }));
    }
  };

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
  }, [sortField, searchTerm, page, sortOrder, limit]);

  useEffect(() => {
    if (showModal && !isDownloadingCsv && isCsvPending) {
      setShowModal(false);
      setIsCsvPending(false);
    }
  }, [isDownloadingCsv, showModal, isCsvPending]);

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
  };

  return <ListingView {...ListingViewProps} />;
}
