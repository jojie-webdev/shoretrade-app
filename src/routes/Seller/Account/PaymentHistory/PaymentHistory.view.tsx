import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import { FileAlt, Prawn } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES, API } from 'consts';
import { SUBSCRIPTION_NAMES } from 'consts/subcriptionPlan';
import moment from 'moment';
import { Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import theme from 'utils/SFMTheme';
import { toPrice } from 'utils/String';

import { PaymentHistoryGeneratedProps } from './PaymentHistory.props';
import {
  Container,
  Downloadable,
  EmptyStateContainer,
  Transx,
  TransxLeft,
  TransxRight,
} from './PaymentHistory.style';

const getSubscriptionPlanNameV2 = (alias: string) => {
  console.log('alias ', alias);
  return (
    SUBSCRIPTION_NAMES.find((sub) => {
      return sub.PLAN === alias;
    })?.PLAN_NAME || ''
  );
};

const PaymentHistoryView = ({
  isLoading,
  subscriptionPlan,
  transactions,
  token,
}: PaymentHistoryGeneratedProps) => {
  const history = useHistory();

  const getSubscriptionPlanName = (alias: string) => {
    return (
      SUBSCRIPTION_NAMES.find((sub) => {
        return sub.PLAN === alias;
      })?.PLAN_NAME || ''
    );
  };

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Your Plan',
              link: SELLER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN,
            },
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
          const subscriptionLength = transaction.metadata.subscriptions.length;
          const title = getSubscriptionPlanNameV2(
            transaction.metadata.subscriptions[subscriptionLength - 1]?.alias ||
              ''
          );

          return (
            <Transx key={idx}>
              <TransxLeft>
                <Downloadable
                  enabled
                  onClick={(e) => {
                    //TODO: tb created: sfm blue pdf
                    window.open(
                      `${
                        API.PDF_URL || API.URL
                      }/v2/subscription/company/invoice/${
                        transaction.createdAt
                      }?token=${token}&invoice=true`,
                      '_blank'
                    );
                    e.stopPropagation();
                  }}
                >
                  <FileAlt fill={theme.grey.shade6} />
                </Downloadable>
                <div className="text">
                  <Typography variant="body" color="noshade">
                    {title} Subscription
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
