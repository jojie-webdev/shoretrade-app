import React, { useEffect } from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getTransactionHistoryActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { BalanceHistoryGeneratedProps } from './BalanceHistory.props';
import BalanceHistoryView from './BalanceHistory.view';

const BalanceHistory = (props: { isPlanView?: boolean }): JSX.Element => {
  const location = useLocation<{
    from: {
      label: string;
      link: string;
    };
  }>();

  const { isPlanView } = props;

  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  const token = useSelector((state: Store) => state.auth.token) || '';
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
    // eslint-disable-next-line
  }, [companyId]);

  const isLoading =
    useSelector((state: Store) => state.getTransactionHistory.pending) || false;

  const generatedProps: BalanceHistoryGeneratedProps = {
    // generated props here
    transactions:
      (isPlanView
        ? transactions?.filter((t) => t.description === 'ShoreTrade Plan')
        : transactions?.filter((t) => t.description !== 'ShoreTrade Plan')) ||
      [],
    isLoading,
    redirectFrom: location.state?.from || {
      label: 'Balance & Payments',
      link: BUYER_ACCOUNT_ROUTES.BANK_DETAILS,
    },
    isPlanView,
    token,
  };
  return <BalanceHistoryView {...generatedProps} />;
};

export default BalanceHistory;
