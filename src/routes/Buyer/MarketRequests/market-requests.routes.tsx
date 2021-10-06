import React from 'react';

import { BUYER_ROUTES } from 'consts';
import { BUYER_MARKET_REQUEST_ROUTES } from 'consts/routes';
import { Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import CreateRequest from './Create/Create.container';
import MarketRequestsLanding from './Landing';
import OfferDetails from './OfferDetails';
import MarketRequestDetail from './RequestDetails';

const ROUTES: Routes = {
  MARKET_REQUESTS: {
    path: BUYER_MARKET_REQUEST_ROUTES.LANDING,
    children: <MarketRequestsLanding />,
  },
  CREATE_REQUEST: {
    path: BUYER_MARKET_REQUEST_ROUTES.CREATE_MARKET_REQUEST,
    children: <CreateRequest />,
    title: '',
    hideFromSidebar: true,
  },
  MARKET_REQUEST_DETAILS: {
    path: BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS(),
    children: <MarketRequestDetail />,
    title: '',
    hideFromSidebar: true,
  },
  MARKET_REQUEST_DETAILS_OFFER: {
    path: BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS_OFFER(),
    children: <OfferDetails />,
    title: '',
    hideFromSidebar: true,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const MarketRequestsRoute = (): JSX.Element => {
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

export default MarketRequestsRoute;
