import React, { useEffect } from 'react';

import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelSubscriptionPlanActions,
  getActivePlanActions,
  getMarketInterestsActions,
  getSubscriptionPlansActions,
  renewSubscriptionPlanActions,
  updateSubscriptionPlanActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { SubscriptionPlanGeneratedProps } from './SubscriptionPlan.props';
import { activePlanToProps } from './SubscriptionPlan.transform';
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

  const activePlan = useSelector(
    (store: Store) => store.getActivePlan.data?.data
  );

  const planStatus =
    useSelector((store: Store) => store.subscription.status) || '';

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

  // USE EFFECTS

  useEffect(() => {
    if (company) {
      dispatch(getMarketInterestsActions.request({ companyId: company.id }));
    }
  }, [company]);

  useEffect(() => {
    dispatch(getSubscriptionPlansActions.request({}));
  }, []);

  useEffect(() => {
    if (company?.id && (updateSuccess || cancelSuccess || renewSuccess)) {
      dispatch(getActivePlanActions.request({ companyId: company.id }));
    }
  }, [updateSuccess, cancelSuccess, renewSuccess]);

  // METHODS

  const cancelSubscription = (interval: 'MONTHLY' | 'ANNUAL') => {
    if (company?.id) {
      dispatch(
        cancelSubscriptionPlanActions.request({
          companyId: company?.id,
          saasInterval: interval,
        })
      );
    }
  };

  const updateSubscription = (interval: 'MONTHLY' | 'ANNUAL') => {
    if (company?.id) {
      dispatch(
        updateSubscriptionPlanActions.request({
          companyId: company?.id,
          saasInterval: interval,
        })
      );
    }
  };

  const renewSubscription = (interval: 'MONTHLY' | 'ANNUAL') => {
    if (company?.id) {
      dispatch(
        renewSubscriptionPlanActions.request({
          companyId: company.id,
          saasInterval: interval,
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
    ...activePlanToProps(plans, activePlan),
    planStatus,
    planInterval,
    currentMarketSector,
    cancelSubscription,
    updateSubscription,
    renewSubscription,
  };

  return <SubscriptionPlanView {...params} />;
};

export default SubscriptionPlan;
