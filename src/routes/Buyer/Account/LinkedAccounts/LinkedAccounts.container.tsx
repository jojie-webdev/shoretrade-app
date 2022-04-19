import React, { useEffect, useState } from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { PERMISSIONS } from 'consts/permissions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getLinkedAccountsActions,
  addLinkedAccountActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';
import { isPermitted } from 'utils/isPermitted';

import AssistantsView from './LinkedAccounts.view';

const Assistants = (): JSX.Element => {
  // MARK:- Store / Hooks/Variables
  const history = useHistory();
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';
  const loadingUser = useSelector(
    (state: Store) => state.getUser.pending || false
  );
  const user = useSelector((state: Store) => state.getUser.data?.data.user);

  const currentCompanyName = currentCompany?.name || 'Your Company';
  const linkedAccounts = useSelector((state: Store) => state.getLinkedAccounts);
  const addLinkedAccount = useSelector(
    (store: Store) => store.addLinkedAccount
  );
  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');
  const [notifMsg, setNotifMsg] = useState('');
  const permission =
    !isPendingAccount &&
    isPermitted(user, PERMISSIONS.BUYER.VIEW_LINKED_ACCOUNTS);

  // MARK:- Methods
  const addAssistant = () => {
    history.push(`${BUYER_ACCOUNT_ROUTES.ADD_ASSISTANT}`);
  };

  const editAssistant = (assistantId: string) => {
    history.push({
      pathname: `${BUYER_ACCOUNT_ROUTES.EDIT_ASSISTANT(assistantId)}`,
      state: {
        assistantId,
        companyId,
      },
    });
  };

  // MARK:- Effects
  useEffect(() => {
    if (companyId) {
      dispatch(getLinkedAccountsActions.request({ companyId }));
    }
    if (!loadingUser && !permission) {
      history.push(`${BUYER_ACCOUNT_ROUTES.LANDING}`);
    }
    // eslint-disable-next-line
  }, [companyId, permission]);

  useEffect(() => {
    if (!addLinkedAccount.pending && addLinkedAccount.data) {
      setNotifMsg('Assistant successfully created!');
      dispatch(addLinkedAccountActions.clear());
    }
    // eslint-disable-next-line
  }, [addLinkedAccount]);

  const generatedProps = {
    accounts: linkedAccounts.data?.data.accounts || [],
    pending: linkedAccounts.pending || false,
    addAssistant,
    editAssistant,
    currentCompanyName,
    notifMsg,
  };
  return <AssistantsView {...generatedProps} />;
};

export default Assistants;
