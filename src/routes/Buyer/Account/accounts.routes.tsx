import React from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import AddCredit from './AddCredit';
import Balance from './Balance';
import Card from './Card';
import Landing from './Landing';
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
    path: BUYER_ACCOUNT_ROUTES.DELIVERY,
    children: <Landing />,
  },
  LINKED_ACCOUNTS: {
    path: BUYER_ACCOUNT_ROUTES.LINKED_ACCOUNTS,
    children: <Landing />,
  },
  CHANGE_PASSWORD: {
    path: BUYER_ACCOUNT_ROUTES.CHANGE_PASSWORD,
    children: <Landing />,
  },
  HELP: {
    path: BUYER_ACCOUNT_ROUTES.HELP,
    children: <Landing />,
  },
  ASSISTANT: {
    path: BUYER_ACCOUNT_ROUTES.ASSISTANT,
    children: <Landing />,
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
