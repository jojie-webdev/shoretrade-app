import React, { useState, useEffect, useReducer } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { chargeCardActions, getPaymentMethodsActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { AddCreditGeneratedProps } from './AddCredit.props';
import AddCreditView from './AddCredit.view';

const AddCredit = (): JSX.Element => {
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

  const isPending =
    useSelector((state: Store) => state.chargeCard.pending) || false;
  const [selectedCardId, setSelectedCardId] = useState('');

  const defaultCardId = useSelector(
    (state: Store) => state.getPaymentMethods.data?.data.data.defaultCard || ''
  );

  const cards = useSelector(
    (state: Store) => state.getPaymentMethods.data?.data.data.cards || []
  );

  useEffect(() => {
    if (defaultCardId) {
      setSelectedCardId(defaultCardId);
    }
  }, [defaultCardId]);

  const addCredit = (amount: string) => {
    if (!isPending) {
      dispatch(
        chargeCardActions.request({
          card: selectedCardId,
          amount,
          currency: 'aud',
          companyId,
        })
      );
    }
  };

  const generatedProps: AddCreditGeneratedProps = {
    // generated props here
    isPending,
    cards,
    selectedCardId,
    setSelectedCardId,
    addCredit,
  };
  return <AddCreditView {...generatedProps} />;
};

export default AddCredit;
