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
    ? moment(activePlan.ends_at).format('D MMMM YYYY')
    : '';
  const defaultPaymentMethod = activePlan?.payment_methods.cards.find(
    (card) => card.id === activePlan.payment_methods.defaultCard
  );
  const cardBrand = _.snakeCase(defaultPaymentMethod?.brand || '');

  return {
    annualPrice: annualPlan?.price || '0',
    monthlyPrice: monthlyPlan?.price || '0',
    nextBillingDate,
    cardBrand,
    subscriptionType: activePlan?.subscription_preference.type || 'STANDARD',
    features: activePlan?.features || [],
    cardNumberMasked: toMaskedCardNumber(
      cardBrand,
      defaultPaymentMethod?.lastFour || ''
    ),
  };
};
