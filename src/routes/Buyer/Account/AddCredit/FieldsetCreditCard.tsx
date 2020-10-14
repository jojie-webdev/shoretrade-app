import React from 'react';

import Typography from 'components/base/Typography';
import FixedWidthContainer from 'components/layout/FixedWidthContainer';
import CreditCardRow from 'components/module/CreditCardRow';
import { Col, Row } from 'react-grid-system';

import { FieldsetCreditCardProps } from './AddCredit.props';
import { Field } from './AddCredit.style';

export const FieldsetCreditCard = (props: FieldsetCreditCardProps) => (
  <FixedWidthContainer width={436}>
    <Row>
      <Field md={12}>
        {props.cards.map((card) => (
          <CreditCardRow
            key={card.id}
            active={card.id === props.selectedCardId}
            brand={card.brand}
            lastFour={card.lastFour}
            onClick={(e) => props.setSelectedCardId(card.id)}
          />
        ))}
      </Field>
      <Field md={12}>
        <Typography variant="body" color="shade9">
          Credit card transactions will incur a 1.75% fee.
        </Typography>
      </Field>
    </Row>
  </FixedWidthContainer>
);
