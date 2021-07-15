import React, { useState, useEffect, useMemo } from 'react';

import { SELLING_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  editSelectedListingActions,
  endListingActions,
  getAllListingsActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { SellingGeneratedProps } from './Selling.props';
import SellingView from './Selling.view';

const Selling = (): JSX.Element => {
  // MARK:- Hooks / Selectors
  const history = useHistory();

  const dispatch = useDispatch();

  const pending =
    useSelector((state: Store) => state.getAllListings.pending) || false;

  const staticListings =
    useSelector((state: Store) => state.getAllListings.data?.data.orders) || [];

  const listings =
    useSelector((state: Store) => state.getAllListings.data?.data.orders) || [];

  const getAllListings =
    useSelector((state: Store) => state.getAllListings) || [];

  const isDeleted =
    useSelector((state: Store) => state.endListing.data?.status) === 200;

  // MARK:- State
  const [search, setSearch] = useState('');
  const [pressed, setPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [listingData, setListingData] = useState({
    listingId: '',
    companyId: '',
  });

  // MARK: Variables
  const filteredListings = useMemo(() => {
    const res = !search
      ? listings
      : listings.filter((listing) =>
          listing.type.toLowerCase().includes(search.toLowerCase())
        );
    return res;
  }, [listings, getAllListings, search]);

  // MARK:- Method
  const onClickRemoveListing = (listingId: string, companyId: string) => {
    setShowModal(true);

    setListingData({ listingId, companyId });
  };

  const onChangeSearch = (value: string) => {
    setSearch(value);
  };

  const resetSearch = () => {
    setSearch('');
  };

  const clearListingData = () => {
    setListingData({
      listingId: '',
      companyId: '',
    });

    setShowModal(false);
  };

  const onRemove = () => {
    const { listingId, companyId } = listingData;

    dispatch(
      endListingActions.request({
        listingId,
        companyId,
      })
    );

    setShowModal(false);
    setPressed(true);
  };

  const goToListingDetails = (id: string) => {
    history.push(SELLING_ROUTES.LISTING_DETAILS.replace(':listingId', id));
  };

  const onClickEdit = (listingId: string) => {
    dispatch(
      editSelectedListingActions.update({
        id: listingId,
      })
    );
  };

  // MARK:- Effects
  useEffect(() => {
    // On Mount
    if (!isDeleted && !pressed) {
      dispatch(getAllListingsActions.request());
    }

    // On Press Delete
    if (isDeleted && pressed) {
      dispatch(getAllListingsActions.request());
    }
  }, [isDeleted, pressed]);

  const generatedProps: SellingGeneratedProps = {
    // generated props here
    listings: filteredListings,
    goToListingDetails,
    pending,
    onClickRemoveListing,
    onClickEdit,
    showModal,
    clearListingData,
    onRemove,
    showDeletedSuccess: isDeleted,
    search,
    onChangeSearch,
    resetSearch,
    staticListings,
  };
  return <SellingView {...generatedProps} />;
};

export default Selling;
