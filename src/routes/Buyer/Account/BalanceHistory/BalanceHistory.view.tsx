import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import moment from 'moment';
import { Col } from 'react-grid-system';
import { toPrice } from 'utils/String/toPrice';

import { BalanceHistoryGeneratedProps } from './BalanceHistory.props';
import {
  Container,
  Transx,
  TransxLeft,
  TransxRight,
} from './BalanceHistory.style';

const BalanceHistoryView = (props: BalanceHistoryGeneratedProps) => {
  return (
    <Container>
      <BoxContainer>
        <div className="breadcrumb-container">
          <Breadcrumbs
            sections={[
              { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
              { label: 'Credit History' },
            ]}
          />
        </div>

        <Col md={12}>
          {props.isLoading && <Loading />}
          {props.transactions.map((transaction, idx) => {
            return (
              <Transx key={idx}>
                <TransxLeft>
                  <Typography variant="body" color="shade9">
                    {transaction.description}
                  </Typography>
                  <Typography variant="caption" color="shade6">
                    {moment(transaction.createdAt).format('DD MMM YYYY')}
                  </Typography>
                </TransxLeft>
                <TransxRight>
                  <Typography variant="body" color="shade9">
                    {toPrice(transaction.adjustmentAmount)}
                  </Typography>
                  <Typography variant="caption" color="shade6">
                    Balance: {toPrice(transaction.balance)}
                  </Typography>
                </TransxRight>
              </Transx>
            );
          })}
        </Col>
      </BoxContainer>
    </Container>
  );
};

export default BalanceHistoryView;
