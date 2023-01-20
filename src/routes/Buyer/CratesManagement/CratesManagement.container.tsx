import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getCratesActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import CratesManagementView from './CratesManagement.view';

const CratesManagement = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  const isGettingCrates =
    useSelector((state: Store) => state.getCrates.pending) !== false;

  const leased =
    useSelector((state: Store) => state.getCrates.data?.data?.leased) || '0';

  const smallCrate =
    useSelector((state: Store) => state.getCrates.data?.data?.small_crate) ||
    '0';

  const liddedCrate =
    useSelector((state: Store) => state.getCrates.data?.data?.lidded_crate) ||
    '0';

  const largeCrate =
    useSelector((state: Store) => state.getCrates.data?.data?.large_crate) ||
    '0';

  function handleCratesLeasedClick() {
    dispatch(
      getCratesActions.request({
        companyId,
      })
    );
  }

  useEffect(() => {
    if (companyId) {
      dispatch(
        getCratesActions.request({
          companyId,
        })
      );
    }
  }, [companyId]);

  const generatedProps = {
    leased,
    smallCrate,
    liddedCrate,
    largeCrate,
    handleCratesLeasedClick,
    isGettingCrates,
  };
  return <CratesManagementView {...generatedProps} />;
};

export default CratesManagement;
