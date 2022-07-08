import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import { FileAlt, Prawn } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES, API } from 'consts';
import moment from 'moment';
import { Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import theme from 'utils/SFMTheme';
import { toPrice } from 'utils/String';
import { toTemporaryTokenV2 } from 'utils/toTemporaryTokenV2';

import { PaymentHistoryGeneratedProps } from './PaymentHistory.props';
import {
  Container,
  Downloadable,
  EmptyStateContainer,
  Transx,
  TransxLeft,
  TransxRight,
} from './PaymentHistory.style';

const PaymentHistoryView = ({
  isLoading,
  transactions,
  token,
}: PaymentHistoryGeneratedProps) => {
  const history = useHistory();

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            { label: 'Payment History' },
          ]}
        />
      </div>

      <Col md={12}>
        {isLoading && <Loading />}
        {!isLoading && transactions.length === 0 && (
          <EmptyStateContainer>
            <Prawn />
            <Typography variant="title4" color="noshade" altFont>
              There’s no invoice here
            </Typography>
            <Typography
              variant="body"
              weight="400"
              color="shade7"
              style={{ margin: '24px 0' }}
            >
              There’s no invoices available for your account
            </Typography>
            <Button onClick={() => history.goBack()} text="Back" />
          </EmptyStateContainer>
        )}
        {transactions.map((transaction, idx) => {
          return (
            <Transx key={idx}>
              <TransxLeft>
                <Downloadable
                  enabled
                  onClick={(e) => {
                    window.open(
                      `${API.URL}/v2/subscription/company/invoice/${
                        transaction.refNumber
                      }?token=${toTemporaryTokenV2(token)}&invoice=true`,
                      '_blank'
                    );
                    e.stopPropagation();
                  }}
                >
                  <FileAlt fill={theme.grey.shade6} />
                </Downloadable>
                <div className="text">
                  <Typography variant="body" color="noshade">
                    {transaction.description}
                  </Typography>
                  <Typography variant="caption" color="shade6">
                    {moment(transaction.createdAt).format('DD MMM YYYY')}
                  </Typography>
                </div>
              </TransxLeft>
              <TransxRight>
                <Typography variant="body" color="shade6">
                  {toPrice(transaction.adjustmentAmount)}
                </Typography>
              </TransxRight>
            </Transx>
          );
        })}
      </Col>
    </Container>
  );
};

export default PaymentHistoryView;
