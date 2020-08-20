import React, { useState, useEffect, ChangeEvent } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { updateUserActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { replaceCallingCode, getCallingCode } from 'utils/String/callingCode';

import {
  UserDetails,
  BusinessDetails,
  YourDetailsGeneratedProps,
  QueryParams,
} from './YourDetails.props';
import YourDetailsView from './YourDetails.view';

const YourDetails = (): JSX.Element => {
  // MARK:- States
  const dispatch = useDispatch();
  const location = useLocation();
  const getUser = useSelector((state: Store) => state.getUser);
  const [companyId, setCompanyId] = useState('');
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

      const { companyId } = queryString.parse(location.search) as QueryParams;

      if (!companyId) {
        dispatch(push(SELLER_ACCOUNT_ROUTES.LANDING));
      }
      setCompanyId(companyId);

      const currentCompany = user?.companies.find((c) => c.id === companyId);

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

  const onClickSave = () => {
    const user = getUser.data?.data.user;
    const callingCode = getCallingCode(user?.mobile || '');

    dispatch(
      updateUserActions.request({
        ...userDetails,
        mobile: `+${callingCode}${userDetails.mobile}`,
        company: {
          name: businessDetails.businessName,
          abn: businessDetails.abn,
        },
        companyId,
      })
    );
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
