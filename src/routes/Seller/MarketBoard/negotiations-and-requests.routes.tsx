import React from 'react';

import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import Landing from './Landing';
import Negotiation from './Negotiation';
import RequestAndNegotiate from './RequestAndNegotiate';

const ROUTES: Routes = {
  MARKET_REQUESTS: {
    path: SELLER_MARKET_BOARD_ROUTES.LANDING,
    children: <Landing />,
  },
  REVIEW_REQUEST: {
    path: SELLER_MARKET_BOARD_ROUTES.OFFER,
    children: <RequestAndNegotiate />,
  },
  NEGOTIATE: {
    path: SELLER_MARKET_BOARD_ROUTES.NEGOTIATE,
    children: <RequestAndNegotiate />,
  },
  NEGOTIATION: {
    path: SELLER_MARKET_BOARD_ROUTES.NEGOTIATION,
    children: <Negotiation />,
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
