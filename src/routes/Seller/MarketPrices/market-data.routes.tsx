import React from 'react';

import { BreadCrumbSection } from 'components/base/Breadcrumbs/Breadcrumbs.props';
import { SELLER_MARKET_DATA_ROUTES } from 'consts/routes';
import { Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import ComingSoon from './ComingSoon';
import Species from './Species';

const ROUTES: Routes = {
  COMING_SOON: {
    path: SELLER_MARKET_DATA_ROUTES.LANDING,
    children: <ComingSoon />,
  },
  SPECIES: {
    path: SELLER_MARKET_DATA_ROUTES.SPECIES,
    children: <Species />,
  },
};

export const BreadCrumbSections: BreadCrumbSection[] = [
  {
    label: 'MarketData',
    isDone: true,
  },
  {
    label: 'Search or select any species',
  },
];

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const MarketDataRoute = (): JSX.Element => {
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

export default MarketDataRoute;
