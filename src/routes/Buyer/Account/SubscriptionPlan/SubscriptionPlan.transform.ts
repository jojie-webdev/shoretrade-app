import _ from 'lodash';
import moment from 'moment';
import { GetActivePlanResponseData } from 'types/store/GetActivePlanState';
import { GetSubscriptionPlansResponseData } from 'types/store/GetSubscriptionPlansState';
import { toMaskedCardNumber } from 'utils/String/maskedCardNumber';

import { SubscriptionPlanTransformOutputProps } from './SubscriptionPlan.props';

export const activePlanToProps = (
  plans: GetSubscriptionPlansResponseData[],
  activePlan?: GetActivePlanResponseData
): SubscriptionPlanTransformOutputProps => {
  const annualPlan = plans.find((plan) => plan.alias.includes('YEARLY'));
  const monthlyPlan = plans.find((plan) => !plan.alias.includes('YEARLY'));

  const nextBillingDate = activePlan
    ? !activePlan.paid_at
      ? moment(activePlan.starts_at).utc().format('D MMMM YYYY')
      : moment(activePlan?.ends_at).utc().format('D MMMM YYYY')
    : null;

  const daysUntilEnd = moment(moment(activePlan?.ends_at).utc())
    .utc()
    .diff(moment().utc(), 'day');

  const defaultPaymentMethod = activePlan?.payment_methods.cards.find(
    (card) => card.id === activePlan.payment_methods.defaultCard
  );
  const cardBrand = _.snakeCase(defaultPaymentMethod?.brand || '');

  return {
    annualPrice: annualPlan?.price || '0',
    monthlyPrice: monthlyPlan?.price || '0',
    nextBillingDate,
    cancellationPeriod: `in ${daysUntilEnd} days`,
    cardBrand,
    // subscriptionType: activePlan?.subscription_preference.type || 'STANDARD',
    subscriptionType: 'PREMIUM',
    features: activePlan?.features || [],
    cardNumberMasked: defaultPaymentMethod
      ? toMaskedCardNumber(cardBrand, defaultPaymentMethod?.lastFour)
      : null,
    isSaasSubscribed: activePlan
      ? activePlan.subscription_preference.isSaasSubscribed
      : true,
  };
};
