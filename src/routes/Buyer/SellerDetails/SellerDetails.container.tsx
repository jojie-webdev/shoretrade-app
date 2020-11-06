import React, { useState, useEffect, ChangeEvent } from 'react';

import { SellerRatingProps } from 'components/module/SellerRating/SellerRating.props';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getSellerByIdActions,
  updateFavoriteSellerActions,
} from 'store/actions';
import { GetListingResponseItem } from 'types/store/GetListingState';
import { Seller } from 'types/store/GetSellerByIdState';
import { Store } from 'types/store/Store';

import { SellerDetailsGeneratedProps } from './SellerDetails.props';
import SellerDetailsView from './SellerDetails.view';

const SellerDetails = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sellerIdParsed = id;

  const [searchValue, setSearchValue] = useState('');

  const previousId =
    useSelector((state: Store) => state.getSellerById.request?.sellerId) || '';

  const results = (
    useSelector(
      (state: Store) => state.getSellerById.data?.data.seller.listings
    ) || []
  ).filter((result) => {
    return searchValue
      ? result.type.toLowerCase().includes(searchValue.toLowerCase())
      : true;
  });

  const onLoad = (sellerId: string) => {
    dispatch(getSellerByIdActions.request({ sellerId }));
  };

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetSearchValue = () => {
    setSearchValue('');
  };

  useEffect(() => {
    if (sellerIdParsed && previousId !== sellerIdParsed) {
      onLoad(sellerIdParsed);
    }
  }, [sellerIdParsed]);

  const recent =
    useSelector((state: Store) => state.history.buyerRecentSearch) || [];

  const loading: boolean | undefined = useSelector(
    (state: Store) => state.getSellerById.pending || false
  );

  const seller: Seller | undefined = useSelector(
    (state: Store) => state.getSellerById.data?.data?.seller
  );

  const [isFavorite, setIsFavorite] = useState(seller?.isFavourite);

  const onFavorite = async (): Promise<any> => {
    if (seller) {
      setIsFavorite((prevState) => !prevState);

      dispatch(
        updateFavoriteSellerActions.request({
          sellerId: seller.id,
          favorite: !seller?.isFavourite,
        })
      );
    }
  };

  const getSeller = async (id: string) => {
    dispatch(getSellerByIdActions.request({ sellerId: id }));
  };

  useEffect(() => {
    if (id) getSeller(id);
  }, [id]);

  useEffect(() => {
    setIsFavorite(seller?.isFavourite);
  }, [seller]);

  const sellerRatingProps: SellerRatingProps = {
    companyName: seller?.companyName || '',
    companyImage: seller?.companyImage || '',
    companyLocation: seller?.companyLocation,
    rating: seller?.rating || 0,
    isFavorite,
    onFavorite,
  };

  const generatedProps: SellerDetailsGeneratedProps = {
    sellerRatingProps,
    results,
    onChangeSearchValue,
    resetSearchValue,
    loading,
    searchValue,
  };

  return <SellerDetailsView {...generatedProps} />;
};

export default SellerDetails;
