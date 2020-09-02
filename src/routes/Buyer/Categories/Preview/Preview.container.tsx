import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getBuyerSearchFilterDataActions,
  getListingsByTypeActions,
  currentAddressActions,
} from 'store/actions';
import { GetAddressOptions } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import CategoriesPreviewView from './Preview.view';

const CategoriesPreview = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const addresses = GetAddressOptions();
  const typeIdParsed = location.pathname.replace(
    '/buyer/categories/products/',
    ''
  );
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
    useSelector(
      (state: Store) => state.getListingTypesByCategory.request?.categoryId
    ) || '';

  const results = (
    useSelector(
      (state: Store) => state.getListingsByType.data?.data.listings
    ) || []
  ).filter((result) =>
    searchValue
      ? result.coop.name.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  // MARK:- Methods
  const onLoad = (typeId: string) => {
    dispatch(getBuyerSearchFilterDataActions.request({ typeId: typeId }));
    dispatch(getListingsByTypeActions.request({ typeId: typeId }));
  };

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetSearchValue = () => {
    setSearchValue('');
  };
  // MARK:- Effects
  useEffect(() => {
    if (typeIdParsed && previousId !== typeIdParsed) {
      onLoad(typeIdParsed);
    }
  }, [typeIdParsed]);

  const generatedProps = {
    // generated props here
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    results,
    typeId: typeIdParsed,
    onLoad,
    addresses,
    selectedAddress,
    selectAddress,
  };
  return <CategoriesPreviewView {...generatedProps} />;
};

export default CategoriesPreview;
