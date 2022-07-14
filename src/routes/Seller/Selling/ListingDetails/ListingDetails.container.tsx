import React, { useEffect, useState } from 'react';

import { SELLER_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import {
  createListingActions,
  editSelectedListingActions,
  endListingActions,
  getListingByIdActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import {
  ListingDetailsPublicProps,
  ListingDetailsGeneratedProps,
} from './ListingDetails.props';
import { listingToListingProps } from './ListingDetails.transform';
import ListingDetailsView from './ListingDetails.view';

const ListingDetailsContainer = (
  props: ListingDetailsPublicProps
): JSX.Element => {
  const [showDeleteListingModal, setShowDeleteListingModal] = useState(false);
  const dispatch = useDispatch();

  const listingId = props.match?.params.listingId || '';
  const listingData =
    useSelector((state: Store) => state.getListingById.data?.data) || null;
  const listing = listingToListingProps(listingData);

  const onToggleDeleteListingModal = () => {
    setShowDeleteListingModal((prevValue) => !prevValue);
  };

  const onEdit = () => {
    dispatch(
      editSelectedListingActions.update({
        id: listingId,
      })
    );
  };

  const clearListing = () => {
    dispatch(createListingActions.clear());
  };

  const onRemove = () => {
    dispatch(
      endListingActions.request({
        listingId,
        companyId: listingData?.coop_id || '',
      })
    );
    setShowDeleteListingModal(false);
  };

  useEffect(() => {
    dispatch(getListingByIdActions.request({ listingId }));

    // scrolls to top when displaying the screen
    document.querySelector('.screen')?.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  const sellingDetailsBreadCrumbs = [
    { label: 'Selling', link: SELLER_ROUTES.SELLING },
    {
      label: listingData?.categoryName || 'Category',
      link: SELLER_ROUTES.SELLING,
    },
    {
      label: listing.productDetails.title,
    },
  ];

  const generatedProps: ListingDetailsGeneratedProps = {
    // generated props here
    listing,
    onEdit,
    onRemove,
    sellingDetailsBreadCrumbs,
    clearListing,
    onToggleDeleteListingModal,
    showDeleteListingModal,
  };
  return <ListingDetailsView {...props} {...generatedProps} />;
};

export default ListingDetailsContainer;
