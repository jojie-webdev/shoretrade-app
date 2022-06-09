import React from 'react';

import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

import { FieldsetCreditCardProps } from './AddCredit.props';
import { Field, CC } from './AddCredit.style';

export const FieldsetCreditCard = (props: FieldsetCreditCardProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <>
      <Row style={{ marginBottom: isMobile ? 0 : 24 }}>
        <Field md={12} xl={6}>
          <Typography
            variant={'overline'}
            color={'shade6'}
            style={{ marginBottom: -6 }}
          >
            Select Payment Method
          </Typography>
          {props.cards.map((card) => (
            <CC
              key={card.id}
              active={card.id === props.selectedCardId}
              brand={card.brand}
              lastFour={card.lastFour}
              onClick={(e) => props.setSelectedCardId(card.id)}
              expMonth={card.expMonth.toString()}
              expYear={card.expYear.toString()}
            />
          ))}
        </Field>
      </Row>
      <Row>
        <Field md={12} xl={6} style={{ marginBottom: 8 }}>
          <Typography variant="label" color="shade9">
            Credit card transactions will incur a 1.75% fee.
          </Typography>
        </Field>
      </Row>
    </>
  );
};
