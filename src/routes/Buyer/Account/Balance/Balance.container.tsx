import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getPaymentMethodsActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import BalanceView from './Balance.view';

const Balance = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  const getPaymentMethods = () => {
    if (companyId) {
      dispatch(getPaymentMethodsActions.request({ companyId }));
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const defaultCardId =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data.defaultCard
    ) || '';

  const cards = (
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data.cards
    ) || []
  ).map((card) => ({
    ...card,
    isDefault: card.id === defaultCardId,
  }));

  const generatedProps = {
    // generated props here
    credit: currentCompany?.credit || '',
    cards,
  };
  return <BalanceView {...generatedProps} />;
};

export default Balance;
