import React from 'react';

import Alert from 'components/base/Alert';
import { ChevronRight } from 'components/base/SVG';
import { BUYER_ACCOUNT_ROUTES, SELLER_ACCOUNT_ROUTES } from 'consts';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { getActivePlanStatus } from 'utils/SubscriptionPlan/getActivePlanStatus';
import { getCompanyPlanStatus } from 'utils/SubscriptionPlan/getCompanyPlanStatus';
import { useTheme } from 'utils/Theme';

import { SubscriptionAlertProps } from './SubscriptionAlert.props';

const SubscriptionAlert = ({
  companyPlan,
}: SubscriptionAlertProps): JSX.Element => {
  const theme = useTheme();
  const history = useHistory();

  const activeSubscription = companyPlan?.activePlans.find((ac) =>
    ['BASE', 'PRO'].includes(ac.plan.name.toUpperCase())
  );
  const status = companyPlan && getCompanyPlanStatus(companyPlan);
  const daysUntilOverdue = moment(
    activeSubscription?.subscription.starts_at || ''
  )
    .add(5, 'days')
    .diff(moment.utc(), 'days');
  const isLate = status === 'LATE';
  const header = isLate ? 'Late Payment' : 'Unsuccessful Payment';

  const content = isLate ? (
    <>
      Your subscription payment is outstanding. Please make a one-off payment{' '}
      <u>
        <b>here</b>
      </u>{' '}
      {daysUntilOverdue > 0
        ? `within ${daysUntilOverdue} day${daysUntilOverdue > 1 ? 's' : ''}`
        : 'now'}{' '}
      to keep your account active.
    </>
  ) : (
    <>
      Your most recent payment was unsuccessful. The payment will be
      automatically reattempted tomorrow.
    </>
  );

  const redirectToPlanPayment = () => {
    if (theme.appType === 'buyer')
      history.push(BUYER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD);
    else history.push(SELLER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD);
  };

  return ['LATE', 'UNSUCCESSFUL'].includes(status || '') ? (
    <Alert
      variant="error"
      fullWidth
      header={header}
      content={content}
      iconRight={
        isLate ? (
          <ChevronRight height={20} width={20} fill={theme.grey.shade8} />
        ) : undefined
      }
      onClick={isLate ? redirectToPlanPayment : undefined}
      style={{
        cursor: isLate ? 'pointer' : 'default',
        marginBottom: 24,
      }}
    />
  ) : (
    <></>
  );
};

export default React.memo(SubscriptionAlert);
