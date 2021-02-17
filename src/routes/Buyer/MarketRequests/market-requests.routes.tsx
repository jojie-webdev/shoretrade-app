import React from 'react';

import { Bolt as BoltIcon } from 'components/base/SVG';
import { BUYER_ROUTES } from 'consts';
import { Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import MarketRequestsLanding from './Landing';
import MarketRequestDetail from './RequestDetails';
// import CategoriesPreview from './Preview';
// import CategoriesSearch from './Search';

const ROUTES: Routes = {
  MARKET_REQUEST_DETAILS: {
    path: BUYER_ROUTES.MARKET_REQUEST_DETAILS(),
    children: <MarketRequestDetail />,
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
          <Route key={r.path} path={`${r.path}`} exact>
            {r.children}
          </Route>
        ))}
      </Switch>
    </>
  );
};

export default MarketRequestsRoute;
