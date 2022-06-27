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

  const nextBillingDate = companyPlan?.nextBillingData?.date
    ? moment.utc(companyPlan.nextBillingData.date).format('DD MMMM YYYY')
    : null;

  const daysUntilEnd = moment(
    moment(companyPlan?.activePlans[0]?.subscription.ends_at).utc()
  )
    .utc()
    .diff(moment().utc(), 'day');

  const defaultPaymentMethod = companyPlan?.nextBillingData?.cards.find(
    (card) => card.id === companyPlan.nextBillingData?.defaultCard
  );
  const cardBrand = _.snakeCase(defaultPaymentMethod?.brand || '');

  const getPlanDetails = (
    alias: CompanyPlanAlias
  ): GetSubscriptionPlansResponseData | undefined => {
    console.log(plans.find((p) => p.alias === alias));
    return plans.find((p) => p.alias === alias);
  };

  const getActivePlan = (name?: CompanyPlanName): ActivePlan | undefined => {
    if (companyPlan?.activePlans && name) {
      return companyPlan.activePlans.find((ac) => ac.plan.name === name);
    }

    if (companyPlan?.activePlans) {
      return companyPlan.activePlans.find((ac) =>
        [CompanyPlanName.BASE, CompanyPlanName.PRO].includes(ac.plan.name)
      );
    }
  };

  return {
    annualPrice: annualPlan?.price || '0',
    monthlyPrice: monthlyPlan?.price || '0',
    nextBillingDate,
    cancellationPeriod: companyPlan?.flags?.hasCancelled?.is_unsubscribed
      ? `in ${daysUntilEnd} days`
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
    hasCancelled: companyPlan?.flags?.hasCancelled,
    planStatus: '',
    nextBillingAmount: companyPlan?.nextBillingData.price || 0,
    proPlanDetails: getPlanDetails(CompanyPlanAlias.PREMIUM),
    basePlanDetails: getPlanDetails(CompanyPlanAlias.STANDARD),
    reverseMarketDetails: companyPlan?.addOns.filter(
      (a) => a.alias === 'FEATURE_REVERSED_MARKETPLACE'
    )[0],
    noActivePlan: companyPlan ? companyPlan.activePlans.length > 0 : true,
    currentPlanDetails: getActivePlan(),
    currentReverseMarketDetails: getActivePlan(CompanyPlanName.REVERSE_MARKET),
    proRata: companyPlan?.changePlan
      ? proRata(companyPlan.changePlan)
      : undefined,
  };
};
