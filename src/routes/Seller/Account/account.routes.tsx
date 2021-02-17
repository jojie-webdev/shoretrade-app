import React from 'react';

import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

// Screens
import AccountCompletion from './AccountCompletion';
import Assistants from './Assistants';
import BankDetails from './BankDetails';
import ChangePassword from './ChangePassword';
import CreateAddress from './CreateAddress';
import CreateAssistant from './CreateAssistant';
import EditAddress from './EditAddress';
import EditAssistant from './EditAssistant';
import HelpAndSupport from './HelpAndSupport';
import Landing from './Landing';
import Licenses from './Licenses';
import MarketInterests from './MarketInterests';
import ShippingAddresses from './ShippingAddresses';
import YourDetails from './YourDetails';

const ROUTES: Routes = {
  LANDING: {
    path: SELLER_ACCOUNT_ROUTES.LANDING,
    children: <Landing />,
  },
  YOUR_DETAILS: {
    path: SELLER_ACCOUNT_ROUTES.YOUR_DETAILS,
    children: <YourDetails />,
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
  HELP_AND_SUPPORT: {
    path: SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT,
    children: <HelpAndSupport />,
  },
  CREATE_ADDRESS: {
    path: SELLER_ACCOUNT_ROUTES.CREATE_ADDRESS,
    children: <CreateAddress />,
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
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const SellerAccountRoutes = (): JSX.Element => {
  return (
    <>
      {ROUTES_ARRAY.map((r) => (
        <Route key={r.path} path={`${r.path}`} exact>
          {r.children}
        </Route>
      ))}
    </>
  );
};

export default SellerAccountRoutes;
