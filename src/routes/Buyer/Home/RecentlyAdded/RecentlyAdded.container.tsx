import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getActivePlan } from 'routes/Buyer/Account/SubscriptionPlan/SubscriptionPlan.transform';
import {
  getBuyerHomepageActions,
  getNegotiationCreditActions,
  showNegotiableActions,
} from 'store/actions';
import { CompanyPlanName } from 'types/store/GetCompanyPlanState';
import { Store } from 'types/store/Store';

import RecentlyAddedView from './RecentlyAdded.view';

const RecentlyAdded = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const [showNegoModal, setShowNegoModal] = useState(false);

  const dispatch = useDispatch();

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );

  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

  const showNegotiable = useSelector((store: Store) => store.showNegotiable);

  const currentReverseMarketDetails = getActivePlan(
    companyPlan,
    CompanyPlanName.REVERSE_MARKET
  );

  const currentPlanDetails = getActivePlan(companyPlan);
  const subscriptionType = companyPlan?.activePlans
    ? companyPlan?.activePlans.find((ac) =>
        [CompanyPlanName.BASE, CompanyPlanName.PRO].includes(ac.plan.name)
      )?.plan.name || null
    : null;

  const getUser = useSelector((state: Store) => state.getUser);

  const defaultCompany = useMemo(() => {
    if (!getUser) return null;

    return getUser.data?.data.user.companies.length
      ? getUser.data?.data.user.companies[0]
      : null;
  }, [getUser]);

  const isSubscribedToNegoRequest =
    currentReverseMarketDetails ||
    currentPlanDetails?.plan?.name === CompanyPlanName.PRO
      ? companyPlan && !companyPlan.flags?.hasCancelledReversedMarketplace
      : subscriptionType !== null && false;

  const canNegotiate = isSubscribedToNegoRequest || false;

  const results = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.recentListing
    ) || []
  ).filter(
    (result) =>
      (searchValue
        ? result.type.toLowerCase().includes(searchValue.toLowerCase())
        : true) ||
      (searchValue
        ? result.coop.name.toLowerCase().includes(searchValue.toLowerCase())
        : true)
  );

  const isLoadingResults =
    useSelector((state: Store) => state.getBuyerHomepage.pending) || false;

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onResetSearchValue = () => {
    setSearchValue('');
  };

  const handleNegotiableToggle = (show: boolean) => {
    dispatch(showNegotiableActions.update({ showNegotiable: show }));
  };

  const handleShowNegoCreditsModal = () => {
    console.log('recently container');
  };

  const handleShowNegoModal = (listingId: string) => {
    setShowNegoModal((prevValue) => !prevValue);
  };

  const negotiationCredit = useSelector(
    (store: Store) => store.getNegotiationCredit.data?.data
  );

  useEffect(() => {
    dispatch(getBuyerHomepageActions.request());
    dispatch(getNegotiationCreditActions.request({}));
  }, [showNegotiable]);

  const generatedProps = {
    results,
    isPendingAccount,
    isLoadingResults,
    onChangeSearchValue,
    onResetSearchValue,
    searchValue,
    canNegotiate,
    handleNegotiableToggle,
    showNegotiable,
    handleShowNegoCreditsModal,
    negotiationCredit: negotiationCredit?.credit || 0,
    handleShowNegoModal,
  };

  return <RecentlyAddedView {...generatedProps} />;
};

export default RecentlyAdded;
