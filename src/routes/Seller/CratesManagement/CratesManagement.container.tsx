import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getCratesActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import CratesManagementView from './CratesManagement.view';

const CratesManagement = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  const leased =
    useSelector((state: Store) => state.getCrates.data?.data.leased) || '0';

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
  };
  return <CratesManagementView {...generatedProps} />;
};

export default CratesManagement;
