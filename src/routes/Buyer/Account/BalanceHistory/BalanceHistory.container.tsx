import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getTransactionHistoryActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { BalanceHistoryGeneratedProps } from './BalanceHistory.props';
import BalanceHistoryView from './BalanceHistory.view';

const BalanceHistory = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  const transactions = useSelector(
    (state: Store) => state.getTransactionHistory.data?.data.transactions
  );

  const getTransactionHistory = () => {
    if (companyId) {
      dispatch(getTransactionHistoryActions.request({ companyId }));
    }
  };

  useEffect(() => {
    getTransactionHistory();
  }, [companyId]);

  const isLoading =
    useSelector((state: Store) => state.getTransactionHistory.pending) || false;

  const generatedProps: BalanceHistoryGeneratedProps = {
    // generated props here
    transactions: transactions || [],
    isLoading,
  };
  return <BalanceHistoryView {...generatedProps} />;
};

export default BalanceHistory;
