import React, { useEffect, useReducer, useState } from 'react';

import { BUYER_MARKET_REQUEST_ROUTES, BUYER_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  CardDetails,
  PaymentMethodPublicProps,
} from 'routes/Buyer/Checkout/PaymentMethod/PaymentMethod.props';
import {
  getPaymentMethodsActions,
  marketRequestAcceptOfferActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';

import PaymentMethodView from './PaymentMethod.view';

const PaymentMethod = (props: PaymentMethodPublicProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';
  const history = useHistory();
  const [selectedCard, setSelectedCard] = useState('');

  const cards =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.cards
    ) || [];

  const acceptOffer = useSelector(
    (store: Store) => store.marketRequestAcceptOffer
  );

  const marketOffer = useSelector((store: Store) => store.marketOffer);

  const pendingAddCard =
    useSelector((state: Store) => state.addCardAndPay.pending) || false;
  const processingOrder =
    useSelector((store: Store) => store.order.pending) || false;

  const addCardAndPayError =
    useSelector((store: Store) => store.marketRequestAcceptOffer.error) || '';

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

  const onConfirmSentOffer = () => {
    dispatch(marketRequestAcceptOfferActions.clear());
    history.push(BUYER_ROUTES.ORDERS);
  };

  const onCloseConfirmedModal = () => {
    if (marketOffer?.marketRequestId)
      history.push(
        BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS(
          marketOffer?.marketRequestId.toString()
        )
      );
    dispatch(marketRequestAcceptOfferActions.clear());
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
