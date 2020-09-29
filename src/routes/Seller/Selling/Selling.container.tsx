import React, { useState, useEffect } from 'react';

import { SELLING_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllListingsActions } from 'store/actions';
import { Store } from 'types/store/Store';

import SellingView from './Selling.view';

const Selling = (): JSX.Element => {
  const history = useHistory();
  const [items, setItems] = useState<any[]>([]);
  const dispatch = useDispatch();

  const pending =
    useSelector((state: Store) => state.getAllListings.pending) || false;
  const listings =
    useSelector((state: Store) => state.getAllListings.data?.data.orders) || [];

  useEffect(() => {
    dispatch(getAllListingsActions.request());
  }, []);

  const goToListingDetails = (id: string) => {
    history.push(SELLING_ROUTES.LISTING_DETAILS.replace(':listingId', id));
  };

  const generatedProps = {
    // generated props here
    listings,
    goToListingDetails,
    pending,
  };
  return <SellingView {...generatedProps} />;
};

export default Selling;
