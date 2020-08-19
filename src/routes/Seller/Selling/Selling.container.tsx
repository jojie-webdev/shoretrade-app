import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAllListingsActions } from 'store/actions';
import { Store } from 'types/store/Store';

import SellingView from './Selling.view';

const Selling = (): JSX.Element => {
  const [items, setItems] = useState<any[]>([]);
  const dispatch = useDispatch();

  const pending =
    useSelector((state: Store) => state.getAllListings.pending) || false;
  const listings =
    useSelector((state: Store) => state.getAllListings.data?.data.orders) || [];

  useEffect(() => {
    dispatch(getAllListingsActions.request());
  }, []);

  const generatedProps = {
    // generated props here
    listings,
    pending,
  };
  return <SellingView {...generatedProps} />;
};

export default Selling;
