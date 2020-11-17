import React, { useState, useEffect, useReducer } from 'react';

import { API } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { chargeCardActions, getPaymentMethodsActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { AddCreditGeneratedProps } from './AddCredit.props';
import AddCreditView from './AddCredit.view';

const AddCredit = (): JSX.Element => {
  const history = useHistory();
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
  }, [companyId]);

  const isPending =
    useSelector((state: Store) => state.chargeCard.pending) || false;
  const [selectedCardId, setSelectedCardId] = useState('');

  const defaultCardId = useSelector(
    (state: Store) => state.getPaymentMethods.data?.data.data.defaultCard || ''
  );

  const cards = useSelector(
    (state: Store) => state.getPaymentMethods.data?.data.data.cards || []
  );

  const chargeCardResult = useSelector((state: Store) => state.chargeCard);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultCardId) {
      setSelectedCardId(defaultCardId);
    }
  }, [defaultCardId]);

  useEffect(() => {
    if (chargeCardResult.data && submitted) history.goBack();
  }, [chargeCardResult]);

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
      setSubmitted(true);
    }
  };

  const token = useSelector((state: Store) => state.auth.token) || '';

  const downloadInvoice = (amount: string) => {
    if (Number(amount) > 0) {
      window.open(
        `${API.URL}/${API.VERSION}/company/bank-transfer/Invoice?amount=${amount}&token=${token}`,

        '_blank'
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
    chargeCardResult,
    downloadInvoice,
  };
  return <AddCreditView {...generatedProps} />;
};

export default AddCredit;
