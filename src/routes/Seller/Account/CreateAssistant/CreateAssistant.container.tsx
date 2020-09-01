import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addLinkedAccountActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

import {
  Role,
  CreateAssistantGeneratedProps,
  AssistantForm,
} from './CreateAssistant.props';
import CreateAssistantView from './CreateAssistant.view';

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

  // MARK:- Render
  const generatedProps: CreateAssistantGeneratedProps = {
    role,
    setRole,
    callingCode,
    setCallingCode,
    onClickCreate,
    pending: addLinkedAccount.pending || false,
    success: addLinkedAccount.data?.status === 200 && submitted,
    error: addLinkedAccount.error.length > 0,
  };
  return <CreateAssistantView {...generatedProps} />;
};

export default CreateAssistant;
