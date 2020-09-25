import React, { useEffect, useState, useMemo } from 'react';

import { SELLER_ROUTES } from 'consts';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { authActions } from 'store/actions';
import { GetUserPayload } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';

import {
  DashboardPublicProps,
  DashboardGeneratedProps,
} from './Dashboard.props';
import DashboardView from './Dashboard.view';
const Dashboard = (props: DashboardPublicProps): JSX.Element => {
  // MARK:- Store / Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  // MARK:- State
  const [pageTitle, setPageTitle] = useState('');
  const shouldIncludePadding =
    props.shouldIncludePadding !== undefined
      ? props.shouldIncludePadding
      : theme.appType === 'seller';

  const [openSidebar, setOpenSidebar] = useState(false);

  const getUser = useSelector((state: Store) => state.getUser);
  const defaultCompany = useMemo(() => {
    if (!getUser) return null;

    return getUser.data?.data.user.companies.length
      ? getUser.data?.data.user.companies[0]
      : null;
  }, [getUser]);

  // MARK:- Variables
  const isInnerRoute = (path: string) =>
    location.pathname.search(path.split('/')[2]) > 0;

  const userData = getUser.data?.data.user;

  // MARK:- Methods
  const formatRouteString = (s: string) => {
    let str = s;
    str = s.replace('-', ' ');
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const logout = () => {
    dispatch(authActions.clear());
  };

  // MARK:- Effects
  useEffect(() => {
    // This is a hacky way for an edge case in add product
    // We need this so that the absolutes such as
    // progress indicator and box summary can fit in the screen

    let innerRoute = location.pathname.split('/')[2];
    innerRoute = formatRouteString(innerRoute || '');

    setPageTitle(innerRoute);
  }, [location]);

  // MARK:- Render
  const generatedProps: DashboardGeneratedProps = {
    ...props,
    pageTitle,
    isInnerRoute,
    shouldIncludePadding,
    userData,
    logout,
    credit: defaultCompany?.credit || '',
    openSidebar,
    setOpenSidebar,
  };

  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
