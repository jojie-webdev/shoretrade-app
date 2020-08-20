import React, { useState, useEffect, ChangeEvent } from 'react';

import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';
import { replaceCallingCode } from 'utils/String/callingCode';

import {
  UserDetails,
  BusinessDetails,
  YourDetailsGeneratedProps,
} from './YourDetails.props';
import YourDetailsView from './YourDetails.view';

const YourDetails = (): JSX.Element => {
  // MARK:- States
  const getUser = useSelector((state: Store) => state.getUser);

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

      // TODO: Get current company id
      const currentCompany = user?.companies[0];

      setBusinessDetails({
        businessName: currentCompany?.name || '',
        abn: currentCompany?.abn || '',
      });
    }
  }, [getUser.pending]);

  // MARK:- Methods
  const onChangeUserDetails = (name: keyof UserDetails) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setUserDetails({
      ...userDetails,
      [name]: event.target.value,
    });
  };

  const onChangeBusinessDetails = (name: keyof BusinessDetails) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setBusinessDetails({
      ...businessDetails,
      [name]: event.target.value,
    });
  };

  // MARK:- Render
  const generatedProps: YourDetailsGeneratedProps = {
    userDetails,
    businessDetails,
    onChangeUserDetails,
    onChangeBusinessDetails,
  };
  return <YourDetailsView {...generatedProps} />;
};

export default YourDetails;
