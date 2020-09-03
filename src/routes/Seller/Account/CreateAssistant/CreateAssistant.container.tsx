import React, { useState } from 'react';

import SellerAssistantForm from 'components/module/SellerAssistantForm';
import {
  Role,
  AssistantForm,
} from 'components/module/SellerAssistantForm/SellerAssistantForm.props';
import { useDispatch, useSelector } from 'react-redux';
import { addLinkedAccountActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

import { CreateAssistantGeneratedProps } from './CreateAssistant.props';
import { isValid } from './CreateAssistant.validation';

const CreateAssistant = (): JSX.Element => {
  // MARK:- Store / Hooks
  const dispatch = useDispatch();
  const [companyId] = useCompany();
  const addLinkedAccount = useSelector(
    (store: Store) => store.addLinkedAccount
  );

  // MARK:- State
  const [role, setRole] = useState<Role>('ASSISTANT');
  const [callingCode, setCallingCode] = useState('61');
  const [submitted, setSubmitted] = useState(false);

  // MARK:- Methods
  const onClickCreate = (form: AssistantForm) => {
    dispatch(
      addLinkedAccountActions.request({
        companyId,
        ...form,
        mobile: `+${callingCode}${form.mobile}`,
        relationship: role === 'FISHERMAN' ? 'SECONDARY' : 'ASSISTANT',
        userGroup: 'seller',
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

  // MARK:- Render
  const generatedProps: CreateAssistantGeneratedProps = {
    type: 'CREATE',
    role,
    setRole,
    callingCode,
    setCallingCode,
    formikInitial,
    pending: addLinkedAccount.pending || false,
    success: addLinkedAccount.data?.status === 200 && submitted,
    error: addLinkedAccount.error.length > 0,
  };

  return <SellerAssistantForm {...generatedProps} />;
};

export default CreateAssistant;
