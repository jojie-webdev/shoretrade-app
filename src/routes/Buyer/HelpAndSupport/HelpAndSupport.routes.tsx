import React from 'react';

import { QuestionCircle as QuestionIcon } from 'components/base/SVG';
import { BUYER_ROUTES } from 'consts';
import { Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import Category from './Category';
import HelpAndSupport from './HelpAndSupport.container';
import Inner from './Inner';
import Resolver from './Resolver';

const ROUTES: Routes = {
  HELP_AND_SUPPORT: {
    path: BUYER_ROUTES.HELP_AND_SUPPORT,
    children: <HelpAndSupport />,
    title: 'Help & Support',
    icon: QuestionIcon,
  },
  HELP_AND_SUPPORT_CATEGORY: {
    path: BUYER_ROUTES.HELP_AND_SUPPORT_CATEGORY(),
    title: '',
    children: <Category />,
  },
  HELP_AND_SUPPORT_CATEGORY_TOPIC: {
    path: BUYER_ROUTES.HELP_AND_SUPPORT_CATEGORY_TOPIC(),
    children: <Inner />,
  },
  HELP_AND_SUPPORT_TOPIC: {
    path: BUYER_ROUTES.HELP_AND_SUPPORT_TOPIC(),
    title: '',
    children: <Inner />,
  },
  HELP_AND_SUPPORT_RESOLVER: {
    path: BUYER_ROUTES.HELP_AND_SUPPORT_CATEGORY_TOPIC_RESOLVER(),
    children: <Resolver />,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const HelpAndSupportRoutes = (): JSX.Element => {
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

export default HelpAndSupportRoutes;
