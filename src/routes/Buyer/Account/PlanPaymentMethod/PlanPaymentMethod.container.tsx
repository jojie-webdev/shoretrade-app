import React, { useEffect, useState } from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  deleteCardActions,
  getMarketInterestsActions,
  getPaymentMethodsActions,
  getSubscriptionPlansActions,
  paySubscriptionActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
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
  const [selectedCardId, setSelectedCardId] = useState('');
  const currentCompany = GetDefaultCompany();

  // SELECTORS

  const marketSector = useSelector(
    (store: Store) => store.getMarketInterests.data?.data
  );

  const subscriptionPlans = useSelector(
    (store: Store) => store.getSubscriptionPlans.data?.data
  );

  const activePlan = useSelector(
    (store: Store) => store.getActivePlan.data?.data
  );

  const isPaymentLoading =
    useSelector((store: Store) => store.paySubscription.pending) || false;

  const isPaymentSuccess = useSelector(
    (store: Store) => store.paySubscription.data
  );

  const companyId = GetDefaultCompany()?.id;

  const cards =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.cards
    ) || [];

  const defaultCard =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.defaultCard
    ) || null;

  const isRemoving =
    useSelector((state: Store) => state.deleteCard.pending) || false;

  const deleteCardStatus =
    useSelector((state: Store) => state.deleteCard.data?.status) || false;

  const onRemoveCard = (card: Card) => {
    if (!isRemoving) {
      dispatch(
        deleteCardActions.request({
          companyId: currentCompany?.id || '',
          card: card?.id || '',
        })
      );
    }
  };

  // USE EFFECTS

  useEffect(() => {
    if (companyId) {
      dispatch(getMarketInterestsActions.request({ companyId }));
      dispatch(getPaymentMethodsActions.request({ companyId }));
    }
  }, [companyId]);

  useEffect(() => {
    dispatch(getSubscriptionPlansActions.request({}));
  }, []);

  useEffect(() => {
    if (!deleteCardStatus && isPaymentSuccess) {
      history.push(BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN);
    }
  }, [isPaymentSuccess]);

  // METHODS

  const payPlanAmountDue = (newCardDetails: NewCardDetails) => {
    if (companyId) {
      dispatch(
        paySubscriptionActions.request({
          companyId,
          existingCard: selectedCardId,
          cardDetails: newCardDetails,
        })
      );
    }
  };

  // VARIABLES

  const plans =
    (marketSector &&
      subscriptionPlans?.filter((plan) =>
        plan.alias.includes(_.snakeCase(marketSector?.sector).toUpperCase())
      )) ||
    [];
  const monthlyPlan = plans.find((plan) => !plan.alias.includes('YEARLY'));

  const generatedProps: PlanPaymentMethodGeneratedProps = {
    cards,
    amountDue: toPrice(activePlan?.price || monthlyPlan?.price || 0),
    selectedCardId,
    isPaymentLoading,
    payPlanAmountDue,
    setSelectedCardId,
    defaultCard: defaultCard ? defaultCard : '',
    onRemoveCard,
  };

  return <PlanPaymentMethodView {...generatedProps} />;
};

export default PlanPaymentMethod;
