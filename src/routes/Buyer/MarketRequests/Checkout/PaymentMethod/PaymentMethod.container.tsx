import React, { useEffect, useReducer, useState } from 'react';

import moment from 'moment';
import { groupBy } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardDetails,
  PaymentMethodPublicProps,
} from 'routes/Buyer/Checkout/PaymentMethod/PaymentMethod.props';
import { addCardAndPayActions, getPaymentMethodsActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { OrderCartItem } from 'types/store/AddCardAndPayState';
import { CartItem } from 'types/store/CartState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { isPaymentMethodAvailable } from 'utils/isPaymentMethodAvailable';

import PaymentMethodView from './PaymentMethod.view';

const PaymentMethod = (props: PaymentMethodPublicProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';
  const paymentModes = useSelector(
    (state: Store) => state.getPaymentMode.data?.data.payment_mode
  );
  const [selectedCard, setSelectedCard] = useState('');

  const user =
    useSelector((state: Store) => state.getUser.data?.data.user.email) || '';
  const addresses =
    useSelector((store: Store) => store.getAddresses.data?.data.addresses) ||
    [];

  const cards =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.cards
    ) || [];

  const pendingAddCard =
    useSelector((state: Store) => state.addCardAndPay.pending) || false;
  const processingOrder =
    useSelector((store: Store) => store.order.pending) || false;

  const addCardAndPayError =
    useSelector((store: Store) => store.marketRequestAcceptOffer.error) || '';

  const currentAddress = addresses.find((a) => a.default);

  const [cardDetails, setCardDetails] = useReducer(
    createUpdateReducer<CardDetails>(),
    {
      number: '',
      exp: '',
      cvc: '',
      name: '',
      isDefault: false,
    }
  );

  const cart = useSelector((store: Store) => store.cart) || {};

  const cartItems = Object.keys(cart).map((key) => ({
    ...cart[key],
    cartId: key,
  }));

  useEffect(() => {
    if (companyId) {
      dispatch(getPaymentMethodsActions.request({ companyId }));
    }
  }, [companyId]);

  const generatedProps = {
    balance: currentCompany?.credit || '',
    cards,
    cardDetails,
    setCardDetails,
    selectedCard,
    setSelectedCard,
    isLoading: pendingAddCard || processingOrder,
    addCardAndPayError,
    ...props,
  };
  return <PaymentMethodView {...generatedProps} />;
};

export default PaymentMethod;
