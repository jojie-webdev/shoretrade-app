import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import { FileAlt, Prawn } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import { BUYER_ACCOUNT_ROUTES, API } from 'consts';
import { SUBSCRIPTION_NAMES } from 'consts/subcriptionPlan';
import moment from 'moment';
import { Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';
import { toTemporaryTokenV2 } from 'utils/toTemporaryTokenV2';

import { BalanceHistoryGeneratedProps } from './BalanceHistory.props';
import {
  Container,
  Downloadable,
  EmptyStateContainer,
  Transx,
  TransxLeft,
  TransxRight,
} from './BalanceHistory.style';

const BalanceHistoryView = ({
  isLoading,
  subscriptionPlan,
  transactions,
  redirectFrom,
  isPlanView,
  token,
}: BalanceHistoryGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();
  const getTransactionLabel = (
    desc: string
  ): {
    title: string;
    subtitle: string;
  } => {
    const isCreditAdjustment = desc.includes('Credit Adjustment - ');
    const isCashDeposit = desc.includes('Cash Deposit - ');
    const isChequeDeposit = desc.includes('Cheque Deposit - ');
    const isBankTransfer = desc.includes('Bank Transfer - ');
    const includesOrderNumber = desc.includes('- Order #');
    const isPlan = desc.includes('ShoreTrade Plan');

    const getSubscriptionPlanName = () => {
      return (
        `${
          SUBSCRIPTION_NAMES.filter((sub) => {
            return sub.PLAN === subscriptionPlan && sub.PLAN_NAME;
          })[0]?.PLAN_NAME
        } Subscription` || ''
      );
    };

    if (isCreditAdjustment) {
      if (includesOrderNumber) {
        const orderNumber = desc.split('- Order #')[1].split(' ')[0];
        return {
          title: `Credit Adjustment - #${orderNumber}`,
          subtitle: desc
            .replace('Credit Adjustment - ', '')
            .replace(` - Order #${orderNumber}`, ''),
        };
      } else {
        return {
          title: 'Credit Adjustment',
          subtitle: desc.replace('Credit Adjustment - ', ''),
        };
      }
    }

    if (isCashDeposit) {
      if (includesOrderNumber) {
        const orderNumber = desc.split('- Order #')[1].split(' ')[0];
        return {
          title: `Cash Deposit - #${orderNumber}`,
          subtitle: desc
            .replace('Cash Deposit - ', '')
            .replace(` - Order #${orderNumber}`, ''),
        };
      } else {
        return {
          title: 'Cash Deposit',
          subtitle: desc.replace('Cash Deposit - ', ''),
        };
      }
    }

    if (isChequeDeposit) {
      if (includesOrderNumber) {
        const orderNumber = desc.split('- Order #')[1].split(' ')[0];
        return {
          title: `Cheque Deposit - #${orderNumber}`,
          subtitle: desc
            .replace('Cheque Deposit - ', '')
            .replace(` - Order #${orderNumber}`, ''),
        };
      } else {
        return {
          title: 'Cheque Deposit',
          subtitle: desc.replace('Cheque Deposit - ', ''),
        };
      }
    }

    if (isBankTransfer) {
      if (includesOrderNumber) {
        const orderNumber = desc.split('- Order #')[1].split(' ')[0];
        return {
          title: `Bank Transfer - #${orderNumber}`,
          subtitle: desc
            .replace('Bank Transfer - ', '')
            .replace(` - Order #${orderNumber}`, ''),
        };
      } else {
        return {
          title: 'Bank Transfer',
          subtitle: desc.replace('Bank Transfer - ', ''),
        };
      }
    }

    if (isPlan) {
      return {
        title: getSubscriptionPlanName(),
        subtitle: '',
      };
    }

    return {
      title: desc,
      subtitle: '',
    };
  };

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
            {
              label: isPlanView ? 'Your Plan' : 'Balance & Payments',
              link: isPlanView
                ? BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN
                : BUYER_ACCOUNT_ROUTES.BANK_DETAILS,
            },
            { label: `${isPlanView ? 'Payment' : 'Credit'} History` },
          ]}
        />
      </div>

      <Col md={12}>
        {isLoading && <Loading />}
        {!isLoading && transactions.length === 0 && (
          <EmptyStateContainer>
            <Prawn />
            <Typography variant="title4" altFont>
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
          const { title, subtitle } = getTransactionLabel(
            transaction.description
          );

          const isCreditCardTopUp = transaction.description.includes(
            'Credit card'
          );
          const paymentHistoryItem = isPlanView ? true : false;

          return (
            <Transx key={idx}>
              <TransxLeft>
                <Downloadable
                  enabled={isCreditCardTopUp || paymentHistoryItem}
                  onClick={(e) => {
                    if (isCreditCardTopUp) {
                      window.open(
                        `${API.PDF_URL || API.URL}/v2/${
                          theme.isSFM ? 'sfm-blue/' : ''
                        }company/cc-invoice/${
                          transaction.refNumber
                        }?token=${toTemporaryTokenV2(token)}`,
                        '_blank'
                      );
                      e.stopPropagation();
                    } else {
                      //TODO: this is ST pdf url but the content is for SFM pdf
                      const urlRed = `${
                        API.PDF_URL || API.URL
                      }/v2/subscription/company/invoice/${
                        transaction.refNumber
                      }?token=${token}&invoice=true`;
                      window.open(urlRed);
                      e.stopPropagation();
                    }
                  }}
                >
                  <FileAlt
                    fill={
                      isCreditCardTopUp
                        ? theme.brand.primary
                        : theme.grey.shade6
                    }
                  />
                </Downloadable>
                <div className="text">
                  <Typography variant="body" color="shade9">
                    {title}
                  </Typography>
                  {subtitle.length > 0 && (
                    <Typography variant="caption" color="shade9">
                      {subtitle}
                    </Typography>
                  )}
                  <Typography variant="caption" color="shade6">
                    {moment(transaction.createdAt).format('DD MMM YYYY')}
                  </Typography>
                </div>
              </TransxLeft>
              <TransxRight>
                <Typography variant="body" color="shade9">
                  {toPrice(transaction.adjustmentAmount)}
                </Typography>
                {transaction.description !== 'ShoreTrade Plan' && (
                  <Typography variant="caption" color="shade6">
                    Balance: {toPrice(transaction.balance)}
                  </Typography>
                )}
              </TransxRight>
            </Transx>
          );
        })}
      </Col>
    </Container>
  );
};

export default BalanceHistoryView;
