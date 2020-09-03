import React, { useState, useEffect } from 'react';

import { SellerRatingProps } from 'components/module/SellerRating/SellerRating.props';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSellerByCompanyId } from 'services/company';
import {
  getSellerByIdActions,
  updateFavoriteSellerActions,
} from 'store/actions';
import { Seller } from 'types/store/GetSellerByIdState';
import { Store } from 'types/store/Store';

import SellerDetailsView from './SellerDetails.view';

const SellerDetails = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [result, setResult] = useState<any[]>([]);
  const [searchString, setSearchString] = useState('');

  const [isFavorite, setIsFavorite] = useState(false);

  const loading: boolean | undefined = useSelector(
    (state: Store) => state.getSellerById.pending || false
  );

  const seller: Seller | undefined = useSelector(
    (state: Store) => state.getSellerById.data?.data?.seller || undefined
  );

  const updateFavoriteSeller = useSelector(
    (state: Store) => state.updateFavoriteSeller
  );

  const onFavorite = async (): Promise<any> => {
    if (seller) {
      setIsFavorite((prevState) => !prevState);
      dispatch(
        updateFavoriteSellerActions.request({
          sellerId: seller.id || '',
          favorite: !seller.isFavourite,
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
    setIsFavorite(seller?.isFavourite || false);
    setResult(seller?.listings || []);
  }, [seller]);

  useEffect(() => {
    setIsFavorite(seller?.isFavourite || false);
  }, [updateFavoriteSeller]);

  useEffect(() => {
    const listings = seller?.listings || [];
    const result = listings.filter((r) => r.type.includes(searchString));
    setResult(result);
  }, [searchString]);

  // On error, set favorite back to what it originally was
  useEffect(() => {
    if (updateFavoriteSeller?.error !== '') {
      setIsFavorite(seller?.isFavourite || false);
    }
  }, [updateFavoriteSeller]);

  const sellerRatingProps: SellerRatingProps = {
    companyName: seller?.companyName || '',
    companyImage: seller?.companyImage || '',
    companyLocation: seller?.companyLocation,
    rating: seller?.rating || 0,
    isFavorite,
    onFavorite,
  };

  const generatedProps = {
    sellerRatingProps,
    loading,
    search: searchString,
    result,
    onSearch: setSearchString,
  };

  return <SellerDetailsView {...generatedProps} />;
};

export default SellerDetails;
