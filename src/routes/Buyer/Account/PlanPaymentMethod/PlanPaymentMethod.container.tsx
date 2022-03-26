import React, { useEffect, useState } from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paySubscriptionActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { toPrice } from 'utils/String';

import {
  NewCardDetails,
  PlanPaymentMethodGeneratedProps,
} from './PlanPaymentMethod.props';
import PlanPaymentMethodView from './PlanPaymentMethod.view';

const PlanPaymentMethod = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedCardId, setSelectedCardId] = useState('');

  const activePlan = useSelector(
    (store: Store) => store.getActivePlan.data?.data
  );

  const isPaymentLoading =
    useSelector((store: Store) => store.paySubscription.pending) || false;

  const isPaymentSuccess = useSelector(
    (store: Store) => store.paySubscription.data
  );

  const companyId = GetDefaultCompany()?.id;

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

  useEffect(() => {
    if (isPaymentSuccess) {
      history.push(BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN);
    }
  }, [isPaymentSuccess]);

  const generatedProps: PlanPaymentMethodGeneratedProps = {
    cards: activePlan?.payment_methods.cards || [],
    amountDue: toPrice(activePlan?.price || ''),
    selectedCardId,
    isPaymentLoading,
    payPlanAmountDue,
    setSelectedCardId,
  };

  return <PlanPaymentMethodView {...generatedProps} />;
};

export default PlanPaymentMethod;
