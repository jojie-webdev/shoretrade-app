import React, { useReducer, useState } from 'react';

import { createUpdateReducer } from 'utils/Hooks';

import {
  NewCardDetails,
  PlanPaymentMethodGeneratedProps,
} from './PlanPaymentMethod.props';
import PlanPaymentMethodView from './PlanPaymentMethod.view';

const PlanPaymentMethod = (): JSX.Element => {
  const [selectedCardId, setSelectedCardId] = useState('');
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
    payPlanAmountDue,
    cards: [
      {
        brand: 'Visa',
        expMonth: 12,
        expYear: 2022,
        id: '4242',
        lastFour: '4242',
        name: 'Tester',
      },
    ],
    selectedCardId,
    setSelectedCardId,
  };

  return <PlanPaymentMethodView {...generatedProps} />;
};

export default PlanPaymentMethod;
