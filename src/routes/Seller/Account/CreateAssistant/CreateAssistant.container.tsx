import React, { useState, useEffect } from 'react';

import SellerAssistantForm from 'components/module/SellerAssistantForm';
import {
  Role,
  AssistantForm,
} from 'components/module/SellerAssistantForm/SellerAssistantForm.props';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addLinkedAccountActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import { CreateAssistantGeneratedProps } from './CreateAssistant.props';
import { isValid } from './CreateAssistant.validation';

const CreateAssistant = (): JSX.Element => {
  // MARK:- Store / Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [companyId] = useCompany();
  const addLinkedAccount = useSelector(
    (store: Store) => store.addLinkedAccount
  );

  // MARK:- State
  const [role, setRole] = useState<Role>('ASSISTANT');
  const [callingCode, setCallingCode] = useState(theme.isSFM ? '61' : '');
  const [submitted, setSubmitted] = useState(false);

  // MARK:- Methods
  const onClickCreate = (form: AssistantForm) => {
    dispatch(
      addLinkedAccountActions.request({
        companyId,
        ...form,
        mobile_cc: `+${callingCode}`,
        mobile_no: form.mobile_no,
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
      mobile_cc: '',
      mobile_no: '',
    },
    validate: isValid,
    onSubmit: onClickCreate,
  };

  // MARK:- Effects

  useEffect(() => {
    if (submitted && addLinkedAccount.data) {
      history.goBack();
    }
    // eslint-disable-next-line
  }, [addLinkedAccount]);

  // MARK:- Render
  const generatedProps: CreateAssistantGeneratedProps = {
    companyId,
    type: 'CREATE',
    role,
    setRole,
    callingCode,
    setCallingCode,
    formikInitial,
    pending: addLinkedAccount.pending || false,
    success: addLinkedAccount.data?.status === 200 && submitted,
    error: submitted ? addLinkedAccount.error : undefined,
  };

  return <SellerAssistantForm {...generatedProps} />;
};

export default CreateAssistant;
