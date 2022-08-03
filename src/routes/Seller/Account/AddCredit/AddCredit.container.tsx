import React, { useState, useEffect } from 'react';

import { API } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { chargeCardActions, getPaymentMethodsActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';
import { isPaymentMethodAvailable } from 'utils/isPaymentMethodAvailable';

import { AddCreditGeneratedProps } from './AddCredit.props';
import AddCreditView from './AddCredit.view';

const AddCredit = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [companyId] = useCompany();

  const getPaymentMethods = () => {
    if (companyId) {
      dispatch(getPaymentMethodsActions.request({ companyId }));
    }
  };

  useEffect(() => {
    getPaymentMethods();
    // eslint-disable-next-line
  }, [companyId]);

  const paymentModes = useSelector(
    (state: Store) => state.getPaymentMode.data?.data.payment_mode
  );

  const isPending =
    useSelector((state: Store) => state.chargeCard.pending) || false;
  const [selectedCardId, setSelectedCardId] = useState('');

  const defaultCardId = useSelector(
    (state: Store) => state.getPaymentMethods.data?.data.data?.defaultCard || ''
  );

  const cards = useSelector(
    (state: Store) => state.getPaymentMethods.data?.data.data?.cards || []
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
    // eslint-disable-next-line
  }, [chargeCardResult]);

  const addCredit = (amount: string) => {
    if (!isPending && isPaymentMethodAvailable(paymentModes, 'CREDIT_CARD')) {
      dispatch(
        chargeCardActions.request({
          card: selectedCardId,
          amount,
          currency: 'aud',
          companyId,
          paymentMode: 'CREDIT_CARD',
        })
      );
      setSubmitted(true);
    }
  };

  const token = useSelector((state: Store) => state.auth.token) || '';

  const downloadInvoice = (amount: string) => {
    if (Number(amount) > 0) {
      //TODO: tb created: sfm-blue pdf url, same issue with buyer
      window.open(
        `${API.PDF_URL || API.URL}/${
          API.VERSION
        }/company/bank-transfer/Invoice?amount=${amount}&token=${token}`,
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
