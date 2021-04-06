import React from 'react';

import CreditCard from 'components/base/CreditCard';
import {
  ChevronRight,
  Visa,
  Mastercard,
  Zippay,
  Paypal,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';

// import { useTheme } from 'utils/Theme';
import { InteractionCreditCardProps } from './InteractionCreditCard.props';
import {
  LeftComponent,
  RightComponent,
  CustomInteractions,
  CardName,
} from './InteractionCreditCard.style';

const InteractionCreditCard = (
  props: InteractionCreditCardProps
): JSX.Element => {
  // const theme = useTheme();

  return (
    <CustomInteractions
      {...props}
      leftComponent={
        <LeftComponent>
          <CardName variant="overline" color="shade6">
            Credit Cards
          </CardName>
          <CreditCard lastFour={props.lastFour} brand={props.brand} />
        </LeftComponent>
      }
      rightComponent={
        props.isDefault ? (
          <RightComponent>
            <Typography variant="caption" color="shade6">
              Default
            </Typography>
            <ChevronRight width={8} height={12} />
          </RightComponent>
        ) : null
      }
    />
  );
};

export default React.memo(InteractionCreditCard);
