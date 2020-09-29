import React from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { Route, Switch } from 'react-router-dom';
import ChangePassword from 'routes/Seller/Account/ChangePassword';
import { Routes, Route as TRoute } from 'types/Routes';

import AddAddress from './AddAddress';
import AddAssistant from './AddAssistant';
import AddCredit from './AddCredit';
import Address from './Address';
import Balance from './Balance';
import Card from './Card';
import EditAddress from './EditAddress';
import EditAssistant from './EditAssistant';
import HelpAndSupport from './HelpAndSupport';
import Landing from './Landing';
import Assistants from './LinkedAccounts';
import YourDetails from './YourDetails';
const ROUTES: Routes = {
  LANDING: {
    path: BUYER_ACCOUNT_ROUTES.LANDING,
    children: <Landing />,
  },
  BALANCE: {
    path: BUYER_ACCOUNT_ROUTES.BANK_DETAILS,
    children: <Balance />,
  },
  DETAILS: {
    path: BUYER_ACCOUNT_ROUTES.DETAILS,
    children: <YourDetails />,
  },
  DELIVERY: {
    path: BUYER_ACCOUNT_ROUTES.ADDRESS,
    children: <Address />,
  },
  ADD_ADDRESS: {
    path: BUYER_ACCOUNT_ROUTES.ADD_ADDRESS,
    children: <AddAddress />,
  },
  EDIT_ADDRESS: {
    path: BUYER_ACCOUNT_ROUTES.EDIT_ADDRESS(),
    children: <EditAddress />,
  },
  LINKED_ACCOUNTS: {
    path: BUYER_ACCOUNT_ROUTES.LINKED_ACCOUNTS,
    children: <Assistants />,
  },
  CHANGE_PASSWORD: {
    path: BUYER_ACCOUNT_ROUTES.CHANGE_PASSWORD,
    children: <ChangePassword />,
  },
  HELP: {
    path: BUYER_ACCOUNT_ROUTES.HELP,
    children: <HelpAndSupport />,
  },
  ASSISTANT: {
    path: BUYER_ACCOUNT_ROUTES.ASSISTANT,
    children: <Landing />,
  },
  ADD_ASSISTANT: {
    path: BUYER_ACCOUNT_ROUTES.ADD_ASSISTANT,
    children: <AddAssistant />,
  },
  EDIT_ASSISTANT: {
    path: BUYER_ACCOUNT_ROUTES.EDIT_ASSISTANT(),
    children: <EditAssistant />,
  },
  CREDIT_HISTORY: {
    path: BUYER_ACCOUNT_ROUTES.CREDIT_HISORY,
    children: <Balance />,
  },
  CREDIT_CARD: {
    path: BUYER_ACCOUNT_ROUTES.CREDIT_CARD,
    children: <Card />,
  },
  ADD_CREDIT: {
    path: BUYER_ACCOUNT_ROUTES.ADD_CREDIT,
    children: <AddCredit />,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const BuyerAccountRoutes = (props: any): JSX.Element => {
  return (
    <>
      <Switch>
        {ROUTES_ARRAY.map((r) => (
          <Route key={r.path} path={`${r.path}`} exact>
            {r.children}
          </Route>
        ))}
      </Switch>
    </>
  );
};

export default BuyerAccountRoutes;
