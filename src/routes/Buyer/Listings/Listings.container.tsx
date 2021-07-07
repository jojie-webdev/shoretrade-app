import React, { useState, useEffect } from 'react';

import { BREAKPOINTS } from 'consts/breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getAllBuyerListingsActions } from 'store/actions';
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
    dispatch(
      getAllBuyerListingsActions.requestCsv({
        sortField,
        searchTerm,
        csv: true,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getAllBuyerListingsActions.request({
        sortField,
        searchTerm,
        page,
        limit: DEFAULT_PAGE_LIMIT,
      })
    );
  }, [sortField, searchTerm, page]);

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
  };

  return <ListingView {...ListingViewProps} />;
}
