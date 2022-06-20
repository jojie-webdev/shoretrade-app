import React, { useEffect } from 'react';

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
    if (company?.id && activePlan?.plan_alias) {
      dispatch(
        cancelSubscriptionPlanActions.request({
          companyId: company?.id,
          subscriptionAlias: activePlan?.plan_alias,
        })
      );
    }
  };

  const updateSubscription = (
    interval: 'MONTHLY' | 'ANNUAL',
    type: 'PREMIUM' | 'STANDARD'
  ) => {
    if (company?.id) {
      dispatch(
        updateSubscriptionPlanActions.request({
          companyId: company?.id,
          saasType: type,
          existingCard:
            activePlan?.payment_methods.cards.find(
              (card) => card.id === activePlan.payment_methods.defaultCard
            )?.id || '',
        })
      );
    }
  };

  const renewSubscription = (interval: 'MONTHLY' | 'ANNUAL') => {
    if (company?.id) {
      dispatch(
        renewSubscriptionPlanActions.request({
          companyId: company.id,
          saasType: interval,
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
    isDeactivated,
    currentMarketSector,
    cancelSubscription,
    updateSubscription,
    renewSubscription,
  };

  return <SubscriptionPlanView {...params} />;
};

export default SubscriptionPlan;
