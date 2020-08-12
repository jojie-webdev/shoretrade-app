import React, { useEffect, useState } from 'react';

import { SELLER_ROUTES } from 'consts';
import { useLocation } from 'react-router-dom';

import { DashboardPublicProps } from './Dashboard.props';
import DashboardView from './Dashboard.view';

const Dashboard = (props: DashboardPublicProps): JSX.Element => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const [shouldIncludePadding, setShouldIncludePadding] = useState(true);

  const isInnerRoute = (path: string) =>
    location.pathname.search(path.split('/')[2]) > 0;

  const formatRouteString = (s: string) => {
    let str = s;
    str = s.replace('-', ' ');
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    // This is a hacky way for an edge case in add product
    // We need this so that the absolutes such as
    // progress indicator and box summary can fit in the screen
    setShouldIncludePadding(location.pathname !== SELLER_ROUTES.ADD_PRODUCT);

    let innerRoute = location.pathname.split('/')[2];
    innerRoute = formatRouteString(innerRoute);

    setPageTitle(innerRoute);
  }, [location]);

  const generatedProps = {
    ...props,
    pageTitle,
    isInnerRoute,
    shouldIncludePadding,
  };

  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
