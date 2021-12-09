import React, { useEffect } from 'react';

import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AccountCompletionView from 'routes/Seller/Account/AccountCompletion/AccountCompletion.view';
import { getAccountCompletionActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

const AccountCompletion = (): JSX.Element => {
  const dispatch = useDispatch();
  const getUser = useSelector((state: Store) => state.getUser);
  const history = useHistory();
  const [companyId] = useCompany();
  const getAccountCompletion = useSelector(
    (store: Store) => store.getAccountCompletion.data?.data
  );

  const user = getUser.data?.data.user;

  useEffect(() => {
    dispatch(
      getAccountCompletionActions.request({
        companyId,
      })
    );
    // eslint-disable-next-line
  }, [companyId]);

  const goToLicenses = () => {
    history.push(`${SELLER_ACCOUNT_ROUTES.LICENSES}?companyId=${companyId}`);
  };

  const generatedProps = {
    profileImage: user?.profileImage || '',
    name: `${user?.firstName || ''} ${user?.lastName || ''}`,
    accountCompletion: getAccountCompletion,
    goToLicenses,
  };
  return <AccountCompletionView {...generatedProps} />;
};

export default AccountCompletion;
