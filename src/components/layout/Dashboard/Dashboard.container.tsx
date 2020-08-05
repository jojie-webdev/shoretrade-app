import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { DashboardPublicProps } from './Dashboard.props';
import DashboardView from './Dashboard.view';

const Dashboard = (props: DashboardPublicProps): JSX.Element => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');

  const formatRouteString = (s: string) => {
    let str = s;
    str = s.replace('-', ' ');
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    let innerRoute = location.pathname.split('/')[2];
    innerRoute = formatRouteString(innerRoute);

    setPageTitle(innerRoute);
  }, [location]);

  const generatedProps = {
    ...props,
    pageTitle,
    currentPath: location.pathname,
  };

  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
