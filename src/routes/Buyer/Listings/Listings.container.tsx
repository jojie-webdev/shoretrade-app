import React, { useState, useEffect } from 'react';

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
  const listings = listingRequestData?.listings || [];
  const maxPage = Math.ceil(listingRequestDataCount / DEFAULT_PAGE_LIMIT);

  const handleSelectTab = (id: number) => {
    setActiveTab(id);
  };

  const handleDownloadCSV = () => {
    if (showModal) {
      setIsCsvPending(true);
      dispatch(getAllBuyerListingsActions.requestCsv({ sortField, searchTerm, sortOrder, all: true }));
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
        limit: DEFAULT_PAGE_LIMIT,
        sortOrder,
      })
    );
  }, [sortField, searchTerm, page, sortOrder]);

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
  };

  return <ListingView {...ListingViewProps} />;
}
