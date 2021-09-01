import React from 'react';

import CreditCard from 'components/base/CreditCard';
import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';

import { CreditCardCardProps } from './CreditCardCard.props';
import {
  CustomInteractions,
  LeftComponent,
  RightComponent,
} from './CreditCardCard.style';

const CreditCardCard = (props: CreditCardCardProps): JSX.Element => {
  return (
    <CustomInteractions
      {...props}
      leftComponent={
        <LeftComponent>
          <CreditCard
            lastFour={props.lastFour}
            brand={props.brand}
            expMonth={props.expMonth?.toString() || ''}
            expYear={props.expYear?.toString() || ''}
          />
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

export default React.memo(CreditCardCard);
