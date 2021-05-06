import React, { useState, ChangeEvent } from 'react';

import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

import SellerLandingView from './SellerLanding.view';

const SellerLanding = (): JSX.Element => {
  const [search, setSearch] = useState('');

  const results = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.sellers
    ) || []
  ).filter((result) =>
    search
      ? result.companyName.toLowerCase().includes(search.toLowerCase())
      : true
  );

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const generatedProps = {
    results,
    onChangeSearchValue,
    search,
  };

  return <SellerLandingView {...generatedProps} />;
};

export default SellerLanding;
