import React from 'react';

import { SELLER_ACCOUNT_ROUTES, SELLER_ROUTES } from 'consts';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';
// Screens
import { Store } from 'types/store/Store';

import AccountCompletion from './AccountCompletion';
import AddLicense from './AddLicense';
import Assistants from './Assistants';
import BankDetails from './BankDetails';
import ChangePassword from './ChangePassword';
import CreateAddress from './CreateAddress';
import CreateAssistant from './CreateAssistant';
import EditAddress from './EditAddress';
import EditAssistant from './EditAssistant';
import EditLicense from './EditLicense';
import Landing from './Landing';
import Licenses from './Licenses';
import MarketInterests from './MarketInterests';
import NotificationsSettings from './NotificationsSettings';
import PaymentHistory from './PaymentHistory';
import PlanPaymentMethod from './PlanPaymentMethod';
import ShippingAddresses from './ShippingAddresses';
import SubscriptionPlan from './SubscriptionPlan';
import YourDetails from './YourDetails';
import Card from './Card';
import AddCredit from './AddCredit';

const ROUTES: Routes = {
  LANDING: {
    path: SELLER_ACCOUNT_ROUTES.LANDING,
    children: <Landing />,
  },
  YOUR_DETAILS: {
    path: SELLER_ACCOUNT_ROUTES.YOUR_DETAILS,
    children: <YourDetails />,
  },
  SUBSCRIPTION_PLAN: {
    path: SELLER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN,
    children: <SubscriptionPlan />,
  },
  PLAN_PAYMENT_METHOD: {
    path: SELLER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD,
    children: <PlanPaymentMethod />,
  },
  PAYMENT_HISTORY: {
    path: SELLER_ACCOUNT_ROUTES.PAYMENT_HISTORY,
    children: <PaymentHistory />,
  },
  SHIPPING_ADDRESS: {
    path: SELLER_ACCOUNT_ROUTES.SHIPPING_ADDRESS,
    children: <ShippingAddresses />,
  },
  EDIT_ADDRESS: {
    path: SELLER_ACCOUNT_ROUTES.EDIT_ADDRESS,
    children: <EditAddress />,
  },
  CHANGE_PASSWORD: {
    path: SELLER_ACCOUNT_ROUTES.CHANGE_PASSWORD,
    children: <ChangePassword />,
  },
  ASSISTANTS: {
    path: SELLER_ACCOUNT_ROUTES.ASSISTANTS,
    children: <Assistants />,
  },
  CREATE_ASSISTANT: {
    path: SELLER_ACCOUNT_ROUTES.CREATE_ASSISTANT,
    children: <CreateAssistant />,
  },
  EDIT_ASSISTANT: {
    path: SELLER_ACCOUNT_ROUTES.EDIT_ASSISTANT(),
    children: <EditAssistant />,
  },
  BANK_DETAILS: {
    path: SELLER_ACCOUNT_ROUTES.BANK_DETAILS,
    children: <BankDetails />,
  },
  CREATE_ADDRESS: {
    path: SELLER_ACCOUNT_ROUTES.CREATE_ADDRESS,
    children: <CreateAddress />,
  },
  CREDIT_CARD: {
    path: SELLER_ACCOUNT_ROUTES.CREDIT_CARD,
    children: <Card />,
  },
  ADD_CREDIT: {
    path: SELLER_ACCOUNT_ROUTES.ADD_CREDIT,
    children: <AddCredit />,
  },
  ACCOUNT_COMPLETION: {
    path: SELLER_ACCOUNT_ROUTES.ACCOUNT_COMPLETION,
    children: <AccountCompletion />,
  },
  MARKET_INTERESTS: {
    path: SELLER_ACCOUNT_ROUTES.MARKET_INTERESTS,
    children: <MarketInterests />,
  },
  LICENSES: {
    path: SELLER_ACCOUNT_ROUTES.LICENSES,
    children: <Licenses />,
  },
  ADD_LICENSE: {
    path: SELLER_ACCOUNT_ROUTES.ADD_LICENSE,
    children: <AddLicense />,
  },
  EDIT_LICENSE: {
    path: SELLER_ACCOUNT_ROUTES.EDIT_LICENSE,
    children: <EditLicense />,
  },
  NOTIFICATIONS_SETTINGS: {
    path: SELLER_ACCOUNT_ROUTES.NOTIFICATIONS_SETTINGS,
    children: <NotificationsSettings />,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const SellerAccountRoutes = (): JSX.Element => {
  const isAccountDeactivated = useSelector(
    (store: Store) => store.subscription.isAccountDeactivated
  );

  return (
    <>
      <Switch>
        {ROUTES_ARRAY.filter(
          (r) =>
            [
              SELLER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN,
              SELLER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD,
              SELLER_ACCOUNT_ROUTES.PAYMENT_HISTORY,
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
                ? SELLER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN
                : SELLER_ACCOUNT_ROUTES.LANDING
            }
          />
        </Route>
      </Switch>
    </>
  );
};

export default SellerAccountRoutes;
