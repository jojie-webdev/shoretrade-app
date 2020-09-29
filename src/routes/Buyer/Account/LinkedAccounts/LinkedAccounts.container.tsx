import React, { useEffect } from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getLinkedAccountsActions } from 'store/actions';
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
  const linkedAccounts = useSelector((state: Store) => state.getLinkedAccounts);

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

  const generatedProps = {
    accounts: linkedAccounts.data?.data.accounts || [],
    pending: linkedAccounts.pending || false,
    addAssistant,
    editAssistant,
  };
  return <AssistantsView {...generatedProps} />;
};

export default Assistants;
