import React from 'react';

import { useSelector } from 'react-redux';
import { GetAddressOptions } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { RecentlyAddedGeneratedProps } from './RecentlyAdded.props';
import RecentlyAddedView from './RecentlyAdded.view';

const RecentlyAdded = (): JSX.Element => {
  const results =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.recentListing
    ) || [];

  const generatedProps: RecentlyAddedGeneratedProps = {
    results,
  };

  return <RecentlyAddedView {...generatedProps} />;
};

export default RecentlyAdded;
