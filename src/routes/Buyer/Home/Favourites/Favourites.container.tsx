import React, { useState, ChangeEvent, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getActivePlan } from 'routes/Buyer/Account/SubscriptionPlan/SubscriptionPlan.transform';
import {
  getBuyerHomepageActions,
  getNegotiationCreditActions,
  showNegotiableActions,
} from 'store/actions';
import { CompanyPlanName } from 'types/store/GetCompanyPlanState';
import { Store } from 'types/store/Store';

import FavouritesView from './Favourites.view';

const Favourites = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const [showNegoModal, setShowNegoModal] = useState(false);

  const dispatch = useDispatch();

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );

  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');

  const results = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.favouriteListing
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

  const handleShowNegoCreditsModal = () => {
    console.log('favourites container');
  };

  const handleShowNegoModal = (listingId: string) => {
    setShowNegoModal((prevValue) => !prevValue);
  };

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

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

  const isSubscribedToNegoRequest =
    currentReverseMarketDetails ||
    currentPlanDetails?.plan?.name === CompanyPlanName.PRO
      ? companyPlan && !companyPlan.flags?.hasCancelledReversedMarketplace
      : subscriptionType !== null && false;

  const canNegotiate = isSubscribedToNegoRequest || false;

  const negotiationCredit = useSelector(
    (store: Store) => store.getNegotiationCredit.data?.data
  );

  const showNegotiable = useSelector((store: Store) => store.showNegotiable);

  useEffect(() => {
    dispatch(getBuyerHomepageActions.request());
    dispatch(getNegotiationCreditActions.request({}));
  }, [showNegotiable]);

  const handleNegotiableToggle = (show: boolean) => {
    dispatch(showNegotiableActions.update({ showNegotiable: show }));
  };

  useEffect(() => {
    dispatch(getNegotiationCreditActions.request({}));
  }, []);

  const generatedProps = {
    results,
    isPendingAccount,
    onChangeSearchValue,
    onResetSearchValue,
    searchValue,
    isLoadingResults,
    handleShowNegoCreditsModal,
    negotiationCredit,
    handleShowNegoModal,
    canNegotiate,
    handleNegotiableToggle,
    showNegotiable,
  };

  return <FavouritesView {...generatedProps} />;
};

export default Favourites;
