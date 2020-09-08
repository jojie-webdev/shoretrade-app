import React, { useEffect, useState } from 'react';

import { ProductSellerRatingProps } from 'components/module/ProductSellerRating/ProductSellerRating.props';
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
import getSellerByIdActions from 'store/actions/getSellerById';
import { GetAddressOptions } from 'store/selectors/buyer';
import { CartItem } from 'types/store/CartState';
import { GetListingResponseItem } from 'types/store/GetListingState';
import { Seller } from 'types/store/GetSellerByIdState';
import { Store } from 'types/store/Store';
import { sizeToString } from 'utils/Listing';

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
  const currentSeller: Seller | undefined = useSelector(
    (state: Store) => state.getSellerById.data?.data.seller
  );
  const [isSellerFavorite, setIsSellerFavorite] = useState<boolean | undefined>(
    false
  );
  const currentListing: GetListingResponseItem | undefined = (useSelector(
    (state: Store) => state.getListing.data?.data.listing
  ) || [])[0];

  const [favorite, setFavorite] = useState(currentListing?.isFavourite);

  const onFavorite = () => {
    setFavorite((prevState) => {
      dispatch(
        updateFavouriteProductActions.request({
          listingId: listingId,
          favourite: !prevState,
        })
      );
      return !prevState;
    });
  };

  const onFavoriteSeller = async () => {
    if (currentSeller) {
      setIsSellerFavorite((prevState) => !prevState);
      dispatch(
        updateFavoriteSellerActions.request({
          sellerId: currentSeller.id,
          favorite: !currentSeller.isFavourite,
        })
      );
    }
  };

  const productDetailsCard1Props = {
    title: currentListing?.type || '',
    tags: (currentListing?.state || []).map((s) => ({ label: s })),
    size: sizeToString(
      currentListing?.size.unit || '',
      currentListing?.size.from,
      currentListing?.size.to
    ),
    location: `${currentListing?.origin.suburb || ''}, ${
      currentListing?.origin.state || ''
    }, ${currentListing?.origin.countryCode || ''}`,
  };
  const price = Number(currentListing?.price || '0');
  const productDetailsCard6Props = {
    price: price.toFixed(2),
    minOrder: currentListing?.minimumOrder || '0',
    avgBoxSize: (currentListing?.average || 0).toFixed(2),
    timeLeft: moment(currentListing?.ends || undefined).toDate(),
    catchDate: moment(
      currentListing?.caught || undefined,
      currentListing?.caught ? 'YYYY-MM-DD' : undefined
    ).toDate(),
  };
  const sellerRatingProps: ProductSellerRatingProps = {
    name: currentListing?.coop.name || '',
    rating: currentListing?.coop.rating || '',
    uri: currentListing?.coop.image || '',
    isFavorite: isSellerFavorite || false,
    onFavorite: onFavoriteSeller,
  };
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

  const generatedProps = {
    onLoad,
    listingId,
    currentListing,
    addresses,
    selectedAddress,
    selectAddress,
    favorite,
    onFavorite,
    productDetailsCard1Props,
    productDetailsCard6Props,
    sellerRatingProps,
  };
  return <ProductDetailsView {...generatedProps} />;
};

export default ProductDetails;
