import React from 'react';

import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

// Screens
import Assistants from './Assistants';
import BankDetails from './BankDetails';
import ChangePassword from './ChangePassword';
import CreateAddress from './CreateAddress';
import CreateAssistant from './CreateAssistant';
import EditAddress from './EditAddress';
import HelpAndSupport from './HelpAndSupport';
import Landing from './Landing';
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
      {/* <Route>
        <Redirect to="/seller/account" />
      </Route> */}
    </>
  );
};

export default SellerAccountRoutes;
