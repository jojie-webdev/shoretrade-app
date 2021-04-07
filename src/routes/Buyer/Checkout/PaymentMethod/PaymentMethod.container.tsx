import React, { useReducer } from 'react';

import {
  CardDetails,
  PaymentMethodPublicProps,
} from 'routes/Buyer/Checkout/PaymentMethod/PaymentMethod.props';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { createUpdateReducer } from 'utils/Hooks';

import PaymentMethodView from './PaymentMethod.view';

const PaymentMethod = (props: PaymentMethodPublicProps): JSX.Element => {
  const currentCompany = GetDefaultCompany();

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

  const generatedProps = {
    balance: currentCompany?.credit || '',
    cardDetails,
    setCardDetails,
    ...props,
  };
  return <PaymentMethodView {...generatedProps} />;
};

export default PaymentMethod;
