import React from 'react';

import { Pen as PenIcon } from 'components/base/SVG';
import { BUYER_ROUTES } from 'consts';
import { Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import MarketRequestsLanding from './Landing';
// import CategoriesPreview from './Preview';
// import CategoriesSearch from './Search';

const ROUTES: Routes = {
  MARKET_REQUESTS: {
    path: BUYER_ROUTES.MARKET_REQUESTS,
    children: <MarketRequestsLanding />,
    title: 'Market Request',
    icon: PenIcon,
  },
  // CATEGORY_PRODUCTS: {
  //   path: BUYER_ROUTES.CATEGORY_PRODUCTS(),
  //   children: <CategoriesSearch />,
  //   title: '',
  //   hideFromSidebar: true,
  // },
  // PRODUCT_PREVIEW: {
  //   path: BUYER_ROUTES.PRODUCT_PREVIEW(),
  //   children: <CategoriesPreview />,
  //   title: '',
  //   hideFromSidebar: true,
  // },
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
