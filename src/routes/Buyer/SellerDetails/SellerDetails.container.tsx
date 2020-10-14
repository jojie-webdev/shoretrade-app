import React, { useState, useEffect, ChangeEvent } from 'react';

import { SellerRatingProps } from 'components/module/SellerRating/SellerRating.props';
import { pathOr, remove } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  currentAddressActions,
  getSellerByIdActions,
  historyActions,
  searchAndCountProductTypeActions,
  updateFavoriteSellerActions,
} from 'store/actions';
import { GetAddressOptions } from 'store/selectors/buyer';
import { GetAllListingsSelector } from 'store/selectors/seller/listings';
import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';
import { GetListingResponseItem } from 'types/store/GetListingState';
import { Seller } from 'types/store/GetSellerByIdState';
import { Store } from 'types/store/Store';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';

import { SellerDetailsGeneratedProps } from './SellerDetails.props';
import SellerDetailsView from './SellerDetails.view';

const SellerDetails = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sellerIdParsed = id;
  const [searchWord, setSearchWord] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const addresses = GetAddressOptions();
  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';
  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };

  const previousId =
    useSelector((state: Store) => state.getSellerById.request?.sellerId) || '';

  const searching = () => {
    dispatch(
      searchAndCountProductTypeActions.request({
        term: searchWord,
        address: '',
      })
    );
  };

  const results = (
    useSelector(
      (state: Store) => state.getSellerById.data?.data.seller.listings
    ) || []
  ).filter((result) => {
    return searchValue
      ? result.type.toLowerCase().includes(searchValue.toLowerCase())
      : true;
  });

  // const products = transformProduct(results);

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

  const onReset = () => {
    setSearchWord('');
  };

  const recent =
    useSelector((state: Store) => state.history.buyerRecentSearch) || [];

  const saveSearchHistory = (id: string, label: string, count: string) => {
    const historyLimit = 20;
    const isExisting = recent.findIndex((r) => r.value === id) !== -1;
    if (!isExisting) {
      dispatch(
        historyActions.update({
          buyerRecentSearch: [
            ...(recent.length === historyLimit ? remove(0, 1, recent) : recent),
            {
              value: id,
              label,
              count,
            },
          ],
        })
      );
    }
  };

  const [result, setResult] = useState<any[]>([]);
  const [searchString, setSearchString] = useState('');

  const loadingProductSearch =
    useSelector((state: Store) => state.searchAndCountProductType.pending) ||
    false;

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

  const productSearchResultsHeader =
    useSelector(
      (state: Store) => state.searchAndCountProductType.data?.data.types
    ) || [];

  const getSeller = async (id: string) => {
    dispatch(getSellerByIdActions.request({ sellerId: id }));
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerId = setTimeout(() => {
      searching();
    }, 800);

    setTimer(timerId);
  }, [searchWord]);

  useEffect(() => {
    if (id) getSeller(id);
  }, [id]);

  useEffect(() => {
    setIsFavorite(seller?.isFavourite);
    setResult(seller?.listings || []);
  }, [seller]);

  const sellerRatingProps: SellerRatingProps = {
    companyName: seller?.companyName || '',
    companyImage: seller?.companyImage || '',
    companyLocation: seller?.companyLocation,
    rating: seller?.rating || 0,
    isFavorite,
    onFavorite,
  };

  const currentListing: GetListingResponseItem = useSelector(
    (state: Store) => state.getSellerById.data?.data.seller.listings || []
  )[0];

  const generatedProps: SellerDetailsGeneratedProps = {
    sellerRatingProps,
    onReset,
    searchWord,
    searching,
    recent,
    // products,
    results,
    loadingProductSearch,
    productSearchResultsHeader,
    saveSearchHistory,
    setSearchWord,
    addresses,
    onChangeSearchValue,
    onLoad,
    resetSearchValue,
    loading,
    searchValue,
    selectAddress,
    selectedAddress,
    sellerId: sellerIdParsed,
  };

  return <SellerDetailsView {...generatedProps} />;
};

export default SellerDetails;
