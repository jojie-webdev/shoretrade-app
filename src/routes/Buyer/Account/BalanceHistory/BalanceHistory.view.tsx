import React from 'react';

import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import moment from 'moment';
import { Col } from 'react-grid-system';
import { toPrice } from 'utils/String/toPrice';

// import { useTheme } from 'utils/Theme';
import { BalanceHistoryGeneratedProps } from './BalanceHistory.props';
import { Container, Transx, TransxLeft, TransxRight } from './BalanceHistory.style';

const BalanceHistoryView = (props: BalanceHistoryGeneratedProps) => {
  // const theme = useTheme();}

  return (
    <Container>
      <InnerRouteHeader title="Credit History" />
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
    </Container>
  );
};

export default BalanceHistoryView;