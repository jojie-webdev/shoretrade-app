import _ from 'lodash';
import moment from 'moment';
import {
  ActivePlan,
  CompanyPlan,
  CompanyPlanAlias,
  CompanyPlanName,
  GetCompanyPlanResponseData,
} from 'types/store/GetCompanyPlanState';
import { GetSubscriptionPlansResponseData } from 'types/store/GetSubscriptionPlansState';
import { toMaskedCardNumber } from 'utils/String/maskedCardNumber';
import { proRata } from 'utils/SubscriptionPlan/proRata';

import { SubscriptionPlanTransformOutputProps } from './SubscriptionPlan.props';

export const companyPlanToProps = (
  plans: GetSubscriptionPlansResponseData[],
  companyPlan?: GetCompanyPlanResponseData
): SubscriptionPlanTransformOutputProps => {
  const annualPlan = plans.find((plan) => plan.alias.includes('YEARLY'));
  const monthlyPlan = plans.find((plan) => !plan.alias.includes('YEARLY'));

  const getActivePlan = (name?: CompanyPlanName): ActivePlan | undefined => {
    if (companyPlan?.activePlans && name === CompanyPlanName.REVERSE_MARKET) {
      return companyPlan?.activePlans.find((ac) =>
        [CompanyPlanAlias.FEATURE_REVERSED_MARKETPLACE_SELLER].includes(
          ac.plan.alias
        )
      );
    }
  };

  const nextBillingDate = companyPlan?.nextBillingData?.date
    ? moment.utc(companyPlan.nextBillingData.date).format('DD MMMM YYYY')
    : null;

  const currentReverseMarketDetails = getActivePlan(
    CompanyPlanName.REVERSE_MARKET
  );

  const daysUntilEnd = moment(
    moment(currentReverseMarketDetails?.subscription.ends_at)
  ).diff(moment(), 'day');

  const hoursUntilEnd = moment(
    moment(currentReverseMarketDetails?.subscription.ends_at)
  ).diff(moment(), 'hours');

  const minutesUntilend = moment(
    moment(currentReverseMarketDetails?.subscription.ends_at)
  ).diff(moment(), 'minutes');

  const defaultPaymentMethod = companyPlan?.nextBillingData?.cards.find(
    (card) => card.id === companyPlan.nextBillingData?.defaultCard
  );
  const cardBrand = _.snakeCase(defaultPaymentMethod?.brand || '');

  const daysUntilEndReverseMarketPlace = moment(
    moment(currentReverseMarketDetails?.subscription.ends_at)
  ).diff(moment(), 'day');

  const getCancellationPeriod = () => {
    if (daysUntilEnd > 0) {
      return `in ${daysUntilEnd} days`;
    } else if (hoursUntilEnd > 0) {
      return `in ${hoursUntilEnd} hours`;
    }
    return `in ${hoursUntilEnd} minutes`;
  };

  return {
    annualPrice: annualPlan?.price || '0',
    monthlyPrice: monthlyPlan?.price || '0',
    nextBillingDate,
    defaultCard: companyPlan?.nextBillingData.defaultCard,
    cancellationReversePeriodReverseMarket: companyPlan?.flags
      ?.hasCancelledReversedMarketplace
      ? getCancellationPeriod()
      : '',
    cardBrand,
    subscriptionType:
      companyPlan?.activePlans.find((ac) =>
        [CompanyPlanName.BASE, CompanyPlanName.PRO].includes(ac.plan.name)
      )?.plan.name || CompanyPlanName.BASE,
    features: companyPlan?.features || [],
    cardNumberMasked: defaultPaymentMethod
      ? toMaskedCardNumber(cardBrand, defaultPaymentMethod?.lastFour)
      : null,
    isSaasSubscribed: companyPlan
      ? companyPlan.activePlans[0]?.company.subscription_preference
          .isSaasSubscribed
      : true,
    planStatus: '',
    nextBillingAmount: companyPlan?.nextBillingData.price || 0,
    reverseMarketPlanDetails: plans.filter(
      (a) => a.alias === CompanyPlanAlias.FEATURE_REVERSED_MARKETPLACE_SELLER
    )[0],
    reverseMarketAddOnDetails: companyPlan?.addOns.filter(
      (a) => a.alias === CompanyPlanAlias.FEATURE_REVERSED_MARKETPLACE_SELLER
    )[0],
    noActivePlan: companyPlan ? companyPlan.activePlans.length > 0 : true,
    currentPlanDetails: getActivePlan(),
    currentReverseMarketDetails,
    failedReverseMarketPayment:
      currentReverseMarketDetails?.subscription.paid_at === null,
    lateReverseMarketPayment:
      currentReverseMarketDetails?.subscription.paid_at === null &&
      moment(moment()).diff(
        currentReverseMarketDetails?.subscription.starts_at,
        'd'
      ) > 2,
  };
};
