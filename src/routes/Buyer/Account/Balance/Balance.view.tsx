import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import { BUYER_ACCOUNT_ROUTES } from 'consts/routes';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { toPrice } from 'utils/String/toPrice';

// import { useTheme } from 'utils/Theme';
import { BalanceGeneratedProps } from './Balance.props';
import {
  Container,
  CreditWrapper,
  LinkCreditHistory,
  LinkCreditCard,
  Notification,
} from './Balance.style';

const BalanceView = (props: BalanceGeneratedProps) => {
  // const theme = useTheme();
  const { cards, notifMessage } = props;
  const history = useHistory();

  return (
    <Container>
      <BoxContainer>
        <div className="breadcrumb-container">
          <Breadcrumbs
            sections={[
              { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
              { label: 'Balance & Payments' },
            ]}
          />
        </div>

        {notifMessage && (
          <Notification>
            <Alert variant="success" content={notifMessage} />
          </Notification>
        )}

        <Row>
          <Col md={12} xl={6}>
            <Typography className="balance-header" variant="copy">
              Credit Balance
            </Typography>

            <CreditWrapper>
              <Typography variant="overline" color="shade6">
                Account Balance
              </Typography>
              <Typography variant="title4" weight="500" color="shade9">
                {toPrice(props.credit)}
              </Typography>
            </CreditWrapper>

            <LinkCreditHistory
              value="Credit History"
              onClick={() => {
                history.push(`${BUYER_ACCOUNT_ROUTES.BALANCE_HISTORY}`);
              }}
            />
            <Button
              className="balance-btn"
              text="Add Credit"
              onClick={() => {
                history.push(`${BUYER_ACCOUNT_ROUTES.ADD_CREDIT}`);
              }}
            />
          </Col>

          <Col md={12} xl={6}>
            <Typography className="balance-header" variant="copy">
              Credit Cards
            </Typography>

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
              className="balance-btn"
              text="Add Card"
              onClick={() => {
                history.push(`${BUYER_ACCOUNT_ROUTES.CREDIT_CARD}`, {
                  card: {},
                });
              }}
            />
          </Col>
        </Row>
      </BoxContainer>
    </Container>
  );
};

export default BalanceView;
