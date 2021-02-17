import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import AccountCompletionView from 'routes/Buyer/Account/AccountCompletion/AccountCompletion.view';
import { getAccountCompletionActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

const AccountCompletion = (): JSX.Element => {
  const dispatch = useDispatch();
  const getUser = useSelector((state: Store) => state.getUser);
  const currentCompany = GetDefaultCompany();
  const getAccountCompletion = useSelector(
    (store: Store) => store.getAccountCompletion.data?.data
  );

  const user = getUser.data?.data.user;
  const companyId = currentCompany?.id || '';

  useEffect(() => {
    dispatch(
      getAccountCompletionActions.request({
        companyId,
      })
    );
  }, [companyId]);

  const generatedProps = {
    profileImage: user?.profileImage || '',
    name: `${user?.firstName || ''} ${user?.lastName || ''}`,
    accountCompletion: getAccountCompletion,
  };
  return <AccountCompletionView {...generatedProps} />;
};

export default AccountCompletion;
