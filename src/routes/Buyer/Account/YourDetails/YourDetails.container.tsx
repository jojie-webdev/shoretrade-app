import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateUserActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';
import { replaceCallingCode, getCallingCode } from 'utils/String/callingCode';

import {
  UserDetails,
  BusinessDetails,
  YourDetailsGeneratedProps,
  UpdateUserForm,
} from './YourDetails.props';
import YourDetailsView from './YourDetails.view';

const YourDetails = (): JSX.Element => {
  // MARK:- Hooks / Store
  const dispatch = useDispatch();
  const location = useLocation();
  const getUser = useSelector((state: Store) => state.getUser);
  const updateUser = useSelector((state: Store) => state.updateUser);
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  // MARK:- State
  const [submitted, setIsSubmitted] = useState(false);
  const [callingCode, setCallingCode] = useState('61'); // AU by default
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  });
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    businessName: '',
    abn: '',
  });

  // MARK:- Effects
  useEffect(() => {
    // No need to fetch getUser since it's already being fetched in
    // layout/Dashboard/Dashboard.container.tsx
    if (!getUser.pending) {
      const user = getUser.data?.data.user;

      setUserDetails({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        mobile: replaceCallingCode(user?.mobile || ''),
      });

      setBusinessDetails({
        businessName: currentCompany?.name || '',
        abn: currentCompany?.abn || '',
      });
    }
  }, [getUser]);

  // MARK:- Methods
  const onClickSave = (updateUserForm: UpdateUserForm) => {
    const user = getUser.data?.data.user;
    const callingCode = getCallingCode(user?.mobile || '');

    const {
      firstName,
      lastName,
      email,
      mobile,
      businessName,
      abn,
    } = updateUserForm;

    const updatedUserDetails = {
      firstName,
      lastName,
      email,
      mobile,
    };

    const updateBusinessDetails = {
      businessName,
      abn,
    };

    dispatch(
      updateUserActions.request({
        ...updatedUserDetails,
        mobile: `+${callingCode}${updatedUserDetails.mobile}`,
        company: {
          name: updateBusinessDetails.businessName,
          abn: updateBusinessDetails.abn,
        },
        companyId,
      })
    );

    setIsSubmitted(true);
  };

  // MARK:- Render
  const generatedProps: YourDetailsGeneratedProps = {
    userDetails,
    businessDetails,
    onClickSave,
    updatingUser: updateUser.pending || false,
    loadingUser: getUser.pending || true,
    updateUserSuccess: updateUser.data?.status === 200 && submitted,
    callingCode,
    setCallingCode,
  };
  return <YourDetailsView {...generatedProps} />;
};

export default YourDetails;
