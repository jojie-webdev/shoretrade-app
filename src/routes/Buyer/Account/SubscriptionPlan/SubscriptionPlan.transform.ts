import _ from 'lodash';
import moment, { RFC_2822 } from 'moment';
import {
  ActivePlan,
  CompanyPlan,
  CompanyPlanAlias,
  CompanyPlanName,
  GetCompanyPlanResponseData,
} from 'types/store/GetCompanyPlanState';
import { GetSubscriptionPlansResponseData } from 'types/store/GetSubscriptionPlansState';
import { toPrice } from 'utils/String';
import { toMaskedCardNumber } from 'utils/String/maskedCardNumber';
import { proRata } from 'utils/SubscriptionPlan/proRata';

import { SubscriptionPlanTransformOutputProps } from './SubscriptionPlan.props';

export const getActivePlan = (
  companyPlan?: GetCompanyPlanResponseData,
  name?: CompanyPlanName
): ActivePlan | undefined => {
  //edge case for marketplace
  if (companyPlan?.activePlans && name === CompanyPlanName.REVERSE_MARKET) {
    return companyPlan?.activePlans.find((ac) =>
      [
        CompanyPlanAlias.FEATURE_REVERSED_MARKETPLACE,
        CompanyPlanAlias.FREE_BASE_WITH_REVERSED_MARKETPLACE,
        CompanyPlanAlias.PREMIUM,
      ].includes(ac.plan.alias)
    );
  }
  if (companyPlan?.activePlans && name) {
    return companyPlan.activePlans.find((ac) => ac.plan.name === name);
  }

  if (companyPlan?.activePlans) {
    return companyPlan.activePlans.find((ac) =>
      [CompanyPlanName.BASE, CompanyPlanName.PRO].includes(ac.plan.name)
    );
  }
};

export const companyPlanToProps = (
  plans: GetSubscriptionPlansResponseData[],
  companyPlan?: GetCompanyPlanResponseData
): SubscriptionPlanTransformOutputProps => {
  const annualPlan = plans.find((plan) => plan.alias.includes('YEARLY'));
  const monthlyPlan = plans.find((plan) => !plan.alias.includes('YEARLY'));

  const nextBillingDate = companyPlan?.nextBillingData?.date
    ? moment.utc(companyPlan.nextBillingData.date).format('DD MMMM YYYY')
    : null;

  const getPlanDetails = (
    alias: CompanyPlanAlias
  ): GetSubscriptionPlansResponseData | undefined => {
    return plans.find((p) => p.alias === alias);
  };

  const currentPlanDetails = getActivePlan(companyPlan);

  const currentReverseMarketDetails = getActivePlan(
    companyPlan,
    CompanyPlanName.REVERSE_MARKET
  );

  const daysUntilEndReverseMarketPlace = moment(
    moment(currentReverseMarketDetails?.subscription.ends_at).utc()
  )
    .utc()
    .diff(moment().utc(), 'day');

  const hoursUntilEndReverseMarketPlace = moment(
    moment(currentReverseMarketDetails?.subscription.ends_at).utc()
  )
    .utc()
    .diff(moment().utc(), 'hours');

  const minutesUntilEndReverseMarketPlace = moment(
    moment(currentReverseMarketDetails?.subscription.ends_at).utc()
  )
    .utc()
    .diff(moment().utc(), 'minutes');

  const daysUntilEnd = moment(
    moment(companyPlan?.activePlans[0]?.subscription.ends_at).utc()
  )
    .utc()
    .diff(moment().utc(), 'day');

  const hoursUntilEnd = moment(
    moment(companyPlan?.activePlans[0]?.subscription.ends_at).utc()
  )
    .utc()
    .diff(moment().utc(), 'hours');

  const minutesUntilend = moment(
    moment(companyPlan?.activePlans[0]?.subscription.ends_at).utc()
  )
    .utc()
    .diff(moment().utc(), 'minutes');

  const defaultPaymentMethod = companyPlan?.nextBillingData?.cards.find(
    (card) => card.id === companyPlan.nextBillingData?.defaultCard
  );
  const cardBrand = _.snakeCase(defaultPaymentMethod?.brand || '');

  const getCancellationPeriod = () => {
    if (daysUntilEnd > 0) {
      return `in ${daysUntilEnd} days`;
    } else if (hoursUntilEnd > 0) {
      return `in ${hoursUntilEnd} hours`;
    }
    return `in ${minutesUntilend} minutes`;
  };

  const getCancellationPeriodReverseMarket = () => {
    if (daysUntilEndReverseMarketPlace > 0) {
      return `in ${daysUntilEndReverseMarketPlace} days`;
    } else if (hoursUntilEndReverseMarketPlace > 0) {
      return `in ${hoursUntilEndReverseMarketPlace} hours`;
    }
    return `in ${minutesUntilEndReverseMarketPlace} minutes`;
  };

  return {
    annualPrice: annualPlan?.price || '0',
    monthlyPrice: monthlyPlan?.price || '0',
    nextBillingDate,
    cancellationPeriod: companyPlan?.flags?.hasCancelledPlan
      ? getCancellationPeriod()
      : '',
    cancellationReversePeriodReverseMarket: companyPlan?.flags
      ?.hasCancelledReversedMarketplace
      ? getCancellationPeriodReverseMarket()
      : '',
    cardBrand,
    subscriptionType: companyPlan?.activePlans
      ? companyPlan?.activePlans.find((ac) =>
          [CompanyPlanName.BASE, CompanyPlanName.PRO].includes(ac.plan.name)
        )?.plan.name || null
      : null,
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
    proPlanDetails: getPlanDetails(CompanyPlanAlias.PREMIUM),
    basePlanDetails: getPlanDetails(CompanyPlanAlias.STANDARD),
    reverseMarketDetails: companyPlan?.addOns.filter(
      (a) => a.alias === 'FEATURE_REVERSED_MARKETPLACE'
    )[0],
    noActivePlan: companyPlan ? companyPlan.activePlans.length > 0 : true,
    currentPlanDetails,
    currentReverseMarketDetails,
    proRataPrice: companyPlan?.changePlan
      ? toPrice(proRata(companyPlan.changePlan))
      : '$0',
    latePayment:
      currentPlanDetails?.subscription.paid_at === null &&
      moment
        .utc(moment().utc())
        .diff(currentPlanDetails?.subscription.starts_at, 'd') > 2,
    failedPayment: currentPlanDetails?.subscription.paid_at === null,
  };
};
