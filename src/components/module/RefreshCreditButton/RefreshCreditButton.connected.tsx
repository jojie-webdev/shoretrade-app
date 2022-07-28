import React, { ChangeEvent, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { syncAASBalance } from 'services/aas';
import { getUserActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { RefreshCreditButtonProps } from './RefreshCreditButton.props';
import RefreshCreditButtonView from './RefreshCreditButton.view';

const XRefreshCreditButton = (props: RefreshCreditButtonProps): JSX.Element => {
  const dispatch = useDispatch();

  const [isSyncing, setIsSyncing] = useState(false);

  const currentCompany = GetDefaultCompany();

  // const isLoading =
  //   useSelector((state: Store) => state.getUser.pending) || isSyncing;

  const isLoading = isSyncing;

  const onRefresh = async () => {
    if (currentCompany && !isLoading) {
      try {
        setIsSyncing(true);
        await syncAASBalance(currentCompany.id);
        setIsSyncing(false);
        dispatch(getUserActions.request());
      } catch (e) {
        console.log(e);
        setIsSyncing(false);
      }
    }
  };

  return (
    <RefreshCreditButtonView
      {...props}
      onRefresh={onRefresh}
      isRefreshing={isLoading}
    />
  );
};

export default XRefreshCreditButton;
