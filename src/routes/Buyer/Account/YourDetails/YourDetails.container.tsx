import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateUserActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';
import { getCallingCode } from 'utils/String/callingCode';

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
    mobile_cc: '',
    mobile_no: '',
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
      setCallingCode(getCallingCode(user?.mobile_cc || ''));
      setUserDetails({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        mobile_cc: user?.mobile_cc || '',
        mobile_no: user?.mobile_no || '',
      });

      setBusinessDetails({
        businessName: currentCompany?.name || '',
        abn: currentCompany?.abn || '',
      });
    }
    // eslint-disable-next-line
  }, [getUser]);

  // MARK:- Methods
  const onClickSave = (updateUserForm: UpdateUserForm) => {
    const {
      firstName,
      lastName,
      email,
      mobile_cc,
      mobile_no,
      businessName,
      abn,
    } = updateUserForm;

    const updatedUserDetails = {
      firstName,
      lastName,
      email,
      mobile_cc,
      mobile_no,
    };

    const updateBusinessDetails = {
      businessName,
      abn,
    };

    dispatch(
      updateUserActions.request({
        ...updatedUserDetails,
        mobile_no: updatedUserDetails?.mobile_no || '',
        mobile_cc: `+${callingCode}`,
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
