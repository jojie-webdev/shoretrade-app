import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  cartActions,
  editableListingActions,
  updateUserActions,
  logoutActions,
  getAccountCompletionActions,
  getActivePlanActions,
} from 'store/actions';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';

import { AccountLandingGeneratedProps } from './Landing.props';
import AccountLandingView from './Landing.view';
const AccountLanding = (): JSX.Element => {
  // Mark:- State / Store
  const dispatch = useDispatch();

  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  const loadingUser = useSelector(
    (state: Store) => state.getUser.pending || false
  );
  const user = useSelector((state: Store) => state.getUser.data?.data.user);

  // Mark:- Variables
  const companyRelationship = currentCompany?.relationship || '';
  const companies = user?.companies || [];
  const profilePicture = user?.profileImage || '';
  const profileName = `${user?.firstName || ''} ${user?.lastName || ''}`;
  const updatingImage =
    useSelector((state: Store) => state.updateUser.pending) || false;
  const accountCompletion = useSelector(
    (store: Store) => store.getAccountCompletion.data?.data
  );
  const freeTrialCountdown = useSelector(
    (store: Store) => store.getActivePlan.data?.data
  );

  const updateImage = (image: File) => {
    dispatch(
      updateUserActions.request({
        logo: image,
        companyId: currentCompany?.id || '',
      })
    );
  };

  const logout = () => {
    dispatch(logoutActions.request());
    dispatch(editableListingActions.clear());
    dispatch(cartActions.clear());
    dispatch(authActions.clear());
  };

  // Mark:- Effects
  useEffect(() => {
    if (!loadingUser) {
      const c = companies || [];

      setCurrentCompany(c[0]);
    }
    // eslint-disable-next-line
  }, [loadingUser]);

  useEffect(() => {
    if (currentCompany?.id) {
      dispatch(
        getAccountCompletionActions.request({
          companyId: currentCompany.id,
        })
      );
      dispatch(getActivePlanActions.request({ companyId: currentCompany.id }));
    }
    // eslint-disable-next-line
  }, [currentCompany]);

  // Mark:- Render
  const generatedProps: AccountLandingGeneratedProps = {
    // generated props here
    currentCompany,
    companies,
    profilePicture,
    loadingUser,
    profileName,
    companyRelationship,
    updatingImage,
    updateImage,
    logout,
    accountCompletion,
    freeTrialCountdown,
  };
  return <AccountLandingView {...generatedProps} />;
};

export default AccountLanding;
