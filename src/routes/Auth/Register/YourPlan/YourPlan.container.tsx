import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionPlansActions } from 'store/actions';
import { Store } from 'types/store/Store';

import { YourPlanGeneratedProps, YourPlanrops } from './YourPlan.props';
import YourPlanView from './YourPlan.view';

const YourPlan = (props: YourPlanrops): JSX.Element => {
  const dispatch = useDispatch();

  const plans = useSelector(
    (store: Store) => store.getSubscriptionPlans.data?.data || []
  );
  // const currentPlan = plans.find(
  //   (plan) =>
  //     plan.alias ===
  //     `${props.selectedPlan?.toLocaleUpperCase()}_${props.currentMarketSector}`
  // );

  useEffect(() => {
    dispatch(getSubscriptionPlansActions.request({}));
  }, []);

  const generatedProps: YourPlanGeneratedProps = {
    ...props,
    // currentPlan,
    plans,
  };

  return <YourPlanView {...generatedProps} />;
};

export default YourPlan;
