import React from 'react';

import { BUYER_ROUTES } from 'consts';
import { Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import CreateRequest from './Create/Create.container';
import MarketRequestsLanding from './Landing';
import MarketRequestDetail from './RequestDetails';

const ROUTES: Routes = {
  MARKET_REQUEST_DETAILS: {
    path: BUYER_ROUTES.MARKET_REQUEST_DETAILS(),
    children: <MarketRequestDetail />,
  },
  // MARKET_REQUEST_DETAILS_OFFERS: {
  //   path: BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFERS(),
  //   children: <MarketRequestDetail />,
  //   nested: true,
  // },
  CREATE_REQUEST: {
    path: BUYER_ROUTES.CREATE_MARKET_REQUEST,
    children: <CreateRequest />,
  },
  MARKET_REQUESTS: {
    path: BUYER_ROUTES.MARKET_REQUESTS,
    children: <MarketRequestsLanding />,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const MarketRequestsRoute = (): JSX.Element => {
  return (
    <>
      <Switch>
        {ROUTES_ARRAY.map((r) => (
          <Route key={r.path} path={`${r.path}`}>
            {r.children}
          </Route>
        ))}
      </Switch>
    </>
  );
};

export default MarketRequestsRoute;