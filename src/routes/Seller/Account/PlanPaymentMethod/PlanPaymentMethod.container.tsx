import React, { useEffect, useReducer, useState } from 'react';

import { REVERSE_MARKETPLACE_PRICE } from 'consts/prices';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  deleteCardActions,
  getPaymentMethodsActions,
  paySubscriptionActions,
} from 'store/actions';
import { CompanyPlanAlias } from 'types/store/GetCompanyPlanState';
import { Store } from 'types/store/Store';
import { createUpdateReducer, useCompany } from 'utils/Hooks';
import { toPrice } from 'utils/String';
import { useTheme } from 'utils/Theme';

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
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';

  const isPaymentLoading =
    useSelector((store: Store) => store.paySubscription.pending) || false;

  const isPaymentSuccess = useSelector(
    (store: Store) => store.paySubscription.data
  );

  const cards =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.cards
    ) || [];

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

  const defaultCard =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.defaultCard
    ) || null;

  const isRemoving =
    useSelector((state: Store) => state.deleteCard.pending) || false;

  const deleteCardStatus =
    useSelector((state: Store) => state.deleteCard.data?.status) || false;

  const currentReverseMarketPlan = companyPlan?.activePlans.find(
    (ac) =>
      ac.plan.alias === CompanyPlanAlias.FEATURE_REVERSED_MARKETPLACE_SELLER
  );

  const amountDue =
    currentReverseMarketPlan && companyPlan?.flags.hasPendingPayment
      ? toPrice(currentReverseMarketPlan.plan.price)
      : undefined;

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
    cards: cards || [],
    amountDue,
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
