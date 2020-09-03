import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getListingActions,
  getListingBoxesActions,
  cartActions,
  updateFavoriteSellerActions,
  updateFavouriteProductActions,
  currentAddressActions,
} from 'store/actions';
import { GetAddressOptions } from 'store/selectors/buyer';
import { CartItem } from 'types/store/CartState';
import { GetListingResponseItem } from 'types/store/GetListingState';
import { Store } from 'types/store/Store';

import ProductDetailsView from './ProductDetails.view';

const ProductDetails = (): JSX.Element => {
  // MARK:- States / Variables
  const dispatch = useDispatch();
  const location = useLocation();
  const listingId = location.pathname.replace('/buyer/product/', '');
  const addresses = GetAddressOptions();
  const previousId =
    useSelector((state: Store) => state.getListing.request?.listingId) || '';
  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';
  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };

  const currentListing: GetListingResponseItem | undefined = (useSelector(
    (state: Store) => state.getListing.data?.data.listing
  ) || [])[0];

  // MARK:- Methods
  const onLoad = (listingId: string) => {
    dispatch(getListingActions.request({ listingId: listingId }));
  };
  // MARK:- Effects
  useEffect(() => {
    if (listingId && previousId !== listingId) {
      onLoad(listingId);
    }
  }, [listingId]);
  console.log('currentListing', currentListing);

  const generatedProps = {
    onLoad,
    listingId,
    currentListing,
    addresses,
    selectedAddress,
    selectAddress,
  };
  return <ProductDetailsView {...generatedProps} />;
};

export default ProductDetails;
