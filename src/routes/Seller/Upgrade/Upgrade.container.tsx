import React, { useEffect } from 'react';

import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMarketInterestsActions,
  getSubscriptionPlansActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { UpgradeGeneratedProps } from './Upgrade.props';
import UpgradeView from './Upgrade.view';

const Upgrade = (): JSX.Element => {
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

  const generatedProps: UpgradeGeneratedProps = {
    plans:
      (marketSector &&
        subscriptionPlans?.filter((plan) =>
          plan.alias.includes(_.snakeCase(marketSector?.sector).toUpperCase())
        )) ||
      [],
  };

  return <UpgradeView {...generatedProps} />;
};

export default Upgrade;
