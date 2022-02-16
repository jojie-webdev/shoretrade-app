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
import { GetCartDataItem } from 'types/store/GetCartState';
import { Store } from 'types/store/Store';
import { getOrderListingKey } from 'utils/getOrderListingKey';
import { createUpdateReducer } from 'utils/Hooks';
import { isPaymentMethodAvailable } from 'utils/isPaymentMethodAvailable';

import { cartItemsToPayload } from '../Checkout.transform';
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
    useSelector((store: Store) => store.addCardAndPay.error) || '';

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

  const cartData = useSelector((store: Store) => store.getCart.data?.data);
  const cartDataItems = cartData?.items || {};

  const cartItems = Object.keys(cartDataItems).map((key) => ({
    ...cartDataItems[key],
    cartItemId: key,
  }));

  const onAddCard = (values: CardDetails) => {
    if (
      !pendingAddCard &&
      currentAddress &&
      isPaymentMethodAvailable(paymentModes, 'CREDIT_CARD')
    ) {
      const payload = cartItemsToPayload(cartItems, props.selectedShipping);

      dispatch(
        addCardAndPayActions.request({
          cartId: cartData?.id || '',
          employeeId: currentCompany?.employeeId || '',
          cart: payload,
          currentAddress,
          totalPrice: props.totalValue,
          email: user,
          card: {
            number: Number(values.number.replace(/\D/g, '')),
            exp_month: values.exp.split('/')[0].trim(),
            exp_year: moment(values.exp.split('/')[1], 'YY').format('YYYY'),
            cvc: Number(values.cvc),
            name: values.name,
          },
          companyId: companyId,
          default: values.isDefault,
          paymentMode: 'CREDIT_CARD',
        })
      );
    }
  };

  const onExistingCard = () => {
    if (
      !pendingAddCard &&
      currentAddress &&
      isPaymentMethodAvailable(paymentModes, 'CREDIT_CARD')
    ) {
      const payload = cartItemsToPayload(cartItems, props.selectedShipping);

      dispatch(
        addCardAndPayActions.request({
          cartId: cartData?.id || '',
          employeeId: currentCompany?.employeeId || '',
          cart: payload,
          currentAddress,
          totalPrice: props.totalValue,
          email: user,
          existingCard: selectedCard,
          companyId: companyId,
          paymentMode: 'CREDIT_CARD',
        })
      );
    }
  };

  useEffect(() => {
    if (companyId) {
      dispatch(getPaymentMethodsActions.request({ companyId }));
    }
    // eslint-disable-next-line
  }, [companyId]);

  const generatedProps = {
    balance: currentCompany?.credit || '',
    cards,
    cardDetails,
    setCardDetails,
    selectedCard,
    setSelectedCard,
    isLoading: pendingAddCard || processingOrder,
    onAddCard,
    onExistingCard,
    addCardAndPayError,
    ...props,
  };
  return <PaymentMethodView {...generatedProps} />;
};

export default PaymentMethod;
