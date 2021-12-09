import React, { useEffect, useState } from 'react';

import { FormikForm } from 'components/module/BuyerAssistantForm/BuyerAssistantForm.props';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { PERMISSIONS } from 'consts/permissions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  deleteLinkedAccountActions,
  getLinkedAccountsActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { isPermitted } from 'utils/isPermitted';
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
  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');
  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const permission =
    !isPendingAccount &&
    isPermitted(user, PERMISSIONS.BUYER.VIEW_LINKED_ACCOUNTS);
  // MARK:- State'
  // eslint-disable-next-line
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
    if (!permission) {
      history.push(`${BUYER_ACCOUNT_ROUTES.LANDING}`);
    }
    // eslint-disable-next-line
  }, [companyId, getLinkedAccounts.data, permission]);

  // MARK:- Variables
  const formikInitial: FormikForm = {
    initialValues: {
      firstName: currentLinkedAccount?.firstName || '',
      lastName: currentLinkedAccount?.lastName || '',
      email: currentLinkedAccount?.email || '',
      mobile: replaceCallingCode(currentLinkedAccount?.mobile || ''),
    },
    // eslint-disable-next-line
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
