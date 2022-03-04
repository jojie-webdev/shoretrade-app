import React, { useEffect } from 'react';

import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActivePlanActions,
  getMarketInterestsActions,
  getSubscriptionPlansActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { SubscriptionPlanGeneratedProps } from './SubscriptionPlan.props';
import { SubscriptionPlanView } from './SubscriptionPlan.view';

const SubscriptionPlan = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: Store) => store.getUser.data?.data.user);
  const company = user?.companies[0];

  const marketSector = useSelector(
    (store: Store) => store.getMarketInterests.data?.data
  );

  const subscriptionPlans = useSelector(
    (store: Store) => store.getSubscriptionPlans.data?.data
  );

  const activePlan = useSelector(
    (store: Store) => store.getActivePlan.data?.data
  );

  useEffect(() => {
    if (company) {
      dispatch(getMarketInterestsActions.request({ companyId: company.id }));
      dispatch(getActivePlanActions.request({ companyId: company.id }));
    }
  }, [company]);

  useEffect(() => {
    dispatch(getSubscriptionPlansActions.request({}));
  }, []);

  const params: SubscriptionPlanGeneratedProps = {
    plans:
      (marketSector &&
        subscriptionPlans?.filter((plan) =>
          plan.alias.includes(_.snakeCase(marketSector?.sector).toUpperCase())
        )) ||
      [],
    activePlan,
  };

  return <SubscriptionPlanView {...params} />;
};

export default SubscriptionPlan;
