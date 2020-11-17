import React, { useEffect, useState } from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getLinkedAccountsActions,
  addLinkedAccountActions,
} from 'store/actions';
import getLinkedAccounts from 'store/reducers/getLinkedAccounts';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { AddAssistantGeneratedProps } from '../AddAssistant/AddAssistant.props';
import AssistantsView from './LinkedAccounts.view';

const Assistants = (): JSX.Element => {
  // MARK:- Store / Hooks/Variables
  const history = useHistory();
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';
  // const companies =
  //   useSelector((state: Store) => state.getUser.data?.data.user.companies) ||
  //   [];
  // const currentCompany = companies.find((company) => company.id === companyId);

  const currentCompanyName = currentCompany?.name || 'Your Company';
  const linkedAccounts = useSelector((state: Store) => state.getLinkedAccounts);
  const addLinkedAccount = useSelector(
    (store: Store) => store.addLinkedAccount
  );
  const [notifMsg, setNotifMsg] = useState('');

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
  }, [companyId]);

  useEffect(() => {
    if (!addLinkedAccount.pending && addLinkedAccount.data) {
      setNotifMsg('Assistant successfully created!');
      dispatch(addLinkedAccountActions.clear());
    }
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
