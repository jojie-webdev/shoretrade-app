import React, { ChangeEvent, useState } from 'react';

import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

import RecentlyAddedView from './RecentlyAdded.view';

const RecentlyAdded = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );

  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');

  const results = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.recentListing
    ) || []
  ).filter(
    (result) =>
      (searchValue
        ? result.type.toLowerCase().includes(searchValue.toLowerCase())
        : true) ||
      (searchValue
        ? result.coop.name.toLowerCase().includes(searchValue.toLowerCase())
        : true)
  );

  const isLoadingResults =
    useSelector((state: Store) => state.getBuyerHomepage.pending) || false;

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onResetSearchValue = () => {
    setSearchValue('');
  };

  const generatedProps = {
    results,
    isPendingAccount,
    isLoadingResults,
    onChangeSearchValue,
    onResetSearchValue,
    searchValue,
  };

  return <RecentlyAddedView {...generatedProps} />;
};

export default RecentlyAdded;
