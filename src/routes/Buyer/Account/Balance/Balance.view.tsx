import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter/MobileFooter.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import { BUYER_ACCOUNT_ROUTES } from 'consts/routes';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { toPrice } from 'utils/String/toPrice';

import { BalanceGeneratedProps } from './Balance.props';
import {
  Container,
  CreditWrapper,
  LinkCreditHistory,
  LinkCreditCard,
  Notification,
} from './Balance.style';

const BalanceView = (props: BalanceGeneratedProps) => {
  const { cards, notifMessage } = props;
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container>
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
          <Typography
            className="balance-header"
            variant={isMobile ? 'overline' : 'copy'}
            color={isMobile ? 'shade6' : 'shade9'}
          >
            Credit Balance
          </Typography>

          <CreditWrapper>
            {!isMobile && (
              <Typography variant="overline" color="shade6">
                Account Balance
              </Typography>
            )}

            <Typography variant={isMobile ? 'title2' : 'title4'} color="shade9">
              {toPrice(props.credit)}
            </Typography>
          </CreditWrapper>

          {!isMobile && (
            <LinkCreditHistory
              value="Payment History"
              onClick={() => {
                history.push(`${BUYER_ACCOUNT_ROUTES.BALANCE_HISTORY}`);
              }}
            />
          )}

          <Button
            takeFullWidth={isMobile}
            className="balance-btn"
            text="Add Credit"
            onClick={() => {
              history.push(`${BUYER_ACCOUNT_ROUTES.ADD_CREDIT}`);
            }}
          />

          {isMobile && (
            <LinkCreditHistory
              value="Payment History"
              onClick={() => {
                history.push(`${BUYER_ACCOUNT_ROUTES.BALANCE_HISTORY}`);
              }}
            />
          )}
        </Col>

        <Col md={12} xl={6}>
          {!isMobile && (
            <Typography className="balance-header" variant="copy">
              Credit Cards
            </Typography>
          )}

          {cards.map((card) => (
            <LinkCreditCard
              key={card.id}
              {...card}
              onClick={() => {
                history.push(`${BUYER_ACCOUNT_ROUTES.CREDIT_CARD}`, { card });
              }}
            />
          ))}
          {!isMobile && (
            <Button
              className="balance-btn"
              text="Add Card"
              onClick={() => {
                history.push(`${BUYER_ACCOUNT_ROUTES.CREDIT_CARD}`, {
                  card: {},
                });
              }}
            />
          )}
        </Col>
      </Row>

      <MobileFooter>
        <Button
          takeFullWidth
          text="Add Card"
          onClick={() => {
            history.push(`${BUYER_ACCOUNT_ROUTES.CREDIT_CARD}`, {
              card: {},
            });
          }}
        />
      </MobileFooter>
    </Container>
  );
};

export default BalanceView;
