import React, { useEffect, useReducer, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteCardActions, getPaymentMethodsActions, paySubscriptionActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { createUpdateReducer, useCompany } from 'utils/Hooks';
import { toPrice } from 'utils/String';

import {
  Card,
  NewCardDetails,
  PlanPaymentMethodGeneratedProps,
} from './PlanPaymentMethod.props';
import PlanPaymentMethodView from './PlanPaymentMethod.view';

const PlanPaymentMethod = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [companyId] = useCompany();
  const [selectedCardId, setSelectedCardId] = useState('');

  const isPaymentLoading =
    useSelector((store: Store) => store.paySubscription.pending) || false;

  const isPaymentSuccess = useSelector(
    (store: Store) => store.paySubscription.data
  );

  const cards =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.cards
    ) || [];

  const activePlan = useSelector(
    (store: Store) => store.getActivePlan.data?.data
  );

  const defaultCard =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.defaultCard
    ) || null;

  const isRemoving =
    useSelector((state: Store) => state.deleteCard.pending) || false;

  const deleteCardStatus =
    useSelector((state: Store) => state.deleteCard.data?.status) || false;

  const payPlanAmountDue = (newCardDetails: NewCardDetails) => {
    if (selectedCardId) {
      if (companyId) {
        dispatch(
          paySubscriptionActions.request({
            companyId,

            existingCard: selectedCardId,
            cardDetails: newCardDetails,
          })
        );
      }
    } else {
      console.log(newCardDetails); // temporary
      // TODO: API call
    }
  };

  const onRemoveCard = (card: Card) => {
    if (!isRemoving) {
      dispatch(
        deleteCardActions.request({
          companyId: companyId || '',
          card: card?.id || '',
        })
      );
    }
  };

  useEffect(() => {
    if (companyId) {
      dispatch(getPaymentMethodsActions.request({ companyId }));
    }
  }, [companyId]);

  const generatedProps: PlanPaymentMethodGeneratedProps = {
    cards: activePlan?.payment_methods.cards || [],
    amountDue: activePlan?.price ? toPrice(activePlan?.price || 0) : undefined,
    selectedCardId,
    payPlanAmountDue,
    setSelectedCardId,
    isPaymentLoading,
    defaultCard: defaultCard ? defaultCard : '',
    onRemoveCard,
    companyId,
  };

  return <PlanPaymentMethodView {...generatedProps} />;
};

export default PlanPaymentMethod;
