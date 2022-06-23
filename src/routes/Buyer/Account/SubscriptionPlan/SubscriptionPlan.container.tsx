import React, { useEffect, useMemo } from 'react';

import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelSubscriptionPlanActions,
  getMarketInterestsActions,
  getSubscriptionPlansActions,
  getUserActions,
  paySubscriptionActions,
  renewSubscriptionPlanActions,
  updateSubscriptionPlanActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { SubscriptionPlanGeneratedProps } from './SubscriptionPlan.props';
import { companyPlanToProps } from './SubscriptionPlan.transform';
import { SubscriptionPlanView } from './SubscriptionPlan.view';

const SubscriptionPlan = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: Store) => store.getUser.data?.data.user);
  const company = user?.companies[0];

  // SELECTORS

  const marketSector = useSelector(
    (store: Store) => store.getMarketInterests.data?.data
  );

  const subscriptionPlans = useSelector(
    (store: Store) => store.getSubscriptionPlans.data?.data
  );

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

  const companyPlanError = useSelector(
    (store: Store) => store.getCompanyPlan.error
  );
  const planStatus =
    useSelector((store: Store) => store.subscription.status) || '';

  const isFreeTrial =
    useSelector((store: Store) => store.subscription.isFreeTrial) || '';

  const planInterval =
    useSelector((store: Store) => store.subscription.interval) || '';

  const updateSuccess = useSelector(
    (store: Store) => store.updateSubscriptionPlan.data?.data
  );

  const cancelSuccess = useSelector(
    (store: Store) => store.cancelSubscriptionPlan.data?.data
  );

  const renewSuccess = useSelector(
    (store: Store) => store.renewSubscriptionPlan.data?.data
  );

  const isDeactivated = useSelector(
    (store: Store) => store.subscription.isAccountDeactivated
  );

  // USE EFFECTS

  useEffect(() => {
    if (company) {
      dispatch(getMarketInterestsActions.request({ companyId: company.id }));
    }
  }, [company]);

  useEffect(() => {
    dispatch(getSubscriptionPlansActions.request({}));
    dispatch(paySubscriptionActions.clear());
  }, []);

  useEffect(() => {
    if (company?.id && (updateSuccess || cancelSuccess || renewSuccess)) {
      dispatch(getUserActions.request());
    }
  }, [updateSuccess, cancelSuccess, renewSuccess]);

  // METHODS

  const cancelSubscription = () => {
    if (company?.id && companyPlan?.plan_alias) {
      dispatch(
        cancelSubscriptionPlanActions.request({
          companyId: company?.id,
          subscriptionAlias: companyPlan?.plan_alias,
        })
      );
    }
  };

  const updateSubscription = (subscriptionId?: string) => {
    if (company?.id && companyPlan?.nextBillingData.defaultCard) {
      dispatch(
        updateSubscriptionPlanActions.request({
          companyId: company?.id,
          payment: {
            existingCard: companyPlan.nextBillingData.defaultCard,
          },
          subscriptionPlanId: subscriptionId,
        })
      );
    }
  };

  /**
   * For now use base as default
   */
  const renewSubscription = () => {
    if (company?.id) {
      dispatch(
        updateSubscriptionPlanActions.request({
          companyId: company.id,
          payment: {
            existingCard: '',
          },
        })
      );
    }
  };

  // VARIABLES

  const plans =
    (marketSector &&
      subscriptionPlans?.filter((plan) =>
        plan.alias.includes(_.snakeCase(marketSector?.sector).toUpperCase())
      )) ||
    [];

  const currentMarketSector = marketSector ? marketSector.sectorAlias : '';

  const params: SubscriptionPlanGeneratedProps = {
    ...companyPlanToProps(plans, companyPlan),
    companyPlanError,
    planInterval,
    isDeactivated,
    currentMarketSector,
    cancelSubscription,
    updateSubscription,
    renewSubscription,
  };

  return <SubscriptionPlanView {...params} />;
};

export default SubscriptionPlan;
