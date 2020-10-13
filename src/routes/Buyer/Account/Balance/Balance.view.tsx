import React from 'react';

import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { BUYER_ACCOUNT_ROUTES } from 'consts/routes';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { toPrice } from 'utils/String/toPrice';

// import { useTheme } from 'utils/Theme';
import { BalanceGeneratedProps } from './Balance.props';
import {
  Container,
  ContentLeft,
  ContentRight,
  CreditBalance,
  CreditWrapper,
  LinkCreditHistory,
  LinkCreditCard,
} from './Balance.style';

const BalanceView = (props: BalanceGeneratedProps) => {
  // const theme = useTheme();
  const { cards } = props;
  const history = useHistory();
  return (
    <Container>
      <InnerRouteHeader title="Balance & Payments" />

      <Row>
        <ContentLeft md={6}>
          <CreditBalance>
            <Typography variant="overline" color="shade6">
              Credit Balance
            </Typography>
            <CreditWrapper>
              <Typography variant="title2" color="shade9">
                {toPrice(props.credit)}
              </Typography>
            </CreditWrapper>
          </CreditBalance>
          <LinkCreditHistory
            value="Credit History"
            onClick={() => {
              history.push(`${BUYER_ACCOUNT_ROUTES.BALANCE_HISTORY}`);
            }}
          />
          <Button
            text="Add Credit"
            onClick={() => {
              history.push(`${BUYER_ACCOUNT_ROUTES.ADD_CREDIT}`);
            }}
          />
        </ContentLeft>

        <ContentRight md={6}>
          {cards.map((card) => (
            <LinkCreditCard
              key={card.id}
              {...card}
              onClick={() => {
                history.push(`${BUYER_ACCOUNT_ROUTES.CREDIT_CARD}`, { card });
              }}
            />
          ))}
          <Button
            text="Add Card"
            onClick={() => {
              history.push(`${BUYER_ACCOUNT_ROUTES.CREDIT_CARD}`, { card: {} });
            }}
          />
        </ContentRight>
      </Row>
    </Container>
  );
};

export default BalanceView;
