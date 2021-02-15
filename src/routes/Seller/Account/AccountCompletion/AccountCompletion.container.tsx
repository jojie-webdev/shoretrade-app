import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import AccountCompletionView from 'routes/Seller/Account/AccountCompletion/AccountCompletion.view';
import { getAccountCompletionActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

const AccountCompletion = (): JSX.Element => {
  const dispatch = useDispatch();
  const getUser = useSelector((state: Store) => state.getUser);
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
  }, [companyId]);

  const generatedProps = {
    profileImage: user?.profileImage || '',
    name: `${user?.firstName || ''} ${user?.lastName || ''}`,
    accountCompletion: getAccountCompletion,
  };
  return <AccountCompletionView {...generatedProps} />;
};

export default AccountCompletion;
