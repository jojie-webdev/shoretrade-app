import React, { useEffect, useMemo, useState } from 'react';

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
  const [loading, setLoading] = useState(false);
  const [hasUpdateSubsPlanError, setHasUpdateSubsPlanError] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [hideSubsPlanAlert, setHideSubsPlanAlert] = useState(true);
  const company = user?.companies[0];

  // SELECTORS

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );

  const marketSector = useSelector(
    (store: Store) => store.getMarketInterests.data?.data
  );

  const subscriptionPlans = useSelector(
    (store: Store) => store.getSubscriptionPlans.data?.data
  );

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

  const companyPlanLoading = useSelector(
    (store: Store) => store.getCompanyPlan.pending
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
  const updateSubsPlanErrorFromStore = useSelector(
    (store: Store) => store.updateSubscriptionPlan.error
  );
  const updateSubsPlanPending =
    useSelector((store: Store) => store.updateSubscriptionPlan.pending) ||
    false;

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
    if (!companyPlan?.activePlans || companyPlanLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [companyPlan, companyPlanLoading]);

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

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    if (updateSuccess) {
      setHideSubsPlanAlert(false);

      const timerId = setTimeout(() => {
        setHideSubsPlanAlert(true);
      }, 5000);
      setTimer(timerId);
    } else {
      setHideSubsPlanAlert(true);
    }
  }, [updateSuccess]);

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

  const downgradeSubscription = () => {
    if (company?.id) {
      dispatch(
        cancelSubscriptionPlanActions.request({
          companyId: company?.id,
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
   * Applicable for downgrade only
   */
  const revertSubscription = (subscriptionId?: string) => {
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

  const isApprovedAccount = addresses
    ? addresses.some((a) => a.approved === 'APPROVED')
    : false;

  const currentMarketSector = marketSector ? marketSector.sectorAlias : '';

  const params: SubscriptionPlanGeneratedProps = {
    ...companyPlanToProps(subscriptionPlans || [], companyPlan),
    companyPlanError,
    planInterval,
    flags: companyPlan?.flags,
    isDeactivated,
    currentMarketSector,
    loading,
    isApprovedAccount,
    cancelSubscription,
    updateSubscription,
    renewSubscription,
    revertSubscription,
    downgradeSubscription,
    hasUpdateSubsPlanError,
    updateSubsPlanPending,
    updateSubsPlanSuccess: !!updateSuccess && !hideSubsPlanAlert,
  };

  return <SubscriptionPlanView {...params} />;
};

export default SubscriptionPlan;
