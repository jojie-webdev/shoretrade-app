import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { getLinkedAccountsActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

import { AssistantsGeneratedProps } from './Assistants.props';
import AssistantsView from './Assistants.view';

const Assistants = (): JSX.Element => {
  // MARK:- Store / Hooks
  const dispatch = useDispatch();
  const [companyId] = useCompany();
  const companies =
    useSelector((state: Store) => state.getUser.data?.data.user.companies) ||
    [];
  const currentCompany = companies.find((company) => company.id === companyId);
  const currentCompanyName = currentCompany?.name || 'Your Company';
  const getLinkedAccounts = useSelector(
    (store: Store) => store.getLinkedAccounts
  );

  // MARK:- Methods
  const goToCreateAssistant = () => {
    dispatch(
      push(
        `${SELLER_ACCOUNT_ROUTES.CREATE_ASSISTANT}${qs.stringify(
          { companyId: companyId },
          { addQueryPrefix: true }
        )}`
      )
    );
  };

  const onClickAssistant = (assistantId: string) => {
    dispatch(
      push(
        `${SELLER_ACCOUNT_ROUTES.EDIT_ASSISTANT(assistantId)}${qs.stringify(
          { companyId: companyId },
          { addQueryPrefix: true }
        )}`
      )
    );
  };

  // MARK:- Effects
  useEffect(() => {
    if (companyId) {
      dispatch(getLinkedAccountsActions.request({ companyId }));
    }
  }, [companyId]);

  // MARK:- Render
  const generatedProps: AssistantsGeneratedProps = {
    accounts: getLinkedAccounts.data?.data.accounts || [],
    pending: getLinkedAccounts.pending || false,
    goToCreateAssistant,
    onClickAssistant,
    currentCompanyName,
  };

  return <AssistantsView {...generatedProps} />;
};

export default Assistants;
