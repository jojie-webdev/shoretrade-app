import React from 'react';

import { Amex, Mastercard, Visa } from 'components/base/SVG';

import { CreditCardLogoProps } from './CreditCardLogo.props';

const CreditCardLogo = (props: CreditCardLogoProps): JSX.Element => {
  const creditCardLogos: Record<string, JSX.Element> = {
    mastercard: <Mastercard />,
    visa: <Visa />,
    american_express: <Amex />,
  };

  return creditCardLogos[props.type];
};

export default React.memo(CreditCardLogo);
