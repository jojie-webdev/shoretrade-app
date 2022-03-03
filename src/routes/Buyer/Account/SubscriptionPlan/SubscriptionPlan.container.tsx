import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  getMarketInterestsActions,
  getSubscriptionPlansActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { SubscriptionPlanViewProps } from './SubscriptionPlan.props';
import { SubscriptionPlanView } from './SubscriptionPlan.view';

export const SubscriptionPlan = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: Store) => store.getUser.data?.data.user);
  const company = user?.companies[0];

  const marketSector = useSelector(
    (store: Store) => store.getMarketInterests.data?.data
  );

  const subscriptionPlans = useSelector(
    (store: Store) => store.getSubscriptionPlans.data?.data
  );

  useEffect(() => {
    if (company) {
      dispatch(getMarketInterestsActions.request({ companyId: company.id }));
    }
  }, [company]);

  useEffect(() => {
    dispatch(getSubscriptionPlansActions.request({}));
  }, []);

  const params: SubscriptionPlanViewProps = {
    plans:
      (marketSector &&
        subscriptionPlans?.filter((plan) =>
          plan.alias.includes(marketSector?.sectorAlias)
        )) ||
      [],
  };

  return <SubscriptionPlanView {...params} />;
};
