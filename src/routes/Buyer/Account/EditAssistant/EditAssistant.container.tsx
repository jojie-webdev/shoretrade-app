import React, { useEffect, useState } from 'react';

import { FormikForm } from 'components/module/BuyerAssistantForm/BuyerAssistantForm.props';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  deleteLinkedAccountActions,
  getLinkedAccountsActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { replaceCallingCode } from 'utils/String/callingCode';

import {
  EditAssistantGeneratedProps,
  QueryParams,
} from './EditAssistant.props';
import EditAssistantView from './EditAssistant.view';

const EditAssistant = (): JSX.Element => {
  // MARK:- Variables
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { companyId, assistantId } = location.state as QueryParams;

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
    if (deleteLinkedAccountActions.SUCCESS) {
      history.goBack();
    }
  };

  // MARK:- Effects
  useEffect(() => {
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
