import _ from 'lodash';
import moment from 'moment';
import { GetActivePlanResponseData } from 'types/store/GetActivePlanState';
import { GetSubscriptionPlansResponseData } from 'types/store/GetSubscriptionPlansState';
import { toMaskedCardNumber } from 'utils/String/maskedCardNumber';

import { SubscriptionPlanGeneratedProps } from './SubscriptionPlan.props';

export const activePlanToProps = (
  plans: GetSubscriptionPlansResponseData[],
  activePlan?: GetActivePlanResponseData
): SubscriptionPlanGeneratedProps => {
  const annualPlan = plans.find((plan) => plan.alias.includes('YEARLY'));
  const monthlyPlan = plans.find((plan) => !plan.alias.includes('YEARLY'));
  const nextBillingDate = activePlan
    ? moment(activePlan.end_date).format('D MMMM YYYY')
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
    cardNumberMasked: toMaskedCardNumber(
      cardBrand,
      defaultPaymentMethod?.lastFour || ''
    ),
  };
};
