import React from 'react';

import Typography from 'components/base/Typography';
import CreditCardRow from 'components/module/CreditCardRow';
import { Col } from 'react-grid-system';

import { FieldsetCreditCardProps } from './AddCredit.props';

export const FieldsetCreditCard = (props: FieldsetCreditCardProps) => (
  <>
    <Col md={12}>
      {props.cards.map((card) => (
        <CreditCardRow
          key={card.id}
          active={card.id === props.selectedCardId}
          brand={card.brand}
          lastFour={card.lastFour}
          onClick={(e) => props.setSelectedCardId(card.id)}
        />
      ))}
    </Col>
    <Col md={6}>
      <Typography variant="body" color="shade9">
        Credit card transactions will incur a 1.75% fee.
      </Typography>
    </Col>
  </>
);
