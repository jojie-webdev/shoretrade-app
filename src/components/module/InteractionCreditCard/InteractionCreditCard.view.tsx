import React from 'react';

import CreditCard from 'components/base/CreditCard';
import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';

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
  return (
    <CustomInteractions
      {...props}
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
    >
      <CardName variant="overline" color="shade6">
        Credit Cards
      </CardName>
      <CreditCard
        lastFour={props.lastFour}
        brand={props.brand}
        expMonth={props.expMonth.toString() || ''}
        expYear={props.expYear.toString() || ''}
      />
    </CustomInteractions>
  );
};

export default React.memo(InteractionCreditCard);
