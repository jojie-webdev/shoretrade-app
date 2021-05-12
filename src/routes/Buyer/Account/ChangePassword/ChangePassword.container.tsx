import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changePasswordActions } from 'store/actions';
import { Store } from 'types/store/Store';

import {
  ChangePasswordDetails,
  ChangePasswordGeneratedProps,
} from './ChangePassword.props';
import ChangePasswordView from './ChangePassword.view';

const ChangePassword = (): JSX.Element => {
  // MARK:- Store / State
  const dispatch = useDispatch();
  const changePassword = useSelector((state: Store) => state.changePassword);
  const [submitted, setSubmitted] = useState(false);

  // MARK:- Methods
  const onClickSave = (details: ChangePasswordDetails) => {
    dispatch(
      changePasswordActions.request({
        oldPassword: details.oldPassword,
        newPassword: details.newPassword,
      })
    );
    setSubmitted(true);
  };

  // MARK:- Render
  const generatedProps: ChangePasswordGeneratedProps = {
    onClickSave,
    pending: changePassword.pending || false,
    isError: changePassword.error.length > 0,
    isSuccess: changePassword.data?.status === 200 && submitted,
    errorMessage: changePassword.data?.message || '',
  };
  return <ChangePasswordView {...generatedProps} />;
};

export default ChangePassword;
