import React from 'react';

import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

import { RecentlyAddedGeneratedProps } from './RecentlyAdded.props';
import RecentlyAddedView from './RecentlyAdded.view';

const RecentlyAdded = (): JSX.Element => {
  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');
  const results =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.recentListing
    ) || [];

  const generatedProps: RecentlyAddedGeneratedProps = {
    results,
    isPendingAccount,
  };

  return <RecentlyAddedView {...generatedProps} />;
};

export default RecentlyAdded;
