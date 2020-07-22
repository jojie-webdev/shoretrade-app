import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Routes } from 'types/Routes';

export const ROUTES: Routes = {
  ROOT: {
    path: '/',
    children: <></>,
  },
};

const RoutesComponent = (): JSX.Element => {
  return (
    <Switch>
      {Object.values(ROUTES).map((r) => (
        <Route key={r.path} {...r} />
      ))}
    </Switch>
  );
};

export default RoutesComponent;
