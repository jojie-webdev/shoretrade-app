import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getTransactionHistoryActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { PaymentHistoryGeneratedProps } from './PaymentHistory.props';
import PaymentHistoryView from './PaymentHistory.view';

const PaymentHistory = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

  const transactions = useSelector(
    (state: Store) => state.getTransactionHistory.data?.data.transactions
  );
  const token = useSelector((state: Store) => state.auth.token) || '';

  const getTransactionHistory = () => {
    if (companyId) {
      dispatch(getTransactionHistoryActions.request({ companyId }));
    }
  };

  useEffect(() => {
    getTransactionHistory();
    // eslint-disable-next-line
  }, [companyId]);

  const subscriptionPlan = companyPlan?.activePlans
    ? companyPlan.activePlans[0].plan.alias
    : 'Unsubscribed';

  const isLoading =
    useSelector((state: Store) => state.getTransactionHistory.pending) || false;

  const generatedProps: PaymentHistoryGeneratedProps = {
    // generated props here
    subscriptionPlan,
    transactions: transactions || [],
    isLoading,
    token,
  };
  return <PaymentHistoryView {...generatedProps} />;
};

export default PaymentHistory;
