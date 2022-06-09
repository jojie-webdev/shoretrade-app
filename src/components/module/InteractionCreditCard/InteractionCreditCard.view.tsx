import React from 'react';

import Button from 'components/base/Button';
import CreditCard from 'components/base/CreditCard';
import { ChevronRight, TrashCan } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { InteractionCreditCardProps } from './InteractionCreditCard.props';
import {
  RightComponent,
  CustomInteractions,
  CardName,
} from './InteractionCreditCard.style';

const InteractionCreditCard = (
  props: InteractionCreditCardProps
): JSX.Element => {
  const theme = useTheme();
  return (
    <CustomInteractions
      {...props}
      rightComponent={
        props.isDefault ? (
          <RightComponent>
            <Typography variant="caption" color="shade6">
              Default
            </Typography>
            {!props.hideDetailBtn && <ChevronRight width={8} height={12} />}
          </RightComponent>
        ) : props.onRemove ? (
          <RightComponent>
            <Button
              onClick={(e) => {
                props.onRemove && props.onRemove();
                e.preventDefault();
              }}
              size="sm"
              icon={<TrashCan fill={theme.grey.noshade} />}
            ></Button>
          </RightComponent>
        ) : null
      }
    >
      <CardName variant="overline" color="shade6">
        Credit Card
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
