import React, { useEffect, useState } from 'react';

import { FormikForm } from 'components/module/SellerAssistantForm/SellerAssistantForm.props';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getLinkedAccountsActions,
  deleteLinkedAccountActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';
import { replaceCallingCode } from 'utils/String/callingCode';

import { EditAssistantGeneratedProps } from './EditAssistant.props';
import EditAssistantView from './EditAssistant.view';

const EditAssistant = (): JSX.Element => {
  // MARK:- Store / Hooks
  const dispatch = useDispatch();
  const [companyId] = useCompany();
  const { assistantId } = useParams<{ assistantId: string }>();
  const getLinkedAccounts = useSelector(
    (store: Store) => store.getLinkedAccounts
  );
  const deleteLinkedAccount = useSelector(
    (store: Store) => store.deleteLinkedAccount
  );
  const currentLinkedAccount = useSelector((state: Store) =>
    (state.getLinkedAccounts.data?.data.accounts || []).find(
      (a) => a.userId === assistantId
    )
  );

  // MARK:- State
  const [callingCode, setCallingCode] = useState('61');

  // MARK:- Methods
  const onClickDelete = () => {
    dispatch(
      deleteLinkedAccountActions.request({
        employeeId: currentLinkedAccount?.employeeId || '',
        companyId,
      })
    );
  };

  // MARK:- Effects
  useEffect(() => {
    // Fetch if linkedAccounts directly goes to this link
    if (companyId && !getLinkedAccounts.data) {
      dispatch(getLinkedAccountsActions.request({ companyId }));
    }
  }, [companyId, getLinkedAccounts.data]);

  // MARK:- Variables
  const formikInitial: FormikForm = {
    initialValues: {
      firstName: currentLinkedAccount?.firstName || '',
      lastName: currentLinkedAccount?.lastName || '',
      email: currentLinkedAccount?.email || '',
      mobile: replaceCallingCode(currentLinkedAccount?.mobile || ''),
    },
    onSubmit: () => {},
  };

  // MARK:- Render
  const generatedProps: EditAssistantGeneratedProps = {
    type: 'EDIT',
    formikInitial,
    callingCode,
    pending: deleteLinkedAccount.pending || false,
    loading: getLinkedAccounts.pending || false,
    onClickDelete,
  };

  return <EditAssistantView {...generatedProps} />;
};

export default EditAssistant;