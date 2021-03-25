import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListingTypesByCategoryActions } from 'store/actions';
import { Store } from 'types/store/Store';

import { CategoriesSearchGeneratedProps } from './Search.props';
import CategoriesSearchView from './Search.view';
const CategoriesSearch = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id }: any = useParams();

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');
  const addressCount = (addresses || []).length;

  const previousId =
    useSelector(
      (state: Store) => state.getListingTypesByCategory.request?.categoryId
    ) || '';

  const loading =
    useSelector((state: Store) => state.getListingTypesByCategory.pending) ||
    false;

  const isSuccess =
    useSelector(
      (state: Store) => state.getListingTypesByCategory.data?.status === 200
    ) || false;

  const results =
    useSelector(
      (state: Store) => state.getListingTypesByCategory.data?.data.type
    ) || [];

  const onLoad = (categoryId: string) => {
    dispatch(
      getListingTypesByCategoryActions.request({ categoryId: categoryId })
    );
  };
  useEffect(() => {
    if (addressCount > 0 && id && previousId !== id) {
      onLoad(id);
    }
  }, [id, addressCount]);

  const generatedProps: CategoriesSearchGeneratedProps = {
    loading,
    results,
    isSuccess,
    isPendingAccount,
  };
  return <CategoriesSearchView {...generatedProps} />;
};

export default CategoriesSearch;
