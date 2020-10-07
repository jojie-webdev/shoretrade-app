import React, { useState } from 'react';

import BuyerAssistantFormView from 'components/module/BuyerAssistantForm';
import { AssistantForm } from 'components/module/BuyerAssistantForm/BuyerAssistantForm.props';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addLinkedAccountActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { AddAssistantGeneratedProps } from './AddAssistant.props';
import { isValid } from './AddAssistant.validation';
import AddAssistantView from './AddAssistant.view';

const AddAssistant = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';
  const addLinkedAccount = useSelector(
    (store: Store) => store.addLinkedAccount
  );
  // MARK:- State
  const [callingCode, setCallingCode] = useState('61');
  const [submitted, setSubmitted] = useState(false);

  // MARK:- Methods
  const onClickCreate = (form: AssistantForm) => {
    dispatch(
      addLinkedAccountActions.request({
        companyId,
        ...form,
        mobile: `+${callingCode}${form.mobile}`,
        relationship: 'SECONDARY',
        userGroup: 'buyer',
      })
    );
    setSubmitted(true);
  };
  // MARK:- Variables

  const formikInitial = {
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
    },
    validate: isValid,
    onSubmit: onClickCreate,
  };
  const generatedProps: AddAssistantGeneratedProps = {
    type: 'CREATE',
    callingCode,
    setCallingCode,
    formikInitial,
    pending: addLinkedAccount.pending || false,
    success: addLinkedAccount.data?.status === 200 && submitted,
    error: submitted ? addLinkedAccount.error : undefined,
  };
  return <BuyerAssistantFormView {...generatedProps} />;
};

export default AddAssistant;
