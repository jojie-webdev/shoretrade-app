import React, { useEffect, useState } from 'react';

import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelSubscriptionPlanActions,
  getActivePlanActions,
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
  const [hasUpdateSubsPlanError, setHasUpdateSubsPlanError] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
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

  const planStatus =
    useSelector((store: Store) => store.subscription.status) || '';

  const planInterval =
    useSelector((store: Store) => store.subscription.interval) || '';

  const updateSuccess = useSelector(
    (store: Store) => store.updateSubscriptionPlan.data?.data
  );
  const updateSubsPlanErrorFromStore = useSelector(
    (store: Store) => store.updateSubscriptionPlan.error
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
    dispatch(paySubscriptionActions.clear());
  }, []);

  useEffect(() => {
    if (company?.id && (updateSuccess || cancelSuccess || renewSuccess)) {
      dispatch(getUserActions.request());
    }
  }, [updateSuccess, cancelSuccess, renewSuccess]);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    if (updateSubsPlanErrorFromStore) {
      setHasUpdateSubsPlanError(true);

      const timerId = setTimeout(() => setHasUpdateSubsPlanError(false), 10000);
      setTimer(timerId);
    } else {
      setHasUpdateSubsPlanError(false);
    }
  }, [updateSubsPlanErrorFromStore]);

  // METHODS

  const cancelSubscription = (subscriptionPlanId: string) => {
    if (company?.id && subscriptionPlanId) {
      dispatch(
        cancelSubscriptionPlanActions.request({
          companyId: company?.id,
          subscriptionPlanId,
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

  const renewSubscription = (subscriptionPlanId?: string) => {
    if (company?.id) {
      dispatch(
        updateSubscriptionPlanActions.request({
          companyId: company.id,
          subscriptionPlanId,
          payment: {
            existingCard: '',
          },
        })
      );
    }
  };

  // VARIABLES

  const currentMarketSector = marketSector ? marketSector.sectorAlias : '';

  const params: SubscriptionPlanGeneratedProps = {
    ...companyPlanToProps(subscriptionPlans || [], companyPlan),
    planStatus,
    company,
    planInterval,
    currentMarketSector,
    cancelSubscription,
    flags: companyPlan?.flags,
    updateSubscription,
    renewSubscription,
    hasUpdateSubsPlanError,
  };

  return <SubscriptionPlanView {...params} />;
};

export default SubscriptionPlan;
