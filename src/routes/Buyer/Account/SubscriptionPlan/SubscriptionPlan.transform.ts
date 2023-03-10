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
import { toPrice } from 'utils/String';
import { toMaskedCardNumber } from 'utils/String/maskedCardNumber';
import { getCancellationPeriod } from 'utils/SubscriptionPlan/getCancellationPeriod';
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

const getNextBillingDate = (
  nextBillingDate: string | null,
  failedPayment: boolean,
  latePayment: boolean
) => {
  const unsuccessfulPayment = failedPayment && !latePayment;

  if (unsuccessfulPayment) {
    return moment()
      .tz('Australia/Brisbane')
      .add(1, 'day')
      .format('DD MMMM YYYY');
  }

  if (latePayment) {
    return 'Awaiting Manual Payment';
  }

  return nextBillingDate;
};

export const companyPlanToProps = (
  plans: GetSubscriptionPlansResponseData[],
  companyPlan?: GetCompanyPlanResponseData
): SubscriptionPlanTransformOutputProps => {
  const annualPlan = plans.find((plan) => plan.alias.includes('YEARLY'));
  const monthlyPlan = plans.find((plan) => !plan.alias.includes('YEARLY'));
  const currentPlanDetails = getActivePlan(companyPlan);

  const failedPayment = currentPlanDetails?.subscription.paid_at === null;
  const latePayment =
    currentPlanDetails?.subscription.paid_at === null &&
    moment(moment()).diff(currentPlanDetails?.subscription.starts_at, 'd') >= 2;

  const nextBillingDate = companyPlan?.nextBillingData?.date
    ? moment.utc(companyPlan.nextBillingData.date).format('DD MMMM YYYY')
    : null;

  const finalNextBillingDate = getNextBillingDate(
    nextBillingDate,
    failedPayment,
    latePayment
  );

  const getPlanDetails = (
    alias: CompanyPlanAlias
  ): GetSubscriptionPlansResponseData | undefined => {
    return plans.find((p) => p.alias === alias);
  };

  const currentReverseMarketDetails = getActivePlan(
    companyPlan,
    CompanyPlanName.REVERSE_MARKET
  );

  const daysUntilEnd = moment(
    moment(currentPlanDetails?.subscription.ends_at)
  ).diff(moment().startOf('D'), 'day');

  const hoursUntilEnd = moment(
    moment(currentPlanDetails?.subscription.ends_at)
  ).diff(moment(), 'hours');

  const minutesUntilend = moment(
    moment(currentPlanDetails?.subscription.ends_at)
  ).diff(moment(), 'minutes');

  const defaultPaymentMethod = companyPlan?.nextBillingData?.cards.find(
    (card) => card.id === companyPlan.nextBillingData?.defaultCard
  );
  const cardBrand = _.snakeCase(defaultPaymentMethod?.brand || '');

  const daysUntilOverdue = moment(
    currentPlanDetails?.subscription.starts_at || ''
  )
    .add(5, 'days')
    .diff(moment.utc(), 'days');

  return {
    annualPrice: annualPlan?.price || '0',
    monthlyPrice: monthlyPlan?.price || '0',
    nextBillingDate: finalNextBillingDate,
    cancellationPeriod: companyPlan?.flags?.hasCancelledPlan
      ? getCancellationPeriod(currentPlanDetails?.subscription.ends_at)
      : '',
    cancellationReversePeriodReverseMarket: companyPlan?.flags
      ?.hasCancelledReversedMarketplace
      ? getCancellationPeriod(currentPlanDetails?.subscription.ends_at)
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
    latePayment,
    daysUntilOverdue,
    failedPayment,
  };
};
