import React, { useEffect, useReducer, useState } from 'react';

import moment from 'moment';
import { groupBy, omit } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addCardAndPayActions,
  getNegotiationByIdActions,
  getPaymentMethodsActions,
  orderActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { OrderCartItem } from 'types/store/AddCardAndPayState';
import { GetCartDataItem } from 'types/store/GetCartState';
import { Store } from 'types/store/Store';
import { getOrderListingKey } from 'utils/getOrderListingKey';
import { createUpdateReducer } from 'utils/Hooks';
import { isPaymentMethodAvailable } from 'utils/isPaymentMethodAvailable';

import { cartItemsToPayload } from '../NegotiationCheckout.transform';
import {
  CardDetails,
  NegotiationPaymentMethodPublicProps,
} from './NegotiationPaymentMethod.props';
import NegotiationPaymentMethodView from './NegotiationPaymentMethod.view';

const NegotiationPaymentMethod = (
  props: NegotiationPaymentMethodPublicProps
): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const params = useParams<{ negotiationId: string }>();
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

  const negotiation = useSelector(
    (state: Store) => state.getNegotiationById.data?.data
  );

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

  const cartData = useSelector(
    (store: Store) => store.getCartByEmployeeIdAndNegotiationId.data?.data
  );
  let cartDataItems = cartData?.items || {};
  cartDataItems = omit(['negotiation_request'], cartDataItems);

  const cartItems = Object.keys(cartDataItems).map((key) => ({
    ...cartDataItems[key],
    cartItemId: key,
  }));

  const getAgreedPrice = () => {
    return (
      negotiation?.negotiation_offer?.counter_offer ||
      Number(negotiation?.counter_offer || 0)
    );
  };

  const onAddCard = (values: CardDetails) => {
    if (
      !pendingAddCard &&
      currentAddress &&
      isPaymentMethodAvailable(paymentModes, 'CREDIT_CARD')
    ) {
      const payload = cartItemsToPayload(cartItems, props.selectedShipping);
      payload[0][0].listing.price = getAgreedPrice().toString();
      // payload[0][0].subTotal = getAgreedPrice() * negotiation.desired_quantity;

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
            exp_month: parseInt(values.exp.split('/')[0].trim()),
            exp_year: parseInt(
              moment(values.exp.split('/')[1], 'YY').format('YYYY')
            ),
            cvc: values.cvc,
            name: values.name,
          },
          companyId: companyId,
          default: values.isDefault,
          paymentMode: 'CREDIT_CARD',
        })
      );
    }
  };

  const clearOrders = () => {
    dispatch(orderActions.clear());
  };

  const onExistingCard = () => {
    if (
      !pendingAddCard &&
      currentAddress &&
      isPaymentMethodAvailable(paymentModes, 'CREDIT_CARD')
    ) {
      const payload = cartItemsToPayload(cartItems, props.selectedShipping);
      payload[0][0].listing.price = getAgreedPrice().toString();
      // payload[0][0].subTotal = getAgreedPrice() * negotiation.desired_quantity;

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
    if (params.negotiationId) {
      dispatch(
        getNegotiationByIdActions.request({
          negotiationRequestId: params.negotiationId,
        })
      );
    }
  }, [params.negotiationId]);

  useEffect(() => {
    if (companyId) {
      if (props.onRefresh) {
        props.onRefresh();
      }
      dispatch(getPaymentMethodsActions.request({ companyId }));
    }
    // eslint-disable-next-line
  }, [companyId]);

  useEffect(() => {
    if (addCardAndPayError) {
      setTimeout(() => {
        dispatch(addCardAndPayActions.clear());
      }, 10000);
    }
  }, [addCardAndPayError]);

  const generatedProps = {
    balance: currentCompany?.credit || '',
    cards,
    cardDetails,
    clearOrders,
    setCardDetails,
    selectedCard,
    setSelectedCard,
    isLoading: pendingAddCard || processingOrder,
    onAddCard,
    onExistingCard,
    addCardAndPayError,
    onRefresh: props.onRefresh,
    ...props,
  };
  return <NegotiationPaymentMethodView {...generatedProps} />;
};

export default NegotiationPaymentMethod;
