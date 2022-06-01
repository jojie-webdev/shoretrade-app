import React from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';
import { Store } from 'types/store/Store';

import AccountCompletion from './AccountCompletion';
import AddAddress from './AddAddress';
import AddAssistant from './AddAssistant';
import AddCredit from './AddCredit';
import Address from './Address';
import Balance from './Balance';
import BalanceHistory from './BalanceHistory';
import Card from './Card';
import ChangePassword from './ChangePassword';
import EditAddress from './EditAddress';
import EditAssistant from './EditAssistant';
import Landing from './Landing';
import Assistants from './LinkedAccounts';
import MarketInterests from './MarketInterests';
import NotificationsSettings from './NotificationsSettings';
import PlanPaymentMethod from './PlanPaymentMethod';
import SubscriptionPlan from './SubscriptionPlan';
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
    path: BUYER_ACCOUNT_ROUTES.BALANCE_HISTORY,
    children: <BalanceHistory />,
  },
  PAYMENT_HISTORY: {
    path: BUYER_ACCOUNT_ROUTES.PAYMENT_HISTORY,
    children: <BalanceHistory isPlanView />,
  },
  CREDIT_CARD: {
    path: BUYER_ACCOUNT_ROUTES.CREDIT_CARD,
    children: <Card />,
  },
  ADD_CREDIT: {
    path: BUYER_ACCOUNT_ROUTES.ADD_CREDIT,
    children: <AddCredit />,
  },
  ACCOUNT_COMPLETION: {
    path: BUYER_ACCOUNT_ROUTES.ACCOUNT_COMPLETION,
    children: <AccountCompletion />,
  },
  MARKET_INTERESTS: {
    path: BUYER_ACCOUNT_ROUTES.MARKET_INTERESTS,
    children: <MarketInterests />,
  },
  NOTIFICATIONS_SETTINGS: {
    path: BUYER_ACCOUNT_ROUTES.NOTIFICATIONS_SETTINGS,
    children: <NotificationsSettings />,
  },
  SUBSCRIPTION_PLAN: {
    path: BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN,
    children: <SubscriptionPlan />,
  },
  PLAN_PAYMENT_METHOD: {
    path: BUYER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD,
    children: <PlanPaymentMethod />,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const BuyerAccountRoutes = (props: any): JSX.Element => {
  const isAccountDeactivated = useSelector(
    (store: Store) => store.subscription.isAccountDeactivated
  );

  return (
    <>
      <Switch>
        {ROUTES_ARRAY.filter(
          (r) =>
            [
              BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN,
              BUYER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD,
              BUYER_ACCOUNT_ROUTES.BALANCE_HISTORY,
              BUYER_ACCOUNT_ROUTES.PAYMENT_HISTORY,
            ].includes(r.path) || !isAccountDeactivated
        ).map((r) => (
          <Route key={r.path} path={`${r.path}`} exact>
            {r.children}
          </Route>
        ))}
        <Route>
          <Redirect
            to={
              isAccountDeactivated
                ? BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN
                : BUYER_ACCOUNT_ROUTES.LANDING
            }
          />
        </Route>
      </Switch>
    </>
  );
};

export default BuyerAccountRoutes;
