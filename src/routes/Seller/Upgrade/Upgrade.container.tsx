import React, { useEffect } from 'react';

import { SELLER_ACCOUNT_ROUTES } from 'consts';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getActivePlanActions,
  getMarketInterestsActions,
  getSubscriptionPlansActions,
  upgradeSubscriptionActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { UpgradeGeneratedProps } from './Upgrade.props';
import UpgradeView from './Upgrade.view';

const Upgrade = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  // SELECTORS

  const user = useSelector((store: Store) => store.getUser.data?.data.user);
  const company = user?.companies[0];

  const marketSector = useSelector(
    (store: Store) => store.getMarketInterests.data?.data
  );

  const subscriptionPlans = useSelector(
    (store: Store) => store.getSubscriptionPlans.data?.data
  );

  const upgradeSuccess = useSelector(
    (store: Store) => store.upgradeSubscription.data?.data
  );

  const upgrading =
    useSelector((store: Store) => store.upgradeSubscription.pending) || false;

  // USE EFFECTS

  useEffect(() => {
    dispatch(getSubscriptionPlansActions.request({}));
  }, []);

  useEffect(() => {
    if (company) {
      dispatch(getMarketInterestsActions.request({ companyId: company.id }));
    }
  }, [company]);

  useEffect(() => {
    if (upgradeSuccess && company?.id) {
      dispatch(
        getActivePlanActions.request({
          companyId: company?.id,
        })
      );
      history.push(SELLER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN);
    }
  }, [upgradeSuccess]);

  // METHODS

  const upgradeSubscription = (interval: 'MONTHLY' | 'ANNUAL') => {
    if (company?.id) {
      //TODO
    }
  };

  // VARIABLES

  const plans =
    (marketSector &&
      subscriptionPlans?.filter((plan) =>
        plan.alias.includes(_.snakeCase(marketSector?.sector).toUpperCase())
      )) ||
    [];
  const annualPlan = plans.find((plan) => plan.alias.includes('YEARLY'));
  const monthlyPlan = plans.find((plan) => !plan.alias.includes('YEARLY'));

  const generatedProps: UpgradeGeneratedProps = {
    annualPrice: annualPlan?.price || '0',
    monthlyPrice: monthlyPlan?.price || '0',
    upgrading,
    upgradeSubscription,
  };

  return <UpgradeView {...generatedProps} />;
};

export default Upgrade;
