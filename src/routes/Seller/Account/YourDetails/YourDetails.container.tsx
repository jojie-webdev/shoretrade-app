import React, { useState, useEffect, ChangeEvent } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
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
  UpdateUserForm,
} from './YourDetails.props';
import YourDetailsView from './YourDetails.view';

const YourDetails = (): JSX.Element => {
  // MARK:- States
  const dispatch = useDispatch();
  const location = useLocation();
  const getUser = useSelector((state: Store) => state.getUser);
  const updateUser = useSelector((state: Store) => state.updateUser);
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

      const { companyId } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      }) as QueryParams;

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
  };

  // MARK:- Render
  const generatedProps: YourDetailsGeneratedProps = {
    userDetails,
    businessDetails,
    onClickSave,
    updatingUser: updateUser.pending || false,
    loadingUser: getUser.pending || true,
    updateUserSuccess: updateUser.data?.status === 200 || false,
  };
  return <YourDetailsView {...generatedProps} />;
};

export default YourDetails;
