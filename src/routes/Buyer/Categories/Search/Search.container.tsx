import React, { ChangeEvent, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListingTypesByCategoryActions } from 'store/actions';
import { Store } from 'types/store/Store';
import useLocalStorage from 'utils/Hooks/useLocalStorage';

import { CategoriesSearchGeneratedProps } from './Search.props';
import CategoriesSearchView from './Search.view';
const CategoriesSearch = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id }: any = useParams();

  const [search, setSearch] = useState('');

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');
  const addressCount = (addresses || []).length;

  const [prevTypeId, setPrevTypeId] = useLocalStorage('prev-type-id', '');

  const previousId =
    useSelector(
      (state: Store) => state.getListingTypesByCategory.request?.categoryId
    ) || '';

  const loading =
    useSelector((state: Store) => state.getListingTypesByCategory.pending) ||
    false;

  const results = (
    useSelector(
      (state: Store) => state.getListingTypesByCategory.data?.data.type
    ) || []
  ).filter((c) =>
    search ? c.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  const onLoad = (categoryId: string) => {
    dispatch(
      getListingTypesByCategoryActions.request({ categoryId: categoryId })
    );
  };

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onResetSearchValue = () => {
    setSearch('');
  };

  useEffect(() => {
    if (addressCount > 0 && id && previousId !== id) {
      onLoad(id);
    }
  }, [id, addressCount]);

  useEffect(() => {
    setPrevTypeId(''); // reset item id
  }, []);

  const generatedProps: CategoriesSearchGeneratedProps = {
    loading,
    results,
    isPendingAccount,
    search,
    onChangeSearchValue,
    onResetSearchValue,
  };
  return <CategoriesSearchView {...generatedProps} />;
};

export default CategoriesSearch;
