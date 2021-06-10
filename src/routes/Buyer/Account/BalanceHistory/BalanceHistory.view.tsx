import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Typography from 'components/base/Typography';
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
  // const getSubtitle = (description: string) => {
  //   switch (description.includes('Credit Adjustment')){
  //     case:
  //   }
  // }
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
              label: 'Balance & Payments',
              link: BUYER_ACCOUNT_ROUTES.BANK_DETAILS,
            },
            { label: 'Credit History' },
          ]}
        />
      </div>

      <Col md={12}>
        {props.isLoading && <Loading />}
        {props.transactions.map((transaction, idx) => {
          const { title, subtitle } = getTransactionLabel(
            transaction.description
          );
          return (
            <Transx key={idx}>
              <TransxLeft>
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
