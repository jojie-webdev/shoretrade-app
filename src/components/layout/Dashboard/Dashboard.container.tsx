import React, { useEffect, useState } from 'react';

import { SELLER_ROUTES } from 'consts';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GetUserPayload } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';

import {
  DashboardPublicProps,
  DashboardGeneratedProps,
} from './Dashboard.props';
import DashboardView from './Dashboard.view';
const Dashboard = (props: DashboardPublicProps): JSX.Element => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const [shouldIncludePadding, setShouldIncludePadding] = useState(true);
  const userData = useSelector((state: Store) => state.getUser.data?.data.user);

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
    innerRoute = formatRouteString(innerRoute || '');

    setPageTitle(innerRoute);
  }, [location]);

  const generatedProps: DashboardGeneratedProps = {
    ...props,
    pageTitle,
    isInnerRoute,
    shouldIncludePadding,
    userData,
  };

  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
