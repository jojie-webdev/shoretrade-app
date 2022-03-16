import React, { useReducer, useState } from 'react';

import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { toPrice } from 'utils/String';

import {
  NewCardDetails,
  PlanPaymentMethodGeneratedProps,
} from './PlanPaymentMethod.props';
import PlanPaymentMethodView from './PlanPaymentMethod.view';

const PlanPaymentMethod = (): JSX.Element => {
  const [selectedCardId, setSelectedCardId] = useState('');

  const activePlan = useSelector(
    (store: Store) => store.getActivePlan.data?.data
  );

  const payPlanAmountDue = (newCardDetails: NewCardDetails) => {
    if (selectedCardId) {
      console.log(selectedCardId); // temporary
      // TODO: API call
    } else {
      console.log(newCardDetails); // temporary
      // TODO: API call
    }
  };

  const generatedProps: PlanPaymentMethodGeneratedProps = {
    cards: activePlan?.payment_methods.cards || [],
    amountDue: toPrice(activePlan?.price || ''),
    selectedCardId,
    payPlanAmountDue,
    setSelectedCardId,
  };

  return <PlanPaymentMethodView {...generatedProps} />;
};

export default PlanPaymentMethod;
