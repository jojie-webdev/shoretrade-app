import React, { useEffect, useReducer, useState } from 'react';

import { BUYER_MARKET_REQUEST_ROUTES, BUYER_ROUTES } from 'consts';
import moment from 'moment';
import { groupBy } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardDetails,
  PaymentMethodPublicProps,
} from 'routes/Buyer/Checkout/PaymentMethod/PaymentMethod.props';
import {
  addCardAndPayActions,
  getPaymentMethodsActions,
  marketRequestAcceptOfferActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { OrderCartItem } from 'types/store/AddCardAndPayState';
import { CartItem } from 'types/store/CartState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { isPaymentMethodAvailable } from 'utils/isPaymentMethodAvailable';

import PaymentMethodView from './PaymentMethod.view';
import { useHistory } from 'react-router';

const PaymentMethod = (props: PaymentMethodPublicProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';
  const history = useHistory();
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

  const acceptOffer = useSelector(
    (store: Store) => store.marketRequestAcceptOffer
  );

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

  const onConfirmSentOffer = () => {
    dispatch(marketRequestAcceptOfferActions.clear());
    history.push(BUYER_ROUTES.ORDERS);
  };

  const onCloseConfirmedModal = () => {
    history.push(
      BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS(
        acceptOffer?.request?.marketRequestId
      )
    );
    dispatch(marketRequestAcceptOfferActions.clear());
  };

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
    isLoading:
      pendingAddCard || processingOrder || acceptOffer.pending || false,
    addCardAndPayError,
    showPaymentSuccessModal: acceptOffer.data?.status === 200,
    onConfirmSentOffer,
    onCloseConfirmedModal,
    ...props,
  };
  return <PaymentMethodView {...generatedProps} />;
};

export default PaymentMethod;
