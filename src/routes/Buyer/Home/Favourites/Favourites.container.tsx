import React, { useState, ChangeEvent, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getNegotiationCreditActions } from 'store/actions';
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

  const negotiationCredit = useSelector(
    (store: Store) => store.getNegotiationCredit.data?.data
  );

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
    negotiationCredit: negotiationCredit?.credit || 0,
    handleShowNegoModal,
  };

  return <FavouritesView {...generatedProps} />;
};

export default Favourites;
