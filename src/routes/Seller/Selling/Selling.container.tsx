import React, { useState, useEffect } from 'react';

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

  const listings =
    useSelector((state: Store) => state.getAllListings.data?.data.orders) || [];

  const isDeleted =
    useSelector((state: Store) => state.endListing.data?.status) === 200;

  // MARK:- State
  const [pressed, setPressed] = useState(false);

  // MARK:- Method
  const onRemove = (listingId: string, companyId: string) => {
    dispatch(
      endListingActions.request({
        listingId,
        companyId,
      })
    );

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
    listings,
    goToListingDetails,
    pending,
    onRemove,
    onClickEdit,
    showDeletedSuccess: pressed && isDeleted,
  };
  return <SellingView {...generatedProps} />;
};

export default Selling;
